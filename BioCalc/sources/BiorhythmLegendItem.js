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

lu.bioCalc.BiorhythmLegendItem = function(biorhythmShape) {

    var $element = null;
    var $legendColorTag = null;
    var $legendLabelTag = null;

    this.getElement = function() {
        return $element;
    };

    function generate() {
        var $div = $("<div/>");

        $div.addClass("bio-legend-item");

        $legendColorTag = generateLegendColorTag();
        $legendLabelTag = generateLegendLabelTag();

        $div.append($legendColorTag);
        $div.append($legendLabelTag);

        if (!biorhythmShape.isVisible) {
            $div.hide();
        }

        return $div;
    }

    function generateLegendColorTag() {
        var $div = $("<div/>");
        $div.addClass("color-label");
        $div.css("background-color", biorhythmShape.color);

        return $div;
    }

    function generateLegendLabelTag() {
        var $div = $("<div/>");
        $div.addClass("bio-legend-label");
        $div.text(biorhythmShape.biorhythm.name);

        var biorhythmName = biorhythmShape.biorhythm.name;
        var title = biorhythmName ? biorhythmName + " Biorhythm" : null;

        $div.colorpicker({
            inline: false,
            altField: $legendColorTag,
            altProperties: "background-color",
            buttonColorize: true,
            color: biorhythmShape.color,
            colorFormat: "#HEX",
            close: onColorPickerClosed,
            open: onColorPickerOpened,
            showOn: "click alt",
            title: title,
            parts: title ? "draggable" : "popup"
        });

        return $div;
    }

    // --------------------------------------------------------------------------
    // Event Handlers
    // --------------------------------------------------------------------------

    function onColorPickerClosed(event, color) {
        biorhythmShape.color = color.formatted;
    }

    function onColorPickerOpened(event, color) {
        $(this).colorpicker("setColor", biorhythmShape.color);
    }

    function onBiorhythmNameChanged(arg) {
        $legendLabelTag.html(arg);
    }

    function onBiorhythmColorChanged(arg) {
        $legendColorTag.css("background-color", arg);
    }

    function onBiorhythmVisibilityChanged(arg) {
        if (arg) {
            $element.show();
        } else {
            $element.hide();
        }
    }

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $element = generate();

        if (!(biorhythmShape instanceof lu.bioControls.common.biorhythmModel.BiorhythmShape)) {
            return;
        }

        biorhythmShape.nameChanged.subscribe(onBiorhythmNameChanged);
        biorhythmShape.colorChanged.subscribe(onBiorhythmColorChanged);
        biorhythmShape.isVisibleChanged.subscribe(onBiorhythmVisibilityChanged);
    }());
};