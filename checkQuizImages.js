import pool from './src/config/database.js';

async function check() {
  try {
    // Buscar todas as respostas de quiz
    const [todas] = await pool.query('SELECT * FROM respostas_quiz ORDER BY id_pagina');
    
    console.log('Respostas do Quiz:');
    todas.forEach(r => {
      console.log(`ID: ${r.id} | Página: ${r.id_pagina} | Imagem: ${r.imagem || 'NULL'} | Título: ${r.titulo.substring(0, 30)}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Erro:', error.message);
    process.exit(1);
  }
}

check();
