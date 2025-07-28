const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  try {
    console.log('데이터베이스 연결 테스트 중...');
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('✅ 데이터베이스 연결 성공!');
    console.log('현재 시간:', result.rows[0].now);
    client.release();
  } catch (error) {
    console.error('❌ 데이터베이스 연결 실패:', error.message);
  } finally {
    pool.end();
  }
}

testConnection();
