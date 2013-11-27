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

(function (viewFactory, bioCalcPageData, dateFormatter) {

    /**
     * This module contains the logic of the page section where the user can see
     * details about the X day.
     */
    lu.bioCalc.mainPage.pageSections.XDaySection = function () {

        var view = null;

        // --------------------------------------------------------------------------
        // Functions - "private"
        // --------------------------------------------------------------------------

        function updateDisplayedXDay(xDay) {
            var title = dateFormatter.formatDate(xDay);
            view.setTitle(title);

            view.setXDay(xDay);
        }

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onExternalXDayChanged(arg) {
            updateDisplayedXDay(arg);
        }

        function onExternalBiorhythmsChanged(arg) {
            view.setBiorhythms(arg);
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            view = viewFactory.create("XDaySectionView");

            view.setBiorhythms(bioCalcPageData.biorhythms);

            bioCalcPageData.xDayChanged.subscribe(onExternalXDayChanged);
            bioCalcPageData.biorhythmsChanged.subscribe(onExternalBiorhythmsChanged);

            updateDisplayedXDay(bioCalcPageData.xDay);
        }());
    };

}(
        lu.bioCalc.mainPage.ViewFactory,
        lu.bioCalc.mainPage.BioCalcPageData,
        lu.bioCalc.DateFormatter
    ));