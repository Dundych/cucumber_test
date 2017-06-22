'use strict';

let _async = require('asyncawait/async');
let _await = require('asyncawait/await');

let chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect;

chai.use(chaiAsPromised);

let ca = require('../helpers/aggregator_helpers.js').getControls();
let pa = require('../helpers/aggregator_helpers.js').getPages();


let { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, When, Then, And }) => {

  When(/^Save current amount of computers to variable "(.*)"$/, _async((variableName) => {

    let num = _await(new pa.HomePage().getCurrentNumberOfCumputers());
    let parsedNum = +num;
    expect(parsedNum).to.be.above(0, `Current number of computers cant be less than 0`);
    if (typeof browser._internalVariables !== 'object') {
      browser._internalVariables = {} //create obj first
    }
    browser._internalVariables[variableName] = parsedNum;
  }));

  When(/^Search cumputers with name "(.*)"$/, _async((compName) => {
    return new pa.HomePage().searchItemByName(compName);
  }));

  When(/^Clear filter$/, _async(() => {
    return new pa.HomePage().clearFilter();
  }));

  Then(/^Result table contains elements with name "(.*)"$/, _async((name) => {
    let elements = _await(new pa.HomePage().getTableElementsByName(name));
    return expect(elements.length).to.be.above(0, `Cant find any result with name "${name}"`);
  }));

  Then(/^Result table contains "(.*)" elements with name "(.*)"$/, _async((num, name) => {
    let elements = _await(new pa.HomePage().getTableElementsByName(name));
    return expect(elements.length).to.be.equal(+num, `Actual and expected result has not been matched`);
  }));

  When(/^Open element with name "(.*)"$/, _async((name) => {
    let elements = _await(new pa.HomePage().getTableElementsByName(name));
    _await(expect(elements.length).to.be.above(0, `Cant find any result with name "${name}"`));
    let res = elements[0];
    let a = _await(new pa.HomePage().getLinkOfTableElement(res));
    return a.click();
  }));



});