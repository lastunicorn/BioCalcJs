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

(function (viewFactory) {

    /**
     * Contains the logic of the main tool bar.
     */
    lu.bioCalc.mainPage.pageSections.MainToolbar = function (helpDialog, aboutDialog, optionsDialog) {

        var view = null;

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

        // --------------------------------------------------------------------------
        // Initialization
        // --------------------------------------------------------------------------

        (function initialize() {
            var presenter = {
                onHelpButtonClick: onHelpButtonClick,
                onAboutButtonClick: onAboutButtonClick,
                onOptionsButtonClick: onOptionsButtonClick
            };

            view = viewFactory.create("MainToolbarView");
            view.presenter = presenter;
        }());
    };

}(lu.bioCalc.mainPage.ViewFactory));