import express from 'express';
import { renderParabens, avancarNivel, renderCertificado } from '../controllers/parabensController.js';

const router = express.Router();

// Rota para página de parabéns
router.get('/', renderParabens);

// Rota para avançar para próximo nível
router.get('/avancar/:nivel', avancarNivel);

// Rota para certificado final
router.get('/certificado', renderCertificado);

export default router;