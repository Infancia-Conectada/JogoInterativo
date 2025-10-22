// Rotas para quiz educacional sobre computador básico

const routes = {
  // Rota 1: O que é o monitor?
  pergunta1: {
    id: 1,
    tipo: "explicacao",
    pergunta: "O que é o monitor?",
    resposta: "O monitor é a tela do computador onde você visualiza tudo o que está fazendo - textos, imagens, vídeos e programas.",
    pontos: 1,
    proxima: "pergunta1_1"
  },

  // Rota 1.1: Qual desses é o monitor?
  pergunta1_1: {
    id: 1.1,
    tipo: "multipla_escolha",
    pergunta: "Qual desses é o monitor?",
    opcoes: [
      { id: "a", texto: "Teclado", correto: false },
      { id: "b", texto: "Mouse", correto: false },
      { id: "c", texto: "Tela/Monitor", correto: true },
      { id: "d", texto: "Gabinete/CPU", correto: false }
    ],
    resposta_correta: "c",
    feedback_correto: "Isso mesmo! O monitor é a tela onde você vê tudo.",
    feedback_incorreto: "Não é esse. O monitor é a tela do computador.",
    pontos: 1,
    proxima: "pergunta2"
  },

  // Rota 2: Como guardar texto dentro de uma pasta?
  pergunta2: {
    id: 2,
    tipo: "explicacao",
    pergunta: "Como guardar seu texto dentro de uma pasta?",
    resposta: "Para guardar um texto dentro de uma pasta, você precisa:\n1. Criar ou abrir a pasta desejada\n2. Arrastar o arquivo de texto para dentro da pasta\nOU\n1. Clicar com botão direito no arquivo\n2. Selecionar 'Recortar' ou 'Copiar'\n3. Abrir a pasta\n4. Clicar com botão direito e selecionar 'Colar'",
    pontos: 1,
    proxima: "pergunta2_1"
  },

  // Rota 2.1: Explicação simples de como guardar texto dentro de uma pasta
  pergunta2_1: {
    id: 2.1,
    tipo: "explicacao_simples",
    pergunta: "Explicação simples de como guardar seu texto dentro de uma pasta",
    resposta: "Passo a passo fácil:\n1. Encontre seu arquivo de texto\n2. Segure ele com o mouse (botão esquerdo pressionado)\n3. Arraste até a pasta\n4. Solte o botão\nPronto! Seu texto está guardado na pasta.",
    pontos: 1,
    proxima: "pergunta3"
  },

  // Rota 3: Qual comando cria uma pasta?
  pergunta3: {
    id: 3,
    tipo: "multipla_escolha",
    pergunta: "Quais desses comandos cria uma pasta?",
    opcoes: [
      { id: "a", texto: "Botão direito → Nova Pasta", correto: true },
      { id: "b", texto: "Ctrl + N", correto: false },
      { id: "c", texto: "Ctrl + Shift + N (em alguns sistemas)", correto: true },
      { id: "d", texto: "Arquivo → Novo → Pasta", correto: true },
      { id: "e", texto: "Alt + F4", correto: false }
    ],
    respostas_corretas: ["a", "c", "d"],
    feedback_correto: "Correto! Essas são formas de criar uma pasta nova.",
    feedback_incorreto: "Atenção! A forma mais comum é: Botão direito → Nova Pasta",
    pontos: 2,
    proxima: "pergunta3_1"
  },

  // Rota 3.1: Qual botão do mouse segurar ao arrastar
  pergunta3_1: {
    id: 3.1,
    tipo: "multipla_escolha",
    pergunta: "Qual o botão do mouse você deve segurar ao arrastar o texto para dentro da pasta?",
    opcoes: [
      { id: "a", texto: "Botão esquerdo", correto: true },
      { id: "b", texto: "Botão direito", correto: false },
      { id: "c", texto: "Botão do meio (scroll)", correto: false },
      { id: "d", texto: "Os dois botões ao mesmo tempo", correto: false }
    ],
    resposta_correta: "a",
    feedback_correto: "Perfeito! O botão esquerdo é usado para arrastar arquivos.",
    feedback_incorreto: "Não é esse. Use o botão esquerdo para arrastar.",
    pontos: 1,
    proxima: "fim"
  },

  // Rota final
  fim: {
    id: "fim",
    tipo: "conclusao",
    mensagem: "Parabéns! Você completou o quiz sobre o monitor e organização de arquivos!",
    pontos_totais: 7
  }
};

// Função para navegar pelas rotas
function getRoute(routeId) {
  return routes[routeId] || null;
}

// Função para iniciar o quiz
function iniciarQuiz() {
  return getRoute("pergunta1");
}

// Função para verificar resposta
function verificarResposta(routeId, respostaUsuario) {
  const rota = getRoute(routeId);
  
  if (!rota || rota.tipo === "explicacao" || rota.tipo === "explicacao_simples") {
    return {
      valido: false,
      mensagem: "Esta rota não requer resposta."
    };
  }

  if (rota.tipo === "multipla_escolha") {
    // Verifica se é resposta única ou múltipla
    if (Array.isArray(rota.respostas_corretas)) {
      // Múltiplas respostas corretas
      const acertou = rota.respostas_corretas.includes(respostaUsuario);
      return {
        valido: true,
        correto: acertou,
        feedback: acertou ? rota.feedback_correto : rota.feedback_incorreto,
        pontos: acertou ? rota.pontos : 0,
        proxima: rota.proxima
      };
    } else {
      // Resposta única
      const acertou = respostaUsuario === rota.resposta_correta;
      return {
        valido: true,
        correto: acertou,
        feedback: acertou ? rota.feedback_correto : rota.feedback_incorreto,
        pontos: acertou ? rota.pontos : 0,
        proxima: rota.proxima
      };
    }
  }

  return {
    valido: false,
    mensagem: "Tipo de pergunta não reconhecido."
  };
}

// Exportar funções
module.exports = {
  routes,
  getRoute,
  iniciarQuiz,
  verificarResposta
};

// Exemplo de uso:
console.log("=== EXEMPLO DE USO DO QUIZ ===\n");

// Iniciar quiz
let rotaAtual = iniciarQuiz();
console.log(`Pergunta ${rotaAtual.id}: ${rotaAtual.pergunta}`);
console.log(`Resposta: ${rotaAtual.resposta}\n`);

// Próxima pergunta
rotaAtual = getRoute(rotaAtual.proxima);
console.log(`Pergunta ${rotaAtual.id}: ${rotaAtual.pergunta}`);
rotaAtual.opcoes.forEach(op => {
  console.log(`  ${op.id}) ${op.texto}`);
});

// Simular resposta
const resultado = verificarResposta("pergunta1_1", "c");
console.log(`\nResultado: ${resultado.feedback}`);
console.log(`Pontos ganhos: ${resultado.pontos}`);