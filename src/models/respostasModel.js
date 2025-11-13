import pool from '../config/database.js';

/**
 * Busca todas as respostas de uma pergunta específica
 */
export async function getRespostasPorPergunta(idPergunta) {
  try {
    const [rows] = await pool.query(
      'SELECT id, id_pergunta, titulo, imagem FROM respostas WHERE id_pergunta = ? ORDER BY id ASC',
      [idPergunta]
    );
    // Formata as imagens para começar com /
    return rows.map(resposta => ({
      ...resposta,
      imagem: resposta.imagem ? (resposta.imagem.startsWith('/') ? resposta.imagem : '/' + resposta.imagem) : null
    }));
  } catch (error) {
    console.error('Erro ao buscar respostas por pergunta:', error);
    throw error;
  }
}

/**
 * Busca uma resposta específica pelo ID (incluindo campo 'correta')
 */
export async function getRespostaPorId(id) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM respostas WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Erro ao buscar resposta por ID:', error);
    throw error;
  }
}

export default {
  getRespostasPorPergunta,
  getRespostaPorId
};