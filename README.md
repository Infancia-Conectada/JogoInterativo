# Jogo Interativo - Quiz Educativo sobre Tecnologia

Jogo interativo educativo desenvolvido com Node.js, Express, EJS e MySQL, projetado para ensinar conceitos básicos de tecnologia de forma lúdica e engajante. O jogo apresenta progressão em 3 níveis com 27 páginas de conteúdo, quizzes interativos e animações visuais.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **EJS** - Template engine
- **MySQL** - Banco de dados relacional
- **CSS3** - Estilização moderna com animações
- **JavaScript (Vanilla)** - Interatividade frontend
- **Canvas API** - Efeitos de partículas (confete)
- **Nodemon** - Development tool para hot reload
- **Express-session** - Gerenciamento de sessão do usuário

## 📁 Estrutura do Projeto

```
JogoInterativo/
├── app.js                           # Servidor principal
├── package.json                     # Dependências e scripts
├── README.md                        # Documentação
├── database.db                      # Banco de dados (SQLite/MySQL)
├── scripts/                         # Scripts SQL
│   ├── script.sql                   # Schema inicial
│   └── script_novo.sql              # Schema atualizado
└── src/                             # Código fonte da aplicação
    ├── config/
    │   └── database.js              # Configuração de conexão MySQL
    ├── controllers/                 # Lógica de controle
    │   ├── homeController.js        # Controller da página inicial
    │   ├── introController.js       # Controller da introdução
    │   ├── explicacaoController.js  # Controller das explicações (27 páginas)
    │   ├── quizController.js        # Controller dos quizzes (9 quizzes)
    │   └── parabensController.js    # Controller das páginas de celebração
    ├── models/                      # Modelos de dados
    │   ├── paginasModel.js          # Modelo de páginas
    │   ├── conteudoIntroModel.js    # Modelo de conteúdo intro
    │   ├── perguntasModel.js        # Modelo de perguntas
    │   ├── respostasModel.js        # Modelo de respostas
    │   └── respostasQuizModel.js    # Modelo de respostas de quizzes
    ├── middleware/
    │   └── sessionProgress.js       # Gerenciamento de progresso
    ├── routes/                      # Definições de rotas
    │   ├── index.js                 # Centralizador de rotas
    │   ├── introRoutes.js           # Rotas da introdução
    │   ├── paginaRoutes.js          # Rotas das páginas
    │   ├── explicacaoRoutes.js      # Rotas das explicações
    │   ├── quizRoutes.js            # Rotas dos quizzes
    │   └── parabensRoutes.js        # Rotas das celebrações
    ├── views/                       # Templates EJS
    │   ├── inicio.ejs               # Tela inicial do jogo
    │   ├── introducao.ejs           # Página de introdução
    │   ├── intro.ejs                # Intro com animação
    │   ├── explicacao.ejs           # Explicações (páginas 1-10, layout invertido)
    │   ├── explicacao2.ejs          # Explicações alternativas
    │   ├── explicacao3.ejs          # Explicações (páginas 11+, layout normal)
    │   ├── quiz.ejs                 # Template de quiz com validação
    │   ├── parabens.ejs             # Celebração nível 1
    │   ├── parabens2.ejs            # Celebração nível 2
    │   ├── parabensFinal.ejs        # Celebração final + certificado
    │   ├── certificado.ejs          # Página de certificado
    │   ├── 404.ejs                  # Página de erro 404
    │   └── debug-imagens.html       # Debug de imagens
    └── public/                      # Arquivos estáticos
        ├── css/
        │   ├── style.css            # Estilos gerais
        │   ├── explicacao.css       # Estilos das explicações
        │   ├── quiz.css             # Estilos do quiz com animações
        │   ├── parabens.css         # Estilos das celebrações
        │   ├── progresso.css        # Barra de progresso (1-100%)
        │   ├── confetes.css         # Animações de confete
        │   ├── foguetes.css         # Animações de foguetes
        │   ├── certificado.css      # Estilos do certificado
        │   └── [outros estilos]
        ├── js/
        │   ├── homejogo.js          # Scripts da página inicial
        │   ├── introducao.js        # Scripts da introdução
        │   └── explicacao.js        # Scripts das explicações
        └── img/                     # Imagens e mídias
```

## 🏗️ Arquitetura MVC

### Model
- **paginasModel.js**: Gerencia todas as 27 páginas de conteúdo
- **respostasQuizModel.js**: Gerencia as 36 respostas dos 9 quizzes
- **conteudoIntroModel.js**: Gerencia conteúdo de introdução
- Integração completa com banco MySQL

### View
- **27 páginas de explicação**: Conteúdo progressivo com imagens/vídeos
- **9 quizzes interativos**: Com validação em tempo real
- **3 páginas de celebração**: Com efeitos visuais e confete
- **Layout responsivo**: Adapta-se a diferentes tamanhos de tela

### Controller
- **quizController.js**: Valida respostas via JSON, renderiza corretamente/incorretamente
- **explicacaoController.js**: Renderiza páginas baseado em ordem (1-27)
- **sessionProgress.js**: Rastreia progresso do usuário nos 3 níveis

## 🎮 Estrutura do Jogo

### Progressão
- **Nível 1**: Páginas 1-9 (Explicações) → Quiz 7, 8, 9
- **Nível 2**: Páginas 10-18 (Explicações) → Quiz 16, 17, 18
- **Nível 3**: Páginas 19-27 (Explicações) → Quiz 25, 26, 27

### Fluxo de Navegação
1. **Início** (`/inicio`) - Botão para começar
2. **Introdução** (`/introducao`) - Contextualiza o jogo
3. **Páginas de Explicação** (`/pagina/1` até `/pagina/27`) - Ensino de conceitos
4. **Quizzes** (`/quiz/7`, `/quiz/8`, `/quiz/9`, etc) - Avaliação
5. **Celebrações** (`/parabens`, `/parabens2`, `/parabensFinal`) - Progressão

### Páginas

#### Explicações (27 páginas)
- **1-10**: Layout invertido (imagem esquerda, texto direita)
- **11-27**: Layout normal (texto esquerda, imagem direita)
- Cada página com barra de progresso (1-100%)
- Suporte a imagens e vídeos

#### Quizzes (9 quizzes)
- Quiz após cada 3 páginas de explicação
- Validação em tempo real via JSON
- Tick de acerto centralizado + confete animado
- Tremor de tela ao errar
- Máximo 2 tentativas por pergunta
- Embaralhamento de respostas

### Animações e Efeitos
- ✅ **Barra de progresso**: Mostra 1-100% da conclusão
- ✅ **Confete**: 50 partículas animadas ao acertar
- ✅ **Tick verde**: Marca centralizada de acerto
- ✅ **Glow effect**: Animação de brilho em respostas corretas
- ✅ **Tremor de tela**: Feedback visual de erro
- ✅ **Confete nas celebrações**: Loop contínuo nas páginas finais

## 🚦 Como Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Banco de Dados
- MySQL deve estar instalado e rodando
- Executar script em `scripts/script_novo.sql` para criar tabelas
- Variáveis de ambiente devem estar configuradas em `.env`

### 3. Executar em Desenvolvimento
```bash
npm run dev
```

### 4. Acessar a Aplicação
Abra o navegador e acesse: `http://localhost:3000`

## 📋 Scripts Disponíveis

- `npm run dev`: Executa com nodemon (hot reload)
- `npm start`: Executa em produção

## 📦 Dependências

### Produção
- `express`: Framework web para Node.js
- `ejs`: Template engine
- `mysql2`: Driver MySQL com suporte a promises
- `express-session`: Gerenciamento de sessão
- `dotenv`: Variáveis de ambiente

### Desenvolvimento
- `nodemon`: Reinicialização automática do servidor

## 🎨 Recursos Implementados

### Frontend
- ✅ Barra de progresso dinâmica (1-100%)
- ✅ Validação de quiz em tempo real
- ✅ Animações de acerto/erro
- ✅ Efeitos de confete com Canvas API
- ✅ Layout responsivo
- ✅ Modal fullscreen para imagens (Quiz 16)
- ✅ Menu navegável entre páginas

### Backend
- ✅ Servidor Express configurado
- ✅ Banco de dados MySQL integrado
- ✅ Gerenciamento de sessão e progresso
- ✅ Validação de respostas com segurança
- ✅ Rastreamento de tentativas erradas
- ✅ Tratamento de erros robusto

### Estrutura
- ✅ Padrão MVC implementado
- ✅ Separação de responsabilidades
- ✅ Código limpo e documentado
- ✅ Estrutura escalável para 27 páginas

## 📊 Banco de Dados

### Tabelas Principais
- **paginas**: Armazena as 27 páginas (1-27) com conteúdo, tipo e ordem
- **respostas_quiz**: Armazena as 36 respostas dos 9 quizzes com flag de correção
- **conteudo_intro**: Conteúdo de introdução do jogo

### Validação
- Respostas corretas marcadas com `correta = 1`
- Validação dupla: frontend + backend
- Tentativas limitadas a 2 por pergunta

## 🚀 Possíveis Expansões

1. **Certificado Digital**: PDF com dados do aluno
2. **Leaderboard**: Rankings de pontuação
3. **Estatísticas**: Gráficos de desempenho
4. **Mais Quizzes**: Expandir para 4+ níveis
5. **Admin Panel**: Painel para gerenciar conteúdo
6. **API REST**: Endpoints para integração externa
7. **Testes Automatizados**: Suíte de testes

## 👨‍💻 Desenvolvimento

Para modificar o projeto:

1. **Novo Conteúdo**: Adicione em `scripts/script_novo.sql` e atualize o banco
2. **Layout**: Modifique `src/views/explicacao.ejs` ou `explicacao3.ejs`
3. **Estilos**: Altere arquivos em `src/public/css/`
4. **Animações**: Edite `quiz.css`, `confetes.css`, etc
5. **Lógica**: Modifique controllers em `src/controllers/`
6. **Novos Quizzes**: Adicione em `src/views/quiz.ejs` e banco

## 📋 Fluxo de Validação de Respostas

1. Frontend envia JSON com `idResposta`
2. Backend valida via rota `/quiz/:ordem/validar`
3. Busca resposta no banco e verifica `correta = 1`
4. Retorna `{ correto: true/false }`
5. Frontend mostra animação apenas se correto
6. Confete + Tick só aparecem em respostas corretas

## 👥 Criadores do Projeto

- **Ana Carolina Oliveira dos Santos**
- **Gisele de Campos Martins**
- **Igor Ferreira da Silva**
- **Lucas César Willian Basso**
- **Rhuan Marcel Vieira da Silva**

**Desenvolvido com ❤️ para Infância Conectada.**
