const sqlite3 = require('sqlite3').verbose();
const aaSqlite3 = require('aa-sqlite3');
const pino = require('../log');





async function create(userName, link, pub=null, hashtag=null) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sql = `INSERT OR IGNORE INTO profiles_to_follow (username, link, pub, hashtag) VALUES ("${userName}", "${link}", ${pub}, ${hashtag})`
    await db.run(sql);

    await db.close();
  } catch (erro) {
    console.log(erro);
    pino.error(erro);
  }
}


async function update(id,userName, link, pub=null, hashtag=null) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sql = `UPDATE profiles_to_follow SET username="${userName}", link="${link}", pub=${pub}, hashtag=${hashtag} WHERE id=${id}`
    await db.run(sql);

    await db.close();
  } catch (erro) {
    console.log(erro);
    pino.error(erro);
  }
}


async function show(id) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sql = `SELECT * FROM profiles_to_follow WHERE id=${id}`
    const profile = await db.get(sql);

    await db.close();
    return profile;
  } catch (erro) {
    console.log(erro);
    pino.error(erro);
  }
}


async function showByUserName(username) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sql = `SELECT * FROM profiles_to_follow WHERE username="${username}"`
    const profile = await db.get(sql);

    await db.close();

    return profile;
  } catch (erro) {
    console.log(erro);
    pino.error(erro);
  }
}

async function deleteByUserName(username) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sql = `DELETE FROM profiles_to_follow WHERE username="${username}"`
    await db.run(sql);

    await db.close();

  } catch (erro) {
    console.log(erro);
    pino.error(erro);
  }
}

async function delet(id) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sql = `DELETE FROM profiles_to_follow WHERE id=${id}`
    await db.run(sql);

    await db.close();
  } catch (erro) {
    console.log(erro);
    pino.error(erro);
  }
}


async function list() {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));

    const sql = `SELECT * FROM profiles_to_follow`

    const profiles = await db.all(sql)

    await db.close();

    return profiles
  } catch (erro) {
    console.log(erro);
    pino.error(erro)
  }
}

// create('dodododo', 'https://www.instagram.com/dodododo/')
// //update(1,'dodododo', 'https://www.instagram.com/dodododo/')
// // show(1);
// deleteByUserName('dodododo')

module.exports={
  create,
  update,
  show,
  showByUserName,
  delet,
  deleteByUserName,
  list
}
