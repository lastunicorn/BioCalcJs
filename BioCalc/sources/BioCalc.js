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
    var xDayInfoView = null;
    var commonBiorhythmShapes = null;
    var $birthdayTextBox = null;
    var $firstDayTextBox = null;
    var $firstDayLabel = null;
    var $lastDayTextBox = null;
    var $lastDayLabel = null;
    var $helpButton = null;
    var $aboutButton = null;
    var $aboutDialog = null;
    var $helpDialog = null;
    var $saveBirthdayButton = null;
    var $resetBirthdayButton = null;
    var $jQueryVersionLabel = null;
    var $jQueryUIVersionLabel = null;
    var $bioControlsVersionLabel = null;
    var $bioCalcVersionLabel = null;
    var $bioCanvas = null;
    var $xDayValueLabel = null;
    var configManager = null;
    var config = null;
    var model = null;

    // --------------------------------------------------------------------------
    // Functions - GUI helpers
    // --------------------------------------------------------------------------

    function enableSaveBirthdayButton() {
        $saveBirthdayButton.button("option", "disabled", false);
    }

    function disableSaveBirthdayButton() {
        $saveBirthdayButton.button("option", "disabled", true);
    }

    function enableResetBirthdayButton() {
        $resetBirthdayButton.button("option", "disabled", false);
    }

    function disableResetBirthdayButton() {
        $resetBirthdayButton.button("option", "disabled", true);
    }

    // --------------------------------------------------------------------------
    // Functions - Update GUI from model
    // --------------------------------------------------------------------------

    function updateBirthdayInUi() {
        setTimeout(function() {
            biorhythmView.setBirthdayOnAllBiorhythms(model.birthday);
        }, 0);

        $birthdayTextBox.val(formatDate(model.birthday));
    }

    function updateFirstDayInUi() {
        setTimeout(function() {
            $firstDayTextBox.val(formatDate(model.firstDay));
        }, 0);

        biorhythmView.setFirstDay(model.firstDay);
    }

    function updateSaveBirthdayButtonVisibility() {
        if (model.birthday != null && config.birthday.getTime() == model.birthday.getTime()) {
            disableSaveBirthdayButton();
        } else {
            enableSaveBirthdayButton();
        }
    }

    function updateResetBirthdayButtonVisibility() {
        if (model.birthday.getTime() == config.birthday.getTime()) {
            disableResetBirthdayButton();
        } else {
            enableResetBirthdayButton();
        }
    }

    function updateXDayInfo() {
        var xDay = biorhythmView.getXDay();

        $xDayValueLabel.html(formatDate(xDay));
        xDayInfoView.update(xDay);
    }

    // --------------------------------------------------------------------------
    // Functions - "private"
    // --------------------------------------------------------------------------

    function generateBiorhythms() {
        var shapes = new lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes();

        shapes.getPhysicalShape().setIsVisible(true);
        shapes.getEmotionalShape().setIsVisible(true);
        shapes.getIntellectualShape().setIsVisible(true);
        shapes.getIntuitiveShape().setIsVisible(true);

        shapes.getPassionShape().setIsVisible(false);
        shapes.getMasteryShape().setIsVisible(false);
        shapes.getWisdomShape().setIsVisible(false);

        shapes.getPerceptionShape().setIsVisible(false);
        shapes.getPsychicShape().setIsVisible(false);
        shapes.getSuccessShape().setIsVisible(false);

        shapes.getEstheticShape().setIsVisible(false);
        shapes.getSelfAwarenessShape().setIsVisible(false);
        shapes.getSpiritualShape().setIsVisible(false);

        return shapes;
    }

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

    function initializeControls() {
        $bioCanvas = $("#bioCanvas");

        biorhythmView = new lu.bioControls.BiorhythmView("bioCanvas");
        biorhythmView.subscribeToFirstDayChanged(onBiorhythmViewFirstDayChanged);
        biorhythmView.subscribeToXDayIndexChanged(onBiorhythmViewXDayIndexChanged);

        $birthdayTextBox = $("#birthdayTextBox");
        $birthdayTextBox.datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "yy-mm-dd",
            onSelect: onBirthdayDatePickerSelect,
            showButtonPanel: true
        });

        $firstDayTextBox = $("#firstDayTextBox");
        $firstDayTextBox.datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "yy-mm-dd",
            onSelect: onFirstDayDatePickerSelect,
            showButtonPanel: true,
            beforeShow: onBeforeFirstDayDatePickerShow,
            showAnim: ""
        });

        $lastDayTextBox = $("#lastDayTextBox");
        $lastDayTextBox.datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "yy-mm-dd",
            onSelect: onLastDayDatePickerSelect,
            showButtonPanel: true,
            beforeShow: onBeforeLastDayDatePickerShow,
            showAnim: ""
        });

        $("#toolbar").buttonset();

        $helpButton = $("#helpButton");
        $helpButton.button({
            icons: {
                primary: "ui-icon-help"
            },
            text: true
        });
        $helpButton.click(onHelpButtonClick);

        $aboutButton = $("#aboutButton");
        $aboutButton.button({
            icons: {
                primary: "ui-icon-star"
            },
            text: true
        });
        $aboutButton.click(onAboutButtonClick);

        $aboutDialog = $("#aboutDialog");
        $aboutDialog.dialog({
            modal: true,
            height: 420,
            width: 560,
            autoOpen: false,
            buttons: {
                Close: onAboutDialogCloseClicked
            },
            show: {
                effect: "puff",
                duration: 300
            },
            hide: {
                effect: "puff",
                duration: 300
            }
        });

        $helpDialog = $("#helpDialog");
        $helpDialog.dialog({
            modal: true,
            height: 480,
            width: 640,
            autoOpen: false,
            buttons: {
                Close: onHelpDialogCloseClicked
            },
            show: {
                effect: "puff",
                duration: 300
            },
            hide: {
                effect: "puff",
                duration: 300
            }
        });

        $jQueryVersionLabel = $("#jQueryVersionLabel");
        $jQueryUIVersionLabel = $("#jQueryUIVersionLabel");
        $bioControlsVersionLabel = $("#bioControlsVersionLabel");

        $("#aboutDialog .tabs").tabs();

        $("#helpDialog .tabs").tabs();

        $bioCalcVersionLabel = $(".bio-calc-version");

        $saveBirthdayButton = $("#saveBirthdayButton");
        $saveBirthdayButton.button({
            text: false,
            icons: {
                primary: "ui-icon-disk"
            },
            disabled: true
        });
        $saveBirthdayButton.click(onSaveBirthdayButtonClick);

        $resetBirthdayButton = $("#resetBirthdayButton");
        $resetBirthdayButton.button({
            text: false,
            icons: {
                primary: "ui-icon-close"
            },
            disabled: true
        });
        $resetBirthdayButton.click(onResetBirthdayButtonClick);

        $("#birthdayButtons").buttonset();

        $xDayValueLabel = $("#xDayValueLabel");

        $firstDayLabel = $("#firstDayLabel");
        $firstDayLabel.click(onFirstDayLabelClick);

        $lastDayLabel = $("#lastDayLabel");
        $lastDayLabel.click(onLastDayLabelClick);
    }

    function onDocumentReady() {

        initializeControls();

        biorhythmView.suspendPaint();
        try {
            configManager = new lu.bioCalc.ConfigManager();
            config = configManager.loadFromCookies();

            model = {
                birthday: config.birthday,
                firstDay: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            };

            $bioCanvas.attr("tabindex", "1");

            commonBiorhythmShapes = generateBiorhythms();
            biorhythmView.setBiorhythms(commonBiorhythmShapes.getAll());

            var biorhythmLegend = new lu.bioCalc.BiorhythmLegend(biorhythmView, "#bioLegend");
            biorhythmLegend.populate();

            xDayInfoView = new lu.bioCalc.XDayInfoView(biorhythmView.getBiorhythms(), "#xDayInfoContainer");
            xDayInfoView.populate();

            $jQueryVersionLabel.html($.fn.jquery);
            $jQueryUIVersionLabel.html($.ui.version);
            $bioControlsVersionLabel.html(lu.bioControls.version);

            $bioCalcVersionLabel.html("ver " + lu.bioCalc.version);


            updateBirthdayInUi();
            updateFirstDayInUi();
            updateSaveBirthdayButtonVisibility();
            updateResetBirthdayButtonVisibility();
            updateXDayInfo();
        }
        finally {
            biorhythmView.resumePaint();
        }

        $(document.body).on("click", ".ui-widget-overlay", function() {
            $.each($(".ui-dialog"), function() {
                var $dialog = $(this).children(".ui-dialog-content");
                if ($dialog.dialog("option", "modal")) {
                    $dialog.dialog("close");
                }
            });
        });
    }

    function onAboutDialogCloseClicked() {
        $aboutDialog.dialog("close");
    }

    function onHelpDialogCloseClicked() {
        $helpDialog.dialog("close");
    }

    function onBiorhythmViewFirstDayChanged() {
        model.firstDay = biorhythmView.getFirstDay();
        var lastDay = biorhythmView.getLastDay();

        $firstDayTextBox.val(formatDate(model.firstDay));
        $lastDayTextBox.val(formatDate(lastDay));

        var firstDay = model.firstDay;
        $firstDayLabel.html("<< " + formatDate(firstDay));

        var lastDay = new Date(model.firstDay.getTime() + (biorhythmView.getTotalDays() - 1) * 24 * 60 * 60 * 1000);
        $lastDayLabel.html(formatDate(lastDay) + " >>");

        updateXDayInfo();
    }

    function onBirthdayDatePickerSelect() {
        model.birthday = $(this).datepicker("getDate");

        updateBirthdayInUi();
        updateSaveBirthdayButtonVisibility();
        updateResetBirthdayButtonVisibility();
        updateXDayInfo();
    }

    function onFirstDayLabelClick() {
        setTimeout(function() {
            $firstDayTextBox.datepicker('show');
        }, 0);
    }

    function onFirstDayDatePickerSelect() {
        model.firstDay = $(this).datepicker("getDate");

        updateFirstDayInUi();
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
        model.firstDay = new Date(lastDay.getTime() - (biorhythmView.getTotalDays() - 1) * 24 * 60 * 60 * 1000);

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

    function onResetBirthdayButtonClick(e) {
        e.preventDefault();

        e.stopPropagation();

        model.birthday = config.birthday;

        updateBirthdayInUi();
        updateSaveBirthdayButtonVisibility();
        updateResetBirthdayButtonVisibility();
    }

    function onSaveBirthdayButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();

        config.birthday = model.birthday;
        configManager.saveInCookies(config);

        updateSaveBirthdayButtonVisibility();
        updateResetBirthdayButtonVisibility();
    }

    function onHelpButtonClick() {
        $helpDialog.dialog("open");
    }

    function onAboutButtonClick() {
        $aboutDialog.dialog("open");
    }

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $(onDocumentReady);
    }());
}());