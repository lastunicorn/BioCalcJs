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
lu.bioControls.xDayInfoView = lu.bioControls.xDayInfoView || {};

(function ($) {

    /**
     * Represents an item in the XDayInfoView. It contains the value of one
     * biorhythm for a specific day named X day.
     *
     * @param biorhythmShape
     *            The BiorhythmShape for which to display the X day information.
     *
     * @returns {lu.bioControls.xDayInfoView.XDayInfoItem}
     */
    lu.bioControls.xDayInfoView.XDayInfoItemView = function () {

        var $element = null;
        var $colorLabel = null;
        var $colorElement = null;
        var $labelElement = null;
        var $separatorElement = null;
        var $valueElement = null;
        var $compatibilityElement = null;

        // --------------------------------------------------------------------------
        // $element property
        // --------------------------------------------------------------------------

        Object.defineProperty(this, "$element", {
            enumerable: true,
            configurable: false,
            get: getElement
        });

        function getElement() {
            return $element;
        }

        // --------------------------------------------------------------------------
        // functions
        // --------------------------------------------------------------------------

        this.show = function () {
            $element.show();
        };

        this.hide = function () {
            $element.hide();
        };

        this.setValueText = function (text) {
            $valueElement.text(text);
        };

        this.setLabelText = function (text) {
            $labelElement.text(text);
        };

        this.setColor = function (color) {
            $colorLabel.css("background-color", color);
        };

        this.setCompatibilityText = function (text) {
            $compatibilityElement.text(text);
        };

        // --------------------------------------------------------------------------
        // generate
        // --------------------------------------------------------------------------

        function generate() {
            $element = $("<tr/>");

            $element.addClass("x-day-item");

            generateColorTag();
            generateLabelTag();
            generateSeparatorTag();
            generateValueTag();
            generateCompatibilityTag();

            $element.append($colorElement);
            $element.append($labelElement);
            $element.append($separatorElement);
            $element.append($valueElement);
            $element.append($compatibilityElement);
        }

        function generateColorTag() {
            $colorElement = $("<td/>");

            $colorLabel = $("<span/>")
                .addClass("color-label")
                .appendTo($colorElement);
        }

        function generateLabelTag() {
            $labelElement = $("<td/>");
        }

        function generateSeparatorTag() {
            $separatorElement = $("<td/>")
                .text(" = ");
        }

        function generateValueTag() {
            $valueElement = $("<td/>")
                .addClass("x-day-value");
        }

        function generateCompatibilityTag() {
            $compatibilityElement = $("<td/>")
                .addClass("compatibility-value");
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            generate();
        }());
    };

}(jQuery));