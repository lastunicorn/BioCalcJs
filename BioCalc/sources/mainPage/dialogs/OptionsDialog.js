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

lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage.dialogs");

/**
 * Contains the logic of the Options dialog.
 * 
 * @param $
 *            The jQuery object.
 * 
 * @param bioCalcPageData
 *            The service that provides data and communication between different
 *            modules of the page.
 * 
 * @returns {lu.bioCalc.mainPage.dialogs.OptionsDialog}
 */
lu.bioCalc.mainPage.dialogs.OptionsDialog = (function($, bioCalcPageData) {

    var $optionsDialog = null;
    var $primaryBiorhythmsCheckbox = null;
    var $secondaryBiorhythmsCheckbox = null;
    var $extraBiorhythmsCheckbox = null;
    var $iChingBiorhythmsCheckbox = null;
    var biorhythmShapes = null;

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
        var isAnyPrimaryVisible = biorhythmShapes.primaryBiorhythmShapes.isAnyVisible();
        $primaryBiorhythmsCheckbox.prop("checked", isAnyPrimaryVisible);

        var isAnySecondaryVisible = biorhythmShapes.secondaryBiorhythmShapes.isAnyVisible();
        $secondaryBiorhythmsCheckbox.prop("checked", isAnySecondaryVisible);

        var isAnyExtraVisible = biorhythmShapes.extraBiorhythmShapes.isAnyVisible();
        $extraBiorhythmsCheckbox.prop("checked", isAnyExtraVisible);

        var isAnyIChingVisible = biorhythmShapes.iChingBiorhythmShapes.isAnyVisible();
        $iChingBiorhythmsCheckbox.prop("checked", isAnyIChingVisible);
    }

    function onPrimaryCheckboxChange() {
        var isChecked = $primaryBiorhythmsCheckbox.prop("checked");
        biorhythmShapes.primaryBiorhythmShapes.showAll(isChecked);
    }

    function onSecondaryCheckboxChange() {
        var isChecked = $secondaryBiorhythmsCheckbox.prop("checked");
        biorhythmShapes.secondaryBiorhythmShapes.showAll(isChecked);
    }

    function onExtraCheckboxChange() {
        var isChecked = $extraBiorhythmsCheckbox.prop("checked");
        biorhythmShapes.extraBiorhythmShapes.showAll(isChecked);
    }

    function onIChingCheckboxChange() {
        var isChecked = $iChingBiorhythmsCheckbox.prop("checked");
        biorhythmShapes.iChingBiorhythmShapes.showAll(isChecked);
    }

    function onExternalBiorhythmsChanged(arg) {
        biorhythmShapes = arg;
    }

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $(function() {
            create$();
            initialize$();

            bioCalcPageData.biorhythmsChanged.subscribe(onExternalBiorhythmsChanged);
            biorhythmShapes = bioCalcPageData.biorhythms;
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
}(jQuery, lu.bioCalc.mainPage.BioCalcPageData));