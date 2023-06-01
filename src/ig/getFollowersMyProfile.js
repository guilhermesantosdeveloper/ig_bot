async function getFollowersMyProfile(myProfile, page) {
  const linkProfile = `https://www.instagram.com/${myProfile}`
  const linkFollowers = `https://www.instagram.com/${myProfile}/followers`
  await page.goto(linkProfile, { timeout: 0 })
  await delay(2000)

  const numSeguidores = await page.evaluate((e) => {
    const a = document.querySelector('a[href="/mrbotchat/followers/"]')
    const txt = a.innerText;
    let num = txt.replace(/seguidores /, '')
    num = parseInt(num, 10)
    return num
  })
  await page.goto(linkFollowers, { timeout: 0 })
  await delay(2000)

  let salto = 1000;
  const listSeguidores = await page.evaluate(async (numSeguidores, salto) => {
    let div = document.querySelector('div[style="display: flex; flex-direction: column; height: 100%; max-width: 100%;"]')

    let list = [];
    const el = document.querySelector('div[style="height: auto; overflow: hidden auto;"]').parentElement;

    const delay = (delayInms) => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    }


    for (let i = 0; i < numSeguidores; i++) {
      await delay(2000)
      let nodeA = div.querySelectorAll('a');
      for (let i = 0; i < nodeA.length; i++) {
        const a = nodeA[i];
        const style = a.getAttribute('style')
        const href = a.getAttribute('href')
        if (!style) {
          list.push(a.innerText)
        }

      }

      el.scrollBy((i * salto), (i * salto))


      list = list.filter((este, i) => list.indexOf(este) === i);
      if (list.length === numSeguidores) {
        break
      }

    }


    list = list.filter((este, i) => list.indexOf(este) === i);

    return list
  }, numSeguidores, salto)


  for (let i = 0; i < listSeguidores.length; i++) {
    const username = listSeguidores[i];
    await createFollower(username)

  }
}

module.exports={getFollowersMyProfile}
