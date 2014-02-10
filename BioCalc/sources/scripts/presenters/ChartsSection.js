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

(function (dateFormatter, dateUtil) {

    /**
     * Contains the logic of the page section that displays the
     * biorhythm charts, the legend and also the first day and last day labels.
     */
    lu.bioCalc.presenters.ChartsSection = function (bioCalcPageData) {

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

        function publishCurrentXDay() {
            bioCalcPageData.xDay = view.getBiorhythmsViewBirthday();
        }

        function displayFirstDayLabel() {
            var date = view.getBiorhythmViewFirstDay();
            var dateAsText = dateFormatter.formatDate(date);

            view.setFirstDayTextBoxText(dateAsText);
            view.setFirstDayLabelText(dateAsText);
        }

        function displayLastDayLabel() {
            var date = view.getBiorhythmViewLastDay();
            var dateAsText = dateFormatter.formatDate(date);

            view.setLastDayTextBoxText(dateAsText);
            view.setLastDayLabelText(dateAsText);
        }

        function displayBiorhythms() {
            var biorhythms = bioCalcPageData.biorhythms;

            view.setBiorhythmViewBiorhythms(biorhythms);
            view.setBioLegendBiorhythms(biorhythms);
        }

        function displayBirthday() {
            view.suspendPaint();
            try {
                var newBirthday = bioCalcPageData.birthday;
                bioCalcPageData.biorhythms.setBirthdayOnAll(newBirthday, "Person1");
            }
            finally {
                view.resumePaint();
            }
        }

        function start() {
            bioCalcPageData.birthdayChanged.subscribe(onExternalBirthdayChanged);
            bioCalcPageData.biorhythmsChanged.subscribe(onExternalBiorhythmsChanged);

            view.suspendPaint();
            try {
                var firstDay = dateUtil.addDays(Date.now(), -7);

                view.setBiorhythmViewFirstDay(firstDay);

                displayFirstDayLabel();
                displayBiorhythms();
                displayBirthday();
                publishCurrentXDay();
            }
            finally {
                view.resumePaint();
            }
        }

        function stop() {
            bioCalcPageData.birthdayChanged.unsubscribe(onExternalBirthdayChanged);
            bioCalcPageData.biorhythmsChanged.unsubscribe(onExternalBiorhythmsChanged);
        }

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onBiorhythmViewFirstDayChanged() {
            displayFirstDayLabel();
            displayLastDayLabel();
            publishCurrentXDay();
        }

        function onFirstDayLabelClick() {
            view.displayFirstDayDatePicker();
        }

        function onFirstDayDatePickerSelect() {
            var firstDay = view.getFirstDayTextBoxDate();
            view.setBiorhythmViewFirstDay(firstDay);
        }

        function onLastDayLabelClick() {
            view.displayLastDayDatePicker();
        }

        function onLastDayDatePickerSelect() {
            var lastDay = view.getLastDayTextBoxDate();

            var displayedDayCount = view.getDisplayedDayCount();
            var firstDay = dateUtil.addDays(lastDay, -displayedDayCount + 1);

            view.setBiorhythmViewFirstDay(firstDay);
        }

        function onBiorhythmViewXDayIndexChanged(sender, arg) {
            publishCurrentXDay();
        }

        function onExternalBirthdayChanged(arg) {
            displayBirthday();
            publishCurrentXDay();
        }

        function onExternalBiorhythmsChanged(arg) {
            displayBiorhythms();
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            presenter = {
                onFirstDayLabelClick: onFirstDayLabelClick,
                onFirstDayDatePickerSelect: onFirstDayDatePickerSelect,
                onLastDayLabelClick: onLastDayLabelClick,
                onLastDayDatePickerSelect: onLastDayDatePickerSelect,
                onBiorhythmViewFirstDayChanged: onBiorhythmViewFirstDayChanged,
                onBiorhythmViewXDayIndexChanged: onBiorhythmViewXDayIndexChanged
            };
        }());
    };

}(
        lu.bioCalc.helpers.DateFormatter,
        lu.DateUtil
    ));