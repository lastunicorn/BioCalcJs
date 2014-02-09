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
     * Contains the logic of the Options dialog.
     */
    lu.bioCalc.presenters.OptionsDialog = function (bioCalcPageData) {

        var presenter;
        var biorhythmShapes = null;

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

            if (view)
                view.presenter = presenter;
        }

        // --------------------------------------------------------------------------
        // Functions
        // --------------------------------------------------------------------------

        this.show = function () {
            view.show();
        };

        function start() {
            bioCalcPageData.biorhythmsChanged.subscribe(onExternalBiorhythmsChanged);
            biorhythmShapes = bioCalcPageData.biorhythms;

            var isAnyPrimaryVisible = biorhythmShapes.primaryBiorhythmShapes.isAnyVisible();
            view.checkPrimaryBiorhythmsCheckbox(isAnyPrimaryVisible);

            var isAnySecondaryVisible = biorhythmShapes.secondaryBiorhythmShapes.isAnyVisible();
            view.checkSecondaryBiorhythmsCheckbox(isAnySecondaryVisible);

            var isAnyExtraVisible = biorhythmShapes.extraBiorhythmShapes.isAnyVisible();
            view.checkExtraBiorhythmsCheckbox(isAnyExtraVisible);

            var isAnyIChingVisible = biorhythmShapes.iChingBiorhythmShapes.isAnyVisible();
            view.checkIChingBiorhythmsCheckbox(isAnyIChingVisible);
        }

        function stop(){
            bioCalcPageData.biorhythmsChanged.unsubscribe(onExternalBiorhythmsChanged);
        }

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onOptionsDialogCloseClicked() {
            view.close();
        }

        function onOptionsDialogOpen() {
            start();
        }

        function onOptionsDialogClose() {
            stop();
        }

        function onPrimaryCheckboxChange() {
            var isChecked = view.isCheckedPrimaryBiorhythmsCheckbox();
            biorhythmShapes.primaryBiorhythmShapes.showAll(isChecked);
        }

        function onSecondaryCheckboxChange() {
            var isChecked = view.isCheckedSecondaryBiorhythmsCheckbox();
            biorhythmShapes.secondaryBiorhythmShapes.showAll(isChecked);
        }

        function onExtraCheckboxChange() {
            var isChecked = view.isCheckedExtraBiorhythmsCheckbox();
            biorhythmShapes.extraBiorhythmShapes.showAll(isChecked);
        }

        function onIChingCheckboxChange() {
            var isChecked = view.isCheckedIChingBiorhythmsCheckbox();
            biorhythmShapes.iChingBiorhythmShapes.showAll(isChecked);
        }

        function onExternalBiorhythmsChanged(arg) {
            biorhythmShapes = arg;
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            presenter = {
                onCloseButtonClicked: onOptionsDialogCloseClicked,
                onOptionsDialogOpen: onOptionsDialogOpen,
                onOptionsDialogClose: onOptionsDialogClose,
                onPrimaryCheckboxChange: onPrimaryCheckboxChange,
                onSecondaryCheckboxChange: onSecondaryCheckboxChange,
                onExtraCheckboxChange: onExtraCheckboxChange,
                onIChingCheckboxChange: onIChingCheckboxChange
            };
        }());
    };

}());