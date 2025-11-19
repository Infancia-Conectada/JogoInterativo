import { getPerguntasPorNivel, getPerguntaPorId } from '../models/perguntasModel.js';
import { getRespostasPorPergunta, getRespostaPorId } from '../models/respostasModel.js';
import { incrementNivelProgress, resetNivelProgress } from '../middleware/sessionProgress.js';

/**
 * GET /quiz/:ordem
 * Exibe uma pergunta específica pela ordem
 */
export async function renderQuiz(req, res) {
  try {
    const ordem = parseInt(req.params.ordem);
    
    if (isNaN(ordem) || ordem < 1) {
      return res.redirect('/inicio');
    }

    // Busca a pergunta pela ordem
    // A ordem corresponde diretamente ao número da pergunta (1, 2, 3, 4, 5, 6, 7, 8, 9)
    const pergunta = await getPerguntaPorId(ordem);
    
    if (!pergunta) {
      return res.status(404).render('404', { 
        title: 'Página não encontrada',
        message: 'Esta pergunta não existe.'
      });
    }

    // Busca as respostas da pergunta (sem expor o campo 'correta')
    const respostas = await getRespostasPorPergunta(pergunta.id);

    // Verifica se há erro na query string
    const temErro = req.query.erro === '1';

    res.render('quiz', {
      pergunta,
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

    if (isNaN(ordem) || isNaN(idResposta)) {
      return res.redirect('/inicio');
    }

    // Busca a resposta selecionada
    const respostaSelecionada = await getRespostaPorId(idResposta);
    
    if (!respostaSelecionada) {
      console.log('Resposta não encontrada');
      return res.redirect(`/quiz/${ordem}`);
    }

    // Busca a pergunta
    const perguntaAtual = await getPerguntaPorId(ordem);

    // Validação de segurança: resposta deve pertencer à pergunta atual
    if (respostaSelecionada.id_pergunta !== perguntaAtual.id) {
      console.log('Tentativa de envio de resposta inválida');
      return res.redirect(`/quiz/${ordem}`);
    }

    // Verifica se a resposta está correta
    if (respostaSelecionada.correta === 1 || respostaSelecionada.correta === true) {
      // RESPOSTA CORRETA
      
      // Incrementa o progresso
      incrementNivelProgress(req, 1);

      // Verifica se é a última pergunta (ordem 3, 6 ou 9)
      const ehUltimaDoNivel = ordem % 3 === 0;
      
      if (ehUltimaDoNivel) {
        // Completou um nível
        resetNivelProgress(req, 1);
        
        // Determina qual é o próximo nível
        const nivelAtual = Math.ceil(ordem / 3);
        
        if (nivelAtual >= 3) {
          // Completou todos os 3 níveis - vai para certificado
          return res.render('parabens', { 
            nivel: nivelAtual,
            mensagem: 'Parabéns! Você completou todos os níveis!'
          });
        } else {
          // Vai para o próximo nível
          return res.render('parabens', { 
            nivel: nivelAtual,
            mensagem: `Parabéns! Você completou o nível ${nivelAtual}!`
          });
        }
      } else {
        // Avança para próxima pergunta
        const proximaOrdem = ordem + 1;
        return res.redirect(`/quiz/${proximaOrdem}`);
      }
      
    } else {
      // RESPOSTA INCORRETA
      
      // Verifica se é a primeira tentativa errada
      if (!req.session.tentativasErradas) {
        req.session.tentativasErradas = {};
      }
      
      const chaveErro = `pergunta_${ordem}`;
      req.session.tentativasErradas[chaveErro] = (req.session.tentativasErradas[chaveErro] || 0) + 1;
      
      if (req.session.tentativasErradas[chaveErro] === 1) {
        // Primeira tentativa errada - volta para quiz com mensagem de erro
        res.locals.erroMsg = 'Você errou! Tente novamente.';
        return res.redirect(`/quiz/${ordem}?erro=1`);
      } else {
        // Segunda tentativa errada - volta para início
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