// This service will contain the logic for scraping internship data from various job boards.
import puppeteer from 'puppeteer';

interface Internship {
    title: string;
    company: string;
    location: string;
    url: string;
}

export const scrapeIAgora = async (): Promise<Internship[]> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.iagora.com/work/en/jobs-and-internships/tunisia', { waitUntil: 'networkidle2' });

    const internships = await page.evaluate(() => {
        const results: Internship[] = [];
        const items = document.querySelectorAll('.search-result-item');
        items.forEach(item => {
            const title = (item.querySelector('.job-title a') as HTMLElement)?.innerText;
            const company = (item.querySelector('.company-name') as HTMLElement)?.innerText;
            const location = (item.querySelector('.location') as HTMLElement)?.innerText;
            const url = (item.querySelector('.job-title a') as HTMLAnchorElement)?.href;
            if (title && company && location && url) {
                results.push({ title, company, location, url });
            }
        });
        return results;
    });

    await browser.close();
    return internships;
};
