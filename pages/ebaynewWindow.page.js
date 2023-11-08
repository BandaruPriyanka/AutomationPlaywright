const { expect } = require("@playwright/test");
const etsydata=require("../data/etsy.json");
require("dotenv").config();
exports.ebaynewWindow = class ebaynewWindow{
 constructor(page){
    this.page = page;
    this.wishlistBtn = page.locator("//span[text()='Add to watchlist']")
    this.wishListIcon = page.locator("//a[@title='Watchlist']")
    this.checkforWishItem = page.locator("//div[@class='gh-img__wrapper']")
    this.unWatchBtn=page.locator('//span[text()="Watching"]')
 }
 async newWindowWish(){
 
    await this.wishlistBtn.click();
    await this.page.waitForTimeout(+process.env.small_wait);
    await this.wishListIcon.click();
    await expect(this.checkforWishItem).toBeVisible();
    await this.checkforWishItem.click();
    await this.page.waitForTimeout(+process.env.small_wait);
    await this.unWatchBtn.click();
   }
}