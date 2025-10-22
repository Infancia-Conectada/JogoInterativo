const express = require('express');
const router = express.Router();



// Importar rotas específicas
const homeRoutes = require('./home');


// Usar as rotas
router.use('/', homeRoutes);
 
router.get('/dashboard', function (req, res) {
    res.render('dashboard');
})

router.get('/quizpasta', function (req, res) {
    res.render('quizpasta');
})

router.get('/aulatexto', function (req, res) {
    res.render('aulatexto');
})

router.get('/teclasaula', function (req, res) {
    res.render('teclasaula');
})
// Aqui você pode adicionar outras rotas no futuro:
// const userRoutes = require('./user');
// const adminRoutes = require('./admin');
// router.use('/user', userRoutes);
// router.use('/admin', adminRoutes);

module.exports = router;