import { expect, test } from '@playwright/test'

//NOTE:
/**
 In front of you there are 3 Playwright automated tests. Your job is to run these 3 tests, review their output in the console and debug it.
 Each test contains up to 3 different mistakes, these range from syntax issues to logical. Your job is correct these so that all 3 test scenarios pass.
 Fixing a mistake and re-running the test will either show the next mistake in the specific scenario or pass the test.
 Pro tip, run your tests in Headed mode to see whats happening in live action https://playwright.dev/docs/running-tests#run-tests-in-headed-mode. Also it might be a good idea to run each test individualy but that up to you. If you feel confident enough to run all 3 in parallel go for it.
*/

test('Navigate to valamar.com & validate page title', async ({ page }) => {

  const valamarURL = 'https://valamar.com'
  await page.goto(valamarURL)

  await expect(
    page,
    'Page does NOT have expected page title.'
  ).toHaveTitle('Valamar Holiday Hotels & Resorts in Croatia and Austria', { timeout: 60000 })
})

test('Navigate to valamar.com & click on Log in button', async ({ page }) => {

  const valamarURL = 'https://valamar.com'
  await page.goto(valamarURL,);

  await page.locator('button[id="azureb2c-login"]').click({ timeout: 30000 })

  await page
    .locator('button[class="btn-vlm-primary w-full mt-6 app-button"]')
    .click()

  await expect(page, 'Page does NOT have expected page title.').toHaveTitle('Sign up or sign in')

})
//NOTE: This is a helper function for making https requests, you're calling it in the next test but don't worry too much about it
async function fetchData(url: string): Promise<Response> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    throw error;
  }
}


test('Validate ALL page urls & Network response', async ({ }) => {
  const urls = ['https://valamar.com', 'https://www.rtl.hr/','https://www.moemax.hr/','https://optika-anda.com/', 'https://www.suncanihvar.com/hr'];
  console.log(urls.length);

  // Ensure all URLs have the correct structure
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log("Getting data for ", url);
    expect(url, 'URL does NOT have the proper structure!').toContain('https://');
  }

  // Check the status code for each URL
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`Checking status code for ${url}`);  // https://www.moemax.hr/ nekad javlja 403 status code
    
    // Fetch the data from the URL
    const response = await fetchData(url);
    console.log("Response: ", response);

    // Extract and check the status code
    const statusCode = response.status;
    expect(statusCode, `Unexpected status code for ${url}!`).toEqual(200);
  }
});
