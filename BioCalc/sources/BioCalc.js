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
    var $bioLegend = null;
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
    var $xDayInfoContainer = null;
    var $mainToolbar = null;
    var $birthdayButtons = null;
    var $aboutDialogTabSet = null;
    var $helpDialogTabSet = null;
    var $optionsButton = null;
    var $optionsDialog = null;
    var $primaryBiorhythmsCheckbox = null;
    var $secondaryBiorhythmsCheckbox = null;
    var $extraBiorhythmsCheckbox = null;
    var $iChingBiorhythmsCheckbox = null;
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
        biorhythmView.setBirthdayOnAllBiorhythms(model.birthday);

        $birthdayTextBox.val(formatDate(model.birthday));
    }

    function updateFirstDayInUi() {
        setTimeout(function() {
            $firstDayTextBox.val(formatDate(model.firstDay));
        }, 0);

        biorhythmView.firstDay = model.firstDay;
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
        var xDay = biorhythmView.xDay;

        $xDayValueLabel.html(formatDate(xDay));
        $xDayInfoContainer.xDayInfoView("update", xDay);
    }

    function setNewBirthday(birthday) {
        model.birthday = birthday;

        updateBirthdayInUi();
        updateSaveBirthdayButtonVisibility();
        updateResetBirthdayButtonVisibility();
        updateXDayInfo();
    }

    // --------------------------------------------------------------------------
    // Functions - "private"
    // --------------------------------------------------------------------------

    function generateBiorhythms() {
        var shapes = new lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes();

        shapes.physicalShape.isVisible = true;
        shapes.emotionalShape.isVisible = true;
        shapes.intellectualShape.isVisible = true;
        shapes.intuitiveShape.isVisible = true;

        shapes.passionShape.isVisible = false;
        shapes.masteryShape.isVisible = false;
        shapes.wisdomShape.isVisible = false;

        shapes.perceptionShape.isVisible = false;
        shapes.psychicShape.isVisible = false;
        shapes.successShape.isVisible = false;

        shapes.estheticShape.isVisible = false;
        shapes.selfAwarenessShape.isVisible = false;
        shapes.spiritualShape.isVisible = false;

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

    function onAboutDialogCloseClicked() {
        $aboutDialog.dialog("close");
    }

    function onHelpDialogCloseClicked() {
        $helpDialog.dialog("close");
    }

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

    function onBirthdayDatePickerSelect() {
        var newBirthday = $(this).datepicker("getDate");
        setNewBirthday(newBirthday);
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

    function onResetBirthdayButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();

        setNewBirthday(config.birthday);
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

    function onOptionsButtonClick() {
        $optionsDialog.dialog("open");
    }

    function onOptionsDialogCloseClicked() {
        $optionsDialog.dialog("close");
    }

    function onOptionsDialogOpen() {
        var isAnyPrimaryVisible = commonBiorhythmShapes.isAnyPrimaryVisible();
        $primaryBiorhythmsCheckbox.prop("checked", isAnyPrimaryVisible);

        var isAnySecondaryVisible = commonBiorhythmShapes.isAnySecondaryVisible();
        $secondaryBiorhythmsCheckbox.prop("checked", isAnySecondaryVisible);

        var isAnyExtraVisible = commonBiorhythmShapes.isAnyExtraVisible();
        $extraBiorhythmsCheckbox.prop("checked", isAnyExtraVisible);

        var isAnyIChingVisible = commonBiorhythmShapes.isAnyIChingVisible();
        $iChingBiorhythmsCheckbox.prop("checked", isAnyIChingVisible);
    }

    function onPrimaryCheckboxChange() {
        var isChecked = $primaryBiorhythmsCheckbox.prop("checked");
        commonBiorhythmShapes.showPrimary(isChecked);
    }

    function onSecondaryCheckboxChange() {
        var isChecked = $secondaryBiorhythmsCheckbox.prop("checked");
        commonBiorhythmShapes.showSecondary(isChecked);
    }

    function onExtraCheckboxChange() {
        var isChecked = $extraBiorhythmsCheckbox.prop("checked");
        commonBiorhythmShapes.showExtra(isChecked);
    }

    function onIChingCheckboxChange() {
        var isChecked = $iChingBiorhythmsCheckbox.prop("checked");
        commonBiorhythmShapes.showIChing(isChecked);
    }

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $(function() {

            createControls();
            initializeControls();

            biorhythmView.suspendPaint();
            try {
                configManager = new lu.bioCalc.ConfigManager();
                config = configManager.loadFromCookies();

                model = {
                    birthday: config.birthday,
                    firstDay: lu.DateUtil.addDays(Date.now(), -7)
                };

                $bioCanvas.attr("tabindex", "1");

                commonBiorhythmShapes = generateBiorhythms();
                var biorhythmShapes = commonBiorhythmShapes.getAll();

                biorhythmView.setBiorhythms(biorhythmShapes);

                $bioLegend.biorhythmLegend({
                    biorhythms: biorhythmShapes
                });

                $xDayInfoContainer.xDayInfoView({
                    biorhythms: biorhythmShapes
                });

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

        function createControls() {
            $bioCanvas = $("#bioCanvas");
            $bioLegend = $("#bioLegend");
            $birthdayTextBox = $("#birthdayTextBox");
            $firstDayLabel = $("#firstDayLabel");
            $firstDayTextBox = $("#firstDayTextBox");
            $lastDayLabel = $("#lastDayLabel");
            $lastDayTextBox = $("#lastDayTextBox");
            $mainToolbar = $("#mainToolbar");
            $helpButton = $("#helpButton");
            $aboutButton = $("#aboutButton");
            $aboutDialog = $("#aboutDialog");
            $helpDialog = $("#helpDialog");
            $jQueryVersionLabel = $("#jQueryVersionLabel");
            $jQueryUIVersionLabel = $("#jQueryUIVersionLabel");
            $bioControlsVersionLabel = $("#bioControlsVersionLabel");
            $bioCalcVersionLabel = $(".bio-calc-version");
            $saveBirthdayButton = $("#saveBirthdayButton");
            $resetBirthdayButton = $("#resetBirthdayButton");
            $birthdayButtons = $("#birthdayButtons");
            $xDayValueLabel = $("#xDayValueLabel");
            $xDayInfoContainer = $("#xDayInfoContainer");
            $aboutDialogTabSet = $("#aboutDialog .tabs");
            $helpDialogTabSet = $("#helpDialog .tabs");
            $optionsButton = $("#optionsButton");
            $optionsDialog = $("#optionsDialog");
            $primaryBiorhythmsCheckbox = $("#primaryBiorhythmsCheckbox");
            $secondaryBiorhythmsCheckbox = $("#secondaryBiorhythmsCheckbox");
            $extraBiorhythmsCheckbox = $("#extraBiorhythmsCheckbox");
            $iChingBiorhythmsCheckbox = $("#iChingBiorhythmsCheckbox");
        }

        function initializeControls() {

            biorhythmView = new lu.bioControls.BiorhythmView("bioCanvas");
            biorhythmView.firstDayChanged.subscribe(onBiorhythmViewFirstDayChanged);
            biorhythmView.xDayIndexChanged.subscribe(onBiorhythmViewXDayIndexChanged);

            $birthdayTextBox.datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: "yy-mm-dd",
                onSelect: onBirthdayDatePickerSelect,
                showButtonPanel: true
            });

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

            $mainToolbar.buttonset();

            $helpButton.button({
                icons: {
                    primary: "ui-icon-help"
                },
                text: true
            });
            $helpButton.click(onHelpButtonClick);

            $aboutButton.button({
                icons: {
                    primary: "ui-icon-star"
                },
                text: true
            });
            $aboutButton.click(onAboutButtonClick);

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

            $aboutDialogTabSet.tabs();
            $helpDialogTabSet.tabs();

            $saveBirthdayButton.button({
                text: false,
                icons: {
                    primary: "ui-icon-disk"
                },
                disabled: true
            });
            $saveBirthdayButton.click(onSaveBirthdayButtonClick);

            $resetBirthdayButton.button({
                text: false,
                icons: {
                    primary: "ui-icon-close"
                },
                disabled: true
            });
            $resetBirthdayButton.click(onResetBirthdayButtonClick);

            $birthdayButtons.buttonset();

            $optionsButton.button();
            $optionsButton.click(onOptionsButtonClick);

            $optionsDialog.dialog({
                height: 360,
                width: 480,
                autoOpen: false,
                buttons: {
                    Close: onOptionsDialogCloseClicked
                },
                show: {
                    effect: "puff",
                    duration: 300
                },
                hide: {
                    effect: "puff",
                    duration: 300
                },
                open: onOptionsDialogOpen
            });

            $primaryBiorhythmsCheckbox.change(onPrimaryCheckboxChange);
            $secondaryBiorhythmsCheckbox.change(onSecondaryCheckboxChange);
            $extraBiorhythmsCheckbox.change(onExtraCheckboxChange);
            $iChingBiorhythmsCheckbox.change(onIChingCheckboxChange);
        }
    }());
}());