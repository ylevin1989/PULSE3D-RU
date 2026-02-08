import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://pulse_user:pulse_password@localhost:5432/pulse_db',
});

export default pool;
