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

/**
 * This module contains the logic of the page section where the user can select
 * the birthday.
 * 
 * @param $
 *            The jQuery object.
 * 
 * @param BirthdaySectionView
 *            The constructor function of the view.
 * 
 * @param bioCalcPageData
 *            The service that provides data and communication between different
 *            modules of the page.
 * 
 * @param configurationService
 *            Keeps the configuration object.
 * 
 * @param dateFormatter
 *            Provides methods to format a data into a string.
 */
(function BirthdaySection($, BirthdaySectionView, bioCalcPageData, configurationService, dateFormatter) {

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

    function publishBirthday() {
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
        birthday = view.getBirthday();

        updateSaveBirthdayButtonVisibility();
        updateResetBirthdayButtonVisibility();

        publishBirthday();
    }

    function onResetBirthdayButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();

        birthday = configurationService.config.birthday;

        updateBirthdayTextBox();
        updateSaveBirthdayButtonVisibility();
        updateResetBirthdayButtonVisibility();

        publishBirthday();
    }

    function onSaveBirthdayButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();

        configurationService.config.birthday = birthday;
        configurationService.save();

        updateSaveBirthdayButtonVisibility();
        updateResetBirthdayButtonVisibility();
    }

    function onExternalBirthdayChanged(arg) {
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
        $(function() {
            var presenter = {
                onBirthdayDatePickerSelect: onBirthdayDatePickerSelect,
                onResetBirthdayButtonClick: onResetBirthdayButtonClick,
                onSaveBirthdayButtonClick: onSaveBirthdayButtonClick
            };
            view = new BirthdaySectionView(presenter);

            updateBirthdayTextBox();
            updateResetBirthdayButtonVisibility();
            updateSaveBirthdayButtonVisibility();
            
            bioCalcPageData.birthdayChanged.subscribe(onExternalBirthdayChanged);
        });
    }());
}(jQuery, lu.bioCalc.BirthdaySectionView, lu.bioCalc.BioCalcPageData, lu.bioCalc.configuration.ConfigurationService, lu.bioCalc.DateFormatter));