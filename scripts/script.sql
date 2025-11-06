CREATE TABLE `perguntas` (
  `id` integer PRIMARY KEY auto_increment,
  `titulo` varchar(255),
  `nivel` integer,
  `posicao` integer
);

CREATE TABLE `respostas` (
  `id` integer PRIMARY KEY auto_increment,
  `id_pergunta` integer,
  `titulo` varchar(255),
  `imagem` varchar(255),
  `correta` boolean
);

CREATE TABLE `certificados` (
  `id` integer PRIMARY KEY auto_increment,
  `nome` varchar(255),
  `data_conclusao` datetime
);

ALTER TABLE `respostas` ADD FOREIGN KEY (`id_pergunta`) REFERENCES `perguntas` (`id`);.

-- ====== PERGUNTA 1 - Sobre monitor ======
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('QUAL DESSES É O MONITOR?', 1, 1);

SET @pergunta_id = LAST_INSERT_ID();

INSERT INTO respostas (id_pergunta, titulo, imagem, correta) VALUES
(@pergunta_id, 'Monitor', 'img/monitor.png', true),
(@pergunta_id, 'impressora', 'img/impressora.png', false),
(@pergunta_id, 'Gabinete', 'img/gabinete.png', false),
(@pergunta_id, 'Teclado', 'img/teclado.png', false);

-- ====== PERGUNTA 2 - Sobre TECLADO E MOUSE ======
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('QUAL DESSES É O TECLADO E O MOUSE?',1, 2);

SET @pergunta_id = LAST_INSERT_ID();

INSERT INTO respostas (id_pergunta, titulo, imagem, correta) VALUES
(@pergunta_id, 'gabinete', 'img/gabinete.png', false),
(@pergunta_id, 'teclado', 'img/teclado.png', false),
(@pergunta_id, 'impressora', 'img/impressora.png', false),
(@pergunta_id, 'Teclado e mouse', 'img/tecladomouse.png', true);

-- ====== PERGUNTA 3 - Sobre O GABINETE ======
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('QUAL DESSES É O GABINETE',1, 3);

SET @pergunta_id = LAST_INSERT_ID();

INSERT INTO respostas (id_pergunta, titulo, imagem, correta) VALUES
(@pergunta_id, 'monitor', 'img/monitor.png', false),
(@pergunta_id, 'gabinete', 'img/gabinete.png', true),
(@pergunta_id, 'Fones de Ouvido', 'img/fonesdeouvido.png', false),
(@pergunta_id, 'Pendrive', 'img/pendrive.png', false);

-- ====== PERGUNTA 4 / NÍVEL 2 - Sobre CRIAR PASTA ======
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('QUAL DESSES COMANDOS CRIA UMA PASTA?', 2, 4);

SET @pergunta_id = LAST_INSERT_ID();

INSERT INTO respostas (id_pergunta, titulo, imagem, correta) VALUES
(@pergunta_id, 'criarpasta', 'img/criarpastacerto.png', true),
(@pergunta_id, 'criarpasta1', 'img/criarpastaerrada1.png', false),
(@pergunta_id, 'criarpasta2', 'img/criarpastaerrada2.png', false),
(@pergunta_id, 'criarpasta3', 'img/criarpastaerrada3.png', false);

-- ====== PERGUNTA 5 - funçoes das teclas ======
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('O QUE A TECLA CAPS LOCAL FAZ?', 2, 5);

SET @pergunta_id = LAST_INSERT_ID();

INSERT INTO respostas (id_pergunta, titulo, correta) VALUES
(@pergunta_id,  'O computador trava porque o Caps Lock usa muita energia', true),
(@pergunta_id,  'O teclado começa a digitar tudo em letras MAIÚSCULAS até você desligar essa tecla.', false),
(@pergunta_id,  'As letras ficam um pouco maiores, mas só da pra ver de óculos de sol', false),
(@pergunta_id,  'O Caps Lock serve para deixar as palavras mais fortes', false);

-- ====== PERGUNTA 6 - Nível 2 - BOTÃO PARA ARRASTAR ======
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('QUAL BOTÃO DO MOUSE DEVE SEGURAR AO ARRASTAR O TEXTO PARA DENTRO DA PASTA?', 2, 6);

SET @pergunta_id = LAST_INSERT_ID();

INSERT INTO respostas (id_pergunta, titulo, imagem, correta) VALUES
(@pergunta_id, 'ARRASTA1', 'img/arrastaerrado3.png', false),
(@pergunta_id, 'ARRASTA2', 'img/arrastaerrado2.png', false),
(@pergunta_id, 'ARRASTA3', 'img/arrastaerrado.png', false),
(@pergunta_id, 'ARRASTA4', 'img/arrastacerto.png', true);

-- ====== PERGUNTA 7 - Nível 3 - COMO ACESSAR INTERNET ======
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('QUAL DESSES ÍCONES SÃO NAVEGADORES?', 3, 7);

SET @pergunta_id = LAST_INSERT_ID();

INSERT INTO respostas (id_pergunta, titulo, imagem, correta) VALUES
(@pergunta_id, 'navegador1', 'img/navegadorerrado1.png', false),
(@pergunta_id, 'navegador2', 'img/navegadorcerto.png', true),
(@pergunta_id, 'navegador3', 'img/navegadorerrado2.png', false),
(@pergunta_id, 'navegador4', 'img/navegadorerrado3.png', false);

-- ====== PERGUNTA 8 - Nível 3 - Criação de arquivo ======
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('QUAL É O LUGAR QUE DEVE SER DIGITADO O SITE?', 3, 8);

SET @pergunta_id = LAST_INSERT_ID();

INSERT INTO respostas (id_pergunta, titulo, imagem, correta) VALUES
(@pergunta_id, 'barra1', 'img/barranavegadorcerto.png', true),
(@pergunta_id, 'barra2', 'img/barranavegadorerrado1.jpg', false),
(@pergunta_id, 'barra3', 'img/barranavegadorerrado2.png', false),
(@pergunta_id, 'barra4', 'img/barranavegadorerrado3.png', false);

-- ====== PERGUNTA 9 - Nível 3 - Primeiro passo para criar arquivo ======
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('QUAL É O DESENHO DO "FAVORITAR"?', 3, 9);

SET @pergunta_id = LAST_INSERT_ID();

INSERT INTO respostas (id_pergunta, titulo, imagem, correta) VALUES
(@pergunta_id, 'favorito', 'img/favoritocerto.png', true),
(@pergunta_id, 'favorito', 'img/favoritoerrado1.png', false),
(@pergunta_id, 'favorito', 'img/favoritoerrado2.png', false),
(@pergunta_id, 'favorito', 'img/favoritoerrado3.png', false);

-- ====== PERGUNTA 10 - Nível 3 - Depois de criar arquivo ======
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('COMO ACESSAR SEUS FAVORITOS?', 3, 10);

SET @pergunta_id = LAST_INSERT_ID();

INSERT INTO respostas (id_pergunta, titulo, imagem, correta) VALUES
(@pergunta_id, 'Dar um nome para o arquivo', 'images/nomeando.jpg', true),
(@pergunta_id, 'Deletar o arquivo', '', false),
(@pergunta_id, 'Desligar o computador', 'img/gabinete2.png', false),
(@pergunta_id, 'Trocar de teclado', 'img/teclado1.png', false);