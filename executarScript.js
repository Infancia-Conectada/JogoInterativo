import mysql from 'mysql2';
import fs from 'fs';
import path from 'path';

// Conexão com Railway
const dbConfig = {
  host: 'hopper.proxy.rlwy.net',
  user: 'root',
  password: 'QuimrybwdadbzuFQIIRoGIrBrxeLUoEv',
  database: 'railway',
  port: 16416,
  multipleStatements: true
};

const pool = mysql.createPool(dbConfig);

// Ler o arquivo SQL
const sqlPath = path.join(process.cwd(), 'scripts', 'script_novo.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

// Executar o script
pool.promise().query(sql)
  .then(() => {
    console.log('✅ Script executado com sucesso no Railway!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Erro ao executar script:', error.message);
    process.exit(1);
  });
