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

        function updateSaveBirthdayButtonVisibility() {
            var config = configuration.config;
            var birthday = bioCalcPageData.birthday;

            if (birthday != null && config.birthday.getTime() == birthday.getTime()) {
                view.disableSaveButton();
            } else {
                view.enableSaveButton();
            }
        }

        function updateResetBirthdayButtonVisibility() {
            var config = configuration.config;
            var birthday = bioCalcPageData.birthday;

            if (birthday.getTime() == config.birthday.getTime()) {
                view.disableLoadButton();
            } else {
                view.enableLoadButton();
            }
        }

        function start() {
            bioCalcPageData.birthdayChanged.subscribe(onBirthdayChanged);

            updateSaveBirthdayButtonVisibility();
            updateResetBirthdayButtonVisibility();
        }

        function stop() {
            bioCalcPageData.birthdayChanged.unsubscribe(onBirthdayChanged);
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

            updateSaveBirthdayButtonVisibility();
            updateResetBirthdayButtonVisibility();
        }

        function onLoadButtonClick() {
            bioCalcPageData.birthday = configuration.config.birthday;

            updateSaveBirthdayButtonVisibility();
            updateResetBirthdayButtonVisibility();
        }

        function onBirthdayChanged() {
            updateSaveBirthdayButtonVisibility();
            updateResetBirthdayButtonVisibility();
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