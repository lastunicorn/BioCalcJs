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

(function () {

    lu.bioCalc.mainPage.pageSections.saveCommand = function (configuration, bioCalcPageData) {

        this.execute = function () {
            configuration.save();
        };
    }

    /**
     * Contains the logic of the main tool bar.
     */
    lu.bioCalc.mainPage.pageSections.MainToolbar = function (configuration, bioCalcPageData, helpDialog, aboutDialog, optionsDialog) {

        var presenter;

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

        function isBirthdayChanged() {
            if (!bioCalcPageData.birthday && !configuration.config.birthday)
                return false;

            if (!configuration.config.birthday || !configuration.config.birthday)
                return true;

            return configuration.config.birthday.getTime() != bioCalcPageData.birthday.getTime();
        }

        function isSecondBirthdayChanged() {
            if (!bioCalcPageData.secondBirthday && !configuration.config.secondBirthday)
                return false;

            if (!bioCalcPageData.secondBirthday || !configuration.config.secondBirthday)
                return true;

            return configuration.config.secondBirthday.getTime() != bioCalcPageData.secondBirthday.getTime();
        }

        function updateSaveButtonVisibility() {
            var isSomethingChanged = isBirthdayChanged() ||
                isSecondBirthdayChanged();

            if (isSomethingChanged)
                view.enableSaveButton();
            else
                view.disableSaveButton();
        }

        function updateLoadButtonVisibility() {
            var isSomethingChanged = isBirthdayChanged() ||
                isSecondBirthdayChanged();

            if (isSomethingChanged)
                view.enableLoadButton();
            else
                view.disableLoadButton();
        }

        function start() {
            configuration.saved.subscribe(onConfigurationSaved);
            bioCalcPageData.birthdayChanged.subscribe(onBirthdayChanged);
            bioCalcPageData.secondBirthdayChanged.subscribe(onSecondBirthdayChanged);

            updateSaveButtonVisibility();
            updateLoadButtonVisibility();
        }

        function stop() {
            configuration.saved.unsubscribe(onConfigurationSaved);
            bioCalcPageData.birthdayChanged.unsubscribe(onBirthdayChanged);
            bioCalcPageData.secondBirthdayChanged.unsubscribe(onSecondBirthdayChanged);
        }

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onHelpButtonClick() {
            helpDialog.show();
        }

        function onAboutButtonClick() {
            aboutDialog.show();
        }

        function onOptionsButtonClick() {
            optionsDialog.show();
        }

        function onSaveButtonClick() {
            configuration.save();
        }

        function onLoadButtonClick() {
            configuration.loadFromCookies();
        }

        function onConfigurationSaved() {
            updateSaveButtonVisibility();
            updateLoadButtonVisibility();
        }

        function onBirthdayChanged() {
            updateSaveButtonVisibility();
            updateLoadButtonVisibility();
        }

        function onSecondBirthdayChanged() {
            updateSaveButtonVisibility();
            updateLoadButtonVisibility();
        }

        // --------------------------------------------------------------------------
        // Initialization
        // --------------------------------------------------------------------------

        (function initialize() {
            presenter = {
                onHelpButtonClick: onHelpButtonClick,
                onAboutButtonClick: onAboutButtonClick,
                onOptionsButtonClick: onOptionsButtonClick,
                onSaveButtonClick: onSaveButtonClick,
                onLoadButtonClick: onLoadButtonClick
            };
        }());
    };

}());