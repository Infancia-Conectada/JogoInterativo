import * as paginasModel from '../models/paginasModel.js';
import * as respostasQuizModel from '../models/respostasQuizModel.js';
import { incrementNivelProgress, resetNivelProgress } from '../middleware/sessionProgress.js';

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
    const respostas = await respostasQuizModel.getRespostasQuizPorPaginaSemCorreta(pagina.id);

    // Verifica se há erro na query string
    const temErro = req.query.erro === '1';

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
    if (respostaSelecionada.correta === 1 || respostaSelecionada.correta === true) {
      // RESPOSTA CORRETA
      
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
        } else {
          // Vai para a página de parabéns do nível
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