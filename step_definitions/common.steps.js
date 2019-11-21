'use strict';


let _async = require('asyncawait/async');
let _await = require('asyncawait/await');
let dateFormat = require('dateformat');
let fs = require('fs');

let chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  expect = chai.expect;

chai.use(chaiAsPromised);

let ca = require('../helpers/aggregator_helpers.js').getControls();
let pa = require('../helpers/aggregator_helpers.js').getPages();

let { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, When, Then, And }) => {

  Given(/^Go to homepage$/, _async(() => {
    return new pa.HomePage().get();
  }));

  When(/^Set "(.*)" (.*) to "(.*)"$/, _async((controlName, controlType, value) => {

    if (controlType == 'dropdown') {
      return new ca.DropdownControl(controlName).setTo(value);
    } else if (controlType == 'field') {
      return new ca.FieldControl(controlName).setTo(value);
    } else {
      return expect(false).to.equal(true, `'Unexpected control type "${controlType}"`)
    }
  }));


  When(/^Take screenshot$/, _async(() => {
    browser.takeScreenshot().then(function(screenShot) {
      //    Saving File.
      //    Param filePath : where you want to store screenShot
      //    Param screenShot : Screen shot file which you want to store. 
      fs.writeFile(`./report/${dateFormat(Date.now(), "yyyy-mm-ddTHH-MM-ss")}.png`, screenShot, 'base64', function (err) {
        if (err) throw err;
        console.log('File saved.');
      });
    });
  }));

  When(/^Click "(.*)" button$/, _async((buttonName) => {
    let button = _await(new pa.BasePage().getButtonByName(buttonName));
    _await(expect(button.isPresent()).to.eventually.equal(true, 'Button is not presented'));
    return button.click();
  }));

  Then(/^Page contains error$/, _async(() => {
    let errFlag = _await(new pa.BasePage().isAnyErrorOnPage());
    return expect(errFlag).to.equal(true, 'Current page does not contains error');
  }));

  Then(/^Error contains text "(.*)"$/, _async((text) => {
    let errText = _await(new pa.BasePage().getErrorDetails());
    return expect(errText).to.contain(text, `Error details "${errText}" does not contain provided text "${text}"`);
  }));

  Then(/^Page does not contains error$/, _async(() => {
    let errFlag = _await(new pa.BasePage().isAnyErrorOnPage());
    return expect(errFlag).to.equal(false, 'Current page contains error');
  }));

  Then(/^Button "(.*)" is presented$/, _async((buttonName) => {
    let button = _await(new pa.HomePage().getButtonByName(buttonName));
    return expect(button.isPresent()).to.eventually.equal(true, 'Button is not presented');
  }));

  Then(/^Page with header "(.*)" is presented$/, _async((pageHeader) => {
    return expect(new pa.BasePage().getHeaderText()).to.eventually.equal(pageHeader, 'Wrong header for page');
  }));

  Then(/^Header of current page contains text "(.*)"$/, _async((partOfHeader) => {
    return expect(new pa.BasePage().getHeaderText()).to.eventually.contain(partOfHeader, 'Wrong header for page');
  }));

  Then(/^Header of current page does not contains text "(.*)"$/, _async((partOfHeader) => {
    return expect(new pa.BasePage().getHeaderText()).to.eventually.not.contain(partOfHeader, 'Wrong header for page');
  }));

  Then(/^Message "(.*)" is displayed$/, _async((messageText) => {
    return expect(new pa.BasePage().getCurrentMessage()).to.eventually.contain(messageText, 'Wrong Message for page');
  }));

  Then(/^Value in variable "(.*)" greater then value in variable "(.*)" by (.*)$/, _async((variableName1, variableName2, diff) => {
    let container = browser._internalVariables;
    let isVarsExist = (typeof container == 'object')
    expect(isVarsExist).to.be.equal(true, `Cant get variables - conrainer does not exist`);
    let flag = (container[variableName1] === container[variableName2] + Number(diff))
    expect(flag).to.be.equal(true, `Expression fail. variable1: "${container[variableName1]}" | variable2: "${container[variableName2]}"`);
  }));

  Then(/^Value in variable "(.*)" greater then value in variable "(.*)"$/, _async((variableName1, variableName2) => {
    let container = browser._internalVariables;
    let isVarsExist = (typeof container == 'object')
    expect(isVarsExist).to.be.equal(true, `Cant get variables - conrainer does not exist`);
    let flag = (container[variableName1] > container[variableName2])
    expect(flag).to.be.equal(true, `Expression fail. variable1: "${container[variableName1]}" | variable2: "${container[variableName2]}"`);
  }));

  Then(/^Value in variable "(.*)" equal to value in variable "(.*)"$/, _async((variableName1, variableName2) => {
    let container = browser._internalVariables;
    let isVarsExist = (typeof container == 'object')
    expect(isVarsExist).to.be.equal(true, `Cant get variables - conrainer does not exist`);
    let flag = (container[variableName1] === container[variableName2])
    expect(flag).to.be.equal(true, `Expression fail. variable1: "${container[variableName1]}" | variable2: "${container[variableName2]}"`);
  }));



  /**
   * Set controls on the page "pageName"
   * table structure
   * |Control|Value   |
   * |name   |John Doe|
   */
  When(/^On page "(.*)" set controls to values$/, _async((pageName, table) => {
    expect(pa.hasOwnProperty(pageName)).to.equal(true, `Cant find page with name "${pageName}"`);
    let page = new pa[pageName]();
    for (let i = 0; i < table.hashes().length; i++) {
      expect(table.hashes()[i]["Control"] in page).to.equal(true, `Cant find control with name "${table.hashes()[i]["Control"]}" in page "${pageName}"`);
      let control = _await(page[table.hashes()[i]["Control"]])
      let value = table.hashes()[i]["Value"];
      _await(control.setTo(value));
    }
  }));

  /**
 * Check controls on the page "pageName"
 * table structure
 * |Control|Value   |
 * |name   |John Doe|
 */
  Then(/^On page "(.*)" controls contain values$/, _async((pageName, table) => {
    expect(pa.hasOwnProperty(pageName)).to.equal(true, `Cant find page with name "${pageName}"`);
    let page = new pa[pageName]();
    for (let i = 0; i < table.hashes().length; i++) {
      expect(table.hashes()[i]["Control"] in page).to.equal(true, `Cant find control with name "${table.hashes()[i]["Control"]}" in page "${pageName}"`);
      let control = _await(page[table.hashes()[i]["Control"]]);
      let value = table.hashes()[i]["Value"];
      _await(
        expect(control.getValue()).to.eventually.equal(
          value,
          `Wrong value in control Cant find control "${table.hashes()[i]["Control"]}"`
        )
      );
    }
  }));

});