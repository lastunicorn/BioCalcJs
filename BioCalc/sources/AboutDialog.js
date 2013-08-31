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
 * Contains the logic of the About dialog.
 */
lu.bioCalc.AboutDialog = (function() {

    var $aboutDialog = null;
    var $aboutDialogTabSet = null;
    var $jQueryVersionLabel = null;
    var $jQueryUIVersionLabel = null;
    var $bioControlsVersionLabel = null;
    var $bioCalcVersionLabel = null;

    function onAboutDialogCloseClicked() {
        $aboutDialog.dialog("close");
    }

    function createControls() {
        $aboutDialog = $("#aboutDialog");
        $aboutDialogTabSet = $("#aboutDialog .tabs");
        $jQueryVersionLabel = $("#jQueryVersionLabel");
        $jQueryUIVersionLabel = $("#jQueryUIVersionLabel");
        $bioControlsVersionLabel = $("#bioControlsVersionLabel");
        $bioCalcVersionLabel = $(".bio-calc-version");
    }

    function initializeControls() {
        $aboutDialog.dialog({
            modal: true,
            height: 480,
            width: 480,
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

        $aboutDialogTabSet.tabs();
    }

    (function initialize() {
        $(function() {
            createControls();
            initializeControls();

            $jQueryVersionLabel.html($.fn.jquery);
            $jQueryUIVersionLabel.html($.ui.version);
            $bioControlsVersionLabel.html(lu.bioControls.version);

            $bioCalcVersionLabel.html("ver " + lu.bioCalc.version);
        });
    }());

    return {
        show: function() {
            $aboutDialog.dialog("open");
        }
    };
}());