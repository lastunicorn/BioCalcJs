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

(function (dateFormatter, dateUtil) {

    /**
     * Contains the logic of the page section that displays the
     * biorhythm charts, the legend and also the first day and last day labels.
     */
    lu.bioCalc.mainPage.pageSections.ChartsSection = function (bioCalcPageData) {

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
            view.$biorhythmViewContainer.biorhythmView("suspendPaint");
            try {
                var newBirthday = bioCalcPageData.birthday;
                bioCalcPageData.biorhythms.setBirthdayOnAll(newBirthday);
            }
            finally {
                view.$biorhythmViewContainer.biorhythmView("resumePaint");
            }
        }

        function start() {
            bioCalcPageData.birthdayChanged.subscribe(onExternalBirthdayChanged);
            bioCalcPageData.biorhythmsChanged.subscribe(onExternalBiorhythmsChanged);

            view.$biorhythmViewContainer.biorhythmView("suspendPaint");
            try {
                var firstDay = dateUtil.addDays(Date.now(), -7);

                view.setBiorhythmViewFirstDay(firstDay);

                displayFirstDayLabel();
                displayBiorhythms();
                displayBirthday();
                publishCurrentXDay();
            }
            finally {
                view.$biorhythmViewContainer.biorhythmView("resumePaint");
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
            setTimeout(function () {
                view.$firstDayTextBox.datepicker('show');
            }, 0);
        }

        function onFirstDayDatePickerSelect() {
            var firstDay = view.getFirstDayTextBoxDate();
            view.setBiorhythmViewFirstDay(firstDay);
        }

        function onBeforeFirstDayDatePickerShow(input, inst) {
            // Handle calendar position before showing it.
            // It's not supported by Datepicker itself (for now) so I need
            // to use its internal variables.
            var calendar = inst.dpDiv;

            // Dirty hack, but we can't do anything without it (for now, in
            // jQuery UI 1.8.20)
            setTimeout(function () {
                calendar.position({
                    my: 'left top',
                    at: 'left bottom',
                    collision: 'none',
                    of: view.$firstDayLabel
                });
            }, 0);
        }

        function onLastDayLabelClick() {
            setTimeout(function () {
                view.$lastDayTextBox.datepicker('show');
            }, 0);
        }

        function onLastDayDatePickerSelect() {
            var lastDay = view.getLastDayTextBoxDate();

            var displayedDayCount = view.$biorhythmViewContainer.biorhythmView("option", "totalDays") - 1;
            var firstDay = dateUtil.addDays(lastDay, -displayedDayCount);

            view.setBiorhythmViewFirstDay(firstDay);
        }

        function onBeforeLastDayDatePickerShow(input, inst) {
            // Handle calendar position before showing it.
            // It's not supported by Datepicker itself (for now) so I need
            // to use its internal variables.
            var calendar = inst.dpDiv;

            // Dirty hack, but we can't do anything without it (for now, in
            // jQuery UI 1.8.20)
            setTimeout(function () {
                calendar.position({
                    my: 'right top',
                    at: 'right bottom',
                    collision: 'none',
                    of: view.$lastDayLabel
                });
            }, 0);
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
                onBeforeFirstDayDatePickerShow: onBeforeFirstDayDatePickerShow,
                onFirstDayDatePickerSelect: onFirstDayDatePickerSelect,
                onLastDayLabelClick: onLastDayLabelClick,
                onBeforeLastDayDatePickerShow: onBeforeLastDayDatePickerShow,
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