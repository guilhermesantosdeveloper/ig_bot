const sqlite3 = require('sqlite3').verbose();
const aaSqlite3 = require('aa-sqlite3');
const pino = require('../log');



async function show(id) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sql = `SELECT * FROM config WHERE id=${id}`
    const config = await db.get(sql);

    await db.close();

    return config;

  } catch (erro) {
    pino.error(erro);
    console.log(erro);
  }
}


module.exports={
  show
}
