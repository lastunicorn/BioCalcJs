// BioControls
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

window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmLegend = lu.bioControls.biorhythmLegend || {};

(function(BiorhythmShape) {
    lu.bioControls.biorhythmLegend.BiorhythmLegendItemView = function() {

        // --------------------------------------------------------------------------
        // element property
        // --------------------------------------------------------------------------

        var $element = null;

        Object.defineProperty(this, "$element", {
            enumerable: true,
            configurable: false,
            get: function() {
                return $element;
            }
        });

        // --------------------------------------------------------------------------
        // legendColorTag property
        // --------------------------------------------------------------------------

        var $legendColorTag = null;

        Object.defineProperty(this, "$legendColorTag", {
            enumerable: true,
            configurable: false,
            get: function() {
                return $legendColorTag;
            }
        });

        // --------------------------------------------------------------------------
        // legendLabelTag property
        // --------------------------------------------------------------------------

        var $legendLabelTag = null;

        Object.defineProperty(this, "$legendLabelTag", {
            enumerable: true,
            configurable: false,
            get: function() {
                return $legendLabelTag;
            }
        });

        // --------------------------------------------------------------------------
        // functions
        // --------------------------------------------------------------------------

        function generate() {
            $element = $("<div/>");

            $element.addClass("bio-legend-item");

            generateLegendColorTag();
            generateLegendLabelTag();

            $element.append($legendColorTag);
            $element.append($legendLabelTag);
        }

        function generateLegendColorTag() {
            $legendColorTag = $("<div/>");
            $legendColorTag.addClass("color-label");
        }

        function generateLegendLabelTag() {
            $legendLabelTag = $("<div/>");
            $legendLabelTag.addClass("bio-legend-label");

            $legendLabelTag.colorpicker({
                inline: false,
                altField: $legendColorTag,
                altProperties: "background-color",
                buttonColorize: true,
                colorFormat: "#HEX",
                showOn: "click alt"
            });
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            generate();
        }());
    };
}(lu.bioControls.biorhythmModel.BiorhythmShape));