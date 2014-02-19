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
lu.bioCalc.presenters = lu.bioCalc.presenters || {};

(function (dateFormatter) {

    /**
     * Contains the logic of the page section where the user can select
     * the birthday and the second birthday.
     */
    lu.bioCalc.presenters.BirthdaySection = function (bioCalcPageData) {

        var presenter;
        var suppressBirthdayChanged;
        var suppressSecondBirthdayChanged;

        // --------------------------------------------------------------------------
        // view property
        // --------------------------------------------------------------------------

        var view = null;

        Object.defineProperty(this, "view", {
            enumerable: true,
            configurable: false,
            get: getView,
            set: setView
        });

        function getView() {
            return view;
        }

        function setView(value) {
            if (value === undefined)
                throw "value argument is undefined.";

            if (value === null)
                throw "value argument is null.";

            if (view)
                throw "view is already set.";

            view = value;
            view.presenter = presenter;
            start();
        }

        // --------------------------------------------------------------------------
        // Functions
        // --------------------------------------------------------------------------

        function refreshBirthdayTextBox() {
            var dateAsString = dateFormatter.formatDate(bioCalcPageData.birthday);
            view.setBirthdayText(dateAsString);
        }

        function refreshSecondBirthdayTextBox() {
            var dateAsString = dateFormatter.formatDate(bioCalcPageData.secondBirthday);
            view.setSecondBirthdayText(dateAsString);
        }

        function publishBirthday() {
            suppressBirthdayChanged = true;
            try {
                bioCalcPageData.birthday = view.getBirthday();
            }
            finally {
                suppressBirthdayChanged = false;
            }
        }

        function publishSecondBirthday() {
            suppressSecondBirthdayChanged = true;
            try {
                bioCalcPageData.secondBirthday = view.getSecondBirthday();
            }
            finally {
                suppressSecondBirthdayChanged = false;
            }
        }

        function start() {
            refreshBirthdayTextBox();
            refreshSecondBirthdayTextBox();

            bioCalcPageData.birthdayChanged.subscribe(onExternalBirthdayChanged);
            bioCalcPageData.secondBirthdayChanged.subscribe(onExternalSecondBirthdayChanged);
        }

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onBirthdayDatePickerSelect() {
            publishBirthday();
        }

        function onSecondBirthdayDatePickerSelect() {
            publishSecondBirthday();
        }

        function onExternalBirthdayChanged() {
            if (suppressBirthdayChanged)
                return;

            refreshBirthdayTextBox();
        }

        function onExternalSecondBirthdayChanged() {
            if (suppressSecondBirthdayChanged)
                return;

            refreshSecondBirthdayTextBox();
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            presenter = {
                onBirthdayDatePickerSelect: onBirthdayDatePickerSelect,
                onSecondBirthdayDatePickerSelect: onSecondBirthdayDatePickerSelect
            };

            suppressBirthdayChanged = false;
            suppressSecondBirthdayChanged = false;
        }());
    };

}(lu.bioCalc.helpers.DateFormatter));