module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/fantacalcio'
  },
  production: {
  	debug: true,
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true
  }
};