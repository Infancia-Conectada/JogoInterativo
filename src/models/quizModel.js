const { pool } = require('../config/database');

class QuizModel {
    // Buscar pergunta por posição
    static async buscarPerguntaPorPosicao(posicao) {
        try {
            const sql = `
                SELECT p.id, p.titulo, p.nivel, p.posicao,
                       r.id as resposta_id, r.titulo as resposta_titulo, 
                       r.imagem, r.correta
                FROM perguntas p
                LEFT JOIN respostas r ON p.id = r.id_pergunta
                WHERE p.posicao = ?
                ORDER BY r.id
            `;

            const [resultados] = await pool.execute(sql, [posicao]);
            
            if (resultados.length === 0) {
                return null;
            }
            
            const pergunta = {
                id: resultados[0].id,
                titulo: resultados[0].titulo,
                nivel: resultados[0].nivel,
                posicao: resultados[0].posicao,
                respostas: []
            };
            
            resultados.forEach(row => {
                if (row.resposta_id) {
                    pergunta.respostas.push({
                        id: row.resposta_id,
                        titulo: row.resposta_titulo,
                        imagem: row.imagem,
                        correta: row.correta,
                        letra: String.fromCharCode(65 + pergunta.respostas.length) // A, B, C, D
                    });
                }
            });
            
            return pergunta;
        } catch (error) {
            console.error('Erro ao buscar pergunta:', error);
            throw error;
        }
    }

    // Buscar pergunta por nível e posição dentro do nível
    static async buscarPerguntaPorNivelEPosicao(nivel, posicaoNoNivel) {
        try {
            const sql = `
                SELECT p.id, p.titulo, p.nivel, p.posicao,
                       r.id as resposta_id, r.titulo as resposta_titulo, 
                       r.imagem, r.correta
                FROM perguntas p
                LEFT JOIN respostas r ON p.id = r.id_pergunta
                WHERE p.nivel = ?
                ORDER BY p.posicao, r.id
                LIMIT ?, 1
            `;
            
            // Offset para pegar a pergunta na posição específica do nível
            const offset = (posicaoNoNivel - 1) * 4; // 4 = número de respostas por pergunta
            
            const [resultados] = await pool.execute(sql, [nivel, offset]);
            
            if (resultados.length === 0) {
                return null;
            }
            
            const pergunta = {
                id: resultados[0].id,
                titulo: resultados[0].titulo,
                nivel: resultados[0].nivel,
                posicao: resultados[0].posicao,
                respostas: []
            };
            
            resultados.forEach(row => {
                if (row.resposta_id) {
                    pergunta.respostas.push({
                        id: row.resposta_id,
                        titulo: row.resposta_titulo,
                        imagem: row.imagem,
                        correta: row.correta,
                        letra: String.fromCharCode(65 + pergunta.respostas.length)
                    });
                }
            });
            
            return pergunta;
        } catch (error) {
            console.error('Erro ao buscar pergunta por nível:', error);
            throw error;
        }
    }

    // Contar perguntas por nível
    static async contarPerguntasPorNivel(nivel) {
        try {
            const sql = 'SELECT COUNT(*) as total FROM perguntas WHERE nivel = ?';
            const [resultado] = await pool.execute(sql, [nivel]);
            return resultado[0].total;
        } catch (error) {
            console.error('Erro ao contar perguntas por nível:', error);
            throw error;
        }
    }

    // Buscar todas as perguntas de um nível
    static async buscarPerguntasPorNivel(nivel) {
        try {
            const sql = `
                SELECT p.id, p.titulo, p.nivel, p.posicao,
                       r.id as resposta_id, r.titulo as resposta_titulo, 
                       r.imagem, r.correta
                FROM perguntas p
                LEFT JOIN respostas r ON p.id = r.id_pergunta
                WHERE p.nivel = ?
                ORDER BY p.posicao, r.id
            `;
            
            const [resultados] = await pool.execute(sql, [nivel]);
            
            const perguntasMap = new Map();
            
            resultados.forEach(row => {
                if (!perguntasMap.has(row.id)) {
                    perguntasMap.set(row.id, {
                        id: row.id,
                        titulo: row.titulo,
                        nivel: row.nivel,
                        posicao: row.posicao,
                        respostas: []
                    });
                }
                
                if (row.resposta_id) {
                    const pergunta = perguntasMap.get(row.id);
                    pergunta.respostas.push({
                        id: row.resposta_id,
                        titulo: row.resposta_titulo,
                        imagem: row.imagem,
                        correta: row.correta,
                        letra: String.fromCharCode(65 + pergunta.respostas.length)
                    });
                }
            });
            
            return Array.from(perguntasMap.values());
        } catch (error) {
            console.error('Erro ao buscar perguntas por nível:', error);
            throw error;
        }
    }

    // Verificar resposta
    static async verificarResposta(respostaId) {
        try {
            const sql = 'SELECT correta FROM respostas WHERE id = ?';
            const [resultado] = await pool.execute(sql, [respostaId]);
            
            if (resultado.length === 0) {
                return { valida: false };
            }
            
            return {
                valida: true,
                correta: resultado[0].correta
            };
        } catch (error) {
            console.error('Erro ao verificar resposta:', error);
            throw error;
        }
    }
}

module.exports = QuizModel;