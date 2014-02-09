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

window.lu = window.lu || {};
lu.bioCalc = lu.bioCalc || {};
lu.bioCalc.views = lu.bioCalc.views || {};

(function ($) {

    lu.bioCalc.views.BirthdaySectionView = function () {

        var $birthdayTextBox = null;
        var $secondBirthdayTextBox = null;

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

        this.setBirthdayText = function (value) {
            $birthdayTextBox.val(value);
        };

        this.setSecondBirthdayText = function (value) {
            $secondBirthdayTextBox.val(value);
        };

        this.getBirthday = function () {
            return $birthdayTextBox.datepicker("getDate");
        };

        this.getSecondBirthday = function () {
            return $secondBirthdayTextBox.datepicker("getDate");
        };

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onBirthdayDatePickerSelect() {
            if ($.isFunction(presenter.onBirthdayDatePickerSelect))
                presenter.onBirthdayDatePickerSelect();
        }

        function onSecondBirthdayDatePickerSelect() {
            if ($.isFunction(presenter.onSecondBirthdayDatePickerSelect))
                presenter.onSecondBirthdayDatePickerSelect();
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
        }
    };

}(jQuery));