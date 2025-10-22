const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Rota principal - Landing Page
router.get('/', homeController.index);

// Rota para página sobre (preparada para futuro)
router.get('/about', homeController.about);

// Rota para página de serviços (preparada para futuro)
router.get('/services', homeController.services);

// Rota para processar formulário de contato
router.post('/contact', homeController.contact);

router.get('/monitor', (req, res) => {
  // Renderiza o arquivo src/views/monitor.ejs
  res.render('monitor');
});

router.get('/quizmonitor', (req, res) => {
  // Renderiza o arquivo src/views/monitor.ejs
  res.render('quizmonitor');
});

router.get('/quizpasta', (req, res) => {
  // Renderiza o arquivo src/views/monitor.ejs
  res.render('quizpasta');
});



router.get('/explicacaopasta', (req, res) => {
  // Renderiza o arquivo src/views/monitor.ejs
  res.render('explicacaopasta');
});

module.exports = router;