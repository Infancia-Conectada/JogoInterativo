import pool from '../config/database.js';

/**
 * Busca todos os conteúdos de explicação 1 ordenados por ordem
 */
export async function getExplicacao1() {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM explicacao_1 WHERE ativo = TRUE ORDER BY ordem ASC'
    );
    return rows;
  } catch (error) {
    console.error('Erro ao buscar explicação 1:', error);
    throw error;
  }
}

/**
 * Busca um conteúdo de explicação 1 específico pela ordem
 */
export async function getExplicacao1PorOrdem(ordem) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM explicacao_1 WHERE ordem = ? AND ativo = TRUE',
      [ordem]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Erro ao buscar explicação 1 por ordem:', error);
    throw error;
  }
}

/**
 * Busca um conteúdo de explicação 1 específico pelo ID
 */
export async function getExplicacao1PorId(id) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM explicacao_1 WHERE id = ? AND ativo = TRUE',
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Erro ao buscar explicação 1 por ID:', error);
    throw error;
  }
}

export default {
  getExplicacao1,
  getExplicacao1PorOrdem,
  getExplicacao1PorId
};
