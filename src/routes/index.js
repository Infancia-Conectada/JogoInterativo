const express = require('express');
const router = express.Router();


router.get('/dashboard', function (req, res) {
    res.render('dashboard');
})
router.get('/inicio', (req, res) => {
  // Renderiza o arquivo src/views/inicio.ejs
  res.render('inicio');
});

router.get('/intro', (req, res) => {
  // Renderiza o arquivo src/views/homejogo.ejs
  res.render('intro');
});

router.get('/explicacao', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('explicacao');
});

router.get('/explicacao2', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('explicacao2');
});

router.get('/quiz', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('quiz');
});

router.get('/parabens', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('parabens');
});

router.get('/parabensFinal', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('parabensFinal');
});

router.get('/certificado', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('certificado');
});

router.get('/introducao', (req, res) => {
  // Renderiza o arquivo src/views/homejogo.ejs
  res.render('introducao');
});

// Aqui você pode adicionar outras rotas no futuro:
// const userRoutes = require('./user');
// const adminRoutes = require('./admin');
// router.use('/user', userRoutes);
// router.use('/admin', adminRoutes);

module.exports = router;