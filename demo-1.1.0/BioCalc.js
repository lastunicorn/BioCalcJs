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
    var $birthdayTextBox, $firstDayTextBox, $helpButton, $aboutButton, $aboutDialog, $helpDialog;
    var version = "1.1.0";

    // --------------------------------------------------------------------------
    // Functions - "private"
    // --------------------------------------------------------------------------

    function generateBiorhythms() {
        commonBiorhythmShapes = new lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes();

        commonBiorhythmShapes.getPhysicalShape().setIsVisible(true);
        commonBiorhythmShapes.getEmotionalShape().setIsVisible(true);
        commonBiorhythmShapes.getIntellectualShape().setIsVisible(true);
        commonBiorhythmShapes.getIntuitiveShape().setIsVisible(true);

        commonBiorhythmShapes.getPassionShape().setIsVisible(false);
        commonBiorhythmShapes.getMasteryShape().setIsVisible(false);
        commonBiorhythmShapes.getWisdomShape().setIsVisible(false);

        commonBiorhythmShapes.getPerceptionShape().setIsVisible(false);
        commonBiorhythmShapes.getPsychicShape().setIsVisible(false);
        commonBiorhythmShapes.getSuccessShape().setIsVisible(false);

        commonBiorhythmShapes.getEstheticShape().setIsVisible(false);
        commonBiorhythmShapes.getSelfAwarenessShape().setIsVisible(false);
        commonBiorhythmShapes.getSpiritualShape().setIsVisible(false);
    }

    function setBirthday(birthday) {
        var biorhythmShapes = commonBiorhythmShapes.getAll();

        for ( var i = 0; i < biorhythmShapes.length; i++) {
            biorhythmShapes[i].setBirthday(birthday);
        }
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

    function onDocumentReady() {

        var initialBirthday = new Date(1980, 05, 13);

        generateBiorhythms();

        var biorhythmShapes = commonBiorhythmShapes.getAll();

        biorhythmView = new lu.bioControls.BiorhythmView("bioCanvas");
        biorhythmView.suspendPaint();
        biorhythmView.setXDayVisibility(false);
        biorhythmView.setBiorhythms(biorhythmShapes);
        biorhythmView.setBirthdayOnAllBiorhythms(initialBirthday);
        biorhythmView.subscribeToFirstDayChanged(onBiorhythmViewFirstDayChanged);
        biorhythmView.resumePaint();

        $birthdayTextBox = $("#birthdayTextBox");
        $birthdayTextBox.val(formatDate(initialBirthday));
        $birthdayTextBox.datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "yy-mm-dd",
            onClose: onBirthdayDatePickerClose,
            showButtonPanel: true
        });

        var firstDay = biorhythmView.getFirstDay();
        $firstDayTextBox = $("#firstDayTextBox");
        $firstDayTextBox.val(formatDate(firstDay));
        $firstDayTextBox.datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "yy-mm-dd",
            onClose: onFirstDayDatePickerClose,
            showButtonPanel: true
        });

        var biorhythmLegend = new lu.bioCalc.BiorhythmLegend(biorhythmView, "#bioLegend");
        biorhythmLegend.populate();

        $("#toolbar").buttonset();

        $helpButton = $("#helpButton");
        $helpButton.button({
            icons: {
                primary: "ui-icon-help"
            },
            text: true
        });
        $helpButton.click(function() {
            $helpDialog.dialog("open");
        });

        $aboutButton = $("#aboutButton");
        $aboutButton.button({
            icons: {
                primary: "ui-icon-star"
            },
            text: true
        });
        $aboutButton.click(function() {
            $aboutDialog.dialog("open");
        });

        $aboutDialog = $("#aboutDialog");
        $aboutDialog.dialog({
            modal: true,
            height: 360,
            width: 480,
            autoOpen: false,
            buttons: {
                Close: function() {
                    $aboutDialog.dialog("close");
                }
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
            buttons:{
                Close: function(){
                    $helpDialog.dialog("close");
                }
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

        $("#jQueryVersion").html($.fn.jquery);
        $("#jQueryUIVersion").html($.ui.version);
        $("#bioControlsVersion").html(lu.bioControls.getVersion());
        
        $("#tabs").tabs();
        
        $(".bio-calc-version").html("ver " + version);
    }

    function onBiorhythmViewFirstDayChanged() {
        var firstDay = biorhythmView.getFirstDay();
        var firstDayAsString = formatDate(firstDay);

        $firstDayTextBox.val(firstDayAsString);
    }

    function onBirthdayDatePickerClose() {
        var date = $(this).datepicker("getDate");
        setTimeout(function() {
            biorhythmView.setBirthdayOnAllBiorhythms(date);
        }, 0);
    }

    function onFirstDayDatePickerClose() {
        var date = $(this).datepicker("getDate");
        biorhythmView.setFirstDay(date);
    }

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $(onDocumentReady);
    }());
}());