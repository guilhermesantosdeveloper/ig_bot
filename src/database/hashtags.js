const sqlite3 = require('sqlite3').verbose();
const aaSqlite3 = require('aa-sqlite3');
const pino = require('../log');


async function create(name, numberPublications=null,category = null) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sqlInsert = `INSERT INTO hashtags(name, category, number_publications)
  VALUES("${name}", "${category}", ${numberPublications})`
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
    const sqlShow = `SELECT * FROM hashtags WHERE id = ${id}`
    const hashtag = await db.get(sqlShow)



    await db.close();
    return hashtag
  } catch (error) {
    pino.error(error)
    console.log(error);
  }
}


async function showByName(name) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sqlShow = `SELECT * FROM hashtags WHERE name = "${name}"`
    const hashtag = await db.get(sqlShow)



    await db.close();
    return hashtag
  } catch (error) {
    pino.error(error)
    console.log(error);
  }
}


async function list() {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sqlShow = `SELECT * FROM hashtags`
    const hashtags = await db.all(sqlShow)



    await db.close();
    return hashtags
  } catch (error) {
    pino.error(error)
    console.log(error);
  }
}


async function updateById(id, name, numberPublications=null,category = null) {
  try {
    let sqlUptade;
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));

    sqlUptade = `UPDATE hashtags SET name = "${name}", category = "${category}", number_publications=${numberPublications} WHERE id = ${id}`


    await db.run(sqlUptade);

    await db.close();
  } catch (error) {
    pino.error(error)
    console.log(error);
  }
}


async function updateByName(name, numberPublications=null,category = null) {
  try {
    let sqlUptade;
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));


      sqlUptade = `UPDATE hashtags SET category = "${category}", number_publications=${numberPublications} WHERE name = "${name}"`


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
    const sqlDelete = `DELETE FROM hashtags WHERE id = ${id}`
    await db.run(sqlDelete);


    await db.close();

  } catch (error) {
    pino.error(error)
    console.log(error);
  }
}


async function deleteByName(name) {
  try {
    const db = aaSqlite3(new sqlite3.Database('./database.sqlite3'));
    const sqlDelete = `DELETE FROM hashtags WHERE name = "${name}"`
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
  showByName,
  updateById,
  updateByName,
  list,
  deleteById,
  deleteByName
}
