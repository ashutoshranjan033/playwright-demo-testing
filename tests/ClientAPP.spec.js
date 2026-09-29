const {test , expect} =require('@playwright/test');
const { text } = require('node:stream/consumers');




test.only('E ClientApp login' , async ({page})=>
{
   const email= "ashutosh16122023@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   await page.locator("#userEmail").fill(email);
   await page.locator("[type='password']").fill("Mahakal@16122023");
   await page.locator("#login").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();

   const titles =await page.locator(".card-body b").allTextContents();
   console.log(titles);
   const count = await products.count();
   for (let i=0; i<count; i++){
      if(await products.nth(i).locator("b").textContent() === productName){
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
   await page.locator("[routerLink*='cart']").click();
   await page.locator("div li").first().waitFor();
   
   const bool = await page.locator("h3:has-text('Zara Coat 4')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=checkout").click();
   await page.locator("[placeholder*='Country']").fill("Ind" , {delay:100});
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();

   optionCount = await dropdown.locator("button").count();
   for(let i=0; i<optionCount; i++){

      text= await dropdown.locator("button").nth(i).textContent();
      if(text== "India"){

         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
   await page.pause();
   




});




