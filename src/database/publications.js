const sqlite3 = require('sqlite3').verbose();
const aaSqlite3 = require('aa-sqlite3');
const pino = require('../log');


async function create(link, idInfluencer = null) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sqlInsert = `INSERT INTO publications(id_influencer, link)
  VALUES(${idInfluencer}, "${link}")`
    await db.run(sqlInsert)



    await db.close();
  } catch (error) {
    pino.error(error)
    console.log(error);
  }

}


async function showById(id) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sqlShow = `SELECT * FROM publications WHERE id = ${id}`
    const pub = await db.get(sqlShow)



    await db.close();
    return pub
  } catch (error) {
    pino.error(error)
    console.log(error);
  }
}


async function showByLink(link) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sqlShow = `SELECT * FROM publications WHERE link = "${link}"`
    const pub = await db.get(sqlShow)



    await db.close();
    return pub
  } catch (error) {
    pino.error(error)
    console.log(error);
  }
}


async function list() {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sqlShow = `SELECT * FROM publications`
    const pubs = await db.all(sqlShow)



    await db.close();
    return pubs
  } catch (error) {
    pino.error(error)
    console.log(error);
  }
}


async function updateById(id, link, idInfluencer = null) {
  try {
    let sqlUptade;
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    if (!idInfluencer) {
      sqlUptade = `UPDATE publications SET link = "${link}" WHERE id = ${id}`
    } else {
      sqlUptade = `UPDATE publications SET id_influencer = ${idInfluencer}, link = "${link}" WHERE id = ${id}`
    }

    await db.run(sqlUptade);

    await db.close();
  } catch (error) {
    pino.error(error)
    console.log(error);
  }
}


async function updateByLink(linkOld, link, idInfluencer = null) {
  try {
    let sqlUptade;
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    if (!idInfluencer) {
      sqlUptade = `UPDATE publications SET link = "${link}" WHERE link = "${linkOld}"`
    } else {
      sqlUptade = `UPDATE publications SET id_influencer = ${idInfluencer}, link = "${link}" WHERE link = "${linkOld}"`
    }

    await db.run(sqlUptade);

    await db.close();
  } catch (error) {
    pino.error(error)
    console.log(error);
  }
}


async function deleteById(id) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sqlDelete = `DELETE FROM publications WHERE id = ${id}`
    await db.run(sqlDelete);


    await db.close();

  } catch (error) {
    pino.error(error)
    console.log(error);
  }
}


async function deleteByLink(link) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sqlDelete = `DELETE FROM publications WHERE link = "${link}"`
    await db.run(sqlDelete);


    await db.close();

  } catch (error) {
    pino.error(error)
    console.log(error);
  }
}


// testes

// let id = 1
// let link = 'https://www.instagram.com/p/CnxFLYBpuZ9/'

// create(id,link);


// async function main() {
//   // let id = 1
//   // let link = 'https://www.instagram.com/p/CnxFLYBpuZ9/'
//   //console.log(await showById(id));
//   //console.log(await showByLink(link));
//   // console.log(await list());

//   // let idNew = 50
//   // let id = 1
//   // let linkOld = 'https://www.instagram.com/p/55555555555555/'
//   // let link = 'https://www.instagram.com/p/4444444/'
//   // // await updateById(id,link, idNew)

//   // await updateByLink(linkOld,link)

//   // await deleteById(1);
// }

// main();

module.exports = {
  create,
  showById,
  showByLink,
  updateById,
  updateByLink,
  list,
  deleteById,
  deleteByLink
}
