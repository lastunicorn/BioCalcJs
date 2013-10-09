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

(function BirthdaySection() {

    var birthday = null;

    var $birthdayTextBox = null;
    var $saveBirthdayButton = null;
    var $resetBirthdayButton = null;
    var $birthdayButtons = null;

    var suppressBirthdayChanged = false;

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
    // Functions - "private"
    // --------------------------------------------------------------------------

    function updateSaveBirthdayButtonVisibility() {
        var config = lu.bioCalc.BioCalcPageData.configManager.config;

        if (birthday != null && config.birthday.getTime() == birthday.getTime()) {
            disableSaveBirthdayButton();
        } else {
            enableSaveBirthdayButton();
        }
    }

    function updateResetBirthdayButtonVisibility() {
        var config = lu.bioCalc.BioCalcPageData.configManager.config;

        if (birthday.getTime() == config.birthday.getTime()) {
            disableResetBirthdayButton();
        } else {
            enableResetBirthdayButton();
        }
    }

    function updateBirthdayTextBox() {
        var dateAsString = lu.bioCalc.DateFormatter.formatDate(birthday);
        $birthdayTextBox.val(dateAsString);
    }

    function publishBirthday() {
        suppressBirthdayChanged = true;
        try {
            lu.bioCalc.BioCalcPageData.setBirthday(birthday);
        }
        finally {
            suppressBirthdayChanged = false;
        }
    }

    // --------------------------------------------------------------------------
    // Event Handlers
    // --------------------------------------------------------------------------

    function onBirthdayDatePickerSelect() {
        var newBirthday = $(this).datepicker("getDate");

        birthday = newBirthday;

        updateSaveBirthdayButtonVisibility();
        updateResetBirthdayButtonVisibility();

        publishBirthday();
    }

    function onResetBirthdayButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();

        var configManager = lu.bioCalc.BioCalcPageData.configManager;
        birthday = configManager.config.birthday;

        updateBirthdayTextBox();
        updateSaveBirthdayButtonVisibility();
        updateResetBirthdayButtonVisibility();

        publishBirthday();
    }

    function onSaveBirthdayButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();

        var configManager = lu.bioCalc.BioCalcPageData.configManager;

        if (configManager) {
            configManager.config.birthday = birthday;
            configManager.saveInCookies();
        }

        updateSaveBirthdayButtonVisibility();
        updateResetBirthdayButtonVisibility();
    }

    function onExternalBirthdayChanged(arg) {
        if (suppressBirthdayChanged) {
            return;
        }

        birthday = arg;
        updateBirthdayTextBox();
    }

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $(function() {
            create$();
            initialize$();

            lu.bioCalc.BioCalcPageData.birthdayChanged.subscribe(onExternalBirthdayChanged);
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
}());