import pool from '../config/database.js';

/**
 * Busca todos os conteúdos de introdução ordenados por ordem
 */
export async function getConteudoIntro() {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM conteudo_intro WHERE ativo = TRUE ORDER BY ordem ASC'
    );
    return rows;
  } catch (error) {
    console.error('Erro ao buscar conteúdo intro:', error);
    throw error;
  }
}

/**
 * Busca um conteúdo de introdução específico pela ordem
 */
export async function getConteudoIntroPorOrdem(ordem) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM conteudo_intro WHERE ordem = ? AND ativo = TRUE',
      [ordem]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Erro ao buscar conteúdo intro por ordem:', error);
    throw error;
  }
}

/**
 * Busca um conteúdo de introdução específico pelo ID
 */
export async function getConteudoIntroPorId(id) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM conteudo_intro WHERE id = ? AND ativo = TRUE',
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Erro ao buscar conteúdo intro por ID:', error);
    throw error;
  }
}

export default {
  getConteudoIntro,
  getConteudoIntroPorOrdem,
  getConteudoIntroPorId
};
