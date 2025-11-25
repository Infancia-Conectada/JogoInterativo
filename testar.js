import pool from './src/config/database.js';

async function testar() {
  try {
    console.log('Testando conexão...');
    
    // Teste 1: Verificar se a tabela existe
    const [tables] = await pool.query(
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'railway'"
    );
    console.log('\n✅ Tabelas encontradas:');
    tables.forEach(t => console.log(`  - ${t.TABLE_NAME}`));
    
    // Teste 2: Contar páginas
    const [paginas] = await pool.query('SELECT COUNT(*) as total FROM paginas');
    console.log(`\n✅ Total de páginas: ${paginas[0].total}`);
    
    // Teste 3: Buscar primeira página
    const [primeira] = await pool.query('SELECT * FROM paginas WHERE ordem = 1');
    console.log(`\n✅ Primeira página:`, primeira[0]);
    
    // Teste 4: Contar respostas de quiz
    const [respostas] = await pool.query('SELECT COUNT(*) as total FROM respostas_quiz');
    console.log(`\n✅ Total de respostas de quiz: ${respostas[0].total}`);
    
    console.log('\n🎉 Tudo funcionando!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    process.exit(1);
  }
}

testar();
