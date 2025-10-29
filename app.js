// Carregar variáveis de ambiente
require('dotenv').config();

const express = require('express');
const path = require('path');

// Importar rotas
const routes = require('./src/routes'); // usa o router que inclui /homejogo

// Importar configuração do banco de dados
const database = require('./src/config/database');

const app = express();

// Configuração do EJS como template engine (para páginas que usam EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middleware para arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'src/public')));

// Middleware para parsing de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Usar as rotas
app.use('/', routes);

// Middleware para tratamento de erro 404
app.use((req, res) => {
    res.status(404).render('404', { 
        title: 'Página não encontrada',
        message: 'A página que você está procurando não existe.'
    });
});

// Inicializar servidor
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, async () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`🌐 Acesse: http://localhost:${PORT}`);
    
    // Testar conexão com banco de dados
    await database.testConnection();
});

module.exports = app;
