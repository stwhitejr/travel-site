import {test, expect} from '@playwright/test';

const url = 'http://localhost:3000';

const tags = [
  {idx: 0, id: 88, name: 'early days', description: 'The Early Days'},
  {idx: 1, id: 89, name: 'build', description: 'The Build'},
  {idx: 2, id: 90, name: 'camp', description: 'Life in a Van'},
  {idx: 3, id: 91, name: 'king', description: 'My Ride or Die'},
  {idx: 4, id: 92, name: 'water', description: 'Bodies of Water'},
  {idx: 5, id: 93, name: 'trail', description: 'Out on The Trail'},
  {idx: 6, id: 94, name: 'vista', description: 'The Views'},
  {idx: 7, id: 95, name: 'random', description: 'Everything In-Between'},
  {idx: 8, id: 96, name: 'wildlife', description: 'The Wildlife'},
  {idx: 9, id: 97, name: 'snow', description: 'The Snow'},
  {idx: 10, id: 98, name: 'desert', description: 'The Desert'},
  {idx: 11, id: 99, name: 'bike', description: 'Two Wheels'},
  // {idx: 12, id: 100, name: 'favorites', description: 'My Favorites'},
];

test('Homepage', async ({page}) => {
  await page.goto(url);

  const categoriesButton = page.getByText('Categories');
  const locationsButton = page.getByText('Locations');
  await expect(page.getByText('Explore')).toBeVisible();
  await expect(locationsButton).toBeVisible();
  await expect(categoriesButton).toBeVisible();

  // To Locations Page
  await locationsButton.click();
  await expect(page.getByText('Freewheelin')).toBeVisible();
  await expect(page.getByText('Show All')).toBeVisible();
  await expect(page.getByText('Trip 1')).toBeVisible();
  await expect(page.getByText('Trip 2')).toBeVisible();
  await expect(page.locator('#Globe')).toBeVisible();

  // Back to home via logo
  await page.getByText('Freewheelin').click();
  await expect(page.getByText('Explore')).toBeVisible();

  // To Categories Page
  await categoriesButton.click();
  for (const tag of tags) {
    await expect(page.getByText(tag.description)).toBeVisible();
  }
});

test('Location', async ({page}) => {
  await page.goto(`${url}/location`);

  const bozemanPin = page.locator('#MapPin-433');
  await bozemanPin.click();
  await expect(page.getByText('Bozeman')).toBeVisible();
  await expect(
    page.getByText('Montanans vs California Transplants')
  ).toBeVisible();
  await expect(page.getByText('Dec 21, 24')).toBeVisible();
  await expect(page.getByTestId('GoogleMapLink')).toHaveAttribute(
    'href',
    'https://www.google.com/maps/search/45.678203,-111.04715'
  );
  await expect(page.locator('img')).toHaveCount(3);
  await page.locator('img').nth(1).click();
  await expect(page.getByText('Bozeman')).not.toBeVisible();
});
