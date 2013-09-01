// BioCalc
// Copyright (C) 2013 Last Unicorn
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

var lu = lu || {};
lu.bioCalc = lu.bioCalc || {};

lu.bioCalc.BirthdaySection = (function() {

    var obj = this;
    var configManager = null;
    var birthday = null;

    var $birthdayTextBox = null;
    var $saveBirthdayButton = null;
    var $resetBirthdayButton = null;
    var $birthdayButtons = null;

    var birthdayChangedEvent = new lu.Event();

    // --------------------------------------------------------------------------
    // Functions - GUI helpers
    // --------------------------------------------------------------------------

    function enableSaveBirthdayButton() {
        $saveBirthdayButton.button("option", "disabled", false);
    }

    function disableSaveBirthdayButton() {
        $saveBirthdayButton.button("option", "disabled", true);
    }

    function enableResetBirthdayButton() {
        $resetBirthdayButton.button("option", "disabled", false);
    }

    function disableResetBirthdayButton() {
        $resetBirthdayButton.button("option", "disabled", true);
    }

    // --------------------------------------------------------------------------
    // Functions - "public"
    // --------------------------------------------------------------------------

    function setBirthday(value) {
        birthday = value;
        updateBirthdayTextBox();
    }

    function setConfig(value) {
        configManager = value;
    }

    // --------------------------------------------------------------------------
    // Functions - "private"
    // --------------------------------------------------------------------------

    function formatDate(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var monthString = month < 10 ? "0" + month : "" + month;
        var dayString = day < 10 ? "0" + day : "" + day;

        return year + "-" + monthString + "-" + dayString;
    }

    function updateSaveBirthdayButtonVisibility() {
        if (birthday != null && configManager.config.birthday.getTime() == birthday.getTime()) {
            disableSaveBirthdayButton();
        } else {
            enableSaveBirthdayButton();
        }
    }

    function updateResetBirthdayButtonVisibility() {
        if (birthday.getTime() == configManager.config.birthday.getTime()) {
            disableResetBirthdayButton();
        } else {
            enableResetBirthdayButton();
        }
    }

    function updateBirthdayTextBox() {
        $birthdayTextBox.val(formatDate(birthday));
    }

    // --------------------------------------------------------------------------
    // Event Handlers
    // --------------------------------------------------------------------------

    function onBirthdayDatePickerSelect() {
        var newBirthday = $(this).datepicker("getDate");

        birthday = newBirthday;

        updateSaveBirthdayButtonVisibility();
        updateResetBirthdayButtonVisibility();

        birthdayChangedEvent.raise(obj, newBirthday);
    }

    function onResetBirthdayButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();

        birthday = configManager.config.birthday;

        updateBirthdayTextBox();
        updateSaveBirthdayButtonVisibility();
        updateResetBirthdayButtonVisibility();

        birthdayChangedEvent.raise(obj, birthday);
    }

    function onSaveBirthdayButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();

        if (configManager) {
            configManager.config.birthday = birthday;
            configManager.saveInCookies(config);
        }

        updateSaveBirthdayButtonVisibility();
        updateResetBirthdayButtonVisibility();
    }

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $(function() {
            create$();
            initialize$();
        });
    }());

    function create$() {
        $birthdayTextBox = $("#birthdayTextBox");
        $saveBirthdayButton = $("#saveBirthdayButton");
        $resetBirthdayButton = $("#resetBirthdayButton");
        $birthdayButtons = $("#birthdayButtons");
    }

    function initialize$() {
        $birthdayTextBox.datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "yy-mm-dd",
            onSelect: onBirthdayDatePickerSelect,
            showButtonPanel: true
        });

        $saveBirthdayButton.button({
            text: false,
            icons: {
                primary: "ui-icon-disk"
            },
            disabled: true
        });
        $saveBirthdayButton.click(onSaveBirthdayButtonClick);

        $resetBirthdayButton.button({
            text: false,
            icons: {
                primary: "ui-icon-close"
            },
            disabled: true
        });
        $resetBirthdayButton.click(onResetBirthdayButtonClick);

        $birthdayButtons.buttonset();
    }

    return {
        setBirthday: setBirthday,
        setConfig: setConfig,
        birthdayChanged: birthdayChangedEvent.client
    };
}());