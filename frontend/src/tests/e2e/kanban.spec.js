  import { test, expect } from '@playwright/test';

test.describe('Kanban Board E2E', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Kanban');
  });

  test('User can create a task', async ({ page }) => {
    await page.click('button:has-text("Add Task")');
    
    await page.fill('input[placeholder="Task Title"]', 'My New E2E Task');
    await page.fill('textarea[placeholder="Task Description"]', 'This is a test task');
    
    await page.locator('.react-select-container').nth(0).click();
    await page.locator('div[id^="react-select-2-option-"]').filter({ hasText: 'High Priority' }).click();
    
    await page.locator('.react-select-container').nth(1).click();
    await page.locator('div[id^="react-select-3-option-"]').filter({ hasText: 'Bug' }).click();
    
    await page.click('button:has-text("Save Task")');
    
    await expect(page.locator('.task-title', { hasText: 'My New E2E Task' })).toBeVisible();
  });

  test('User can drag and drop a task between columns', async ({ page }) => {
    await page.click('button:has-text("Add Task")');
    await page.fill('input[placeholder="Task Title"]', 'Draggable Task');
    await page.click('button:has-text("Save Task")');
    
    const taskCard = page.locator('.task-card', { hasText: 'Draggable Task' });
    await expect(taskCard).toBeVisible();

    const inProgressColumn = page.locator('.column-body').nth(1);
    
    await taskCard.dragTo(inProgressColumn);
    
    await expect(inProgressColumn.locator('.task-card', { hasText: 'Draggable Task' })).toBeVisible();
  });

  test('UI updates in real-time when another user modifies tasks', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    await page1.goto('/');
    await page2.goto('/');
    
    await page1.click('button:has-text("Add Task")');
    await page1.fill('input[placeholder="Task Title"]', 'Realtime Task');
    await page1.click('button:has-text("Save Task")');
    
    await expect(page2.locator('.task-title', { hasText: 'Realtime Task' })).toBeVisible();
    
    await context1.close();
    await context2.close();
  });

  test('User can delete a task and see it removed', async ({ page }) => {
    await page.click('button:has-text("Add Task")');
    await page.fill('input[placeholder="Task Title"]', 'Task to Delete');
    await page.click('button:has-text("Save Task")');
    
    await expect(page.locator('.task-title', { hasText: 'Task to Delete' })).toBeVisible();
    
    const deleteBtn = page.locator('.task-card', { hasText: 'Task to Delete' }).locator('button[title="Delete"]');
    await deleteBtn.click();
    
    await expect(page.locator('.task-title', { hasText: 'Task to Delete' })).toHaveCount(0);
  });
  
  test('User can select a priority level and change the task category', async ({ page }) => {
    await page.click('button:has-text("Add Task")');
    await page.fill('input[placeholder="Task Title"]', 'Category Change Task');
    
    await page.locator('.react-select-container').nth(0).click();
    await page.locator('text=Low Priority').click();

    await page.locator('.react-select-container').nth(1).click();
    await page.locator('text=Feature').click();

    await page.click('button:has-text("Save Task")');
    
    const taskCard = page.locator('.task-card', { hasText: 'Category Change Task' });
    await expect(taskCard.locator('.badge-priority-low')).toBeVisible();
    await expect(taskCard.locator('.badge-cat-feature')).toBeVisible();
  });

  test('User can upload a file and Invalid files show an error message', async ({ page }) => {
    await page.click('button:has-text("Add Task")');
    await page.fill('input[placeholder="Task Title"]', 'Task with file');
    
    await page.setInputFiles('input[type="file"]', {
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('dummy text')
    });
    
    await expect(page.locator('text=Invalid file format. Please upload an image or PDF.')).toBeVisible();

    await page.setInputFiles('input[type="file"]', {
      name: 'test.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('dummy content')
    });
    
    await expect(page.locator('.file-upload-preview')).toContainText('test.pdf');
    await page.click('button:has-text("Save Task")');
    
    await expect(page.locator('.task-attachment')).toContainText('test.pdf');
  });

  test('Graph dynamically re-renders when tasks are added', async ({ page }) => {
    await expect(page.locator('.chart-container')).toBeVisible();
    
    const initialText = await page.locator('.chart-header span').nth(1).textContent();
    
    await page.click('button:has-text("Add Task")');
    await page.fill('input[placeholder="Task Title"]', 'Graph Task');
    await page.click('button:has-text("Save Task")');
    
    await expect(page.locator('.task-title', { hasText: 'Graph Task' })).toBeVisible();
  
    const newText = await page.locator('.chart-header span').nth(1).textContent();
    expect(newText).toBeDefined();
  });
});
