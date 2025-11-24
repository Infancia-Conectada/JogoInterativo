-- ===========================================
-- NOVO BANCO DE DADOS REORGANIZADO
-- ESTRUTURA: 27 PÁGINAS (9 POR NÍVEL)
-- Sequência: INTRO → EXPLICAÇÃO → INTRO → EXPLICAÇÃO → INTRO → EXPLICAÇÃO → QUIZ×3
-- ===========================================

-- ===========================================
-- TABELA DE PÁGINAS (NOVA ESTRUTURA)
-- ===========================================

CREATE TABLE `paginas` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `ordem` INT NOT NULL UNIQUE,
  `titulo` VARCHAR(255) NOT NULL,
  `texto` LONGTEXT,
  `imagem` VARCHAR(255),
  `tipo` ENUM('intro', 'explicacao_1', 'explicacao_2', 'quiz') NOT NULL,
  `nivel` INT NOT NULL,
  `ativo` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_ordem (ordem),
  INDEX idx_nivel (nivel),
  INDEX idx_tipo (tipo),
  INDEX idx_ativo (ativo)
);

-- ===========================================
-- NÍVEL 1 (PÁGINAS 1-9)
-- ===========================================

-- PÁGINA 1 - INTRO 1
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(1, 'O QUE É O MONITOR?', 
'UM MONITOR É A TELA DO COMPUTADOR. É NELE QUE A GENTE VÊ TUDO O QUE ESTÁ ACONTECENDO, COMO OS DESENHOS, OS JOGOS E OS TEXTOS. ELE MOSTRA AS IMAGENS QUE O COMPUTADOR ESTÁ FAZENDO, COMO UMA TELEVISÃO QUE MOSTRA O QUE ESTÁ PASSANDO.',
'intro', 1);

-- PÁGINA 2 - EXPLICAÇÃO 1
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(2, 'O QUE É O MONITOR?',
'UM MONITOR É A TELA DO COMPUTADOR. É NELE QUE A GENTE VÊ TUDO O QUE ESTÁ ACONTECENDO, COMO OS DESENHOS, OS JOGOS E OS TEXTOS. ELE MOSTRA AS IMAGENS QUE O COMPUTADOR ESTÁ FAZENDO, COMO UMA TELEVISÃO QUE MOSTRA O QUE ESTÁ PASSANDO.',
'explicacao_1', 1);

-- PÁGINA 3 - INTRO 2
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(3, 'O QUE É O TECLADO E O MOUSE?',
'O TECLADO E O MOUSE SÃO COMO FERRAMENTAS MÁGICAS QUE AJUDAM VOCÊ A CONVERSAR COM O COMPUTADOR! O TECLADO É COMO UMA MÁQUINA DE ESCREVER QUE AJUDA VOCÊ A DIGITAR E CONTROLAR O COMPUTADOR! O MOUSE É COMO UMA VARINHA MÁGICA! VOCÊ O MOVE COM A MÃO E ELE FAZ O PONTEIRO SE MEXER NA TELA. COM ELE, VOCÊ PODE CLICAR, ARRASTAR E BRINCAR COM O COMPUTADOR!',
'intro', 1);

-- PÁGINA 4 - EXPLICAÇÃO 2
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(4, 'O QUE É O TECLADO E O MOUSE?',
'O TECLADO E O MOUSE SÃO COMO FERRAMENTAS MÁGICAS QUE AJUDAM VOCÊ A CONVERSAR COM O COMPUTADOR! O TECLADO É COMO UMA MÁQUINA DE ESCREVER QUE AJUDA VOCÊ A DIGITAR E CONTROLAR O COMPUTADOR! O MOUSE É COMO UMA VARINHA MÁGICA! VOCÊ O MOVE COM A MÃO E ELE FAZ O PONTEIRO SE MEXER NA TELA. COM ELE, VOCÊ PODE CLICAR, ARRASTAR E BRINCAR COM O COMPUTADOR!',
'explicacao_1', 1);

-- PÁGINA 5 - INTRO 3
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(5, 'O QUE É O GABINETE?',
'MUITAS PESSOAS CHAMAM O GABINETE DE "CPU", MAS NA VERDADE A CPU É APENAS O PROCESSADOR, QUE FICA DENTRO DELE. O GABINETE PROTEGE OS COMPONENTES, ORGANIZA AS CONEXÕES E PERMITE QUE VOCÊ LIGUE CABOS DE ENERGIA, MONITOR, TECLADO, MOUSE E INTERNET. O GABINETE É A "CAIXA" DO COMPUTADOR. DENTRO DELE FICAM AS PRINCIPAIS PEÇAS: PLACA-MÃE, PROCESSADOR (CPU), MEMÓRIA RAM, HD/SSD E A FONTE DE ENERGIA.',
'intro', 1);

-- PÁGINA 6 - EXPLICAÇÃO 3
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(6, 'O QUE É O GABINETE?',
'MUITAS PESSOAS CHAMAM O GABINETE DE "CPU", MAS NA VERDADE A CPU É APENAS O PROCESSADOR, QUE FICA DENTRO DELE. O GABINETE PROTEGE OS COMPONENTES, ORGANIZA AS CONEXÕES E PERMITE QUE VOCÊ LIGUE CABOS DE ENERGIA, MONITOR, TECLADO, MOUSE E INTERNET. O GABINETE É A "CAIXA" DO COMPUTADOR. DENTRO DELE FICAM AS PRINCIPAIS PEÇAS: PLACA-MÃE, PROCESSADOR (CPU), MEMÓRIA RAM, HD/SSD E A FONTE DE ENERGIA.',
'explicacao_1', 1);

-- PÁGINA 7 - QUIZ 1
INSERT INTO paginas (ordem, titulo, tipo, nivel) VALUES
(7, 'QUAL DESSES É O MONITOR?', 'quiz', 1);

-- PÁGINA 8 - QUIZ 2
INSERT INTO paginas (ordem, titulo, tipo, nivel) VALUES
(8, 'QUAL DESSES É O TECLADO E O MOUSE?', 'quiz', 1);

-- PÁGINA 9 - QUIZ 3
INSERT INTO paginas (ordem, titulo, tipo, nivel) VALUES
(9, 'QUAL DESSES É O GABINETE?', 'quiz', 1);

-- ===========================================
-- NÍVEL 2 (PÁGINAS 10-18)
-- ===========================================

-- PÁGINA 10 - INTRO 4
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(10, 'COMO CRIAR UM TEXTO NO COMPUTADOR?',
'1 - CLIQUE COM O BOTÃO DIREITO DO MOUSE EM UMA ÁREA VAZIA\n2 - PROCURE POR "NOVO" NO MENU\n3 - CLIQUE EM "DOCUMENTO DE TEXTO" E DIGITE O NOME\n4 - PRESSIONE ENTER PARA CONFIRMAR\n5 - CLIQUE DUAS VEZES NO ARQUIVO PARA ABRIR',
'intro', 2);

-- PÁGINA 11 - EXPLICAÇÃO 4
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(11, 'COMO CRIAR UM TEXTO NO COMPUTADOR?',
'1 - CLIQUE COM O BOTÃO DIREITO DO MOUSE EM UMA ÁREA VAZIA\n2 - PROCURE POR "NOVO" NO MENU\n3 - CLIQUE EM "DOCUMENTO DE TEXTO" E DIGITE O NOME\n4 - PRESSIONE ENTER PARA CONFIRMAR\n5 - CLIQUE DUAS VEZES NO ARQUIVO PARA ABRIR',
'explicacao_2', 2);

-- PÁGINA 12 - INTRO 5
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(12, 'COMO CRIAR UMA PASTA NO COMPUTADOR?',
'1 - CLIQUE COM O BOTÃO DIREITO DO MOUSE EM UMA ÁREA VAZIA\n2 - PROCURE POR "NOVO" NO MENU\n3 - CLIQUE EM "PASTA" E DIGITE O NOME\n4 - PRESSIONE ENTER PARA CONFIRMAR\n5 - CLIQUE DUAS VEZES NA PASTA PARA ENTRAR NELA',
'intro', 2);

-- PÁGINA 13 - EXPLICAÇÃO 5
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(13, 'COMO CRIAR UMA PASTA NO COMPUTADOR?',
'1 - CLIQUE COM O BOTÃO DIREITO DO MOUSE EM UMA ÁREA VAZIA\n2 - PROCURE POR "NOVO" NO MENU\n3 - CLIQUE EM "PASTA" E DIGITE O NOME\n4 - PRESSIONE ENTER PARA CONFIRMAR\n5 - CLIQUE DUAS VEZES NA PASTA PARA ENTRAR NELA',
'explicacao_2', 2);

-- PÁGINA 14 - INTRO 6
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(14, 'O QUE ALGUMAS TECLAS FAZEM?',
'1 - A TECLA DELETE SERVE PARA APAGAR COISAS. ELA APAGA A LETRA, O NÚMERO OU O ARQUIVO QUE VOCÊ ESCOLHEU. É COMO UMA BORRACHA DO COMPUTADOR!\n2 - A TECLA NUM LOCK LIGA OU DESLIGA OS NÚMEROS DO TECLADO QUE FICAM DO LADO DIREITO.\n3 - O TECLADO COMEÇA A DIGITAR TUDO EM LETRAS MAIÚSCULAS ATÉ VOCÊ DESLIGAR ESSA TECLA.\n4 - A TECLA WINKEY (QUE TEM O DESENHO DO WINDOWS) ABRE O MENU INICIAL DO COMPUTADOR.',
'intro', 2);

-- PÁGINA 15 - EXPLICAÇÃO 6
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(15, 'O QUE ALGUMAS TECLAS FAZEM?',
'1 - A TECLA DELETE SERVE PARA APAGAR COISAS. ELA APAGA A LETRA, O NÚMERO OU O ARQUIVO QUE VOCÊ ESCOLHEU. É COMO UMA BORRACHA DO COMPUTADOR!\n2 - A TECLA NUM LOCK LIGA OU DESLIGA OS NÚMEROS DO TECLADO QUE FICAM DO LADO DIREITO.\n3 - O TECLADO COMEÇA A DIGITAR TUDO EM LETRAS MAIÚSCULAS ATÉ VOCÊ DESLIGAR ESSA TECLA.\n4 - A TECLA WINKEY (QUE TEM O DESENHO DO WINDOWS) ABRE O MENU INICIAL DO COMPUTADOR.',
'explicacao_2', 2);

-- PÁGINA 16 - QUIZ 4
INSERT INTO paginas (ordem, titulo, tipo, nivel) VALUES
(16, 'QUAL DESSES COMANDOS CRIA UMA PASTA?', 'quiz', 2);

-- PÁGINA 17 - QUIZ 5
INSERT INTO paginas (ordem, titulo, tipo, nivel) VALUES
(17, 'O QUE A TECLA CAPS LOCK FAZ?', 'quiz', 2);

-- PÁGINA 18 - QUIZ 6
INSERT INTO paginas (ordem, titulo, tipo, nivel) VALUES
(18, 'QUAL BOTÃO DO MOUSE DEVE SEGURAR AO ARRASTAR O TEXTO PARA DENTRO DA PASTA?', 'quiz', 2);

-- ===========================================
-- NÍVEL 3 (PÁGINAS 19-27)
-- ===========================================

-- PÁGINA 19 - INTRO 7
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(19, 'COMO GUARDAR SEU TEXTO DENTRO DE UMA PASTA?',
'1 - ABRA A PASTA ONDE VOCÊ QUER COLOCAR O ARQUIVO\n2 - ENCONTRE O ARQUIVO QUE VOCÊ QUER MOVER\n3 - CLIQUE E SEGURE O BOTÃO ESQUERDO DO MOUSE EM CIMA DO ARQUIVO\n4 - ARRASTE O ARQUIVO ATÉ A PASTA ABERTA\n5 - SOLTE O BOTÃO DO MOUSE PARA COLOCAR O ARQUIVO DENTRO DA PASTA',
'intro', 3);

-- PÁGINA 20 - EXPLICAÇÃO 7
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(20, 'COMO GUARDAR SEU TEXTO DENTRO DE UMA PASTA?',
'1 - ABRA A PASTA ONDE VOCÊ QUER COLOCAR O ARQUIVO\n2 - ENCONTRE O ARQUIVO QUE VOCÊ QUER MOVER\n3 - CLIQUE E SEGURE O BOTÃO ESQUERDO DO MOUSE EM CIMA DO ARQUIVO\n4 - ARRASTE O ARQUIVO ATÉ A PASTA ABERTA\n5 - SOLTE O BOTÃO DO MOUSE PARA COLOCAR O ARQUIVO DENTRO DA PASTA',
'explicacao_2', 3);

-- PÁGINA 21 - INTRO 8
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(21, 'COMO ACESSAR A INTERNET?',
'1 - CLIQUE NO ÍCONE DO NAVEGADOR QUE PARECE UMA BOLINHA COLORIDA OU UMA AZUL\n2 - ESPERE O NAVEGADOR ABRIR NA TELA DO COMPUTADOR\n3 - CLIQUE NA BARRA LÁ EM CIMA ONDE APARECEM AS LETRAS E OS NÚMEROS\n4 - DIGITE O NOME DO SITE QUE VOCÊ QUER VISITAR, COMO POR EXEMPLO WWW.GOOGLE.COM\n5 - PRESSIONE ENTER E ESPERE A PÁGINA ABRIR',
'intro', 3);

-- PÁGINA 22 - EXPLICAÇÃO 8
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(22, 'COMO ACESSAR A INTERNET?',
'1 - CLIQUE NO ÍCONE DO NAVEGADOR QUE PARECE UMA BOLINHA COLORIDA OU UMA AZUL\n2 - ESPERE O NAVEGADOR ABRIR NA TELA DO COMPUTADOR\n3 - CLIQUE NA BARRA LÁ EM CIMA ONDE APARECEM AS LETRAS E OS NÚMEROS\n4 - DIGITE O NOME DO SITE QUE VOCÊ QUER VISITAR, COMO POR EXEMPLO WWW.GOOGLE.COM\n5 - PRESSIONE ENTER E ESPERE A PÁGINA ABRIR',
'explicacao_2', 3);

-- PÁGINA 23 - INTRO 9
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(23, 'COMO ACESSAR O SITE FRIV.COM?',
'1 - CLIQUE NO ÍCONE DO NAVEGADOR DE INTERNET NA TELA DO COMPUTADOR\n2 - ESPERE O NAVEGADOR ABRIR COMPLETAMENTE\n3 - CLIQUE NA BARRA LÁ EM CIMA ONDE APARECEM AS LETRAS\n4 - DIGITE O ENDEREÇO WWW.FRIV.COM\n5 - PRESSIONE ENTER E ESPERE OS JOGOS APARECEREM NA TELA',
'intro', 3);

-- PÁGINA 24 - EXPLICAÇÃO 9
INSERT INTO paginas (ordem, titulo, texto, tipo, nivel) VALUES
(24, 'COMO ACESSAR O SITE FRIV.COM?',
'1 - CLIQUE NO ÍCONE DO NAVEGADOR DE INTERNET NA TELA DO COMPUTADOR\n2 - ESPERE O NAVEGADOR ABRIR COMPLETAMENTE\n3 - CLIQUE NA BARRA LÁ EM CIMA ONDE APARECEM AS LETRAS\n4 - DIGITE O ENDEREÇO WWW.FRIV.COM\n5 - PRESSIONE ENTER E ESPERE OS JOGOS APARECEREM NA TELA',
'explicacao_2', 3);

-- PÁGINA 25 - QUIZ 7
INSERT INTO paginas (ordem, titulo, tipo, nivel) VALUES
(25, 'QUAL DESSES ÍCONES SÃO NAVEGADORES?', 'quiz', 3);

-- PÁGINA 26 - QUIZ 8
INSERT INTO paginas (ordem, titulo, tipo, nivel) VALUES
(26, 'QUAL É O LUGAR QUE DEVE SER DIGITADO O SITE?', 'quiz', 3);

-- PÁGINA 27 - QUIZ 9
INSERT INTO paginas (ordem, titulo, tipo, nivel) VALUES
(27, 'QUAL É O DESENHO DO "FAVORITAR"?', 'quiz', 3);

-- ===========================================
-- TABELA DE RESPOSTAS DE QUIZ
-- ===========================================

CREATE TABLE `respostas_quiz` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `id_pagina` INT NOT NULL,
  `titulo` VARCHAR(255) NOT NULL,
  `imagem` VARCHAR(255),
  `correta` BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (`id_pagina`) REFERENCES `paginas` (`id`) ON DELETE CASCADE,
  INDEX idx_id_pagina (id_pagina),
  INDEX idx_correta (correta)
);

-- ===========================================
-- RESPOSTAS DOS QUIZZES
-- ===========================================

-- QUIZ 1 (Página 7) - Qual desses é o monitor?
INSERT INTO respostas_quiz (id_pagina, titulo, imagem, correta) VALUES
(7, 'Monitor', '/img/monitor.png', TRUE),
(7, 'Impressora', '/img/impressora.png', FALSE),
(7, 'Gabinete', '/img/gabinete.png', FALSE),
(7, 'Teclado', '/img/teclado.png', FALSE);

-- QUIZ 2 (Página 8) - Qual desses é o teclado e o mouse?
INSERT INTO respostas_quiz (id_pagina, titulo, imagem, correta) VALUES
(8, 'Gabinete', '/img/gabinete.png', FALSE),
(8, 'Teclado', '/img/teclado.png', FALSE),
(8, 'Impressora', '/img/impressora.png', FALSE),
(8, 'Teclado e mouse', '/img/tecladomouse.png', TRUE);

-- QUIZ 3 (Página 9) - Qual desses é o gabinete?
INSERT INTO respostas_quiz (id_pagina, titulo, imagem, correta) VALUES
(9, 'Monitor', '/img/monitor.png', FALSE),
(9, 'Gabinete', '/img/gabinete.png', TRUE),
(9, 'Fones de Ouvido', '/img/fonesdeouvido.png', FALSE),
(9, 'Pendrive', '/img/pendrive.png', FALSE);

-- QUIZ 4 (Página 16) - Qual desses comandos cria uma pasta?
INSERT INTO respostas_quiz (id_pagina, titulo, imagem, correta) VALUES
(16, 'Criar Pasta', '/img/criarpastacerto.png', TRUE),
(16, 'Comando Errado 1', '/img/criarpastaerrada1.png', FALSE),
(16, 'Comando Errado 2', '/img/criarpastaerrada2.png', FALSE),
(16, 'Comando Errado 3', '/img/criarpastaerrada3.png', FALSE);

-- QUIZ 5 (Página 17) - O que a tecla CAPS LOCK faz?
INSERT INTO respostas_quiz (id_pagina, titulo, correta) VALUES
(17, 'O teclado começa a digitar tudo em letras MAIÚSCULAS até você desligar essa tecla.', TRUE),
(17, 'O computador trava porque o Caps Lock usa muita energia', FALSE),
(17, 'As letras ficam um pouco maiores, mas só da pra ver de óculos de sol', FALSE),
(17, 'O Caps Lock serve para deixar as palavras mais fortes', FALSE);

-- QUIZ 6 (Página 18) - Qual botão do mouse deve segurar?
INSERT INTO respostas_quiz (id_pagina, titulo, imagem, correta) VALUES
(18, 'Arrastar Errado 1', '/img/arrastaerrado3.png', FALSE),
(18, 'Arrastar Errado 2', '/img/arrastaerrado2.png', FALSE),
(18, 'Arrastar Errado 3', '/img/arrastaerrado.png', FALSE),
(18, 'Arrastar Correto', '/img/arrastacerto.png', TRUE);

-- QUIZ 7 (Página 25) - Qual desses ícones são navegadores?
INSERT INTO respostas_quiz (id_pagina, titulo, imagem, correta) VALUES
(25, 'Ícone Errado 1', '/img/navegadorerrado1.png', FALSE),
(25, 'Navegador Correto', '/img/navegadorcerto.png', TRUE),
(25, 'Ícone Errado 2', '/img/navegadorerrado2.png', FALSE),
(25, 'Ícone Errado 3', '/img/navegadorerrado3.png', FALSE);

-- QUIZ 8 (Página 26) - Qual é o lugar que deve ser digitado o site?
INSERT INTO respostas_quiz (id_pagina, titulo, imagem, correta) VALUES
(26, 'Barra Correta', '/img/barranavegadorcerto.png', TRUE),
(26, 'Barra Errada 1', '/img/barranavegadorerrado1.jpg', FALSE),
(26, 'Barra Errada 2', '/img/barranavegadorerrado2.png', FALSE),
(26, 'Barra Errada 3', '/img/barranavegadorerrado3.png', FALSE);

-- QUIZ 9 (Página 27) - Qual é o desenho do favoritar?
INSERT INTO respostas_quiz (id_pagina, titulo, imagem, correta) VALUES
(27, 'Favorito Correto', '/img/favoritocerto.png', TRUE),
(27, 'Favorito Errado 1', '/img/favoritoerrado1.png', FALSE),
(27, 'Favorito Errado 2', '/img/favoritoerrado2.png', FALSE),
(27, 'Favorito Errado 3', '/img/favoritoerrado3.png', FALSE);

-- ===========================================
-- VERIFICAÇÃO FINAL
-- ===========================================

SELECT COUNT(*) as 'Total de Páginas' FROM paginas;
SELECT nivel, COUNT(*) as 'Páginas por Nível' FROM paginas GROUP BY nivel;
SELECT tipo, COUNT(*) as 'Páginas por Tipo' FROM paginas GROUP BY tipo;
SELECT * FROM paginas ORDER BY ordem;
