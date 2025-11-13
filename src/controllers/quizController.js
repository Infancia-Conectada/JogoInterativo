import { getPerguntasPorNivel, getPerguntaPorId } from '../models/perguntasModel.js';
import { getRespostasPorPergunta, getRespostaPorId } from '../models/respostasModel.js';
import { incrementNivelProgress, resetNivelProgress } from '../middleware/sessionProgress.js';

/**
 * GET /quiz/:posicao
 * Exibe uma pergunta específica do nível 1
 */
export async function renderQuiz(req, res) {
  try {
    const posicao = parseInt(req.params.posicao);
    
    if (isNaN(posicao) || posicao < 1) {
      return res.redirect('/inicio');
    }

    // Nível fixo para este quiz
    const nivel = 1;
    const perguntas = await getPerguntasPorNivel(nivel);
    
    if (!perguntas || perguntas.length === 0) {
      console.log(`Nenhuma pergunta encontrada para o nível ${nivel}`);
      return res.redirect('/inicio');
    }

    // Encontra a pergunta pela posição
    const pergunta = perguntas.find(p => p.posicao === posicao);
    
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
      nivel,
      posicao,
      totalPerguntas: perguntas.length,
      temErro
    });

  } catch (error) {
    console.error('Erro ao renderizar quiz:', error);
    res.status(500).send('Erro ao carregar quiz');
  }
}

/**
 * POST /quiz/:posicao/submit
 * Valida a resposta do usuário
 */
export async function submitResposta(req, res) {
  try {
    const posicao = parseInt(req.params.posicao);
    const idResposta = parseInt(req.body.idResposta);

    if (isNaN(posicao) || isNaN(idResposta)) {
      return res.redirect('/inicio');
    }

    const nivel = 1;

    // Busca a resposta selecionada
    const respostaSelecionada = await getRespostaPorId(idResposta);
    
    if (!respostaSelecionada) {
      console.log('Resposta não encontrada');
      return res.redirect(`/quiz/${posicao}`);
    }

    // Busca todas as perguntas do nível
    const perguntas = await getPerguntasPorNivel(nivel);
    const perguntaAtual = perguntas.find(p => p.posicao === posicao);

    // Validação de segurança: resposta deve pertencer à pergunta atual
    if (respostaSelecionada.id_pergunta !== perguntaAtual.id) {
      console.log('Tentativa de envio de resposta inválida');
      return res.redirect(`/quiz/${posicao}`);
    }

    // Verifica se a resposta está correta
    if (respostaSelecionada.correta === 1 || respostaSelecionada.correta === true) {
      // RESPOSTA CORRETA
      
      // Incrementa o progresso do nível
      const acertosNoNivel = incrementNivelProgress(req, nivel);

      // Verifica se completou todas as perguntas do nível (3 perguntas)
      const totalPerguntas = 3; // Nível 1 tem 3 perguntas
      if (acertosNoNivel >= totalPerguntas) {
        // Reset do contador para este nível
        resetNivelProgress(req, nivel);
        
        // Redireciona para página de parabéns (sem parâmetro, mostra a view parabens.ejs)
        return res.render('parabens', { 
          nivel,
          mensagem: 'Parabéns! Você completou o nível 1!'
        });
      } else {
        // Avança para próxima pergunta
        const proximaPosicao = posicao + 1;
        return res.redirect(`/quiz/${proximaPosicao}`);
      }
      
    } else {
      // RESPOSTA INCORRETA
      
      // Verifica se é a primeira tentativa errada
      if (!req.session.tentativasErradas) {
        req.session.tentativasErradas = {};
      }
      
      const chaveErro = `pergunta_${posicao}`;
      req.session.tentativasErradas[chaveErro] = (req.session.tentativasErradas[chaveErro] || 0) + 1;
      
      if (req.session.tentativasErradas[chaveErro] === 1) {
        // Primeira tentativa errada - volta para quiz com mensagem de erro
        res.locals.erroMsg = 'Você errou! Tente novamente.';
        return res.redirect(`/quiz/${posicao}?erro=1`);
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