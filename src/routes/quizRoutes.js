import express from 'express';
import { renderQuiz, submitResposta } from '../controllers/quizController.js';

const router = express.Router();

// Rota GET para exibir pergunta do quiz
// Ex: /quiz/1, /quiz/2, /quiz/3 (pela posição da pergunta)
router.get('/:posicao', renderQuiz);

// Rota POST para submeter resposta
router.post('/:posicao/submit', submitResposta);

export default router;