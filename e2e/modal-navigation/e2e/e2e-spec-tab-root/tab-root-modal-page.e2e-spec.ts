import { AppiumDriver, createDriver } from "nativescript-dev-appium";
import { Screen } from "../screen"
import { testSecondPage, testNestedModalFrame, testNestedModalPage } from "../e2e-spec-shared/modal-frame"

describe("tab root modal page scenarios", () => {

    let driver: AppiumDriver;
    let screen: Screen;

    before(async () => {
        driver = await createDriver();
        screen = new Screen(driver);
        await screen.setTabRootView();
    });

    beforeEach(async function () {
        await screen.loadModalPage();
    });

    afterEach(async function () {
        if (this.currentTest.state === "failed") {
            await driver.logPageSource(this.currentTest.title);
            await driver.logScreenshot(this.currentTest.title);
            await driver.resetApp();
            await screen.setTabRootView();
        }
    });

    after(async () => {
        // should close page with frame
        await screen.closeModal();
        await screen.loadedHome();
        await driver.quit();
        console.log("Quit driver!");
    });

    it("should show nested modal page with frame, close", async () => {
        await testNestedModalFrame(screen, false);
    });

    it("should show nested modal page, close", async () => {
        await testNestedModalPage(screen, false);
    });
});