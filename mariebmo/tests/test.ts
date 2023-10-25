import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/knitting');
	await expect(page.getByRole('heading', { name: 'Knitting Calculator' })).toBeVisible();
});
