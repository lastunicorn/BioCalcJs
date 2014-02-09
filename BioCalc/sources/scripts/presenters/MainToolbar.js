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

(function () {

    /**
     * Contains the logic of the main tool bar.
     */
    lu.bioCalc.presenters.MainToolbar = function (bioCalcPageData, commands) {

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

        function updateAllButtonsVisibility() {
            updateSaveButtonVisibility();
            updateLoadButtonVisibility();
            updateClearButtonVisibility();
        }

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

        function updateClearButtonVisibility() {
            var isDataDefault = bioCalcPageData.isDataDefault();

            if (isDataDefault)
                view.disableClearButton();
            else
                view.enableClearButton();
        }

        function start() {
            bioCalcPageData.saved.subscribe(onPageDataSaved);
            bioCalcPageData.birthdayChanged.subscribe(onBirthdayChanged);
            bioCalcPageData.secondBirthdayChanged.subscribe(onSecondBirthdayChanged);

            subscribeToBiorhythmsEvents();

            updateAllButtonsVisibility();
        }

        function stop() {
            bioCalcPageData.saved.unsubscribe(onPageDataSaved);
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

        function onClearButtonClick() {
            commands.clearCommand.execute();
        }

        function onPageDataSaved() {
            updateAllButtonsVisibility();
        }

        function onBirthdayChanged() {
            updateAllButtonsVisibility();
        }

        function onSecondBirthdayChanged() {
            updateAllButtonsVisibility();
        }

        function onBiorhythmAdded(arg) {
            subscribeToBiorhythmEvents(arg);

            updateAllButtonsVisibility();
        }

        function onBiorhythmRemoved(arg) {
            unsubscribeFromBiorhythmEvents(arg);

            updateAllButtonsVisibility();
        }

        function onBiorhythmVisibilityChanged() {
            updateAllButtonsVisibility();
        }

        function onBiorhythmColorChanged() {
            updateAllButtonsVisibility();
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
                onLoadButtonClick: onLoadButtonClick,
                onClearButtonClick: onClearButtonClick
            };
        }());
    };

}());