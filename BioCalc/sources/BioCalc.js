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

(function() {
    var biorhythmView = null;
    var commonBiorhythmShapes = null;
    var configManager = null;
    var model = null;
    var $bioLegend = null;
    var $firstDayTextBox = null;
    var $firstDayLabel = null;
    var $lastDayTextBox = null;
    var $lastDayLabel = null;
    var $bioCanvas = null;
    var $bioCanvasContainer = null;

    // --------------------------------------------------------------------------
    // Functions - Update GUI from model
    // --------------------------------------------------------------------------

    function updateFirstDayInUi() {
        setTimeout(function() {
            $firstDayTextBox.val(formatDate(model.firstDay));
        }, 0);

        biorhythmView.firstDay = model.firstDay;
    }

    function updateXDayInfo() {
        var xDay = biorhythmView.xDay;
        lu.bioCalc.XDaySection.setXDay(xDay);
    }

    // --------------------------------------------------------------------------
    // Functions - "private"
    // --------------------------------------------------------------------------

    function formatDate(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var monthString = month < 10 ? "0" + month : "" + month;
        var dayString = day < 10 ? "0" + day : "" + day;

        return year + "-" + monthString + "-" + dayString;
    }

    // --------------------------------------------------------------------------
    // Functions - Event Handlers
    // --------------------------------------------------------------------------

    function onBiorhythmViewFirstDayChanged() {
        model.firstDay = biorhythmView.firstDay;
        var lastDay = biorhythmView.lastDay;

        $firstDayTextBox.val(formatDate(model.firstDay));
        $lastDayTextBox.val(formatDate(lastDay));

        var firstDay = model.firstDay;
        $firstDayLabel.html("<< " + formatDate(firstDay));

        var displayedMiliseconds = lu.DateUtil.daysToMiliseconds(biorhythmView.totalDays - 1);
        var lastDay = new Date(model.firstDay.getTime() + displayedMiliseconds);
        $lastDayLabel.html(formatDate(lastDay) + " >>");

        updateXDayInfo();
    }

    function onBirthdayChanged(birthday) {
        model.birthday = birthday;

        biorhythmView.setBirthdayOnAllBiorhythms(model.birthday);
        updateXDayInfo();
    }

    function onFirstDayLabelClick() {
        setTimeout(function() {
            $firstDayTextBox.datepicker('show');
        }, 0);
    }

    function onFirstDayDatePickerSelect() {
        model.firstDay = $(this).datepicker("getDate");

        biorhythmView.firstDay = model.firstDay;
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

        var displayedDayCount = biorhythmView.totalDays - 1;
        model.firstDay = lu.DateUtil.addDays(lastDay, -displayedDayCount);

        updateFirstDayInUi();
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

    function onBiorhythmViewXDayIndexChanged() {
        updateXDayInfo();
    }

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $(function() {

            commonBiorhythmShapes = new lu.bioControls.biorhythmModel.CommonBiorhythmShapes();

            configManager = new lu.bioCalc.ConfigurationManager();
            configManager.loadFromCookies();

            create$();
            initialize$();

            biorhythmView.suspendPaint();
            try {
                model = {
                    birthday: configManager.config.birthday,
                    firstDay: lu.DateUtil.addDays(Date.now(), -7)
                };

                lu.bioCalc.BirthdaySection.setConfig(configManager);
                lu.bioCalc.BirthdaySection.birthdayChanged.subscribe(onBirthdayChanged);
                lu.bioCalc.BirthdaySection.setBirthday(model.birthday);

                lu.bioCalc.OptionsDialog.setCommonBiorhythmShapes(commonBiorhythmShapes);
                
                lu.bioCalc.XDaySection.setCommonBiorhythmShapes(commonBiorhythmShapes);

                $bioCanvas.attr("tabindex", "1");

                biorhythmView.setBiorhythms(commonBiorhythmShapes.toArray());
                biorhythmView.setBirthdayOnAllBiorhythms(model.birthday);

                updateFirstDayInUi();
                updateXDayInfo();
            }
            finally {
                biorhythmView.resumePaint();
            }

            // Close the modal dialogs when clicking outside of them.
            $(document.body).on("click", ".ui-widget-overlay", function() {
                $.each($(".ui-dialog"), function() {
                    var $dialog = $(this).children(".ui-dialog-content");
                    if ($dialog.dialog("option", "modal")) {
                        $dialog.dialog("close");
                    }
                });
            });
        });
    }());

    function create$() {
        $bioCanvasContainer = $("#bioCanvasContainer2");
        $bioCanvas = $("#bioCanvasContainer canvas");
        $bioLegend = $("#bioLegend");
        $firstDayLabel = $("#firstDayLabel");
        $firstDayTextBox = $("#firstDayTextBox");
        $lastDayLabel = $("#lastDayLabel");
        $lastDayTextBox = $("#lastDayTextBox");
    }

    function initialize$() {

        biorhythmView = new lu.bioControls.BiorhythmView($bioCanvas.get(0));
        biorhythmView.firstDayChanged.subscribe(onBiorhythmViewFirstDayChanged);
        biorhythmView.xDayIndexChanged.subscribe(onBiorhythmViewXDayIndexChanged);

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

        $bioLegend.biorhythmLegend({
            biorhythms: commonBiorhythmShapes
        });

        $bioCanvasContainer.biorhythmView({
            width: 900,
            height: 200,
            biorhythms: commonBiorhythmShapes,
            firstDayChanged: onBiorhythmViewFirstDayChanged,
            xDayIndexChanged: onBiorhythmViewXDayIndexChanged
        });
    }
}());