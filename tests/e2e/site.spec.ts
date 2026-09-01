import { expect, test } from '@playwright/test';

test('home page is available and contact modal can be opened', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Frontend dasturchi/);
  await page.getByRole('button', { name: 'Bog‘lanish' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('desktop navigation changes route and marks the current page', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const navigation = page.getByRole('navigation', { name: 'Asosiy navigatsiya' });
  await expect(navigation).toBeVisible();
  await navigation.getByRole('link', { name: 'MEN HAQIMDA' }).click();

  await expect(page).toHaveURL('/about');
  await expect(
    navigation.getByRole('link', { name: 'MEN HAQIMDA' }),
  ).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('#main-content')).toBeFocused();
});

test('mobile has no removed page spine or horizontal overflow', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile');
  await page.goto('/');

  await expect(
    page.getByRole('navigation', { name: 'Portfolio sahifalari' }),
  ).toBeHidden();
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth === document.documentElement.clientWidth,
      ),
    )
    .toBe(true);
});

test('reduced motion disables route and decorative 3D animation', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect
    .poll(() =>
      page.evaluate(() => ({
        route: getComputedStyle(document.querySelector<HTMLElement>('.route-stage')!)
          .animationName,
        cube: getComputedStyle(document.querySelector<HTMLElement>('.cube-3d')!)
          .animationName,
      })),
    )
    .toEqual({ route: 'none', cube: 'none' });
});
