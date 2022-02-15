const { test, expect } = require('@playwright/test');

const productName = 'Кавоварка автоматична Nivona CafeRomatica 790';
const buyerName = 'John';
const buyerSurname = 'Snow';
const buyerEmail = 'emaol@test.com';
const buyerPhone = '+38(098)098-11-22';



test('basic test', async ({ page }) => {

  // Searching for the necessary product

  await page.goto('https://foroom.com.ua/');

  await page.click('[placeholder="Пошук"]');
  await page.fill('[placeholder="Пошук"]', productName);
  await page.press('[placeholder="Пошук"]', 'Enter');
  await expect(page).toHaveURL(/.*search*/);
  await page.click('.product-block'); // change to click productName inside the box
  
  // Product Details page

  await expect(page).toHaveURL(/.*products/);
  await expect(page.locator('.productName')).toHaveText(productName); // To verify if searched product is selected
  await page.click('button:has-text("Купити")');
  await page.click('button:has-text("Оформити замовлення")');

  // Check out
  
  await expect(page).toHaveURL('https://foroom.com.ua/cart/');

  await page.click('[placeholder="Вкажіть\\ Ваше\\ ім\\\'я"]');
  await page.fill('[placeholder="Вкажіть\\ Ваше\\ ім\\\'я"]', buyerName);

  await page.click('[placeholder="Вкажіть\\ Ваше\\ прізвище"]');
  await page.fill('[placeholder="Вкажіть\\ Ваше\\ прізвище"]', buyerSurname);

  await page.click('[placeholder="Вкажіть\\ Ваш\\ E-mail"]');
  await page.fill('[placeholder="Вкажіть\\ Ваш\\ E-mail"]', buyerEmail);

  await page.click('[placeholder="Вкажіть\\ Ваш\\ телефон"]');
  await page.fill('[placeholder="Вкажіть\\ Ваш\\ телефон"]', buyerPhone);

  await page.click('a:has-text("Доставка кур\'єром по Києву (доставка 100грн)")');
  await page.click('#select2-drop >> text=Самовивіз «Нова Пошта»');

  await page.click('a:has-text("Список міст")');
  await page.fill('#select2-drop input[type="text"]', 'Львів');

  await page.click('text=м. Львів, Львівська обл.');

  await page.click('a:has-text("-виберіть адресу-")');
  await page.click('#select2-drop >> text=Відділення №30 (до 30 кг): вул. Литвиненка, 8');

  await page.click('a:has-text("Оплата готівкою (кур\'єру)")');
  await page.click('#select2-drop >> text=Нова пошта післяплата (комісія + 2% від суми замовлення переказ грошей)');

  await page.click('textarea[name="OrderForm\\[comment\\]"]');
  await page.fill('textarea[name="OrderForm\\[comment\\]"]', 'Almost done');

  // Order confirmation 

  //page.click('button:has-text("Замовлення підтверджую")');
  

});

