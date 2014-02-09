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

(function ($, bioControlsVersion, bioCalcVersion) {

    /**
     * Contains the UI logic of the About dialog.
     */
    lu.bioCalc.presenters.AboutDialog = function () {

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

        this.show = function () {
            view.show();
        };

        function initializeView() {
            view.setJQueryVersionText($.fn.jquery);
            view.setJQueryUIVersionText($.ui.version);
            view.setBioControlsVersionText(bioControlsVersion);
            view.setBioCalcVersionText("ver " + bioCalcVersion);
        }

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onAboutDialogCloseClicked() {
            view.close();
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            presenter = {
                onCloseButtonClicked: onAboutDialogCloseClicked
            };
        }());
    };

}(
        jQuery,
        lu.bioControls.version,
        lu.bioCalc.version
    ));