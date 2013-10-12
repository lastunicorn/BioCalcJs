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

lu.Namespacing.ensureNamespace("lu.bioCalc");

(function() {
    lu.bioCalc.BirthdaySectionView = function(presenter) {

        var $birthdayTextBox = null;
        var $saveBirthdayButton = null;
        var $resetBirthdayButton = null;
        var $birthdayButtons = null;

        // --------------------------------------------------------------------------
        // GUI helpers
        // --------------------------------------------------------------------------

        this.enableSaveBirthdayButton = function() {
            $saveBirthdayButton.button("option", "disabled", false);
        };

        this.disableSaveBirthdayButton = function() {
            $saveBirthdayButton.button("option", "disabled", true);
        };

        this.enableResetBirthdayButton = function() {
            $resetBirthdayButton.button("option", "disabled", false);
        };

        this.disableResetBirthdayButton = function() {
            $resetBirthdayButton.button("option", "disabled", true);
        };

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onBirthdayDatePickerSelect() {
            if ($isFunction(presenter.BirthdayDatePickerSelected)) {
                presenter.BirthdayDatePickerSelected(e);
            }
        }

        function onResetBirthdayButtonClick(e) {
            if ($.isFunction(presenter.ResetBirthdayButtonClicked)) {
                presenter.ResetBirthdayButtonClicked(e);
            }
        }

        function onSaveBirthdayButtonClick(e) {
            if ($.isFunction(presenter.ResetBirthdayButtonClicked)) {
                presenter.ResetBirthdayButtonClicked(e);
            }
        }

        function onExternalBirthdayChanged(arg) {
            if ($.isFunction(presenter.ExternalBirthdayChanged)) {
                presenter.ExternalBirthdayChanged(e);
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
    };
}());