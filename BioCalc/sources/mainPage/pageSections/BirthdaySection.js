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

//lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage.pageSections");

window.lu = window.lu || {};
lu.bioCalc = lu.bioCalc || {};
lu.bioCalc.mainPage = lu.bioCalc.mainPage || {};
lu.bioCalc.mainPage.pageSections = lu.bioCalc.mainPage.pageSections || {};

(function (viewFactory, bioCalcPageData, configurationService, dateFormatter) {

    /**
     * This module contains the logic of the page section where the user can select
     * the birthday.
     */
    lu.bioCalc.mainPage.pageSections.BirthdaySection = function () {

        var view = null;

        var suppressBirthdayChanged = false;

        // --------------------------------------------------------------------------
        // Functions - "private"
        // --------------------------------------------------------------------------

        function updateSaveBirthdayButtonVisibility() {
            var config = configurationService.config;
            var birthday = bioCalcPageData.birthday;

            if (birthday != null && config.birthday.getTime() == birthday.getTime()) {
                view.disableSaveBirthdayButton();
            } else {
                view.enableSaveBirthdayButton();
            }
        }

        function updateResetBirthdayButtonVisibility() {
            var config = configurationService.config;
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

        function publishBirthday(birthday) {
            suppressBirthdayChanged = true;
            try {
                bioCalcPageData.birthday = birthday;
            }
            finally {
                suppressBirthdayChanged = false;
            }
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

        function onResetBirthdayButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();

            var birthday = configurationService.config.birthday;

            publishBirthday(birthday);

            updateBirthdayTextBox();
            updateSaveBirthdayButtonVisibility();
            updateResetBirthdayButtonVisibility();
        }

        function onSaveBirthdayButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();

            configurationService.config.birthday = bioCalcPageData.birthday;
            configurationService.save();

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
            var presenter = {
                onBirthdayDatePickerSelect: onBirthdayDatePickerSelect,
                onResetBirthdayButtonClick: onResetBirthdayButtonClick,
                onSaveBirthdayButtonClick: onSaveBirthdayButtonClick
            };

            view = viewFactory.create("BirthdaySectionView");
            view.presenter = presenter;

            updateBirthdayTextBox();
            updateResetBirthdayButtonVisibility();
            updateSaveBirthdayButtonVisibility();

            bioCalcPageData.birthdayChanged.subscribe(onExternalBirthdayChanged);
        }());
    };
}(
        lu.bioCalc.mainPage.ViewFactory,
        lu.bioCalc.mainPage.BioCalcPageData,
        lu.bioCalc.configuration.ConfigurationService,
        lu.bioCalc.DateFormatter
    ));