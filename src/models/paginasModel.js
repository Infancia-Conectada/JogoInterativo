import pool from '../config/database.js';

/**
 * Busca todas as páginas ordenadas por ordem
 */
export async function getPaginas() {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM paginas WHERE ativo = TRUE ORDER BY ordem ASC'
    );
    return rows;
  } catch (error) {
    console.error('Erro ao buscar páginas:', error);
    throw error;
  }
}

/**
 * Busca uma página específica pela ordem
 */
export async function getPaginaPorOrdem(ordem) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM paginas WHERE ordem = ? AND ativo = TRUE',
      [ordem]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Erro ao buscar página por ordem:', error);
    throw error;
  }
}

/**
 * Busca uma página específica pelo ID
 */
export async function getPaginaPorId(id) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM paginas WHERE id = ? AND ativo = TRUE',
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Erro ao buscar página por ID:', error);
    throw error;
  }
}

/**
 * Busca todas as páginas de um nível específico
 */
export async function getPaginasPorNivel(nivel) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM paginas WHERE nivel = ? AND ativo = TRUE ORDER BY ordem ASC',
      [nivel]
    );
    return rows;
  } catch (error) {
    console.error('Erro ao buscar páginas por nível:', error);
    throw error;
  }
}

/**
 * Busca todas as páginas de um tipo específico
 */
export async function getPaginasPorTipo(tipo) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM paginas WHERE tipo = ? AND ativo = TRUE ORDER BY ordem ASC',
      [tipo]
    );
    return rows;
  } catch (error) {
    console.error('Erro ao buscar páginas por tipo:', error);
    throw error;
  }
}

/**
 * Busca páginas de um nível específico e de um tipo específico
 */
export async function getPaginasPorNivelETipo(nivel, tipo) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM paginas WHERE nivel = ? AND tipo = ? AND ativo = TRUE ORDER BY ordem ASC',
      [nivel, tipo]
    );
    return rows;
  } catch (error) {
    console.error('Erro ao buscar páginas por nível e tipo:', error);
    throw error;
  }
}

/**
 * Busca intros específicas
 */
export async function getIntros() {
  return getPaginasPorTipo('intro');
}

/**
 * Busca explicações tipo 1
 */
export async function getExplicacoes1() {
  return getPaginasPorTipo('explicacao_1');
}

/**
 * Busca explicações tipo 2
 */
export async function getExplicacoes2() {
  return getPaginasPorTipo('explicacao_2');
}

/**
 * Busca quizzes
 */
export async function getQuizzes() {
  return getPaginasPorTipo('quiz');
}

/**
 * Busca a próxima página após a ordem atual
 */
export async function getProximaPagina(ordem) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM paginas WHERE ordem > ? AND ativo = TRUE ORDER BY ordem ASC LIMIT 1',
      [ordem]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Erro ao buscar próxima página:', error);
    throw error;
  }
}

/**
 * Busca a página anterior à ordem atual
 */
export async function getPaginaAnterior(ordem) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM paginas WHERE ordem < ? AND ativo = TRUE ORDER BY ordem DESC LIMIT 1',
      [ordem]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Erro ao buscar página anterior:', error);
    throw error;
  }
}

export default {
  getPaginas,
  getPaginaPorOrdem,
  getPaginaPorId,
  getPaginasPorNivel,
  getPaginasPorTipo,
  getPaginasPorNivelETipo,
  getIntros,
  getExplicacoes1,
  getExplicacoes2,
  getQuizzes,
  getProximaPagina,
  getPaginaAnterior
};
