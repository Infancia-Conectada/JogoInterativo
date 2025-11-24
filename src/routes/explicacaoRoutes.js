import express from 'express';
import { renderExplicacao } from '../controllers/explicacaoController.js';

const router = express.Router();

// Rota para exibir explicação específica pela ordem
// Ex: /explicacao/2 (ordem 2, tipo determinado automaticamente no BD)
// Suporta também o antigo padrão /explicacao/:ordem/:tipo para compatibilidade
router.get('/:ordem', renderExplicacao);
router.get('/:ordem/:tipo', renderExplicacao);

export default router;