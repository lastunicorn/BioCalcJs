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

(function ($) {

    lu.bioControls.biorhythmLegend.BiorhythmLegendItemView = function () {

        var $legendColorTag = null;
        var $legendLabelTag = null;

        // --------------------------------------------------------------------------
        // presenter property
        // --------------------------------------------------------------------------

        var presenter = null;

        Object.defineProperty(this, "presenter", {
            enumerable: true,
            configurable: false,
            get: function () {
                return presenter;
            },
            set: function (value) {
                presenter = value;
            }
        });

        // --------------------------------------------------------------------------
        // element property
        // --------------------------------------------------------------------------

        var $element = null;

        Object.defineProperty(this, "$element", {
            enumerable: true,
            configurable: false,
            get: function () {
                return $element;
            }
        });

        // --------------------------------------------------------------------------
        // Functions - "public"
        // --------------------------------------------------------------------------

        this.setColor = function (value) {
            $legendColorTag.css("background-color", value);
        };

        this.setLabelText = function (value) {
            $legendLabelTag.text(value);
        };

        this.setColorpickerTitle = function (value) {
            $legendLabelTag.colorpicker("option", "title", value);
        };

        this.setColorpickerParts = function (value) {
            $legendLabelTag.colorpicker("option", "parts", value);
        };

        this.setColorpickerColor = function (value) {
            $legendLabelTag.colorpicker("option", "color", value);
        };

        this.show = function(){
            $element.show();
        };

        this.hide = function(){
            $element.hide();
        };

        this.destroy = function () {
            $element.remove();
            $element = undefined;
            $legendColorTag = undefined;
            $legendLabelTag = undefined;
        };

        // --------------------------------------------------------------------------
        // functions
        // --------------------------------------------------------------------------

        function generateElements() {
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
        }

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onColorPickerClosed(event, color) {
            if ($.isFunction(presenter.onColorPickerClosed))
                presenter.onColorPickerClosed(event, color);
        }

        function onColorPickerOpened(event, color) {
            if ($.isFunction(presenter.onColorPickerOpened))
                presenter.onColorPickerOpened(event, color);
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            generateElements();
            initializeElements();
        }());

        function initializeElements() {

            $legendLabelTag.colorpicker({
                inline: false,
                altField: $legendColorTag,
                altProperties: "background-color",
                buttonColorize: true,
                colorFormat: "#HEX",
                showOn: "click alt",
                close: onColorPickerClosed,
                open: onColorPickerOpened
            });
        }
    };

}(jQuery));