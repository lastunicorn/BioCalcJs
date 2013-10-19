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

lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage.dialogs");

/**
 * Contains the logic of the About dialog.
 * 
 * @param $
 *            The jQuery object.
 * 
 * @param AboutDialogView
 *            The constructor function of the view.
 * 
 * @param bioControlsVersion
 *            The version of the BioControls package.
 * 
 * @param bioCalcVersion
 *            The version of the current application.
 * 
 * @returns {lu.bioCalc.mainPage.dialogs.AboutDialog}
 */
lu.bioCalc.mainPage.dialogs.AboutDialog = (function($, AboutDialogView, bioControlsVersion, bioCalcVersion) {

    var view = null;

    // --------------------------------------------------------------------------
    // Functions - "public"
    // --------------------------------------------------------------------------

    function show() {
        view.show();
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
        $(function() {
            var presenter = {
                onCloseButtonClicked: onAboutDialogCloseClicked
            };

            view = new AboutDialogView(presenter);

            view.setJQueryVersionText($.fn.jquery);
            view.setJQueryUIVersionText($.ui.version);
            view.setBioControlsVersionText(bioControlsVersion);
            view.setBioCalcVersionText("ver " + bioCalcVersion);
        });
    }());

    return {
        show: show
    };
}(jQuery, lu.bioCalc.mainPage.dialogs.AboutDialogView, lu.bioControls.version, lu.bioCalc.version));