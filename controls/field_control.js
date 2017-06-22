'use strict';

let _async = require('asyncawait/async');
let _await = require('asyncawait/await');

let chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

class FieldControl {
    constructor(labelText) {
        this.labelText = labelText;
    }

    get label() {
        return element(by.xpath(`//label[ text()="${this.labelText}"]`));
    }

    get input() {
        return _async(() => {
            let label = _await(this.label);
            _await(expect(label.isPresent()).to.eventually.equal(true, 'Label is not presented'));
            return label.element(by.xpath('./following-sibling::*/descendant-or-self::input'));
        })();
    }

    setTo(value) {
        return _async(() => {
            let input = _await(this.input);
            _await(expect(input.isPresent()).to.eventually.equal(true, 'Input is not presented'));
            return input.click().clear().sendKeys(value);
        })();
    }

    getValue() {
        return _async(() => {
            let input = _await(this.input);
            _await(expect(input.isPresent()).to.eventually.equal(true, 'Input is not presented'));
            return input.getAttribute('value');
        })();
    }

};
module.exports = FieldControl;