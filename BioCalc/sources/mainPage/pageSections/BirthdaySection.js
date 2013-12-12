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

(function (bioCalcPageData, dateFormatter) {

    /**
     * This module contains the logic of the page section where the user can select
     * the birthday.
     */
    lu.bioCalc.mainPage.pageSections.BirthdaySection = function (configuration) {

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
            if (view)
                view.presenter = null;

            view = value;

            if (view) {
                view.presenter = presenter;
                initializeView();
            }
        }

        // --------------------------------------------------------------------------
        // Functions
        // --------------------------------------------------------------------------

        function updateSaveBirthdayButtonVisibility() {
            var config = configuration.config;
            var birthday = bioCalcPageData.birthday;

            if (birthday != null && config.birthday.getTime() == birthday.getTime()) {
                view.disableSaveBirthdayButton();
            } else {
                view.enableSaveBirthdayButton();
            }
        }

        function updateResetBirthdayButtonVisibility() {
            var config = configuration.config;
            var birthday = bioCalcPageData.birthday;

            if (birthday.getTime() == config.birthday.getTime()) {
                view.disableResetBirthdayButton();
            } else {
                view.enableResetBirthdayButton();
            }
        }

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

        function initializeView() {
            updateBirthdayTextBox();
            updateSecondBirthdayTextBox();
            updateResetBirthdayButtonVisibility();
            updateSaveBirthdayButtonVisibility();
        }

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onBirthdayDatePickerSelect() {
            var birthday = view.getBirthday();

            publishBirthday(birthday);

            updateSaveBirthdayButtonVisibility();
            updateResetBirthdayButtonVisibility();
        }

        function onSecondBirthdayDatePickerSelect() {
            bioCalcPageData.secondBirthday = view.getSecondBirthday();
        }

        function onResetBirthdayButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();

            var birthday = configuration.config.birthday;

            publishBirthday(birthday);

            updateBirthdayTextBox();
            updateSaveBirthdayButtonVisibility();
            updateResetBirthdayButtonVisibility();
        }

        function onSaveBirthdayButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();

            configuration.config.birthday = bioCalcPageData.birthday;
            configuration.save();

            updateSaveBirthdayButtonVisibility();
            updateResetBirthdayButtonVisibility();
        }

        function onExternalBirthdayChanged() {
            if (suppressBirthdayChanged) {
                return;
            }

            updateBirthdayTextBox();
            updateSaveBirthdayButtonVisibility();
            updateResetBirthdayButtonVisibility();
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            presenter = {
                onBirthdayDatePickerSelect: onBirthdayDatePickerSelect,
                onSecondBirthdayDatePickerSelect: onSecondBirthdayDatePickerSelect,
                onResetBirthdayButtonClick: onResetBirthdayButtonClick,
                onSaveBirthdayButtonClick: onSaveBirthdayButtonClick
            };

            bioCalcPageData.birthdayChanged.subscribe(onExternalBirthdayChanged);
        }());
    };

}(
        lu.bioCalc.mainPage.BioCalcPageData,
        lu.bioCalc.helpers.DateFormatter
    ));