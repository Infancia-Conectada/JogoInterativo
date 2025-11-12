import express from 'express';
import { renderExplicacao } from '../controllers/explicacaoController.js';

const router = express.Router();

// Rota para exibir explicação específica
// Ex: /explicacao/1/1 (ordem 1, tipo 1)
// Ex: /explicacao/1/2 (ordem 1, tipo 2)
router.get('/:ordem/:tipo', renderExplicacao);

export default router;