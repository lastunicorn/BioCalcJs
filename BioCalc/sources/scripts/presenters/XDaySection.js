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

(function (dateFormatter) {

    /**
     * Contains the logic of the page section where the user can see
     * details about the X day.
     */
    lu.bioCalc.mainPage.pageSections.XDaySection = function (bioCalcPageData) {

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
                stop();

            view = value;

            if (view)
                start();
        }

        // --------------------------------------------------------------------------
        // Functions
        // --------------------------------------------------------------------------

        function start() {
            bioCalcPageData.xDayChanged.subscribe(onExternalXDayChanged);
            bioCalcPageData.biorhythmsChanged.subscribe(onExternalBiorhythmsChanged);
            bioCalcPageData.secondBirthdayChanged.subscribe(onSecondBirthdayChanged);

            refreshBiorhythms();
            refreshXDay();
            refreshSecondBirthday();
        }

        function stop() {
            bioCalcPageData.xDayChanged.unsubscribe(onExternalXDayChanged);
            bioCalcPageData.biorhythmsChanged.unsubscribe(onExternalBiorhythmsChanged);
            bioCalcPageData.secondBirthdayChanged.unsubscribe(onSecondBirthdayChanged);
        }

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

        function onSecondBirthdayChanged(arg) {
            refreshSecondBirthday();
        }
    };

}(lu.bioCalc.helpers.DateFormatter));