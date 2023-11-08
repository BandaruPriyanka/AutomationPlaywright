import { test, expect } from '@playwright/test';
const ebayData=require("../data/ebay.json");
const {ebaynewWindow}=require("../pages/ebaynewWindow.page")

require("dotenv").config();
const LoginPage = require("../pages/ebay.page")

test.beforeEach('Logging to the ebay applicaton', async ({ page }) => {
    const LoginToApp = new LoginPage.SampleData(page, test)
    await page.goto(process.env.URL);
    await LoginToApp.loginfunction();
    await expect(
      page,
      "Validating whether it navigated to Dashboard page"
    ).toHaveURL(process.env.URL);
    await expect(
      LoginToApp.ebayLogo,
      "Checking the ebay home page logo"
    ).toBeVisible();
   
})

test("selecting  specific item in ebay application and adding  it to cart", async ({page}) => {
    const LoginToApp = new LoginPage.SampleData(page, test)
    await LoginToApp.selectItemAddToCart();      
})

test("Now selecting any item from  search area an added to wishlist",async({page})=>{
    const LoginToApp = new LoginPage.SampleData(page, test)
    await LoginToApp.selectItemToWishlist();
    const pagePromise = page.waitForEvent("popup");
    const newTab = await pagePromise;
    await newTab.waitForLoadState();
    const result = new ebaynewWindow(newTab)  
    await result.newWindowWish();

})
test.afterEach("I logout from the application",async({page})=>{
    const LoginToApp = new LoginPage.SampleData(page, test);
    await page.bringToFront();
    await LoginToApp.logoutFunction();
})