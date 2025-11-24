import pool from '../config/database.js';

/**
 * Busca todas as respostas de um quiz específico (pela id_pagina)
 */
export async function getRespostasQuizPorPagina(idPagina) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM respostas_quiz WHERE id_pagina = ? ORDER BY id ASC',
      [idPagina]
    );
    return rows;
  } catch (error) {
    console.error('Erro ao buscar respostas do quiz:', error);
    throw error;
  }
}

/**
 * Busca uma resposta específica pelo ID
 */
export async function getRespostaPorId(id) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM respostas_quiz WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Erro ao buscar resposta por ID:', error);
    throw error;
  }
}

/**
 * Busca respostas sem expor o campo 'correta' (para segurança)
 */
export async function getRespostasQuizPorPaginaSemCorreta(idPagina) {
  try {
    const [rows] = await pool.query(
      'SELECT id, id_pagina, titulo, imagem FROM respostas_quiz WHERE id_pagina = ? ORDER BY id ASC',
      [idPagina]
    );
    return rows;
  } catch (error) {
    console.error('Erro ao buscar respostas do quiz:', error);
    throw error;
  }
}

export default {
  getRespostasQuizPorPagina,
  getRespostaPorId,
  getRespostasQuizPorPaginaSemCorreta
};
