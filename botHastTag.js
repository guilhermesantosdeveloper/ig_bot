const puppeteer = require('puppeteer');
require('dotenv').config()
const cheerio = require('cheerio');

const { login } = require('./src/ig/login');
const { getPubInfluencer } = require('./src/ig/getPubInfluencer')
const { getUsersWhoLiked } = require('./src/ig/getUsersWhoLiked')
const { followingProfile } = require('./src/ig/followingProfile')
const email = process.env.EMAIL;
const senha = process.env.SENHA;

const url = 'https://www.instagram.com/'

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}


async function main() {

  const { page, browser } = await login(email, senha)

  const hashTag = 'comerciosp'
  //entrando na tag
  await page.goto(`https://www.instagram.com/explore/tags/${hashTag}`, { timeout: 0 })

  await delay(10000)

  // pegando qtd de pub dessa hashtag
  const numPubHashTag = await page.evaluate((e) => {
    let span = document.querySelector('header span>span');
    let numPub = span.innerText
    numPub = numPub.replace(/\./g, '')
    numPub = parseInt(numPub, 10);

    return numPub
  })

  console.log(numPubHashTag, typeof numPubHashTag);

  // pegar x numeros de publicacao links
  let pubs = []
  let salto = 1000;
  let contador = 1;

  while (pubs.length < 20) {
    let links = await page.$$('a')
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const href = await link.evaluate(h => h.getAttribute('href'))
      const regex = /\/p\//g

      if (regex.test(href)) {
        pubs.push(`https://www.instagram.com${href}`)
      }

    }


    pubs = pubs.filter((este, i) => pubs.indexOf(este) === i);
    await page.evaluate((salto, contador) => {
      window.scroll({ top: (salto * contador), left: 0, behavior: 'smooth' })
    }, salto, contador)
    contador += contador;




  }
  console.log(pubs);


  // entrar na publicacao e pegar nomedeusuario

  for (let i = 0; i < pubs.length; i++) {
    const linkPub = pubs[i];
    await page.goto(linkPub, { timeout: 0 })
    await delay(5000)


    const content = await page.content()
    const $ = cheerio.load(content);

    let profiles = []
    const linksConteudo = $('a')
    for (let i = 0; i < linksConteudo.length; i++) {
      const link = linksConteudo[i];
      const href = $(link).attr('href')
      const style = $(link).attr('style')
      if (style !== undefined) {
        const userName = href.replace(/\//g, '');
        const link = `https://www.instagram.com${href}`
        profiles.push({ userName, link })



      }
    }

    let anterior = ''
    let profilesOnly = []
    profiles = profiles.forEach((este, i) => {
      let atual = este.userName;
      if (atual !== anterior) {
        profilesOnly.push(este)
      }
      anterior = este.userName;
    });

    console.log(profilesOnly);
    const authorPub = profilesOnly[0];
    console.log(authorPub);
  }



  //await browser.close()
}


main();

