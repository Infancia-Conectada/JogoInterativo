const express = require('express');
const router = express.Router();

// Importar controllers
const QuizController = require('../controllers/quizController');

// ROTA PRINCIPAL - Página de início
router.get('/', (req, res) => {
  res.render('inicio');
});

router.get('/dashboard', function (req, res) {
    res.render('dashboard');
})
router.get('/inicio', (req, res) => {
  // Renderiza o arquivo src/views/inicio.ejs
  res.render('inicio');
});

router.get('/intro', (req, res) => {
  // Renderiza o arquivo src/views/intro.ejs
  res.render('intro');
});

router.get('/explicacao', (req, res) => {
  // Renderiza o arquivo src/views/explicacao.ejs
  res.render('explicacao');
});

router.get('/explicacao2', (req, res) => {
  // Renderiza o arquivo src/views/explicacao2.ejs
  res.render('explicacao2');
});

router.get('/quiz', QuizController.renderQuiz);

// API para verificar resposta
router.post('/api/quiz/verificar', QuizController.verificarResposta);

router.get('/parabens', (req, res) => {
  // Renderiza o arquivo src/views/parabens.ejs
  res.render('parabens');
});

router.get('/parabensFinal', (req, res) => {
  // Renderiza o arquivo src/views/parabensFinal.ejs
  res.render('parabensFinal');
});

router.get('/certificado', (req, res) => {
  // Renderiza o arquivo src/views/certificado.ejs
  res.render('certificado');
});

router.get('/introducao', (req, res) => {
  // Renderiza o arquivo src/views/introducao.ejs
  res.render('introducao');
});

// Aqui você pode adicionar outras rotas no futuro:
// const userRoutes = require('./user');
// const adminRoutes = require('./admin');
// router.use('/user', userRoutes);
// router.use('/admin', adminRoutes);

module.exports = router;