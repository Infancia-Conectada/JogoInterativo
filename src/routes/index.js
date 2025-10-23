const express = require('express');
const router = express.Router();


router.get('/dashboard', function (req, res) {
    res.render('dashboard');
})
router.get('/monitor', (req, res) => {
  // Renderiza o arquivo src/views/monitor.ejs
  res.render('monitor');
});

router.get('/homejogo', (req, res) => {
  // Renderiza o arquivo src/views/homejogo.ejs
  res.render('homejogo');
});

router.get('/quizgabinete', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('quizgabinete');
});

router.get('/nome', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('nome');
});

router.get('/parabens1', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('parabens1');
});

router.get('/parabens2', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('parabens2');
});

router.get('/gerarCertificado', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('gerarCertificado');
});

router.get('/Certificado', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('Certificado');
})

router.get('/introducao', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('introducao');
})

router.get('/introMonitor', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('introMonitor');
})

router.get('/quizMonitor', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('quizMonitor');
})

router.get('/tecladomouse', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('tecladomouse');
})


router.get('/introtecladomouse', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('introtecladomouse');
})


router.get('/introgabinete', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('introgabinete');
})

router.get('/gabinete', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('gabinete');
})

router.get('/quiztecladomouse', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('quiztecladomouse');
})

router.get('/introCriarPasta', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('introCriarPasta');
})

router.get('/quiztecladomouse', (req, res) => {
  // Renderiza o arquivo src/views/quizgabinete.ejs
  res.render('quiztecladomouse');
})

// Aqui você pode adicionar outras rotas no futuro:
// const userRoutes = require('./user');
// const adminRoutes = require('./admin');
// router.use('/user', userRoutes);
// router.use('/admin', adminRoutes);

module.exports = router;