// routes.js - Sistema de Rotas para o Quiz

const routes = {
    // Rota 1: O que é o monitor? (Explicação com 4 imagens)
    pergunta1: {
        id: 1,
        tipo: "explicacao",
        pergunta: "O que é o monitor?",
        resposta: "O monitor é a tela do computador onde você visualiza tudo o que está fazendo - textos, imagens, vídeos e programas.",
        imagens: [
            {
                url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
                legenda: "Monitor de Computador Moderno"
            },
            {
                url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
                legenda: "TV (também é um monitor)"
            },
            {
                url: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400&h=300&fit=crop",
                legenda: "Monitor Ultrawide"
            },
            {
                url: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&h=300&fit=crop",
                legenda: "Setup com Múltiplos Monitores"
            }
        ],
        pontos: 1,
        proxima: "pergunta1_1"
    },

    // Rota 1.1: Qual desses é o monitor? (Quiz visual)
    pergunta1_1: {
        id: 1.1,
        tipo: "multipla_escolha_imagem",
        pergunta: "Qual desses é o monitor?",
        opcoes: [
            {
                id: "a",
                texto: "Teclado",
                correto: false,
                imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=200&fit=crop"
            },
            {
                id: "b",
                texto: "Mouse",
                correto: false,
                imagem: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop"
            },
            {
                id: "c",
                texto: "Tela/Monitor",
                correto: true,
                imagem: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop"
            },
            {
                id: "d",
                texto: "Gabinete/CPU",
                correto: false,
                imagem: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=200&fit=crop"
            }
        ],
        resposta_correta: "c",
        feedback_correto: "🎉 Isso mesmo! O monitor é a tela onde você vê tudo.",
        feedback_incorreto: "❌ Não é esse. O monitor é a tela do computador.",
        pontos: 1,
        proxima: "pergunta2"
    },

    // Rota 2: Como guardar texto dentro de uma pasta?
    pergunta2: {
        id: 2,
        tipo: "explicacao",
        pergunta: "Como guardar seu texto dentro de uma pasta?",
        resposta: "Para guardar um texto dentro de uma pasta, você precisa:\n\n1. Criar ou abrir a pasta desejada\n2. Arrastar o arquivo de texto para dentro da pasta\n\nOU\n\n1. Clicar com botão direito no arquivo\n2. Selecionar 'Recortar' ou 'Copiar'\n3. Abrir a pasta\n4. Clicar com botão direito e selecionar 'Colar'",
        pontos: 1,
        proxima: "pergunta2_1"
    },

    // Rota 2.1: Explicação simples de como guardar texto dentro de uma pasta
    pergunta2_1: {
        id: 2.1,
        tipo: "explicacao_simples",
        pergunta: "Explicação simples de como guardar seu texto dentro de uma pasta",
        resposta: "Passo a passo fácil:\n\n1. Encontre seu arquivo de texto\n2. Segure ele com o mouse (botão esquerdo pressionado)\n3. Arraste até a pasta\n4. Solte o botão\n\nPronto! Seu texto está guardado na pasta.",
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
        feedback_correto: "✅ Correto! Essas são formas de criar uma pasta nova.",
        feedback_incorreto: "⚠️ Atenção! A forma mais comum é: Botão direito → Nova Pasta",
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
        feedback_correto: "💪 Perfeito! O botão esquerdo é usado para arrastar arquivos.",
        feedback_incorreto: "❌ Não é esse. Use o botão esquerdo para arrastar.",
        pontos: 1,
        proxima: "fim"
    },

    // Rota final
    fim: {
        id: "fim",
        tipo: "conclusao",
        mensagem: "🎉 Parabéns! Você completou o quiz sobre o monitor e organização de arquivos!",
        pontos_totais: 7
    }
};

// Funções auxiliares para gerenciar as rotas
const QuizRouter = {
    // Obter uma rota específica
    getRoute: function(routeId) {
        return routes[routeId] || null;
    },

    // Iniciar o quiz (retorna a primeira rota)
    iniciarQuiz: function() {
        return this.getRoute("pergunta1");
    },

    // Verificar resposta do usuário
    verificarResposta: function(routeId, respostaUsuario) {
        const rota = this.getRoute(routeId);
        
        if (!rota || rota.tipo === "explicacao" || rota.tipo === "explicacao_simples") {
            return {
                valido: false,
                mensagem: "Esta rota não requer resposta."
            };
        }

        if (rota.tipo === "multipla_escolha" || rota.tipo === "multipla_escolha_imagem") {
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
    },

    // Obter todas as rotas (útil para debug)
    getAllRoutes: function() {
        return routes;
    },

    // Obter lista de IDs das rotas
    getRouteIds: function() {
        return Object.keys(routes);
    },

    // Verificar se é a última rota
    isLastRoute: function(routeId) {
        const rota = this.getRoute(routeId);
        return rota && rota.tipo === "conclusao";
    },

    // Obter rota anterior
    getPreviousRoute: function(currentRouteId) {
        const routeIds = this.getRouteIds();
        const currentIndex = routeIds.indexOf(currentRouteId);
        
        if (currentIndex > 0) {
            return this.getRoute(routeIds[currentIndex - 1]);
        }
        
        return null;
    },

    // Calcular progresso
    calcularProgresso: function(currentRouteId) {
        const routeIds = this.getRouteIds();
        const currentIndex = routeIds.indexOf(currentRouteId);
        const totalRoutes = routeIds.length;
        
        return {
            atual: currentIndex + 1,
            total: totalRoutes,
            porcentagem: ((currentIndex + 1) / totalRoutes) * 100
        };
    }
};

// Exportar para uso em Node.js ou navegador
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        routes,
        QuizRouter
    };
}

// Exemplo de uso no console
console.log("=== SISTEMA DE ROTAS DO QUIZ ===");
console.log("Total de rotas:", QuizRouter.getRouteIds().length);
console.log("Primeira rota:", QuizRouter.iniciarQuiz().pergunta);
console.log("\nRotas disponíveis:");
QuizRouter.getRouteIds().forEach(id => {
    const rota = QuizRouter.getRoute(id);
    console.log(`- ${id}: ${rota.pergunta || rota.mensagem} (${rota.tipo})`);
});