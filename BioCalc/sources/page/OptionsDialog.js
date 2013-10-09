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

/**
 * Contains the logic of the Options dialog.
 * 
 * @returns {lu.bioCalc.OptionsDialog}
 */
lu.bioCalc.OptionsDialog = (function(bioCalcPageData) {

    var $optionsDialog = null;
    var $primaryBiorhythmsCheckbox = null;
    var $secondaryBiorhythmsCheckbox = null;
    var $extraBiorhythmsCheckbox = null;
    var $iChingBiorhythmsCheckbox = null;
    var commonBiorhythmShapes = null;

    // --------------------------------------------------------------------------
    // Functions - "public"
    // --------------------------------------------------------------------------

    function show() {
        $optionsDialog.dialog("open");
    }

    // --------------------------------------------------------------------------
    // Event Handlers
    // --------------------------------------------------------------------------

    function onOptionsDialogCloseClicked() {
        $optionsDialog.dialog("close");
    }

    function onOptionsDialogOpen() {
        var isAnyPrimaryVisible = commonBiorhythmShapes.primaryBiorhythmShapes.isAnyVisible();
        $primaryBiorhythmsCheckbox.prop("checked", isAnyPrimaryVisible);

        var isAnySecondaryVisible = commonBiorhythmShapes.secondaryBiorhythmShapes.isAnyVisible();
        $secondaryBiorhythmsCheckbox.prop("checked", isAnySecondaryVisible);

        var isAnyExtraVisible = commonBiorhythmShapes.extraBiorhythmShapes.isAnyVisible();
        $extraBiorhythmsCheckbox.prop("checked", isAnyExtraVisible);

        var isAnyIChingVisible = commonBiorhythmShapes.iChingBiorhythmShapes.isAnyVisible();
        $iChingBiorhythmsCheckbox.prop("checked", isAnyIChingVisible);
    }

    function onPrimaryCheckboxChange() {
        var isChecked = $primaryBiorhythmsCheckbox.prop("checked");
        commonBiorhythmShapes.primaryBiorhythmShapes.showAll(isChecked);
    }

    function onSecondaryCheckboxChange() {
        var isChecked = $secondaryBiorhythmsCheckbox.prop("checked");
        commonBiorhythmShapes.secondaryBiorhythmShapes.showAll(isChecked);
    }

    function onExtraCheckboxChange() {
        var isChecked = $extraBiorhythmsCheckbox.prop("checked");
        commonBiorhythmShapes.extraBiorhythmShapes.showAll(isChecked);
    }

    function onIChingCheckboxChange() {
        var isChecked = $iChingBiorhythmsCheckbox.prop("checked");
        commonBiorhythmShapes.iChingBiorhythmShapes.showAll(isChecked);
    }

    function onExternalBiorhythmsChanged(arg) {
        commonBiorhythmShapes = arg;
    }

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $(function() {
            create$();
            initialize$();

            bioCalcPageData.biorhythmsChanged.subscribe(onExternalBiorhythmsChanged);
        });
    }());

    function create$() {
        $optionsDialog = $("#optionsDialog");
        $primaryBiorhythmsCheckbox = $("#primaryBiorhythmsCheckbox");
        $secondaryBiorhythmsCheckbox = $("#secondaryBiorhythmsCheckbox");
        $extraBiorhythmsCheckbox = $("#extraBiorhythmsCheckbox");
        $iChingBiorhythmsCheckbox = $("#iChingBiorhythmsCheckbox");
    }

    function initialize$() {
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

    return {
        show: show
    };
}(lu.bioCalc.BioCalcPageData));