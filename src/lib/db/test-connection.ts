import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function testConnection() {
  try {
    console.log('🔌 Drizzle ORM 데이터베이스 연결 테스트 중...')
    
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL 환경 변수가 설정되지 않았습니다.')
    }
    
    // Create postgres client
    const client = postgres(process.env.DATABASE_URL)
    const db = drizzle(client)
    
    // Test query
    const result = await client`SELECT NOW() as current_time, version() as version`
    
    console.log('✅ 데이터베이스 연결 성공!')
    console.log('📅 현재 시간:', result[0].current_time)
    console.log('🗄️ PostgreSQL 버전:', result[0].version.split(' ')[0])
    
    await client.end()
    return true
  } catch (error) {
    console.error('❌ 데이터베이스 연결 실패:', error)
    return false
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testConnection()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

export { testConnection }
