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
    lu.bioCalc.mainPage.pageSections.MainToolbar = function (configuration, bioCalcPageData, commands) {

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

        function updateSaveButtonVisibility() {
            var isDataChanged = bioCalcPageData.isDataChanged();

            if (isDataChanged)
                view.enableSaveButton();
            else
                view.disableSaveButton();
        }

        function updateLoadButtonVisibility() {
            var isDataChanged = bioCalcPageData.isDataChanged();

            if (isDataChanged)
                view.enableLoadButton();
            else
                view.disableLoadButton();
        }

        function start() {
            configuration.saved.subscribe(onConfigurationSaved);
            bioCalcPageData.birthdayChanged.subscribe(onBirthdayChanged);
            bioCalcPageData.secondBirthdayChanged.subscribe(onSecondBirthdayChanged);

            subscribeToBiorhythmsEvents();

            updateSaveButtonVisibility();
            updateLoadButtonVisibility();
        }

        function stop() {
            configuration.saved.unsubscribe(onConfigurationSaved);
            bioCalcPageData.birthdayChanged.unsubscribe(onBirthdayChanged);
            bioCalcPageData.secondBirthdayChanged.unsubscribe(onSecondBirthdayChanged);

            unsubscribeFromBiorhythmsEvents();
        }

        function subscribeToBiorhythmsEvents() {
            if (typeof bioCalcPageData.biorhythms.itemAdded === "object" && typeof bioCalcPageData.biorhythms.itemAdded.subscribe === "function")
                bioCalcPageData.biorhythms.itemAdded.subscribe(onBiorhythmAdded);

            if (typeof bioCalcPageData.biorhythms.itemRemoved === "object" && typeof bioCalcPageData.biorhythms.itemRemoved.subscribe === "function")
                bioCalcPageData.biorhythms.itemRemoved.subscribe(onBiorhythmRemoved);

            if (typeof bioCalcPageData.biorhythms !== "object")
                return;

            var biorhythmShapes = bioCalcPageData.biorhythms.toArray();

            for (var i = 0; i < biorhythmShapes.length; i++) {
                subscribeToBiorhythmEvents(biorhythmShapes[i]);
            }
        }

        function subscribeToBiorhythmEvents(biorhythmShape) {
            biorhythmShape.isVisibleChanged.subscribe(onBiorhythmVisibilityChanged);
            biorhythmShape.colorChanged.subscribe(onBiorhythmColorChanged);
        }

        function unsubscribeFromBiorhythmsEvents() {
            if (typeof bioCalcPageData.biorhythms.itemAdded === "object" && typeof bioCalcPageData.biorhythms.itemAdded.unsubscribe === "function")
                bioCalcPageData.biorhythms.itemAdded.unsubscribe(onBiorhythmAdded);

            if (typeof bioCalcPageData.biorhythms.itemRemoved === "object" && typeof bioCalcPageData.biorhythms.itemRemoved.unsubscribe === "function")
                bioCalcPageData.biorhythms.itemRemoved.unsubscribe(onBiorhythmRemoved);

            if (typeof bioCalcPageData.biorhythms !== "object")
                return;

            var biorhythmShapes = bioCalcPageData.biorhythms.toArray();
            for (var i = 0; i < biorhythmShapes.length; i++) {
                unsubscribeFromBiorhythmEvents(biorhythmShapes[i]);
            }
        }

        function unsubscribeFromBiorhythmEvents(biorhythmShape) {
            biorhythmShape.isVisibleChanged.unsubscribe(onBiorhythmVisibilityChanged);
            biorhythmShape.colorChanged.unsubscribe(onBiorhythmColorChanged);
        }

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onHelpButtonClick() {
            commands.helpDialogCommand.execute();
        }

        function onAboutButtonClick() {
            commands.aboutDialogCommand.execute();
        }

        function onOptionsButtonClick() {
            commands.optionsDialogCommand.execute();
        }

        function onSaveButtonClick() {
            commands.saveCommand.execute();
        }

        function onLoadButtonClick() {
            commands.loadCommand.execute();
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

        function onBiorhythmAdded(arg) {
            subscribeToBiorhythmEvents(arg);

            updateSaveButtonVisibility();
            updateLoadButtonVisibility();
        }

        function onBiorhythmRemoved(arg) {
            unsubscribeFromBiorhythmEvents(arg);

            updateSaveButtonVisibility();
            updateLoadButtonVisibility();
        }

        function onBiorhythmVisibilityChanged() {
            updateSaveButtonVisibility();
            updateLoadButtonVisibility();
        }

        function onBiorhythmColorChanged() {
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