import pool from '../config/database.js';

/**
 * Busca todos os conteúdos de explicação 2 ordenados por ordem
 */
export async function getExplicacao2() {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM explicacao_2 WHERE ativo = TRUE ORDER BY ordem ASC'
    );
    return rows;
  } catch (error) {
    console.error('Erro ao buscar explicação 2:', error);
    throw error;
  }
}

/**
 * Busca um conteúdo de explicação 2 específico pela ordem
 */
export async function getExplicacao2PorOrdem(ordem) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM explicacao_2 WHERE ordem = ? AND ativo = TRUE',
      [ordem]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Erro ao buscar explicação 2 por ordem:', error);
    throw error;
  }
}

/**
 * Busca um conteúdo de explicação 2 específico pelo ID
 */
export async function getExplicacao2PorId(id) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM explicacao_2 WHERE id = ? AND ativo = TRUE',
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Erro ao buscar explicação 2 por ID:', error);
    throw error;
  }
}

export default {
  getExplicacao2,
  getExplicacao2PorOrdem,
  getExplicacao2PorId
};
