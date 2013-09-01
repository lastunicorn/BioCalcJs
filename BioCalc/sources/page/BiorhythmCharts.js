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

var lu = lu || {};
lu.bioCalc = lu.bioCalc || {};

lu.bioCalc.BiorhythmCharts = (function() {

    var $biorhythmViewContainer = null;
    var $firstDayTextBox = null;
    var $firstDayLabel = null;
    var $lastDayTextBox = null;
    var $lastDayLabel = null;
    var $bioLegend = null;
    var firstDay = null;

    // --------------------------------------------------------------------------
    // Functions - "private"
    // --------------------------------------------------------------------------

    function publishXDay(xDay) {
        lu.bioCalc.BioCalcPageData.setXDay(xDay);
    }

    // --------------------------------------------------------------------------
    // Functions - Event Handlers
    // --------------------------------------------------------------------------

    function onBiorhythmViewFirstDayChanged() {

        // update first day

        firstDay = $biorhythmViewContainer.biorhythmView("option", "firstDay");
        var firstDayAsText = lu.bioCalc.DateFormatter.formatDate(firstDay)
        $firstDayTextBox.val(firstDayAsText);
        $firstDayLabel.html("<< " + firstDayAsText);

        // update last day

        var lastDay = $biorhythmViewContainer.biorhythmView("getLastDay");
        var lastDayAsText = lu.bioCalc.DateFormatter.formatDate(lastDay);
        $lastDayTextBox.val(lastDayAsText);
        $lastDayLabel.html(lastDayAsText + " >>");

        // publics x day

        var xDay = $biorhythmViewContainer.biorhythmView("getXDay");
        publishXDay(xDay);
    }

    function onFirstDayLabelClick() {
        setTimeout(function() {
            $firstDayTextBox.datepicker('show');
        }, 0);
    }

    function onFirstDayDatePickerSelect() {
        firstDay = $(this).datepicker("getDate");
        $biorhythmViewContainer.biorhythmView("option", "firstDay", firstDay);
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
        firstDay = lu.DateUtil.addDays(lastDay, -displayedDayCount);

        $biorhythmViewContainer.biorhythmView("option", "firstDay", firstDay);
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
        var xDay = $biorhythmViewContainer.biorhythmView("getXDay");
        publishXDay(xDay);
    }

    function onExternalBirthdayChanged(arg) {
        var xDay = $biorhythmViewContainer.biorhythmView("getXDay");
        publishXDay(xDay);
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

                firstDay = lu.DateUtil.addDays(Date.now(), -7);

                $firstDayTextBox.val(lu.bioCalc.DateFormatter.formatDate(firstDay));
                $biorhythmViewContainer.biorhythmView("option", "firstDay", firstDay);

                var xDay = $biorhythmViewContainer.biorhythmView("getXDay");
                publishXDay(xDay);

                lu.bioCalc.BioCalcPageData.birthdayChanged.subscribe(onExternalBirthdayChanged);
                lu.bioCalc.BioCalcPageData.biorhythmsChanged.subscribe(onExternalBiorhythmsChanged);
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

    return {};
}());