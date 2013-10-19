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

/**
 * This module contains the logic of the page section that displays the
 * biorhythm charts.
 * 
 * @param $
 *            The jQuery object.
 * 
 * @param ChartsSectionView
 *            The constructor function of the view.
 * 
 * @param bioCalcPageData
 *            The service that provides data and communication between different
 *            modules of the page.
 * 
 * @param dateFormatter
 *            Provides methods to format a data into a string.
 * 
 * @param dateUtil
 *            provides utility methods to manipulate a Date.
 */
(function ChartsSection($, ChartsSectionView, bioCalcPageData, dateFormatter, dateUtil) {

    var view;

    // --------------------------------------------------------------------------
    // Functions - "private"
    // --------------------------------------------------------------------------

    function publishCurrentXDay() {
        var xDay = view.$biorhythmViewContainer.biorhythmView("getXDay");
        bioCalcPageData.xDay = xDay;
    }

    function setFirstDayLabel(date) {
        var firstDayAsText = dateFormatter.formatDate(date);
        view.$firstDayTextBox.val(firstDayAsText);
        view.$firstDayLabel.html("<< " + firstDayAsText);
    }

    function setLastDayLabel(date) {
        var lastDayAsText = dateFormatter.formatDate(date);
        view.$lastDayTextBox.val(lastDayAsText);
        view.$lastDayLabel.html(lastDayAsText + " >>");
    }

    function setFirstDayToCharts(date) {
        view.$biorhythmViewContainer.biorhythmView("option", "firstDay", date);
    }
    
    function setBiorhythms(biorhythms)
    {
        view.$biorhythmViewContainer.biorhythmView("option", "biorhythms", biorhythms);
        view.$bioLegend.biorhythmLegend("option", "biorhythms", biorhythms);
    }
    
    function setBirthday(newBirthday){
        view.$biorhythmViewContainer.biorhythmView("suspendPaint");
        try {
            var biorhythms = bioCalcPageData.biorhythms;
            biorhythms.setBirthdayOnAll(newBirthday);
        }
        finally {
            view.$biorhythmViewContainer.biorhythmView("resumePaint");
        }
    }

    // --------------------------------------------------------------------------
    // Event Handlers
    // --------------------------------------------------------------------------

    function onBiorhythmViewFirstDayChanged() {

        var firstDay = view.$biorhythmViewContainer.biorhythmView("option", "firstDay");
        setFirstDayLabel(firstDay);

        var lastDay = view.$biorhythmViewContainer.biorhythmView("getLastDay");
        setLastDayLabel(lastDay);

        publishCurrentXDay();
    }

    function onFirstDayLabelClick() {
        setTimeout(function() {
            view.$firstDayTextBox.datepicker('show');
        }, 0);
    }

    function onFirstDayDatePickerSelect() {
        var firstDay = $(this).datepicker("getDate");
        setFirstDayToCharts(firstDay);
    }

    function onBeforeFirstDayDatePickerShow(input, inst) {
        // Handle calendar position before showing it.
        // It's not supported by Datepicker itself (for now) so I need
        // to use its internal variables.
        var calendar = inst.dpDiv;

        // Dirty hack, but we can't do anything without it (for now, in
        // jQuery UI 1.8.20)
        setTimeout(function() {
            calendar.position({
                my: 'left top',
                at: 'left bottom',
                collision: 'none',
                of: view.$firstDayLabel
            });
        }, 0);
    }

    function onLastDayLabelClick() {
        setTimeout(function() {
            view.$lastDayTextBox.datepicker('show');
        }, 0);
    }

    function onLastDayDatePickerSelect() {
        var lastDay = $(this).datepicker("getDate");

        var displayedDayCount = view.$biorhythmViewContainer.biorhythmView("option", "totalDays") - 1;
        var firstDay = dateUtil.addDays(lastDay, -displayedDayCount);

        setFirstDayToCharts(firstDay);
    }

    function onBeforeLastDayDatePickerShow(input, inst) {
        // Handle calendar position before showing it.
        // It's not supported by Datepicker itself (for now) so I need
        // to use its internal variables.
        var calendar = inst.dpDiv;

        // Dirty hack, but we can't do anything without it (for now, in
        // jQuery UI 1.8.20)
        setTimeout(function() {
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
        setBirthday(arg);
        publishCurrentXDay();
    }

    function onExternalBiorhythmsChanged(arg) {
        setBiorhythms(arg);
    }

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $(function() {
            view = new ChartsSectionView();

            view.$firstDayLabel.click(onFirstDayLabelClick);

            view.$firstDayTextBox.datepicker("option", "beforeShow", onBeforeFirstDayDatePickerShow);
            view.$firstDayTextBox.datepicker("option", "onSelect", onFirstDayDatePickerSelect);

            view.$lastDayLabel.click(onLastDayLabelClick);

            view.$lastDayTextBox.datepicker("option", "beforeShow", onBeforeLastDayDatePickerShow);
            view.$lastDayTextBox.datepicker("option", "onSelect", onLastDayDatePickerSelect);

            view.$biorhythmViewContainer.biorhythmView("option", "firstDayChanged", onBiorhythmViewFirstDayChanged);
            view.$biorhythmViewContainer.biorhythmView("option", "xDayIndexChanged", onBiorhythmViewXDayIndexChanged);

            view.$biorhythmViewContainer.biorhythmView("suspendPaint");
            try {

                var firstDay = dateUtil.addDays(Date.now(), -7);

                setFirstDayLabel(firstDay);
                setFirstDayToCharts(firstDay);
                setBiorhythms(bioCalcPageData.biorhythms);
                setBirthday(bioCalcPageData.birthday);
                publishCurrentXDay();

                bioCalcPageData.birthdayChanged.subscribe(onExternalBirthdayChanged);
                bioCalcPageData.biorhythmsChanged.subscribe(onExternalBiorhythmsChanged);
            }
            finally {
                view.$biorhythmViewContainer.biorhythmView("resumePaint");
            }
        });
    }());
}(jQuery, lu.bioCalc.mainPage.pageSections.ChartsSectionView, lu.bioCalc.BioCalcPageData, lu.bioCalc.DateFormatter, lu.DateUtil));