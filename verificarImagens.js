import pool from './src/config/database.js';

async function verificar() {
  try {
    // Buscar uma resposta com imagem
    const [respostas] = await pool.query(
      'SELECT * FROM respostas_quiz WHERE imagem IS NOT NULL LIMIT 3'
    );
    
    console.log('Respostas com imagens:');
    respostas.forEach(r => {
      console.log(`  - ID: ${r.id}`);
      console.log(`    Título: ${r.titulo}`);
      console.log(`    Imagem: ${r.imagem}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Erro:', error.message);
    process.exit(1);
  }
}

verificar();
