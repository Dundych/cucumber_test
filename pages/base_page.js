'use strict';

let _async = require('asyncawait/async');
let _await = require('asyncawait/await');

let chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

class BasePage {
    constructor() { }

    get header() {
        return element(by.xpath('//*[ @id="main" ]/h1'));
    }

    getHeaderText() {
        return _async(() => {
            _await(expect(this.header.isPresent()).to.eventually.equal(true, 'Header is not presented'));
            return this.header.getText();
        })();
    }

    isAnyErrorOnPage() {
        return _async(() => {
            let errElems = _await(element.all(by.xpath('//*[contains(@class, "error")]')));
            return (errElems.length > 0);
        })();
    }

    getErrorDetails() {
        return _async(() => {
            let isError = _await(this.isAnyErrorOnPage());
            if (isError) {
                let errElems = _await(element.all(by.xpath('//*[contains(@class, "error")]')));
                let str = "";
                for (let i = 0; i < errElems.length; i++) {
                    let elemText = _await(errElems[i].getText());
                    str = str + elemText;
                }
                return str;
            } else {
                return Promise.resolve("");
            }
        })();
    }

    getButtonByName(buttonName) {
        return element(by.xpath(`//*[ contains(@class, "btn") and(text()="${buttonName}" or @value="${buttonName}") ]`));
    }

    getCurrentMessage() {
        return _async(() => {
            let messageContainer = _await(element(by.xpath('//*[contains(@class, "message")]')));
            let presenseFlag = _await(messageContainer.isPresent());
            if (presenseFlag) {
                return messageContainer.getText();
            } else {
                return Promise.resolve("");;
            }
        })();
    }

};

module.exports = BasePage;