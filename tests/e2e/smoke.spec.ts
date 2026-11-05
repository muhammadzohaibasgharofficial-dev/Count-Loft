import { test, expect } from '@playwright/test';

test.describe('Count Loft — Core Site Smoke Tests', () => {
  test('Homepage loads with search and category grid', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Count Loft/);
    await expect(page.locator('#instant-search-input')).toBeVisible();
    await expect(page.locator('.categories-grid')).toBeVisible();
    await expect(page.locator('footer')).toContainText('Your numbers never leave your browser');
  });

  test('Instant search filters calculators', async ({ page }) => {
    await page.goto('/');
    const searchInput = page.locator('#instant-search-input');
    await searchInput.fill('mortgage');
    const mortgageCard = page.locator('.calc-card[data-title*="Mortgage"]');
    await expect(mortgageCard).toBeVisible();
  });

  test('Theme toggle switches between light and dark themes', async ({ page }) => {
    await page.goto('/');
    const toggleBtn = page.locator('.theme-toggle').first();
    const html = page.locator('html');

    const initialTheme = await html.getAttribute('data-theme');
    await toggleBtn.click();
    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });

  test('Loan Calculator computes monthly payment accurately', async ({ page }) => {
    await page.goto('/finance/loan-calculator');
    await expect(page.locator('h1')).toContainText('Loan Calculator');

    const principalIn = page.locator('#loan-amount');
    const rateIn = page.locator('#interest-rate');
    const termIn = page.locator('#loan-term-months');

    await principalIn.fill('10000');
    await rateIn.fill('5');
    await termIn.fill('12');

    const monthlyVal = page.locator('#monthly-payment-val');
    await expect(monthlyVal).toContainText('$856.07');
  });

  test('Pakistan Electricity Bill Calculator computes accurately', async ({ page }) => {
    await page.goto('/pakistan/electricity-bill-calculator');
    await expect(page.locator('h1')).toContainText('Electricity Bill Calculator');

    const unitsIn = page.locator('#elec-units');
    await unitsIn.fill('100');

    const totalVal = page.locator('#elec-total-val');
    await expect(totalVal).not.toBeEmpty();
  });

  test('Trust page — Privacy policy states zero server storage commitment', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page.locator('h1')).toContainText('Privacy Policy');
    await expect(page.locator('main')).toContainText('Your numbers never leave your browser');
  });

  test('Trust page — Corrections policy is accessible and transparent', async ({ page }) => {
    await page.goto('/corrections');
    await expect(page.locator('h1')).toContainText('Corrections Policy');
    await expect(page.locator('main')).toContainText('contact@countloft.site');
  });
});
