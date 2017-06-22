'use strict';

var dateFormat = require('dateformat');

let _async = require('asyncawait/async');
let _await = require('asyncawait/await');

let chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

module.exports = {
    parseTextForMacros: function (text) {
        let newText = text;
        
        //#date#
        newText = newText.replace(/#date#/g, `${dateFormat(Date.now(), "yyyy-mm-dd")}`);

        //#date_now#
        newText = newText.replace(/#date_now#/g, `${dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss")}`);

        return newText;
    }
};