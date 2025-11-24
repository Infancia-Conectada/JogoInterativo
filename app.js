// Carregar variáveis de ambiente
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';

// Importar rotas e banco de dados
import routes from './src/routes/index.js';
import pool, { testConnection } from './src/config/database.js';
import { initializeSessionProgress } from './src/middleware/sessionProgress.js';

// Corrigir __dirname e __filename (não existem em ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Configuração do EJS como template engine (para páginas que usam EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Desabilitar cache de views em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  app.set('view cache', false);
}

// Middleware para arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'src/public')));

// Middleware para parsing de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração de sessão
app.use(session({
  secret: process.env.SESSION_SECRET || 'seu-segredo-super-secreto',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 horas
}));

// Middleware para inicializar progresso da sessão
app.use(initializeSessionProgress);

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
  await testConnection();
});
