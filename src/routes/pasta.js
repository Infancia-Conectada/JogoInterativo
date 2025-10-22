// Rotas para quiz educacional sobre computador básico
const routes = {
  // Rota 1: Explicação
  pergunta1: {
    id: 1,
    tipo: "explicacao",
    pergunta: "Qual botão do mouse você deve segurar ao arrastar o texto para dentro da pasta?",
    proxima: "pergunta1_1"
  },

  // Rota 1.1: Múltipla escolha
  pergunta1_1: {
    id: 1.1,
    tipo: "multipla_escolha",
    pergunta: "Qual desses é o botão do mouse que você deve segurar ao arrastar o texto para dentro da pasta?",
    opcoes: [
      { id: "a", texto: "Botão esquerdo", correto: true },
      { id: "b", texto: "Botão direito", correto: false },
      { id: "c", texto: "Nenhum botão", correto: false },
      { id: "d", texto: "Botão Caps Lock", correto: false }
    ],
    resposta_correta: "a",
    feedback_correto: "Isso mesmo! Você deve segurar o botão esquerdo do mouse para arrastar e soltar o texto dentro da pasta.",
    feedback_incorreto: "Resposta incorreta. O botão esquerdo é usado para arrastar.",
    pontos: 2,
    proxima: "pergunta3_1"
  },

  // Rota 3.1: Outra pergunta de múltipla escolha
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

  if (!rota || rota.tipo === "explicacao" || rota.tipo === "conclusao") {
    return {
      valido: false,
      mensagem: "Esta rota não requer resposta."
    };
  }

  if (rota.tipo === "multipla_escolha") {
    const acertou = respostaUsuario === rota.resposta_correta;
    return {
      valido: true,
      correto: acertou,
      feedback: acertou ? rota.feedback_correto : rota.feedback_incorreto,
      pontos: acertou ? rota.pontos : 0,
      proxima: rota.proxima
    };
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
console.log(`Pergunta ${rotaAtual.id}: ${rotaAtual.pergunta}\n`);

// Simular resposta da pergunta1_1
rotaAtual = getRoute(rotaAtual.proxima);
console.log(`Pergunta ${rotaAtual.id}: ${rotaAtual.pergunta}`);
rotaAtual.opcoes.forEach(op => {
  console.log(`  ${op.id}) ${op.texto}`);
});

const respostaUsuario = "a";
const resultado = verificarResposta("pergunta1_1", respostaUsuario);

console.log(`\nResposta escolhida: ${respostaUsuario}`);
console.log(`Resultado: ${resultado.feedback}`);
console.log(`Pontos ganhos: ${resultado.pontos}`);
