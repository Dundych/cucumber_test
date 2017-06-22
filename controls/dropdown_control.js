'use strict';

let _async = require('asyncawait/async');
let _await = require('asyncawait/await');

let chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

let ca = require('../helpers/aggregator_helpers.js').getControls();

class DropdownControl {
    constructor(labelText) {
        this.labelText = labelText;
    }

    get label() {
        return new ca.FieldControl(this.labelText).label;
    }

    get dropdown() {
        return _async(() => {
            let label = _await(this.label);
            _await(expect(label.isPresent()).to.eventually.equal(true, 'Label is not presented'));
            return label.element(by.xpath('./following-sibling::*/descendant-or-self::select'));
        })();
    }

    setTo(value) {
        return _async(() => {
            let dropdown = _await(this.dropdown);
            _await(expect(dropdown.isPresent()).to.eventually.equal(true, 'Input is not presented'));
            _await(dropdown.click());
            let elem = _await(dropdown.element(by.xpath(`.//*[text()="${value}"]`)));
            _await(expect(elem.isPresent()).to.eventually.equal(true, `Value '${value}' does not exist in dropdown`));
            return elem.click();
        })();
    }

    getValue() {
        return _async(() => {
            let dropdown = _await(this.dropdown);
            _await(expect(dropdown.isPresent()).to.eventually.equal(true, 'Input is not presented'));
            let selected = _await(dropdown.element(by.xpath(`.//*[@selected]`)));
            let presenseFlag = _await(elem.isPresent());
            if (presenseFlag) {
                return selected.getText();
            } else {
                return Promise.resolve("");
            }
        })();
    }

};
module.exports = DropdownControl;