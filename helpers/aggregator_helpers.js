"use strict";


module.exports = {
    getPages: () => { return getAllPages(); },
    getControls: () => { return getAllControls(); }
};

function getAllPages() {
    return {

        BasePage: require('../pages/base_page.js'),
        HomePage: require('../pages/home_page.js'),

        ComputerEditPage: require('../pages/computer_edit_page.js')
    };
}

function getAllControls() {
    return {
        FieldControl: require('../controls/field_control.js'),
        DropdownControl: require('../controls/dropdown_control.js')
    };
}