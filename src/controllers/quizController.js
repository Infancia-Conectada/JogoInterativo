const QuizModel = require('../models/quizModel');

class QuizController {
    // Renderizar página do quiz com sistema de níveis
    static async renderQuiz(req, res) {
        try {
            console.log('=== RENDERIZANDO QUIZ ===');
            const nivel = parseInt(req.query.nivel) || 1; // nível atual (1, 2, 3)
            const posicao = parseInt(req.query.p) || 1; // posição da pergunta no nível
            
            console.log(`Nível: ${nivel}, Posição: ${posicao}`);
            
            const perguntasDoNivel = await QuizModel.buscarPerguntasPorNivel(nivel);
            console.log(`Perguntas encontradas para nível ${nivel}:`, perguntasDoNivel.length);
            
            const totalPerguntasNivel = perguntasDoNivel.length;
            
            if (totalPerguntasNivel === 0) {
                console.log('Nenhuma pergunta encontrada, redirecionando...');
                return res.redirect('/quiz?nivel=1&p=1');
            }
            
            // Se passou da última pergunta do nível, mostrar parabéns e avançar nível
            if (posicao > totalPerguntasNivel) {
                if (nivel === 1) {
                    // Concluiu nível 1, mostrar parabéns nível 2
                    return res.render('quiz', {
                        pergunta: null,
                        posicaoAtual: posicao,
                        totalPerguntas: totalPerguntasNivel,
                        nivel: nivel,
                        mostrarParabens: 'nivel2',
                        proximoNivel: 2,
                        title: 'Parabéns - Nível 2'
                    });
                } else if (nivel === 2) {
                    // Concluiu nível 2, mostrar parabéns nível 3
                    return res.render('quiz', {
                        pergunta: null,
                        posicaoAtual: posicao,
                        totalPerguntas: totalPerguntasNivel,
                        nivel: nivel,
                        mostrarParabens: 'nivel3',
                        proximoNivel: 3,
                        title: 'Parabéns - Nível 3'
                    });
                } else {
                    // Concluiu todos os níveis
                    return res.redirect('/parabensFinal');
                }
            }
            
            const perguntaAtual = perguntasDoNivel[posicao - 1];
            
            if (!perguntaAtual) {
                console.log('Pergunta não encontrada na posição:', posicao);
                return res.redirect(`/quiz?nivel=${nivel}&p=1`);
            }
            
            console.log('Renderizando pergunta:', perguntaAtual.titulo);
            
            res.render('quiz', {
                pergunta: perguntaAtual,
                posicaoAtual: posicao,
                totalPerguntas: totalPerguntasNivel,
                nivel: nivel,
                mostrarParabens: null,
                proximoNivel: null,
                title: `Quiz Nível ${nivel} - Pergunta ${posicao}`
            });
        } catch (error) {
            console.error('=== ERRO NO QUIZ ===');
            console.error('Erro ao carregar quiz:', error);
            res.status(500).render('404', {
                title: 'Erro',
                message: 'Erro ao carregar o quiz: ' + error.message
            });
        }
    }

    // Verificar resposta via AJAX
    static async verificarResposta(req, res) {
        try {
            console.log('=== VERIFICAR RESPOSTA ===');
            console.log('Body recebido:', req.body);
            
            const { respostaId } = req.body;
            
            if (!respostaId) {
                console.log('Resposta não fornecida');
                return res.json({ success: false, message: 'Resposta não fornecida' });
            }
            
            console.log('Verificando resposta ID:', respostaId);
            
            const resultado = await QuizModel.verificarResposta(respostaId);
            
            console.log('Resultado da verificação:', resultado);
            
            if (!resultado.valida) {
                return res.json({ success: false, message: 'Resposta inválida' });
            }
            
            const response = {
                success: true,
                correta: resultado.correta,
                message: resultado.correta ? 'Resposta correta! 🎉' : 'Resposta incorreta! 😅'
            };
            
            console.log('Enviando resposta:', response);
            
            res.json(response);
        } catch (error) {
            console.error('=== ERRO NA VERIFICAÇÃO ===');
            console.error('Erro ao verificar resposta:', error);
            res.json({ success: false, message: 'Erro interno' });
        }
    }
}

module.exports = QuizController;