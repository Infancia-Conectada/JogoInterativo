-- ===========================================
-- CRIAÇÃO DAS TABELAS
-- ===========================================

CREATE TABLE `perguntas` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `titulo` VARCHAR(255),
  `nivel` INT,
  `posicao` INT
);

CREATE TABLE `respostas` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `id_pergunta` INT,
  `titulo` VARCHAR(255),
  `imagem` VARCHAR(255),
  `correta` BOOLEAN,
  FOREIGN KEY (`id_pergunta`) REFERENCES `perguntas` (`id`)
);

CREATE TABLE `certificados` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(255),
  `data_conclusao` DATETIME
);

CREATE TABLE `conteudo_intro` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `titulo` VARCHAR(255) NOT NULL,
  `imagem` VARCHAR(255) NOT NULL,
  `ordem` INT NOT NULL,
  `ativo` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===========================================
-- INSERÇÃO DE DADOS EM CONTEUDO_INTRO
-- ===========================================

INSERT INTO conteudo_intro (titulo, imagem, ordem) VALUES
('O QUE É O MONITOR?', '/img/monitor.png', 1),
('O QUE É O TECLADO? O QUE É O MOUSE?', '/img/tecladomouse.png', 2),
('O QUE É O GABINETE(CPU)', '/img/gabinete.png', 3),
('COMO CRIAR UMA PASTA NO COMPUTADOR?', '/img/navegadorerrado1.png', 4),
('QUAIS AS FUNÇÕES DE ALGUMAS TECLAS DO TECLADO? COMO CRIAR UM TEXTO?', '/img/teclado.png', 5),
('COMO GUARDAR SEU TEXTO DENTRO DE UMA PASTA?', '/img/navegadorerrado1.png', 6),
('COMO ACESSAR A INTERNET?', '/img/navegadorcerto.png', 7),
('COMO ACESSAR O SITE DE JOGOS ONLINE FRIV.COM?', '/img/friv.png', 8);

CREATE INDEX idx_ordem ON conteudo_intro(ordem);
CREATE INDEX idx_ativo ON conteudo_intro(ativo);

-- ===========================================
-- EXPLICAÇÃO 1
-- ===========================================

CREATE TABLE `explicacao_1` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `titulo` VARCHAR(255) NOT NULL,
  `texto_secundario` TEXT,
  `imagem_1` VARCHAR(255),
  `imagem_2` VARCHAR(255),
  `ordem` INT NOT NULL,
  `ativo` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO explicacao_1 (titulo, texto_secundario, imagem_1, imagem_2, ordem) VALUES
('O QUE É O MONITOR?', 'UM MONITOR É A TELA DO COMPUTADOR. É NELE QUE A GENTE VÊ TUDO O QUE ESTÁ ACONTECENDO, COMO OS DESENHOS, OS JOGOS E OS TEXTOS. ELE MOSTRA AS IMAGENS QUE O COMPUTADOR ESTÁ FAZENDO, COMO UMA TELEVISÃO QUE MOSTRA O QUE ESTÁ PASSANDO.', '/img/monitor.png', NULL, 1),
('O QUE É O TECLADO E O MOUSE?', 'O TECLADO E O MOUSE SÃO COMO FERRAMENTAS MÁGICAS QUE AJUDAM VOCÊ A CONVERSAR COM O COMPUTADOR! O TECLADO É COMO UMA MÁQUINA DE ESCREVER QUE AJUDA VOCÊ A DIGITAR E CONTROLAR O COMPUTADOR! O MOUSE É COMO UMA VARINHA MÁGICA! VOCÊ O MOVE COM A MÃO E ELE FAZ O PONTEIRO SE MEXER NA TELA. COM ELE, VOCÊ PODE CLICAR, ARRASTAR E BRINCAR COM O COMPUTADOR!', '/img/teclado.png', '/img/mouse.png', 2),
('O QUE É O GABINETE?', 'MUITAS PESSOAS CHAMAM O GABINETE DE “CPU”, MAS NA VERDADE A CPU É APENAS O PROCESSADOR, QUE FICA DENTRO DELE. O GABINETE PROTEGE OS COMPONENTES, ORGANIZA AS CONEXÕES E PERMITE QUE VOCÊ LIGUE CABOS DE ENERGIA, MONITOR, TECLADO, MOUSE E INTERNET. O GABINETE É A “CAIXA” DO COMPUTADOR. DENTRO DELE FICAM AS PRINCIPAIS PEÇAS: PLACA-MÃE, PROCESSADOR (CPU), MEMÓRIA RAM, HD/SSD E A FONTE DE ENERGIA.', '/img/gabinete.png', NULL, 3);

CREATE INDEX idx_ordem_explicacao_1 ON explicacao_1(ordem);
CREATE INDEX idx_ativo_explicacao_1 ON explicacao_1(ativo);

-- ===========================================
-- EXPLICAÇÃO 2
-- ===========================================

CREATE TABLE `explicacao_2` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `titulo` VARCHAR(255) NOT NULL,
  `texto_secundario_1` TEXT,
  `texto_secundario_2` TEXT,
  `texto_secundario_3` TEXT,
  `texto_secundario_4` TEXT,
  `texto_secundario_5` TEXT,
  `imagem_1` VARCHAR(255),
  `imagem_2` VARCHAR(255),
  `ordem` INT NOT NULL,
  `ativo` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO explicacao_2 (
  titulo, texto_secundario_1, texto_secundario_2, texto_secundario_3,
  texto_secundario_4, texto_secundario_5, imagem_1, imagem_2, ordem
) VALUES
('COMO CRIAR UM TEXTO NO COMPUTADOR',
 '1 - CLIQUE COM O BOTÃO DIREITO DO MOUSE EM UMA ÁREA VAZIA',
 '2 - PROCURE POR "NOVO" NO MENU',
 '3 - CLIQUE EM "NOVO" OU APENAS DEIXE O MOUSE POR CIMA',
 '4 - CLIQUE EM "DOCUMENTO DE TEXTO" E DIGITE O NOME QUE VOCÊ QUER DAR PARA ESSA NOTA',
 '5 - PRESSIONE ENTER PARA CONFIRMAR E CLIQUE DUAS VEZES NO ARQUIVO DE TEXTO QUE VOCÊ NOMEOU',
 '/img/criarpastacerto.png', NULL, 1),

('COMO CRIAR UMA PASTA NO COMPUTADOR',
 '1 - CLIQUE COM O BOTÃO DIREITO DO MOUSE EM UMA ÁREA VAZIA',
 '2 - PROCURE POR "NOVO" NO MENU',
 '3 - CLIQUE EM "NOVO" OU APENAS DEIXE O MOUSE POR CIMA',
 '4 - CLIQUE EM "PASTA" E DIGITE O NOME QUE VOCÊ QUER DAR PARA ESSA PASTA',
 '5 - PRESSIONE ENTER PARA CONFIRMAR E ENTRAR NA PASTA QUE VOCÊ CRIOU',
 '/img/criarpastacerto.png', NULL, 2),

('FUNCÕES DE ALGUMAS TECLAS',
 '1 - A TECLA DELETE SERVE PARA APAGAR COISAS. ELA APAGA A LETRA, O NÚMERO OU O ARQUIVO QUE VOCÊ ESCOLHEU. É COMO UMA BORRACHA DO COMPUTADOR!',
 '2 - A TECLA NUM LOCK LIGA OU DESLIGA OS NÚMEROS DO TECLADO QUE FICAM DO LADO DIREITO. QUANDO ELA ESTÁ LIGADA, VOCÊ PODE DIGITAR NÚMEROS. QUANDO ESTÁ DESLIGADA, ESSES BOTÕES VIRAM SETAS E OUTRAS FUNÇÕES.',
 '3 - O TECLADO COMEÇA A DIGITAR TUDO EM LETRAS MAIÚSCULAS ATÉ VOCÊ DESLIGAR ESSA TECLA.',
 '4 - A TECLA WINKEY (QUE TEM O DESENHO DO WINDOWS) ABRE O MENU INICIAL DO COMPUTADOR. É COMO UM BOTÃO MÁGICO QUE MOSTRA TODOS OS PROGRAMAS E AJUDA A ABRIR O QUE VOCÊ QUISER!',
 NULL, '/img/criarpastacerto.png', NULL, 3),

('COMO GUARDAR SEU TEXTO DENTRO DE UMA PASTA?',
 '1 - ABRA A PASTA ONDE VOCÊ QUER COLOCAR O ARQUIVO',
 '2 - ENCONTRE O ARQUIVO QUE VOCÊ QUER MOVER',
 '3 - CLIQUE E SEGURE O BOTÃO ESQUERDO DO MOUSE EM CIMA DO ARQUIVO',
 '4 - ARRASTE O ARQUIVO ATÉ A PASTA ABERTA',
 '5 - SOLTE O BOTÃO DO MOUSE PARA COLOCAR O ARQUIVO DENTRO DA PASTA',
 '/img/exemploarrastar.png', NULL, 4),

('COMO ACESSAR A INTERNET?',
 '1 - CLIQUE NO ÍCONE DO NAVEGADOR QUE PARECE UMA BOLINHA COLORIDA OU UMA AZUL',
 '2 - ESPERE O NAVEGADOR ABRIR NA TELA DO COMPUTADOR',
 '3 - CLIQUE NA BARRA LÁ EM CIMA ONDE APARECEM AS LETRAS E OS NÚMEROS',
 '4 - DIGITE O NOME DO SITE QUE VOCÊ QUER VISITAR, COMO POR EXEMPLO WWW.GOOGLE.COM',
 '5 - PRESSIONE ENTER E ESPERE A PÁGINA ABRIR PARA COMEÇAR A EXPLORAR A INTERNET',
 '/img/exemplo_internet.png', NULL, 5),

('COMO ACESSAR O SITE FRIV.COM',
 '1 - CLIQUE NO ÍCONE DO NAVEGADOR DE INTERNET NA TELA DO COMPUTADOR',
 '2 - ESPERE O NAVEGADOR ABRIR COMPLETAMENTE',
 '3 - CLIQUE NA BARRA LÁ EM CIMA ONDE APARECEM AS LETRAS',
 '4 - DIGITE O ENDEREÇO WWW.FRIV.COM',
 '5 - PRESSIONE ENTER E ESPERE OS JOGOS APARECEREM NA TELA',
 '/img/friv.png', NULL, 6);

CREATE INDEX idx_ordem_explicacao_2 ON explicacao_2(ordem);
CREATE INDEX idx_ativo_explicacao_2 ON explicacao_2(ativo);

-- ===========================================
-- PERGUNTAS E RESPOSTAS
-- ===========================================

-- PERGUNTA 1
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('QUAL DESSES É O MONITOR?', 1, 1);
SET @pergunta_id = LAST_INSERT_ID();
INSERT INTO respostas (id_pergunta, titulo, imagem, correta) VALUES
(@pergunta_id, 'Monitor', 'img/monitor.png', TRUE),
(@pergunta_id, 'impressora', 'img/impressora.png', FALSE),
(@pergunta_id, 'Gabinete', 'img/gabinete.png', FALSE),
(@pergunta_id, 'Teclado', 'img/teclado.png', FALSE);

-- PERGUNTA 2
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('QUAL DESSES É O TECLADO E O MOUSE?',1, 2);
SET @pergunta_id = LAST_INSERT_ID();
INSERT INTO respostas (id_pergunta, titulo, imagem, correta) VALUES
(@pergunta_id, 'gabinete', 'img/gabinete.png', FALSE),
(@pergunta_id, 'teclado', 'img/teclado.png', FALSE),
(@pergunta_id, 'impressora', 'img/impressora.png', FALSE),
(@pergunta_id, 'Teclado e mouse', 'img/tecladomouse.png', TRUE);

-- PERGUNTA 3
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('QUAL DESSES É O GABINETE?',1, 3);
SET @pergunta_id = LAST_INSERT_ID();
INSERT INTO respostas (id_pergunta, titulo, imagem, correta) VALUES
(@pergunta_id, 'monitor', 'img/monitor.png', FALSE),
(@pergunta_id, 'gabinete', 'img/gabinete.png', TRUE),
(@pergunta_id, 'Fones de Ouvido', 'img/fonesdeouvido.png', FALSE),
(@pergunta_id, 'Pendrive', 'img/pendrive.png', FALSE);

-- PERGUNTA 4
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('QUAL DESSES COMANDOS CRIA UMA PASTA?', 2, 4);
SET @pergunta_id = LAST_INSERT_ID();
INSERT INTO respostas (id_pergunta, titulo, imagem, correta) VALUES
(@pergunta_id, 'criarpasta', 'img/criarpastacerto.png', TRUE),
(@pergunta_id, 'criarpasta1', 'img/criarpastaerrada1.png', FALSE),
(@pergunta_id, 'criarpasta2', 'img/criarpastaerrada2.png', FALSE),
(@pergunta_id, 'criarpasta3', 'img/criarpastaerrada3.png', FALSE);

-- PERGUNTA 5
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('O QUE A TECLA CAPS LOCK FAZ?', 2, 5);
SET @pergunta_id = LAST_INSERT_ID();
INSERT INTO respostas (id_pergunta, titulo, correta) VALUES
(@pergunta_id, 'O teclado começa a digitar tudo em letras MAIÚSCULAS até você desligar essa tecla.', TRUE),
(@pergunta_id, 'O computador trava porque o Caps Lock usa muita energia', FALSE),
(@pergunta_id, 'As letras ficam um pouco maiores, mas só da pra ver de óculos de sol', FALSE),
(@pergunta_id, 'O Caps Lock serve para deixar as palavras mais fortes', FALSE);

-- PERGUNTA 6
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('QUAL BOTÃO DO MOUSE DEVE SEGURAR AO ARRASTAR O TEXTO PARA DENTRO DA PASTA?', 2, 6);
SET @pergunta_id = LAST_INSERT_ID();
INSERT INTO respostas (id_pergunta, titulo, imagem, correta) VALUES
(@pergunta_id, 'ARRASTA1', 'img/arrastaerrado3.png', FALSE),
(@pergunta_id, 'ARRASTA2', 'img/arrastaerrado2.png', FALSE),
(@pergunta_id, 'ARRASTA3', 'img/arrastaerrado.png', FALSE),
(@pergunta_id, 'ARRASTA4', 'img/arrastacerto.png', TRUE);

-- PERGUNTA 7
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('QUAL DESSES ÍCONES SÃO NAVEGADORES?', 3, 7);
SET @pergunta_id = LAST_INSERT_ID();
INSERT INTO respostas (id_pergunta, titulo, imagem, correta) VALUES
(@pergunta_id, 'navegador1', 'img/navegadorerrado1.png', FALSE),
(@pergunta_id, 'navegador2', 'img/navegadorcerto.png', TRUE),
(@pergunta_id, 'navegador3', 'img/navegadorerrado2.png', FALSE),
(@pergunta_id, 'navegador4', 'img/navegadorerrado3.png', FALSE);

-- PERGUNTA 8
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('QUAL É O LUGAR QUE DEVE SER DIGITADO O SITE?', 3, 8);
SET @pergunta_id = LAST_INSERT_ID();
INSERT INTO respostas (id_pergunta, titulo, imagem, correta) VALUES
(@pergunta_id, 'barra1', 'img/barranavegadorcerto.png', TRUE),
(@pergunta_id, 'barra2', 'img/barranavegadorerrado1.jpg', FALSE),
(@pergunta_id, 'barra3', 'img/barranavegadorerrado2.png', FALSE),
(@pergunta_id, 'barra4', 'img/barranavegadorerrado3.png', FALSE);

-- PERGUNTA 9
INSERT INTO perguntas (titulo, nivel, posicao) VALUES
('QUAL É O DESENHO DO "FAVORITAR"?', 3, 9);
SET @pergunta_id = LAST_INSERT_ID();
INSERT INTO respostas (id_pergunta, titulo, imagem, correta) VALUES
(@pergunta_id, 'favorito1', 'img/favoritocerto.png', TRUE),
(@pergunta_id, 'favorito2', 'img/favoritoerrado1.png', FALSE),
(@pergunta_id, 'favorito3', 'img/favoritoerrado2.png', FALSE),
(@pergunta_id, 'favorito4', 'img/favoritoerrado3.png', FALSE);


SELECT * FROM conteudo_intro;
SELECT * FROM explicacao_1;
SELECT * FROM explicacao_2;
SELECT * FROM perguntas;
SELECT * FROM respostas;
SELECT COUNT(*) FROM explicacao_2;
SHOW DATABASES;