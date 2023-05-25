const puppeteer = require('puppeteer');

const email = process.env.EMAIL;
const senha = process.env.SENHA;

const url = 'https://www.instagram.com/';
const myUserName = 'mrbotchat'

async function main() {
  const browser = await puppeteer.launch({
    userDataDir: './user_data',
    headless: false,
    executablePath: '/opt/google/chrome/chrome'

  });
  const page = await browser.newPage();
  await page.goto(url, { timeout: 0 })

  // await delay(5000)

  let logado = await page.evaluate(async (e) => {
    const mount = document.querySelector("input[aria-label='Telefone, nome de usuário ou email']")
    console.log(mount);
    console.log(typeof mount);
    if (mount === null) {
      return true
    } else {
      return false
    }

  });

  if (logado === false) {
    const inputEmail = "input[aria-label='Telefone, nome de usuário ou email']";
    const inputSenha = "input[aria-label='Senha']";
    const buttonEntrar = 'button>div';
    await page.waitForSelector(inputEmail, { timeout: 0 })

    await page.type(inputEmail, email, { delay: 450 })
    await page.type(inputSenha, senha, { delay: 450 })
    await page.click(buttonEntrar)


  }

  await page.goto(`${url}${myUserName}/following`, { timeout: 0 })

  // seletor de links com perfis span>div>div>div>a

  //await browser.close()




}

main();
