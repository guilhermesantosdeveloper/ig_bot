const puppeteer = require('puppeteer');
require('dotenv').config()

const { login } = require('./src/ig/login');
const { getPubInfluencer } = require('./src/ig/getPubInfluencer')
const { getUsersWhoLiked } = require('./src/ig/getUsersWhoLiked')
const { followingProfilePub } = require('./src/ig/followingProfile')
const {show:shoConfig} = require('./src/database/config')
const { getFollowingList } = require('./src/ig/getFollowingList')
const {list:listPubs} = require('./src/database/publications');
const {list:listProfiles} = require('./src/database/profilesToFollow');


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
  const config = await shoConfig(1);
  const qtdPubInfluencer = config.qtd_pub_influencer;
  const numFollowing = config.num_following;
  const followForMinute = config.following_for_minute;
  const idInfluencer = 1

  await getPubInfluencer('alexvargaspro', qtdPubInfluencer, page,idInfluencer)


  let usersFollowingList = await getFollowingList();
  const pubs = await listPubs()
  for (let i = 0; i < pubs.length; i++) {
    const pub = pubs[i];
    const linkPub = pub.link;
    const idPub = pub.id
    await getUsersWhoLiked(linkPub,usersFollowingList,page,idPub)
  }




  // salvar publicacoes para o id do influencer
  let usersWhoLiked = await listProfiles();

  for (let i = 0; i < numFollowing; i++) {
    const user = usersWhoLiked[i];
    const username = user.username;
    const idPub = user.id
    await followingProfilePub(username,page,idPub,followForMinute)

  }






  await browser.close()

}


main();

