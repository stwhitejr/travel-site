import {test, expect} from '@playwright/test';

test('Codegen - Category', async ({page}) => {
  await page.goto('http://localhost:3000/category');
  await page.getByRole('link', {name: 'early days The Early Days'}).click();

  await expect(page.getByRole('img', {name: 'IMG_2097 -'})).toBeVisible();
  await expect(page.getByText('The Early Days')).toBeVisible();

  await expect(page.getByRole('button', {name: 'The Build'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'My Favorites'})).toBeVisible();

  await page.getByRole('img', {name: 'IMG_2052 -'}).click();

  await page.locator('.lucide.lucide-info').hover();
  await expect(page.locator('.lucide.lucide-info')).toBeVisible();
  await expect(page.getByText('Nov 4, 22')).toBeVisible();
  await expect(page.getByText('iPhone 11')).toBeVisible();
  await expect(page.getByText('Aloft Knoxville West')).toBeVisible();

  await page.locator('.lucide.lucide-x').click();
  await expect(page.locator('.lucide.lucide-x')).not.toBeVisible();

  await page.locator('body').press('ArrowRight');
  await expect(page.getByText('The Build')).toBeVisible();
  await expect(page.getByRole('img', {name: 'IMG_3179 -'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Life in a Van'})).toBeVisible();
  await expect(
    page.getByRole('button', {name: 'The Early Days'})
  ).toBeVisible();
});

test('Codegen - Location', async ({page}) => {
  await page.goto('http://localhost:3000/location');
  await page.getByRole('button', {name: 'Trip 1'}).click();
  await expect(page.locator('#MapPin-413')).toBeVisible();
  await page.getByRole('button', {name: 'Trip 2'}).click();
  await expect(page.locator('#MapPin-424')).toBeVisible();
  await page.getByRole('button', {name: 'Show All'}).click();
  await expect(page.locator('#MapPin-413')).toBeVisible();
  await expect(page.locator('#MapPin-424')).toBeVisible();
  await page.locator('#MapPin-424').click();
  await expect(
    page.getByRole('heading', {name: 'Bay View - Milwaukee'})
  ).toBeVisible();
  await expect(page.locator('#MapPin-424')).toBeVisible();
  await expect(page.getByRole('img', {name: 'IMG_3805 -'})).toBeVisible();
  await expect(page.getByText('Nov 14,')).toBeVisible();
  await expect(page.locator('.lucide.lucide-truck')).toBeVisible();
  await expect(
    page.getByRole('button', {name: 'A Mississippi C...'})
  ).toBeVisible();
  await expect(
    page.getByRole('button', {name: 'East Harbor Sta...'})
  ).toBeVisible();
  await expect(page.getByTestId('GoogleMapLink')).toBeVisible();
  await page.locator('body').press('ArrowRight');
  await expect(
    page.getByRole('heading', {name: 'A Mississippi Campground'})
  ).toBeVisible();
  await expect(
    page.getByRole('button', {name: 'Bay View - Milw...'})
  ).toBeVisible();
  await expect(
    page.getByRole('button', {name: 'Red Wing Minnes...'})
  ).toBeVisible();
  await page.locator('#MapPin-426').click();
  await expect(
    page.getByRole('heading', {name: 'Red Wing Minnesota', exact: true})
  ).toBeVisible();
});
