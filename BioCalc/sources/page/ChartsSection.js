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

(function(bioCalcPageData, dateFormatter, dateUtil) {

    var $biorhythmViewContainer = null;
    var $firstDayTextBox = null;
    var $firstDayLabel = null;
    var $lastDayTextBox = null;
    var $lastDayLabel = null;
    var $bioLegend = null;

    // --------------------------------------------------------------------------
    // Functions - "private"
    // --------------------------------------------------------------------------

    function publishCurrentXDay() {
        var xDay = $biorhythmViewContainer.biorhythmView("getXDay");
        bioCalcPageData.setXDay(xDay);
    }

    function setFirstDayLabel(date){
        var firstDayAsText = dateFormatter.formatDate(date);
        $firstDayTextBox.val(firstDayAsText);
        $firstDayLabel.html("<< " + firstDayAsText);
    }

    function setLastDayLabel(date) {
        var lastDayAsText = dateFormatter.formatDate(date);
        $lastDayTextBox.val(lastDayAsText);
        $lastDayLabel.html(lastDayAsText + " >>");
    }
    
    function setFirstDayToCharts(date){
        $biorhythmViewContainer.biorhythmView("option", "firstDay", date);
    }
    
    // --------------------------------------------------------------------------
    // Functions - Event Handlers
    // --------------------------------------------------------------------------

    function onBiorhythmViewFirstDayChanged() {

        var firstDay = $biorhythmViewContainer.biorhythmView("option", "firstDay");
        setFirstDayLabel(firstDay);

        var lastDay = $biorhythmViewContainer.biorhythmView("getLastDay");
        setLastDayLabel(lastDay);

        publishCurrentXDay();
    }

    function onFirstDayLabelClick() {
        setTimeout(function() {
            $firstDayTextBox.datepicker('show');
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
                of: $firstDayLabel
            });
        }, 0);
    }

    function onLastDayLabelClick() {
        setTimeout(function() {
            $lastDayTextBox.datepicker('show');
        }, 0);
    }

    function onLastDayDatePickerSelect() {
        var lastDay = $(this).datepicker("getDate");

        var displayedDayCount = $biorhythmViewContainer.biorhythmView("option", "totalDays") - 1;
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
                of: $lastDayLabel
            });
        }, 0);
    }

    function onBiorhythmViewXDayIndexChanged(sender, arg) {
        publishCurrentXDay();
    }

    function onExternalBirthdayChanged(arg) {
        $biorhythmViewContainer.biorhythmView("suspendPaint");
        try {
            var biorhythms = bioCalcPageData.getBiorhythms();
            biorhythms.setBirthdayOnAll(arg);
        }
        finally {
            $biorhythmViewContainer.biorhythmView("resumePaint");
        }

        publishCurrentXDay();
    }

    function onExternalBiorhythmsChanged(arg) {
        $biorhythmViewContainer.biorhythmView("option", "biorhythms", arg);
        $bioLegend.biorhythmLegend("option", "biorhythms", arg);
    }

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $(function() {
            create$();
            initialize$();

            $biorhythmViewContainer.biorhythmView("suspendPaint");
            try {

                var firstDay = dateUtil.addDays(Date.now(), -7);

                setFirstDayLabel(firstDay);
                setFirstDayToCharts(firstDay);

                publishCurrentXDay();

                bioCalcPageData.birthdayChanged.subscribe(onExternalBirthdayChanged);
                bioCalcPageData.biorhythmsChanged.subscribe(onExternalBiorhythmsChanged);
            }
            finally {
                $biorhythmViewContainer.biorhythmView("resumePaint");
            }
        });
    }());

    function create$() {
        $biorhythmViewContainer = $("#biorhythmViewContainer");
        $firstDayLabel = $("#firstDayLabel");
        $firstDayTextBox = $("#firstDayTextBox");
        $lastDayLabel = $("#lastDayLabel");
        $lastDayTextBox = $("#lastDayTextBox");
        $bioLegend = $("#bioLegend");
    }

    function initialize$() {

        $firstDayLabel.click(onFirstDayLabelClick);

        $firstDayTextBox.datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "yy-mm-dd",
            onSelect: onFirstDayDatePickerSelect,
            showButtonPanel: true,
            beforeShow: onBeforeFirstDayDatePickerShow,
            showAnim: ""
        });

        $lastDayLabel.click(onLastDayLabelClick);

        $lastDayTextBox.datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "yy-mm-dd",
            onSelect: onLastDayDatePickerSelect,
            showButtonPanel: true,
            beforeShow: onBeforeLastDayDatePickerShow,
            showAnim: ""
        });

        $biorhythmViewContainer.biorhythmView({
            width: 900,
            height: 200,
            firstDayChanged: onBiorhythmViewFirstDayChanged,
            xDayIndexChanged: onBiorhythmViewXDayIndexChanged
        });

        $bioLegend.biorhythmLegend();
    }
}(lu.bioCalc.BioCalcPageData, lu.bioCalc.DateFormatter, lu.DateUtil));