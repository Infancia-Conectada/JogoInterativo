import mysql from 'mysql2';

// Cria a conexão
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // coloque sua senha aqui, se tiver
  database: 'jogo-interativo'
});

// Testa a conexão
connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
  } else {
    console.log('✅ Conectado ao banco de dados MySQL!');
  }
});

export default connection;
