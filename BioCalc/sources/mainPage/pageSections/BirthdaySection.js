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
lu.bioCalc.mainPage = lu.bioCalc.mainPage || {};
lu.bioCalc.mainPage.pageSections = lu.bioCalc.mainPage.pageSections || {};

(function (dateFormatter) {

    /**
     * Contains the logic of the page section where the user can select
     * the birthday and the second birthday.
     */
    lu.bioCalc.mainPage.pageSections.BirthdaySection = function (configuration, bioCalcPageData) {

        var presenter;
        var suppressBirthdayChanged = false;

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
            if (view) {
                view.presenter = null;
                stop();
            }

            view = value;

            if (view) {
                view.presenter = presenter;
                start();
            }
        }

        // --------------------------------------------------------------------------
        // Functions
        // --------------------------------------------------------------------------

        function updateBirthdayTextBox() {
            var dateAsString = dateFormatter.formatDate(bioCalcPageData.birthday);
            view.setBirthdayText(dateAsString);
        }

        function updateSecondBirthdayTextBox() {
            var dateAsString = dateFormatter.formatDate(bioCalcPageData.secondBirthday);
            view.setSecondBirthdayText(dateAsString);
        }

        function publishBirthday(birthday) {
            suppressBirthdayChanged = true;
            try {
                bioCalcPageData.birthday = birthday;
            }
            finally {
                suppressBirthdayChanged = false;
            }
        }

        function start() {
            updateBirthdayTextBox();
            updateSecondBirthdayTextBox();

            bioCalcPageData.birthdayChanged.subscribe(onExternalBirthdayChanged);
            configuration.saving.subscribe(onSaving);
        }

        function stop() {
            bioCalcPageData.birthdayChanged.unsubscribe(onExternalBirthdayChanged);
            configuration.saving.unsubscribe(onSaving);
        }

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onSaving() {
            configuration.config.birthday = bioCalcPageData.birthday;
        }

        function onBirthdayDatePickerSelect() {
            var birthday = view.getBirthday();

            publishBirthday(birthday);
        }

        function onSecondBirthdayDatePickerSelect() {
            bioCalcPageData.secondBirthday = view.getSecondBirthday();
        }

        function onExternalBirthdayChanged() {
            if (suppressBirthdayChanged) {
                return;
            }

            updateBirthdayTextBox();
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            presenter = {
                onBirthdayDatePickerSelect: onBirthdayDatePickerSelect,
                onSecondBirthdayDatePickerSelect: onSecondBirthdayDatePickerSelect
            };
        }());
    };

}(lu.bioCalc.helpers.DateFormatter));