import pool from './src/config/database.js';

async function debug() {
  try {
    // Buscar o quiz 7 e suas respostas
    const [pagina] = await pool.query('SELECT * FROM paginas WHERE ordem = 7');
    const [respostas] = await pool.query(
      'SELECT id, id_pagina, titulo, imagem FROM respostas_quiz WHERE id_pagina = ? ORDER BY id ASC',
      [pagina[0].id]
    );
    
    console.log('Página (Quiz 7):');
    console.log(pagina[0]);
    console.log('\nRespostas:');
    respostas.forEach(r => {
      console.log(`ID: ${r.id} | Imagem: ${r.imagem} | Título: ${r.titulo}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Erro:', error.message);
    process.exit(1);
  }
}

debug();
