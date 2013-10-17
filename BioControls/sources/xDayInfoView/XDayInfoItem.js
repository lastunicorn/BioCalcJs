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

(function(XDayInfoItemView, BiorhythmShape, dateUtil) {
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

        var view = null;

        // --------------------------------------------------------------------------
        // element property
        // --------------------------------------------------------------------------

        Object.defineProperty(this, "element", {
            enumerable: true,
            configurable: false,
            get: getElement
        });

        function getElement() {
            return view.$element;
        }

        // --------------------------------------------------------------------------
        // biorhythmShape property
        // --------------------------------------------------------------------------

        Object.defineProperty(this, "biorhythmShape", {
            enumerable: true,
            configurable: false,
            get: getBiorhythmShape
        });

        function getBiorhythmShape() {
            return biorhythmShape;
        }

        // --------------------------------------------------------------------------
        // functions
        // --------------------------------------------------------------------------

        this.update = function(xDay) {
            displayPercentageFor(xDay);
        };

        function displayPercentageFor(xDay) {
            var percentage = calculatePercentageFor(xDay);
            var percentageAsText = formatPercentage(percentage);
            view.$valueElement.text(percentageAsText);
        }

        function displayLabel(text) {
            view.$labelElement.text(text);
        }

        function displayColor(color) {
            view.$colorElement.css("background-color", color);
        }

        function calculatePercentageFor(xDay) {
            var biorhythm = biorhythmShape.biorhythm;

            var milisecondsLived = xDay - biorhythmShape.biorhythm.birthday;
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
            displayLabel(arg);
        }

        function onBiorhythmColorChanged(arg) {
            displayColor(arg);
        }

        function onBiorhythmVisibilityChanged(arg) {
            if (view.$element) {
                if (arg) {
                    view.$element.show();
                } else {
                    view.$element.hide();
                }
            }
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            view = new XDayInfoItemView(biorhythmShape);

            var xDay = biorhythmShape.biorhythm.birthday;

            displayPercentageFor(xDay);
            displayLabel(biorhythmShape.biorhythm.name);
            displayColor(biorhythmShape.color);

            if (!(biorhythmShape instanceof BiorhythmShape)) {
                return;
            }

            biorhythmShape.nameChanged.subscribe(onBiorhythmNameChanged);
            biorhythmShape.colorChanged.subscribe(onBiorhythmColorChanged);
            biorhythmShape.isVisibleChanged.subscribe(onBiorhythmVisibilityChanged);
        }());
    };
}(lu.bioControls.xDayInfoView.XDayInfoItemView, lu.bioControls.biorhythmModel.BiorhythmShape, lu.DateUtil));