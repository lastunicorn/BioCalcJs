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

    var $legendColorTag = null;
    var $legendLabelTag = null;
    
    this.generate = function() {
        var $div = $("<div/>");

        $div.addClass("bioLegendItem");
        $div.attr("data-biorhythm", biorhythmShape.getName());

        $legendColorTag = generateLegendColorTag(biorhythmShape);
        $legendLabelTag = generateLegendLabelTag(biorhythmShape);        
        
        $div.append($legendColorTag);
        $div.append($legendLabelTag);

        if (!biorhythmShape.getIsVisible()) {
            $div.hide();
        }

        return $div;
    };

    function generateLegendColorTag() {
        var $div = $("<div/>");
        $div.addClass("bioLegendColor");
        $div.css('background-color', biorhythmShape.getColor());

        var biorhythmName = biorhythmShape.getBiorhythm().getName();
        var title = biorhythmName ? biorhythmName + " Biorhythm" : null;

        // $div.colorpicker({
        // inline: false,
        // altField: function(element) { return $(element); },
        // altProperties: 'background-color',
        // buttonColorize: true,
        // color: biorhythmShape.getColor(),
        // colorFormat: "#HEX",
        // close: onColorPickerClosed,
        // open: onColorPickerOpened,
        // revert: true,
        // showOn: 'click',
        // title: title,
        // parts: title ? "draggable" : "popup"
        // });

        return $div;
    }

    function generateLegendLabelTag() {
        var $div = $("<div/>");
        $div.addClass("bioLegendLabel");
        $div.text(biorhythmShape.getBiorhythm().getName());

        var biorhythmName = biorhythmShape.getBiorhythm().getName();
        var title = biorhythmName ? biorhythmName + " Biorhythm" : null;
        
        $div.colorpicker({
            inline: false,
            altField: $legendColorTag,
            altProperties: 'background-color',
            buttonColorize: true,
            color: biorhythmShape.getColor(),
            colorFormat: "#HEX",
            close: onColorPickerClosed,
            open: onColorPickerOpened,
            showOn: 'click alt',
            title: title,
            parts: title ? "draggable" : "popup",
        });
        
        return $div;
    }

    function onColorPickerClosed(event, color) {
        biorhythmShape.setColor(color.formatted);
    }

    function onColorPickerOpened(event, color) {
        $(this).colorpicker("setColor", biorhythmShape.getColor());
    }
};