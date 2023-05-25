const puppeteer = require('puppeteer');
require('dotenv').config()

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

  const pubs = await getPubInfluencer('alexvargaspro', 20, page)


  //let usersFollowingList = await getFollwingsList()
  let usersFollowingList = ['adrianofdm', 'joyce_oliveira_s2__', 'rodrigobysouza']
  let usersWhoLiked = await getUsersWhoLiked(pubs[6], usersFollowingList, page)

  // salvar publicacoes para o id do influencer

  const profileUser = usersWhoLiked[25];
  await followingProfile(profileUser,page)



  await browser.close()

}


main();

