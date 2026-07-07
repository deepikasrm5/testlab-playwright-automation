import { expect } from '../tests/base';
import { baseUrl } from '../config/config.json' with { type: 'json' };
export class DashboardPage {
    constructor(page) {
        this.page = page;

        this.cardTile = (feat) => { return page.getByRole('link', { name: `${feat}`, exact:true }) };
        this.cardName = (feat) => { return this.cardTile(feat).locator('h2') };
        this.featDescription = (feat) => { return this.cardTile(feat).locator('p') };
        this.title = page.getByText("Welcome to TestLab");
        this.description = (desc) => { return page.getByText(desc) };
        this.menuLink = (feat) => { return page.getByRole('link', { name: `${feat}` }) }
        this.dashBoardLink = this.menuLink('Dashboard');
        this.logoutButton = page.getByRole('button', { name: 'Log out' });

    }

    async clickCard(feat) {
        const card = await this.cardTile(feat);
        await card.waitFor({ state: 'visible', timeout: 10000 });
        await card.click();
    }

    async clickMenu(feat) {
        const menu = await this.menuLink(feat);
        await menu.waitFor({ state:'visible', timeout: 10000 });
        await menu.click();
    }

    async openDashboard() {
        await this.page.goto(baseUrl + 'dashboard');
    }

    async goToDashboard() {
        await this.dashBoardLink.waitFor({ state: 'visible', timeout: 10000 });
        await this.dashBoardLink.click();
    }

    async logout() {
        await this.logoutButton.waitFor({ state:'visible', timeout: 10000 });
        await this.logoutButton.click();
    }

    async validateTitle() {
        await expect(this.title, { message: "Dashboard Title should be visible" }).toBeVisible({ timeout: 10000 });
    }

    async validateDescription(desc) {
        await expect(this.description(desc), { message: "Description should be visible in dashboard" }).toBeVisible({ timeout: 10000 })
    }

    async validateFeatureNames(features) {
        for (let i=0; i<features.length; i++) {
            await expect(this.cardName(features[i]), { message: `${features[i]} card name should be visible` }).toBeVisible({ timeout: 10000 });
        }
    }

    async validateFeatureDescription(descriptions) {
        for (let i=0; i<descriptions.length; i++) {
            await expect(this.featDescription(descriptions[i]), { message: `Description is missing / not matching` }).toBeVisible({ timeout: 10000 });
        }
    }
}