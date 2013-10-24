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

(function(BiorhythmShape, dateUtil) {
    /**
     * Represents an item in the XDayInfoView. It contains the value of one
     * biorhythm for a specific day named X day.
     * 
     * @param biorhythmShape
     *            The BiorhythmShape for which to display the X day information.
     * 
     * @returns {lu.bioControls.xDayInfoView.XDayInfoItem}
     */
    lu.bioControls.xDayInfoView.XDayInfoItemView = function() {

        // --------------------------------------------------------------------------
        // $element property
        // --------------------------------------------------------------------------

        var $element = null;
        
        Object.defineProperty(this, "$element", {
            enumerable: true,
            configurable: false,
            get: getElement
        });

        function getElement() {
            return $element;
        }

        // --------------------------------------------------------------------------
        // $colorElement property
        // --------------------------------------------------------------------------

        var $colorElement = null;
        
        Object.defineProperty(this, "$colorElement", {
            enumerable: true,
            configurable: false,
            get: getColorElement
        });

        function getColorElement() {
            return $colorElement;
        }

        // --------------------------------------------------------------------------
        // $labelElement property
        // --------------------------------------------------------------------------

        var $labelElement = null;
        
        Object.defineProperty(this, "$labelElement", {
            enumerable: true,
            configurable: false,
            get: getLabelElement
        });

        function getLabelElement() {
            return $labelElement;
        }

        // --------------------------------------------------------------------------
        // $valueElement property
        // --------------------------------------------------------------------------

        var $valueElement = null;
        
        Object.defineProperty(this, "$valueElement", {
            enumerable: true,
            configurable: false,
            get: getValueElement
        });

        function getValueElement() {
            return $valueElement;
        }

        // --------------------------------------------------------------------------
        // functions
        // --------------------------------------------------------------------------

        function generate() {
            $element = $("<div/>");

            $element.addClass("x-day-item");

            generateColorTag();
            generateLabelTag();
            generateValueTag();

            $element.append($colorElement);
            $element.append($labelElement);
            $element.append(" = ");
            $element.append($valueElement);

//            if (!biorhythmShape.isVisible) {
//                $element.hide();
//            }
        }

        function generateColorTag() {
            $colorElement = $("<span/>")
                .addClass("color-label");
        }

        function generateLabelTag() {
            $labelElement = $("<span/>");
        }

        function generateValueTag() {
            $valueElement = $("<span/>");
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            generate();
        }());
    };
}(lu.bioControls.biorhythmModel.BiorhythmShape, lu.DateUtil));