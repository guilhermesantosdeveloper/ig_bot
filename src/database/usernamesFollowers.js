const sqlite3 = require('sqlite3').verbose();
const aaSqlite3 = require('aa-sqlite3');
const pino = require('../log');



async function create(username) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sqlInsert = `INSERT OR IGNORE INTO  usernames_followers(username)
  VALUES("${username}")`
    await db.run(sqlInsert)



    await db.close();
  } catch (erro) {
    console.log(erro);
    pino.error(erro);
  }

}

async function list() {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sql = `SELECT * FROM usernames_followers`
    const list = await db.all(sql)



    await db.close();
    return list
  } catch (erro) {
    console.log(erro);
    pino.error(erro);
  }
}

async function listUsernames() {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sql = `SELECT * FROM usernames_followers`
    const list = await db.all(sql)
    let usernames = [];
    for (let i = 0; i < list.length; i++) {
      const user = list[i];
      const username = user.username
      usernames.push(username)

    }



    await db.close();

    return usernames
  } catch (erro) {
    console.log(erro);
    pino.error(erro);
  }
}


module.exports={
  create,
  list,
  listUsernames
}
