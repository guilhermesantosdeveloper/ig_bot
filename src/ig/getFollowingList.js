const {list} = require('../database/following');


async function getFollowingList() {
  let array=[];

  let followingList = await list()
  for (let i = 0; i < followingList.length; i++) {
    const follwing = followingList[i];
    const username = follwing.username;
    array.push(username);

  }

  return array
}

module.exports={getFollowingList}
