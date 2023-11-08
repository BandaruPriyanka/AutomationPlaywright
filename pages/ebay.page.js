const ebayData = require("../data/ebay.json")
const { expect } = require("@playwright/test");
const ebauNew=require("./ebaynewWindow.page")
const newPage='';
exports.SampleData = class SampleData {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.signin = page.locator("(//a[contains(text(),'Sign in')])[1]")
    this.userName = page.locator("//input[@id='userid']");
    this.passWord = page.locator("//input[@id='pass']");
    this.conbtn = page.locator("//button[@id='signin-continue-btn']");
    this.signInBtn = page.locator("//button[@id='sgnBt']");
    this.ebayLogo=page.locator("//img[@alt='eBay Home']");
    this.selcategory = page.locator("//button[text()=' Shop by category']");
    this.itemlink = page.locator("//a[text()='Computers & tablets']");
    this.ipadslink = page.locator("//div[text()='iPads']");
    this.ipaditem = page.locator(`//div[text()='2021 Apple iPad 9th Gen 64/256GB WiFi 10.2"']`);
    this.initialcartval = page.locator("//i[@id='gh-cart-n']");
    this.atc = page.locator("//span[text()='Add to cart']");
    this.checkOutToCart=page.locator("(//div[@class='app-atc-layer__actionRow'])[1]/a")
    this.homeebay = page.locator("//a[@id='gh-la']");
    this.carticon = page.locator("((//div[@class='gh-menu'])[4]/a)[1]");
    this.checkForItem = page.locator(`//a[text()='2021 Apple iPad 9th Gen 64/256GB WiFi 10.2"']`)
    this.RemCartItem = page.locator("(//span[text()='Remove'])[1]")
    this.searchitem = page.locator("//input[@id='gh-ac']");
    this.laptopitem = page.locator(`(//span[text()='Cheap Dell HP Lenovo Fujitsu Windows 10 Laptop Core i3 i5 CPU 8GB RAM 128GB SSD'])[1]`);
    this.wishlistBtn = page.locator("//span[text()='Add to watchlist']")
    this.wishListIcon = page.locator("//a[@title='Watchlist']")
    this.checkforWishItem = page.locator("//div[@class='gh-img__wrapper']");
    this.LoginUser = page.locator("//button[@id='gh-ug']");
    this.signOutBtn = page.locator("//a[text()='Sign out']");
 

  }

  async loginfunction() {
    await expect(this.signin).toBeVisible();
    await this.signin.click();
    await this.userName.click()
    await this.page.waitForTimeout(+process.env.small_wait)
    await this.userName.fill(ebayData.credentials.Username);
    await this.conbtn.click();
    await this.page.waitForTimeout(+process.env.small_wait)
    await this.passWord.fill(ebayData.credentials.password);
    await expect( this.signInBtn).toBeVisible();
    await this.signInBtn.click();
    await this.page.waitForTimeout(+process.env.small_wait)
  }


  async selectItemAddToCart(){
  
    await this.selcategory.click();
    await expect(this.itemlink).toBeVisible();
    await expect(this.itemlink).toBeVisible();
    await this.itemlink.click();
    await this.ipadslink.click();
    await this.page.waitForTimeout(5000)
    await expect(this.ipaditem).toBeVisible();
    await this.ipaditem.click();
    await this.page.waitForTimeout(10000)
    let initialcartval = parseInt(await this.initialcartval.textContent());
    await this.page.waitForTimeout(+process.env.medium_wait)
    await expect(this.atc).toBeVisible();
    await this.atc.click();
    let afteratc = parseInt(await this.initialcartval.textContent());
    expect(afteratc).toBeGreaterThan(initialcartval);
    await this.page.waitForTimeout(+process.env.small_wait)
    await this.homeebay.click();
    await expect(this.carticon).toBeVisible();
    await this.carticon.click();
    await expect(this.checkForItem).toBeVisible();
    await expect(this.RemCartItem).toBeVisible();
    await this.RemCartItem.click();
    await this.page.waitForTimeout(+process.env.small_wait)
 }

 async selectItemToWishlist(){
  await this.searchitem.fill(ebayData.itemName);
  const keyboard = this.page.keyboard;
  await keyboard.press('Enter');
  await this.page.waitForTimeout(+process.env.small_wait)
  await this.laptopitem.click();
  await  this.page.click("//button[text()=' Shop by category']")
 }

  async logoutFunction() {
    await this.homeebay.click();
    await this.LoginUser.click();
    await this.page.waitForTimeout(+process.env.small_wait)
    await expect( this.signOutBtn).toBeVisible();
    await this.signOutBtn.click();
    await this.page.waitForTimeout(+process.env.small_wait)
  }

}

