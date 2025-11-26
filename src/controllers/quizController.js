import * as paginasModel from '../models/paginasModel.js';
import * as respostasQuizModel from '../models/respostasQuizModel.js';
import { incrementNivelProgress, resetNivelProgress } from '../middleware/sessionProgress.js';

/**
 * Embaralha um array (Fisher-Yates shuffle)
 */
function embaralharRespostas(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * GET /quiz/:ordem
 * Exibe um quiz específico pela ordem (7, 8, 9, 16, 17, 18, 25, 26, 27)
 */
export async function renderQuiz(req, res) {
  try {
    const ordem = parseInt(req.params.ordem);
    
    if (isNaN(ordem) || ordem < 1 || ordem > 27) {
      return res.redirect('/inicio');
    }

    // Busca a página pela ordem
    const pagina = await paginasModel.getPaginaPorOrdem(ordem);
    
    if (!pagina || pagina.tipo !== 'quiz') {
      return res.status(404).render('404', { 
        title: 'Página não encontrada',
        message: 'Este quiz não existe.'
      });
    }

    // Busca as respostas do quiz (sem expor o campo 'correta')
    let respostas = await respostasQuizModel.getRespostasQuizPorPaginaSemCorreta(pagina.id);
    
    // Embaralha as respostas para maior desafio
    respostas = embaralharRespostas(respostas);

    // Verifica se há erro na query string
    const temErro = req.query.erro === '1';
    
    // Inicializa tentativas erradas se não existir
    if (!req.session.tentativasErradas) {
      req.session.tentativasErradas = {};
    }
    
    console.log(`\n=== RENDERIZAR QUIZ ${ordem} ===`);
    console.log(`temErro: ${temErro}`);
    console.log(`Session tentativas:`, req.session.tentativasErradas);
    console.log(`Tentativas para quiz ${ordem}:`, req.session.tentativasErradas[`pagina_${ordem}`] || 0);

    res.render('quiz', {
      pergunta: pagina,
      respostas,
      ordem,
      temErro
    });

  } catch (error) {
    console.error('Erro ao renderizar quiz:', error);
    res.status(500).send('Erro ao carregar quiz');
  }
}

/**
 * POST /quiz/:ordem/validar
 * Valida a resposta e retorna JSON
 */
export async function validarResposta(req, res) {
  try {
    const ordem = parseInt(req.params.ordem);
    const idResposta = parseInt(req.body.idResposta);

    console.log('\n=== VALIDAR RESPOSTA ===');
    console.log('Ordem:', ordem, 'Tipo:', typeof ordem);
    console.log('ID Resposta recebido:', req.body.idResposta, 'Tipo:', typeof req.body.idResposta);
    console.log('ID Resposta parseado:', idResposta, 'Tipo:', typeof idResposta);
    console.log('Session atual:', req.session.tentativasErradas || {});

    if (isNaN(ordem) || isNaN(idResposta) || ordem < 1 || ordem > 27) {
      console.log('Erro: Validação de parametros falhou');
      return res.json({ correto: false });
    }

    // Busca a página (quiz) pela ordem
    const pagina = await paginasModel.getPaginaPorOrdem(ordem);
    
    if (!pagina || pagina.tipo !== 'quiz') {
      return res.json({ correto: false });
    }

    // Busca a resposta selecionada
    const respostaSelecionada = await respostasQuizModel.getRespostaPorId(idResposta);
    
    console.log('Resposta encontrada:', respostaSelecionada);
    
    if (!respostaSelecionada) {
      console.log('Erro: Resposta não encontrada para ID:', idResposta);
      return res.json({ correto: false });
    }

    // Validação de segurança: resposta deve pertencer ao quiz atual
    if (respostaSelecionada.id_pagina !== pagina.id) {
      return res.json({ correto: false });
    }

    // Verifica se a resposta está correta
    // MySQL pode retornar como 0, 1, '0', '1', true, false, bit, etc
    const estaCorreta = respostaSelecionada.correta === 1 || 
                       respostaSelecionada.correta === true || 
                       respostaSelecionada.correta === '1' ||
                       Number(respostaSelecionada.correta) === 1 ||
                       String(respostaSelecionada.correta).toLowerCase() === 'true';
    
    // Debug
    console.log('Validação de resposta:', {
      idResposta,
      resposta: respostaSelecionada,
      corretaValue: respostaSelecionada.correta,
      corretaType: typeof respostaSelecionada.correta,
      estaCorreta
    });
    
    if (estaCorreta) {
      // Incrementa o progresso
      incrementNivelProgress(req, 1);
      return res.json({ 
        correto: true,
        tentativas: 0
      });
    } else {
      // Registra tentativa errada
      if (!req.session.tentativasErradas) {
        req.session.tentativasErradas = {};
      }
      
      const chaveErro = `pagina_${ordem}`;
      // IMPORTANTE: Retorna o número ANTES de incrementar
      const tentativasAnteriores = req.session.tentativasErradas[chaveErro] || 0;
      // Agora incrementa para a próxima tentativa
      req.session.tentativasErradas[chaveErro] = tentativasAnteriores + 1;
      
      console.log(`\n=== TENTATIVA ERRADA REGISTRADA ===`);
      console.log(`Ordem: ${ordem}`);
      console.log(`Chave: ${chaveErro}`);
      console.log(`Tentativas anteriores: ${tentativasAnteriores}`);
      console.log(`Session ID: ${req.sessionID}`);
      console.log(`Todas as tentativas:`, req.session.tentativasErradas);
      console.log(`================================\n`);
      
      return res.json({ 
        correto: false,
        tentativas: tentativasAnteriores // Retorna o número anterior, não o incrementado
      });
    }

  } catch (error) {
    console.error('Erro ao validar resposta:', error);
    res.json({ correto: false });
  }
}

/**
 * POST /quiz/:ordem/submit
 * Valida a resposta do usuário
 */
export async function submitResposta(req, res) {
  try {
    const ordem = parseInt(req.params.ordem);
    const idResposta = parseInt(req.body.idResposta);

    if (isNaN(ordem) || isNaN(idResposta) || ordem < 1 || ordem > 27) {
      return res.redirect('/inicio');
    }

    // Busca a página (quiz) pela ordem
    const pagina = await paginasModel.getPaginaPorOrdem(ordem);
    
    if (!pagina || pagina.tipo !== 'quiz') {
      return res.redirect('/inicio');
    }

    // Busca a resposta selecionada
    const respostaSelecionada = await respostasQuizModel.getRespostaPorId(idResposta);
    
    if (!respostaSelecionada) {
      console.log('Resposta não encontrada');
      return res.redirect(`/quiz/${ordem}`);
    }

    // Validação de segurança: resposta deve pertencer ao quiz atual
    if (respostaSelecionada.id_pagina !== pagina.id) {
      console.log('Tentativa de envio de resposta inválida');
      return res.redirect(`/quiz/${ordem}`);
    }

    // Verifica se a resposta está correta
    if (respostaSelecionada.correta === 1 || respostaSelecionada.correta === true || respostaSelecionada.correta === '1' || Number(respostaSelecionada.correta) === 1) {
      // RESPOSTA CORRETA
      
      // LIMPA o contador de tentativas erradas para este quiz
      if (req.session.tentativasErradas) {
        const chaveErro = `pagina_${ordem}`;
        delete req.session.tentativasErradas[chaveErro];
      }
      
      // Incrementa o progresso
      incrementNivelProgress(req, 1);

      // Determina qual é o nível atual baseado na ordem
      // Nível 1: quizzes 7, 8, 9 (ordem % 9 em range 7-9)
      // Nível 2: quizzes 16, 17, 18 (ordem % 9 em range 16-18)
      // Nível 3: quizzes 25, 26, 27 (ordem % 9 em range 25-27)
      const nivelAtual = Math.ceil(ordem / 9);
      const ehUltimoPerguntaDoNivel = ordem % 9 === 0;
      
      if (ehUltimoPerguntaDoNivel) {
        // Completou um nível
        resetNivelProgress(req, 1);
        
        if (nivelAtual >= 3) {
          // Completou todos os 3 níveis - vai para certificado
          return res.render('parabensFinal', { 
            nivel: nivelAtual,
            mensagem: 'Parabéns! Você completou todos os níveis!'
          });
        } else if (nivelAtual === 2) {
          // Nível 2 completo - vai para parabens2
          return res.render('parabens2', { 
            nivel: nivelAtual,
            mensagem: 'Parabéns! Você completou o nível 2!'
          });
        } else {
          // Nível 1 ou outro - vai para parabens
          return res.render('parabens', { 
            nivel: nivelAtual,
            mensagem: `Parabéns! Você completou o nível ${nivelAtual}!`
          });
        }
      } else {
        // Avança para próxima página
        const proximaOrdem = ordem + 1;
        return res.redirect(`/pagina/${proximaOrdem}`);
      }
      
    } else {
      // RESPOSTA INCORRETA
      
      // Verifica se é a primeira tentativa errada
      if (!req.session.tentativasErradas) {
        req.session.tentativasErradas = {};
      }
      
      const chaveErro = `pagina_${ordem}`;
      req.session.tentativasErradas[chaveErro] = (req.session.tentativasErradas[chaveErro] || 0) + 1;
      
      if (req.session.tentativasErradas[chaveErro] === 1) {
        // Primeira tentativa errada - volta para quiz com mensagem de erro
        res.locals.erroMsg = 'Você errou! Tente novamente.';
        return res.redirect(`/quiz/${ordem}?erro=1`);
      } else {
        // Segunda tentativa errada - volta para o início
        req.session.tentativasErradas[chaveErro] = 0; // Reset
        return res.redirect('/inicio');
      }
    }

  } catch (error) {
    console.error('Erro ao processar resposta:', error);
    res.status(500).send('Erro ao processar resposta');
  }
}

export default {
  renderQuiz,
  submitResposta
};