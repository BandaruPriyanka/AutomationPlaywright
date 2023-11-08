const { expect } = require("@playwright/test");
const etsydata=require("../data/etsy.json");
require("dotenv").config();
exports.EtsyPage= class EtsyPage{
    constructor(page, test) {
        this.page = page;
        this.test = test;
        this.signin = page.locator("//button[normalize-space()='Sign in']")
        this.UserName=page.locator("//input[@name='email']")
        this.passWord=page.locator("//input[@name='password']")
        this.subtBtn=page.locator("//button[@value='sign-in']")
        this.targetLogo=page.locator("//nav[@id='headerPrimary']/a[1]");
        this.skipLink=page.locator("//a[text()='Skip']")
        this.skipBtn=page.locator("//button[text()='Skip']")

        

    }
     
    async LogInToEtsyApp(page)
    {
        await page.goto(process.env.Etsy_URL);
        await page.waitForTimeout(5000);
        await expect(this.signin).toBeVisible();
        await  this.signin.click();
        await expect(this.signin).toBeVisible();
        await  this.signin.fill(ebaydata.credentials.Username);
        await expect(this.passWord).toBeVisible();
        await  this.passWord.fill(ebaydata.credentials.password);
      
    }
}