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

//lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage.dialogs");

window.lu = window.lu || {};
lu.bioCalc = lu.bioCalc || {};
lu.bioCalc.mainPage = lu.bioCalc.mainPage || {};
lu.bioCalc.mainPage.dialogs = lu.bioCalc.mainPage.dialogs || {};

(function ($, viewFactory, bioControlsVersion, bioCalcVersion) {

    /**
     * Contains the logic of the About dialog.
     */
    lu.bioCalc.mainPage.dialogs.AboutDialog = function () {

        var view = null;

        // --------------------------------------------------------------------------
        // Functions - "public"
        // --------------------------------------------------------------------------

        this.show = function () {
            view.show();
        };

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
            var presenter = {
                onCloseButtonClicked: onAboutDialogCloseClicked
            };

            view = viewFactory.create("AboutDialogView");
            view.presenter = presenter;

            view.setJQueryVersionText($.fn.jquery);
            view.setJQueryUIVersionText($.ui.version);
            view.setBioControlsVersionText(bioControlsVersion);
            view.setBioCalcVersionText("ver " + bioCalcVersion);
        }());
    };

}(
        jQuery,
        lu.bioCalc.mainPage.ViewFactory,
        lu.bioControls.version,
        lu.bioCalc.version
    ));