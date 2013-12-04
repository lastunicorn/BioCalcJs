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

        function refreshXDay() {
            var xDay = bioCalcPageData.xDay;
            var title = dateFormatter.formatDate(xDay);
            view.setTitle(title);

            view.setXDay(xDay);
        }

        function refreshSecondBirthday() {
            var secondBirthday = bioCalcPageData.secondBirthday;
            view.setSecondBirthday(secondBirthday);
        }

        function refreshBiorhythms() {
            view.setBiorhythms(bioCalcPageData.biorhythms);
        }

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onExternalXDayChanged(arg) {
            refreshXDay();
        }

        function onExternalBiorhythmsChanged(arg) {
            refreshBiorhythms();
        }

        function onSecondBirthdayChanged(arg){
            refreshSecondBirthday();
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            view = viewFactory.create("XDaySectionView");

            refreshBiorhythms();

            bioCalcPageData.xDayChanged.subscribe(onExternalXDayChanged);
            bioCalcPageData.biorhythmsChanged.subscribe(onExternalBiorhythmsChanged);
            bioCalcPageData.secondBirthdayChanged.subscribe(onSecondBirthdayChanged);

            refreshXDay();
            refreshSecondBirthday();
        }());
    };

}(
        lu.bioCalc.mainPage.ViewFactory,
        lu.bioCalc.mainPage.BioCalcPageData,
        lu.bioCalc.DateFormatter
    ));