import { expect, test } from '@playwright/test';

test('home page is available and contact modal can be opened', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Front-end dasturchi/);
  await page.getByRole('button', { name: 'Hamkorlik Taklifi' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
});
