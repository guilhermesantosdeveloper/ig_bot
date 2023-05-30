const sqlite3 = require('sqlite3').verbose();
const aaSqlite3 = require('aa-sqlite3');
const pino = require('../log');



async function create(username, link, dateFollowing = '', follower = 0, name = '', bio = '', linkProfile = '', category = '', originPub = null, originHash = null) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sqlInsert = `INSERT INTO following(username, link, date_following, follower, name, bio, link_profile, category, origin_pub, origin_hash)
  VALUES("${username}", "${link}","${dateFollowing}", ${follower}, "${name}","${bio}", "${linkProfile}", "${category}", ${originPub}, ${originHash})`
    await db.run(sqlInsert)



    await db.close();
  } catch (error) {
    pino.error(error)
    console.log(error);
  }

}

async function update(id, username, link, dateFollowing = '', follower = 0, name = '', bio = '', linkProfile = '', category = '', originPub = null, originHash = null) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sql = `UPDATE following SET username="${username}", link="${link}", date_following="${dateFollowing}", follower="${follower}", name="${name}", bio="${bio}", link_profile="${linkProfile}", category="${category}", origin_pub=${originPub}, origin_hash=${originHash} WHERE id=${id}`
    await db.run(sql)



    await db.close();
  } catch (error) {
    pino.error(error)
    console.log(error);
  }

}


async function updateByUsername(username, link, dateFollowing = '', follower = 0, name = '', bio = '', linkProfile = '', category = '', originPub = null, originHash = null) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sql = `UPDATE following SET link="${link}", date_following="${dateFollowing}", follower="${follower}", name="${name}", bio="${bio}", link_profile="${linkProfile}", category="${category}", origin_pub=${originPub}, origin_hash=${originHash} WHERE username="${username}"`
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
    const sql = `SELECT * FROM following WHERE id=${id}`
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
    const sql = `SELECT * FROM following WHERE username="${username}"`
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
    const sql = `DELETE FROM following WHERE username="${username}"`
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
    const sql = `DELETE FROM following WHERE id=${id}`
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

    const sql = `SELECT * FROM following`

    const profiles = await db.all(sql)

    await db.close();

    return profiles
  } catch (erro) {
    console.log(erro);
    pino.error(erro)
  }
}

module.exports = {
  create,
  update,
  updateByUsername,
  delet,
  deleteByUserName,
  showByUserName,
  show,
  list
}
