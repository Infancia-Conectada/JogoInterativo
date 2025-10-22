const express = require('express');
const router = express.Router();

// Importar rotas específicas
const homeRoutes = require('./home');

// Usar as rotas
router.use('/', homeRoutes);

router.get('/pasta', function (req, res) {
    res.render('pasta');
})

// Aqui você pode adicionar outras rotas no futuro:
// const userRoutes = require('./user');
// const adminRoutes = require('./admin');
// router.use('/user', userRoutes);
// router.use('/admin', adminRoutes);

module.exports = router;