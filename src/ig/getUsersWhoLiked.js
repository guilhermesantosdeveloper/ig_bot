const {delay} = require('../utils/delay')
const cheerio = require('cheerio');

async function getUsersWhoLiked(linkPub,usersFollowingList, page) {
  // entra em uma publicacao e retorna as ultimas pessoas que seguiram a pub que nao estou seguindo
  let usersWhoLiked = []



  const pub = `${linkPub}liked_by/`;
  await page.goto(pub, { timeout: 0 })
  await delay(2000)
  const conteudo = await page.content();


  const $ = cheerio.load(conteudo);
  const linksConteudo = $('a')
  for (let i = 0; i < linksConteudo.length; i++) {
    const link = linksConteudo[i];
    const href = $(link).attr('href')
    const style = $(link).attr('style')

    if (style !== undefined) {
      const userName = href.replace(/\//g, '');
      const imFollowing = usersFollowingList.find(element => element === userName)
      if(!imFollowing){
        usersWhoLiked.push(`https://www.instagram.com${href}`)
      }


    }
  }
  usersWhoLiked = usersWhoLiked.filter((este, i) => usersWhoLiked.indexOf(este) === i);

  return usersWhoLiked
}



module.exports={getUsersWhoLiked}
