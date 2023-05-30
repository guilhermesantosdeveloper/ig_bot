const {delay} = require('../utils/delay')
const { create } = require('../database/publications')

async function getPubInfluencer(influencer, numPub, page, idInfluencer) {
  // entrando na pagina de influencer
  await page.goto(`https://www.instagram.com/${influencer}/`, { timeout: 0 })
  // pegar x ultimas publicacoes
  // await delay(5000)
  let pubs = []
  // numero de publicacoes



  let salto = 1000;
  let contador = 1;
  while (pubs.length < numPub) {
    await delay(5000)
    let links = await page.$$('a')
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const href = await link.evaluate(h => h.getAttribute('href'))
      const regex = /\/p\//g

      if (regex.test(href)) {
        const link = `https://www.instagram.com${href}`
        pubs.push(link)

      }

    }


    pubs = pubs.filter((este, i) => pubs.indexOf(este) === i);
    await page.evaluate((salto, contador) => {
      window.scroll({ top: (salto * contador), left: 0, behavior: 'smooth' })
    }, salto, contador)
    contador += contador;




  }

  for (let i = 0; i < pubs.length; i++) {
    const link = pubs[i];
    await create(link,idInfluencer)

  }


}


module.exports={getPubInfluencer}
