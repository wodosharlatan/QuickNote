const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    await driver.get('http://localhost:4000');
    const usernameI = await driver.findElement(By.name('Username'));
    await usernameI.sendKeys('admin');
    const passwordI = await driver.findElement(By.name('Password'));
    await passwordI.sendKeys('admin');
    const loginB = await driver.findElement(By.name('LoginButton'));
    await loginB.click();

    await driver.sleep(1000);
    await driver.findElement(By.name('Password')).sendKeys('admin');
    await driver.findElement(By.name('ChangePasswordButton')).click();
    await driver.switchTo().alert().accept();
    console.log("Login test: OK")
  }
  catch(error){
    console.log("Login test: FAILED")
  }
  finally {
    await driver.quit();
  }
  
})();