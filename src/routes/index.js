import express from 'express';
import homeController from '../controllers/homeController.js';
import introRoutes from './introRoutes.js';
import explicacaoRoutes from './explicacaoRoutes.js';
import quizRoutes from './quizRoutes.js';
import parabensRoutes from './parabensRoutes.js';
import paginaRoutes from './paginaRoutes.js';

const router = express.Router();

// Rotas da home
router.get('/', homeController.renderInicio);
router.get('/inicio', homeController.renderInicio);
router.get('/introducao', homeController.renderIntroducao);
router.get('/iniciar', homeController.iniciarJogo);

// Rota genérica de página (navegação direta)
router.use('/pagina', paginaRoutes);

// Sub-rotas modulares
router.use('/intro', introRoutes);
router.use('/explicacao', explicacaoRoutes);
router.use('/quiz', quizRoutes);
router.use('/parabens', parabensRoutes);

export default router;