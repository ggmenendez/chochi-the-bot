const puppeteer = require('puppeteer');
const { C } = require('../../common');

const {
  REGEXP: { LINE_BREAKS },
  WHITESPACE,
} = C;

const GOTO_OPTIONS = { waitUntil: 'networkidle0' };
const LOGIN_TIMEOUT = 0;
const MEMBERSHIP_TIMEOUT = 10000;

const ACCOUNT_URL = 'https://clientes.sputnikclimbing.com/account?nameSpace=sputnik&gymId=121';
const EMAIL_INPUT = '#Email';
const PASSWORD_INPUT = '#Password';
const LOGIN_BUTTON = 'input.btn.btn-default[type="submit"][value="Iniciar sesión"]:not(.disabled)';
const EMAIL_ROW = 'li.ng-binding[ng-show="Client.Email"]';
const MEMBERSHIPS_BOX = 'div.membership-box[ng-repeat="mem in Services | filter: membershipFilter"]';

const CURRENT_MEMBERSHIP = 'current';

const MEMBERSHIP_REGEX = /((.*)\s(abono trimestral)|(bono 10 entradas)).*de : (\d{2}\/\d{2}\/\d{4}).*para : (\d{2}\/\d{2}\/\d{4})\s(current)?.*visitas (ilimitadas|restantes?(\d{0,2}))/i;

const parseMemberships = (membership) => {
  const membershipWithSpaces = membership.replace(LINE_BREAKS, WHITESPACE);

  const [,
    accessType,
    ,,,
    from,
    to,
    isActive,
    total,
    totalIfNotQuarterly,
  ] = membershipWithSpaces.match(MEMBERSHIP_REGEX);

  return {
    accessType,
    from,
    isActive: isActive === CURRENT_MEMBERSHIP,
    to,
    total: totalIfNotQuarterly ? totalIfNotQuarterly : total
  };
}

const parseAccountPage = async (page) => {
  try {
    await page.waitForSelector(MEMBERSHIPS_BOX, { timeout: MEMBERSHIP_TIMEOUT });
    const memberships = await page.$$eval(MEMBERSHIPS_BOX, memberships => memberships.map(el => el.innerText));
    if (memberships.length) return memberships.map(parseMemberships);
  } catch (e) {
    console.error(e);
  } finally {
    return {};
  }
};

module.exports = ({ user, password }) => new Promise(async (resolve, reject) => {
  const browser = await  puppeteer.launch();

  try {
    const page = await browser.newPage();

    await page.goto(ACCOUNT_URL, GOTO_OPTIONS);
    await page.type(EMAIL_INPUT, user);
    await page.type(PASSWORD_INPUT, password);

    await page.waitForSelector(LOGIN_BUTTON);
    await page.click(LOGIN_BUTTON);
    await page.waitForSelector(EMAIL_ROW, { timeout: LOGIN_TIMEOUT });

    const result = await parseAccountPage(page);
    resolve(result);
  } catch (e) {
    reject(e);
  } finally {
    browser.close()
  }
});
