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
    lu.bioControls.xDayInfoView.XDayInfoItem = function(biorhythmShape) {

        var $element = null;
        var $colorElement = null;
        var $labelElement = null;
        var $valueElement = null;
        var currentXDay = null;

        Object.defineProperty(this, "element", {
            enumerable: true,
            configurable: false,
            get: getElement
        });

        function getElement() {
            return $element;
        }

        Object.defineProperty(this, "biorhythmShape", {
            enumerable: true,
            configurable: false,
            get: getBiorhythmShape
        });

        function getBiorhythmShape() {
            return biorhythmShape;
        }

        this.update = function(xDay) {
            currentXDay = xDay;

            var percentage = calculatePercentage();
            $valueElement.text(formatPercentage(percentage));

            // var positiveColor = "#32cd32";
            // var negativeColor = "#ff0000";
            //
            // if (percentage >= 0) {
            // $valueElement.css("color", positiveColor);
            // } else {
            // $valueElement.css("color", negativeColor);
            // }
        };

        function generate() {
            var $item = $("<div/>");

            $item.addClass("x-day-item");

            $colorElement = generateColorTag();
            $labelElement = generateLabelTag();
            $valueElement = generateValueTag();

            $item.append($colorElement);
            $item.append($labelElement);
            $item.append(" = ");
            $item.append($valueElement);

            if (!biorhythmShape.isVisible) {
                $item.hide();
            }

            return $item;
        }

        function generateColorTag() {
            var $item = $("<span/>");
            $item.addClass("color-label");
            $item.css("background-color", biorhythmShape.color);

            return $item;
        }

        function generateLabelTag() {
            var $div = $("<span/>");
            $div.text(biorhythmShape.biorhythm.name);

            return $div;
        }

        function generateValueTag() {
            var $item = $("<span/>");

            var percentage = calculatePercentage();
            $item.text(formatPercentage(percentage));

            return $item;
        }

        function calculatePercentage() {
            var biorhythm = biorhythmShape.biorhythm;

            var milisecondsLived = currentXDay - biorhythmShape.biorhythm.birthday;
            var daysLived = dateUtil.milisecondsToWholeDays(milisecondsLived);
            var value = biorhythm.getValue(daysLived);
            var percentage = value * 100;

            return Math.round(percentage);
        }

        function formatPercentage(value) {
            if (typeof value !== "number") {
                return "?%";
            }

            return value.toString() + "%";
        }

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onBiorhythmNameChanged(arg) {
            $labelElement.text(arg);
        }

        function onBiorhythmColorChanged(arg) {
            $colorElement.css("background-color", arg);
        }

        function onBiorhythmVisibilityChanged(arg) {
            if ($element) {
                if (arg) {
                    $element.show();
                } else {
                    $element.hide();
                }
            }
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            currentXDay = biorhythmShape.biorhythm.birthday;
            $element = generate();

            if (!(biorhythmShape instanceof BiorhythmShape)) {
                return;
            }

            biorhythmShape.nameChanged.subscribe(onBiorhythmNameChanged);
            biorhythmShape.colorChanged.subscribe(onBiorhythmColorChanged);
            biorhythmShape.isVisibleChanged.subscribe(onBiorhythmVisibilityChanged);
        }());
    };
}(lu.bioControls.biorhythmModel.BiorhythmShape, lu.DateUtil));