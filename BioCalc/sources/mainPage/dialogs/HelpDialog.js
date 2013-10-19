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
 * Contains the logic of the Help dialog.
 * 
 * @param $
 *            The jQuery object.
 * 
 * @param HelpDialogView
 *            The constructor function of the view.
 * 
 * @returns {lu.bioCalc.mainPage.dialogs.HelpDialog}
 */
lu.bioCalc.mainPage.dialogs.HelpDialog = (function($, HelpDialogView) {

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

    function onHelpDialogCloseClicked() {
        view.close();
    }

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $(function() {
            var presenter = {
                onCloseButtonClicked: onHelpDialogCloseClicked
            };

            view = new HelpDialogView(presenter);
        });
    }());

    return {
        show: show
    };
}(jQuery, lu.bioCalc.mainPage.dialogs.HelpDialogView));