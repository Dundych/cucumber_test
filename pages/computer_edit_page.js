'use strict';

let _async = require('asyncawait/async');
let _await = require('asyncawait/await');

let chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

let ca = require('../helpers/aggregator_helpers.js').getControls();
let pa = require('../helpers/aggregator_helpers.js').getPages();

let BasePage = require('./base_page.js');

class ComputerEditPage extends BasePage {
    constructor() {
        super();
    }

    get _wrapper() {
        return element(by.xpath('//*[ @id="main" and .//h1[text()="Add a computer"] ]'));
    }

    get name() {
        return new ca.FieldControl("Computer name");
    }

    get introducedDate() {
        return new ca.FieldControl("Introduced date");
    }

    get discontinuedDate() {
        return new ca.FieldControl("Discontinued date");
    }

    get company() {
        return new ca.DropdownControl("Company");
    }

    getButtonByName(buttonName) {
        return element(by.xpath(`//*[contains(@class, "btn") and text()="${buttonName}"]`));
    }

};
module.exports = ComputerEditPage;