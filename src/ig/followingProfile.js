const {delay} = require('../utils/delay')

async function private(page) {
  let privado = false;
  privado = await page.evaluate(async (e) => {
    const h2s = document.querySelectorAll("h2")

    for (let i = 0; i < h2s.length; i++) {
      const h2 = h2s[i];
      console.log(h2.innerText);
      if (h2.innerText === 'Esta conta é privada') {
        return true
      }
    }


  });

  return privado
}


async function follow(page) {
  const buttonsProfile = await page.$$('button');
    for (let i = 0; i < buttonsProfile.length; i++) {
      const btn = buttonsProfile[i];
      let txt = await btn.evaluate(h => h.innerText)
      txt = txt.toLowerCase();


      if (txt === 'seguir') {
        //
        await btn.evaluate(h => h.click())
      }

    }
}

async function getInfosProfile(page){
  const section = await page.$('main section');

    let infos = await section.evaluate((e) => {
      let obj = {};
      let bio = document.querySelector('h1')
      let userName = document.querySelector('h2').innerText;
      if (bio !== null) {
        bio = bio.innerText;
        let nome;
        let category;
        let link;
        let links = document.querySelectorAll('main section div>a')

        for (let i = 0; i < links.length; i++) {
          const l = links[i];
          if (l.getAttribute('class') === null) {
            link = l.getAttribute('href')
          }

        }

        let divs = document.querySelectorAll('div');

        let secaoDeBio;
        for (let i = 0; i < divs.length; i++) {
          const div = divs[i];
          let txt = div.innerText;
          if (txt.indexOf(bio) !== -1) {
            secaoDeBio = div;
          }

        }
        category = secaoDeBio.querySelector('div>div>div');
        if (category !== null) {
          category = category.innerText
        }
        let arrSecaoDeBio = secaoDeBio.innerText.split('\n');
        let arrBio = bio.split('\n')
        let arrSecaoDeBioDif = arrSecaoDeBio.filter(x => !arrBio.includes(x));

        console.log(arrSecaoDeBioDif);
        nome = arrSecaoDeBioDif[0];


        obj = { bio, userName, nome, link, category }

        return obj
      } else {
        return { userName }
      }

    })

    return infos
}

async function followingProfile(profileUser,page) {



  await page.goto(profileUser, { timeout: 0 })
  await delay(10000)


  let privado = await private(page);

  if (privado) {
    console.log('conta privada');
  } else {
    await follow(page);


    // capturar infos do profile
    let infos = await getInfosProfile(page)
    console.log(infos);


  }



}


module.exports={followingProfile}
