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

(function (XDayInfoItemView, BiorhythmShape, dateUtil) {

    /**
     * Represents an item in the XDayInfoView. It contains the value of one
     * biorhythm for a specific day named X day.
     *
     * @param view
     *            The view object used to interact with the ui.
     *
     * @param biorhythmShape
     *            The BiorhythmShape for which to display the X day information.
     *
     * @returns {lu.bioControls.xDayInfoView.XDayInfoItem}
     */
    lu.bioControls.xDayInfoView.XDayInfoItem = function (view, biorhythmShape, compatibilityCalculator) {

        var secondBirthday = null;

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

        this.updateXDay = function (xDay) {
            displayPercentageFor(xDay);
            displayCompatibility();
        };

        this.updateSecondBirthday = function (value) {
            secondBirthday = value;
            displayCompatibility();
        };

        function displayPercentageFor(xDay) {
            var percentage = calculatePercentageFor(xDay);
            var percentageAsText = formatPercentage(percentage);

            view.setValueText(percentageAsText);
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
            view.setLabelText(arg);
        }

        function onBiorhythmColorChanged(arg) {
            view.setColor(arg);
        }

        function onBiorhythmVisibilityChanged(arg) {
            if (arg) {
                view.show();
            } else {
                view.hide();
            }
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        function displayCompatibility() {
            if (secondBirthday && biorhythmShape.biorhythm.period) {
                var birthday1 = biorhythmShape.biorhythm.birthday;
                var birthday2 = secondBirthday;
                var period = biorhythmShape.biorhythm.period;

                var compatibilityPercent = compatibilityCalculator.calculate(birthday1, birthday2, period);
                var compatibilityPercentAsText = compatibilityPercent.toFixed(2) + "%";
                view.setCompatibilityText(compatibilityPercentAsText);
            } else {
                view.setCompatibilityText("---");
            }
        }

        (function initialize() {
            if (!(biorhythmShape instanceof BiorhythmShape)) {
                return;
            }

            var xDay = biorhythmShape.biorhythm.birthday;

            displayPercentageFor(xDay);
            view.setLabelText(biorhythmShape.biorhythm.name);
            view.setColor(biorhythmShape.color);

            if (!biorhythmShape.isVisible) {
                view.$element.hide();
            }

            displayCompatibility();

            biorhythmShape.nameChanged.subscribe(onBiorhythmNameChanged);
            biorhythmShape.colorChanged.subscribe(onBiorhythmColorChanged);
            biorhythmShape.isVisibleChanged.subscribe(onBiorhythmVisibilityChanged);
        }());
    };
}(
        lu.bioControls.xDayInfoView.XDayInfoItemView,
        lu.bioControls.biorhythmModel.BiorhythmShape,
        lu.DateUtil
    ));