'use strict';

let _async = require('asyncawait/async');
let _await = require('asyncawait/await');

let chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

let BasePage = require('./base_page.js');

class HomePage extends BasePage {
    constructor() {
        super();
    }

    get searchField() {
        return element(by.xpath('//*[@id="searchbox"]'));
    }

    get() {
        return browser.get(browser.baseUrl);
    }

    getCurrentNumberOfCumputers() {
        return _async(() => {
            let headerText = _await(this.getHeaderText());
            let res = headerText.match(/(\d+) computers found/)

            if (res !== null) {
                return res[1];
            } else {
                return null;
            }
        })();
    }

    searchItemByName(name) {
        return _async(() => {
            let field = _await(this.searchField);
            _await(expect(field.isPresent()).to.eventually.equal(true, 'Search field is not presented'));
            _await(field.click().clear().sendKeys(name));
            let button = _await(this.getButtonByName("Filter by name"));
            _await(expect(button.isPresent()).to.eventually.equal(true, 'Button ""Filter by name" is not presented'));
            return button.click();

        })();
    }

    clearFilter(){
        return this.searchItemByName("");
    }

    getTableElementsByName(name) {
        return element.all(by.xpath(`//table[ contains(@class,"computers")]//tr[.//*[contains(text(),"${name}")] ]`));
    }

    getLinkOfTableElement(elem) {
        return _async(() => {
            _await(expect(elem.isPresent()).to.eventually.equal(true, 'ProvidedElem is not presented'));
            return elem.element(by.xpath('.//a'));
        })();
    }


};
module.exports = HomePage;