import { getPerguntasPorNivel, getPerguntaPorId } from '../models/perguntasModel.js';
import { getRespostasPorPergunta, getRespostaPorId } from '../models/respostasModel.js';
import { incrementNivelProgress, resetNivelProgress } from '../middleware/sessionProgress.js';

/**
 * GET /quiz/:ordem
 * Exibe a primeira pergunta do quiz correspondente à ordem da intro/explicação
 */
export async function renderQuiz(req, res) {
  try {
    const ordem = parseInt(req.params.ordem);
    
    if (isNaN(ordem) || ordem < 1) {
      return res.redirect('/inicio');
    }

    // Busca todas as perguntas do nível 1 (assumindo que o quiz está no nível 1)
    const nivel = 1;
    const perguntas = await getPerguntasPorNivel(nivel);
    
    if (!perguntas || perguntas.length === 0) {
      console.log(`Nenhuma pergunta encontrada para o nível ${nivel}`);
      return res.redirect('/inicio');
    }

    // Usa a ordem para mapear à pergunta correspondente
    const indice = ordem - 1;
    if (indice >= perguntas.length) {
      return res.redirect('/inicio');
    }

    const pergunta = perguntas[indice];
    const total = perguntas.length;

    // Busca as respostas da pergunta (sem expor o campo 'correta')
    const respostas = await getRespostasPorPergunta(pergunta.id);

    res.render('quiz', {
      pergunta,
      respostas,
      nivel,
      ordem,
      indice,
      total
    });

  } catch (error) {
    console.error('Erro ao renderizar quiz:', error);
    res.status(500).send('Erro ao carregar quiz');
  }
}

/**
 * POST /quiz/:ordem/submit
 * Valida a resposta do usuário e aplica regras do jogo
 */
export async function submitResposta(req, res) {
  try {
    const ordem = parseInt(req.params.ordem);
    const idResposta = parseInt(req.body.idResposta);

    if (isNaN(ordem) || isNaN(idResposta)) {
      return res.redirect('/inicio');
    }

    const nivel = 1;
    const indice = ordem - 1;

    // Busca a resposta selecionada com o campo 'correta'
    const respostaSelecionada = await getRespostaPorId(idResposta);
    
    if (!respostaSelecionada) {
      console.log('Resposta não encontrada');
      return res.redirect(`/quiz/${ordem}`);
    }

    // Busca todas as perguntas do nível para obter total
    const perguntas = await getPerguntasPorNivel(nivel);
    const total = perguntas.length;
    const perguntaAtual = perguntas[indice];

    // Validação de segurança: resposta deve pertencer à pergunta atual
    if (respostaSelecionada.id_pergunta !== perguntaAtual.id) {
      console.log('Tentativa de envio de resposta inválida');
      return res.redirect(`/quiz/${ordem}`);
    }

    // Verifica se a resposta está correta
    if (respostaSelecionada.correta === 1 || respostaSelecionada.correta === true) {
      // RESPOSTA CORRETA
      
      // Incrementa o progresso do nível
      const acertosNoNivel = incrementNivelProgress(req, nivel);

      // Verifica se completou todas as perguntas do nível
      if (acertosNoNivel >= total) {
        // Reset do contador para este nível
        resetNivelProgress(req, nivel);
        
        // Redireciona para página de parabéns
        return res.redirect(`/parabens?ordem=${ordem}`);
      } else {
        // Avança para próxima pergunta
        return res.redirect(`/quiz/${ordem + 1}`);
      }
      
    } else {
      // RESPOSTA INCORRETA
      
      // Redireciona para a explicação correspondente usando a ordem
      // A ordem mapeia qual explicação mostrar (1, 2, 3, etc)
      const tipoExplicacao = ordem <= 3 ? '1' : '2';
      
      // Não decrementa o progresso, apenas redireciona para explicação
      return res.redirect(`/explicacao/${ordem}/${tipoExplicacao}`);
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