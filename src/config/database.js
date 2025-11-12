import mysql from 'mysql2';

// Configurações de conexão com o banco de dados
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'jogo-interativo',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10, // Limite de conexões no pool
};

// Criar pool de conexões
const pool = mysql.createPool(dbConfig);

// Função para testar a conexão
export const testConnection = async () => {
  try {
    const connection = await pool.promise().getConnection();
    console.log('✅ Conexão com banco de dados MySQL estabelecida com sucesso!');
    console.log(`📊 Banco: ${dbConfig.database}`);
    console.log(`🏠 Host: ${dbConfig.host}:${dbConfig.port}`);
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error.message);
    return false;
  }
};

// Exportar o pool como padrão (com suporte a promises)
export default pool.promise();
