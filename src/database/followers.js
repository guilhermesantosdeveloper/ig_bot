const sqlite3 = require('sqlite3').verbose();
const aaSqlite3 = require('aa-sqlite3');
const pino = require('../log');



async function create(username, link,name='',bio='',linkProfile='',category='') {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sqlInsert = `INSERT INTO followers(username, link, name, bio, link_profile, category)
  VALUES("${username}", "${link}", "${name}","${bio}", "${linkProfile}", "${category}")`
    await db.run(sqlInsert)



    await db.close();
  } catch (error) {
    pino.error(error)
    console.log(error);
  }

}

async function update(id,username, link,name='',bio='',linkProfile='',category='') {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sql = `UPDATE followers SET username="${username}", link="${link}", name="${name}", bio="${bio}", link_profile="${linkProfile}", category="${category}" WHERE id=${id}`
    await db.run(sql)



    await db.close();
  } catch (error) {
    pino.error(error)
    console.log(error);
  }

}


async function updateByUsername(username, link,name='',bio='',linkProfile='',category='') {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sql = `UPDATE followers SET username="${username}", link="${link}", name="${name}", bio="${bio}", link_profile="${linkProfile}", category="${category}" WHERE username="${username}"`
    await db.run(sql)



    await db.close();
  } catch (error) {
    pino.error(error)
    console.log(error);
  }

}

async function show(id) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sql = `SELECT * FROM followers WHERE id=${id}`
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
    const sql = `SELECT * FROM followers WHERE username="${username}"`
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
    const sql = `DELETE FROM followers WHERE username="${username}"`
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
    const sql = `DELETE FROM followers WHERE id=${id}`
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

    const sql = `SELECT * FROM followers`

    const profiles = await db.all(sql)

    await db.close();

    return profiles
  } catch (erro) {
    console.log(erro);
    pino.error(erro)
  }
}

module.exports={
  create,
  update,
  updateByUsername,
  delet,
  deleteByUserName,
  showByUserName,
  show,
  list
}
