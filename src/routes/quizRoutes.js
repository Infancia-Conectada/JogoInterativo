import express from 'express';
import { renderQuiz, submitResposta } from '../controllers/quizController.js';

const router = express.Router();

// Rota GET para exibir pergunta do quiz
// Ex: /quiz/1, /quiz/2, /quiz/3 (correspondente à ordem da intro/explicação)
router.get('/:ordem', renderQuiz);

// Rota POST para submeter resposta
router.post('/:ordem/submit', submitResposta);

export default router;