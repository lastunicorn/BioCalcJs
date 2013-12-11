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

lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage.pageSections");

(function ($) {

    lu.bioCalc.mainPage.pageSections.BirthdaySectionView = function () {

        var $birthdayTextBox = null;
        var $secondBirthdayTextBox = null;
        var $saveBirthdayButton = null;
        var $resetBirthdayButton = null;
        var $birthdayButtons = null;

        // --------------------------------------------------------------------------
        // presenter property
        // --------------------------------------------------------------------------

        var presenter = null;

        Object.defineProperty(this, "presenter", {
            enumerable: true,
            configurable: false,
            get: getPresenter,
            set: setPresenter
        });

        function getPresenter() {
            return presenter;
        }

        function setPresenter(value) {
            presenter = value;
        }

        // --------------------------------------------------------------------------
        // GUI helpers
        // --------------------------------------------------------------------------

        this.enableSaveBirthdayButton = function () {
            $saveBirthdayButton.button("option", "disabled", false);
        };

        this.disableSaveBirthdayButton = function () {
            $saveBirthdayButton.button("option", "disabled", true);
        };

        this.enableResetBirthdayButton = function () {
            $resetBirthdayButton.button("option", "disabled", false);
        };

        this.disableResetBirthdayButton = function () {
            $resetBirthdayButton.button("option", "disabled", true);
        };

        this.setBirthdayText = function (value) {
            $birthdayTextBox.val(value);
        };

        this.setSecondBirthdayText = function (value) {
            $secondBirthdayTextBox.val(value);
        };

        this.getBirthday = function () {
            return $birthdayTextBox.datepicker("getDate");
        };

        this.getSecondBirthday = function() {
            return $secondBirthdayTextBox.datepicker("getDate");
        };

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onBirthdayDatePickerSelect() {
            if ($.isFunction(presenter.onBirthdayDatePickerSelect)) {
                presenter.onBirthdayDatePickerSelect();
            }
        }

        function onSecondBirthdayDatePickerSelect() {
            if ($.isFunction(presenter.onSecondBirthdayDatePickerSelect)) {
                presenter.onSecondBirthdayDatePickerSelect();
            }
        }

        function onResetBirthdayButtonClick(e) {
            if ($.isFunction(presenter.onResetBirthdayButtonClick)) {
                presenter.onResetBirthdayButtonClick(e);
            }
        }

        function onSaveBirthdayButtonClick(e) {
            if ($.isFunction(presenter.onSaveBirthdayButtonClick)) {
                presenter.onSaveBirthdayButtonClick(e);
            }
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            create$();
            initialize$();
        }());

        function create$() {
            $birthdayTextBox = $("#birthdayTextBox");
            $secondBirthdayTextBox = $("#secondBirthdayTextBox");
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

            $secondBirthdayTextBox.datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: "yy-mm-dd",
                onSelect: onSecondBirthdayDatePickerSelect,
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
    };

}(jQuery));