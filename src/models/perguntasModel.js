import pool from '../config/database.js';

/**
 * Busca todas as perguntas de um nível específico, ordenadas por posição
 */
export async function getPerguntasPorNivel(nivel) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM perguntas WHERE nivel = ? ORDER BY posicao ASC',
      [nivel]
    );
    return rows;
  } catch (error) {
    console.error('Erro ao buscar perguntas por nível:', error);
    throw error;
  }
}

/**
 * Busca uma pergunta específica pelo ID
 */
export async function getPerguntaPorId(id) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM perguntas WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Erro ao buscar pergunta por ID:', error);
    throw error;
  }
}

/**
 * Busca um número limitado de perguntas de um nível
 */
export async function getPerguntasLimitPorNivel(nivel, limit) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM perguntas WHERE nivel = ? ORDER BY posicao ASC LIMIT ?',
      [nivel, limit]
    );
    return rows;
  } catch (error) {
    console.error('Erro ao buscar perguntas com limite:', error);
    throw error;
  }
}

export default {
  getPerguntasPorNivel,
  getPerguntaPorId,
  getPerguntasLimitPorNivel
};