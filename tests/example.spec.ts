import { test, expect } from '@playwright/test';

test('homepage loads with college branding', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/EASA College of Engineering and Technology/);
  await expect(page.getByRole('heading', { name: 'EASA College of Engineering and Technology' })).toBeVisible();
});

test('main navigation opens the institution page', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: /ABOUT US/ }).click();
  await page.getByRole('link', { name: 'Institution', exact: true }).first().click();

  await expect(page).toHaveURL(/\/institution$/);
  await expect(page.locator('body')).not.toContainText('Page Not Found');
});

test('unknown routes show the project not-found page', async ({ page }) => {
  await page.goto('/route-that-does-not-exist');

  await expect(page.locator('body')).toContainText(/not found/i);
});

const projectRoutes = [
  '/professional-chapters', '/mission-vision', '/login', '/admin/login', '/reset-password',
  '/dashboard', '/admin', '/admin-dashboard', '/core-beliefs', '/institution', '/management',
  '/media-press', '/milestones', '/leadership', '/governance', '/administration', '/principal',
  '/sustainability', '/community-outreach', '/admin/applications', '/research', '/rd', '/rd-cell',
  '/department/computer-science', '/department-research', '/student-research', '/faculty-research',
  '/industrial-research', '/ipr-cell', '/rd-projects', '/patents', '/resources/digital-library',
  '/resources/regulations', '/resources/statutory-bodies', '/resources/forms',
  '/resources/academic-calendar', '/resources/syllabus-curriculum', '/resources/handbook/faculty',
  '/resources/handbook/student', '/careers', '/scholarships', '/admissions', '/admission',
  '/admissions-2026', '/admission-2026', '/alumni', '/alumni-connect', '/alumni-registration',
  '/alumni-social', '/gallery', '/video-gallery', '/virtual-tour', '/grievance/parents',
  '/page/library', '/page/hostel', '/page/sports', '/page/amenities', '/page/placement',
  '/page/skilling', '/page/fest', '/page/cells', '/iqac-about', '/iqac-committee',
  '/page/associations', '/page/clubs', '/page/gym', '/page/yoga', '/page/store',
  '/page/transport', '/page/medical', '/naac', '/naac-dvv-clarifications', '/naac-distinction',
  '/naac-best-practices', '/naac-rti', '/naac-feedback', '/naac-extended-profile',
  '/naac-committee', '/aicte', '/aicte-eoa', '/sdgs', '/obe', '/nirf', '/idea-lab',
  '/page/cafeteria', '/page/food-court', '/page/higher-education', '/page/entrepreneurship'
];

for (const route of projectRoutes) {
  test(`route loads: ${route}`, async ({ page }) => {
    const response = await page.goto(route);

    expect(response?.status()).toBe(200);
    await expect(page.locator('#root')).not.toBeEmpty();
    await expect(page.locator('body')).not.toContainText('Campus Sector Coordinate Not Found');
  });
}
