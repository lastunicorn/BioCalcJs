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
lu.bioControls.biorhythmView = lu.bioControls.biorhythmView || {};
lu.bioControls.biorhythmView.painting = lu.bioControls.biorhythmView.painting || {};

(function(Point, textUtil, weekDayNamesProvider, dayLabelPosition) {
    /**
     * Paints the labels of the month days and week days using an html canvas
     * context object.
     * 
     * @returns {lu.bioControls.biorhythmView.painting.DayLabelsPainter}
     */
    lu.bioControls.biorhythmView.painting.DayLabelsPainter = function() {

        var paintData = null;
        var paintContext = null;
        var paintRectangle = null;
        var currentFont = null;
        var textHeight = 12;

        this.paint = function(data, context, rectangle) {
            paintData = data;
            paintRectangle = rectangle;
            paintContext = context;

            calculateTextSize();
            calculateDayLabels();
        };

        function calculateDayLabels() {
            var areDayNumbersVisible = paintData.areDayNumbersVisible;
            var areWeekDaysVisible = paintData.areWeekDaysVisible && !(paintData.areDayNumbersVisible && paintData.weekDaysPosition === paintData.dayNumbersPosition);

            if (!areDayNumbersVisible && !areWeekDaysVisible) {
                return null;
            }

            var day = new Date(paintData.firstDay.getTime());

            paintContext.textAlign = "center";
            paintContext.textBaseline = "middle";

            currentFont = null;

            for ( var i = 0; i < paintData.totalDays; i++) {
                if (areDayNumbersVisible) {
                    paintLabel(calculateDayNumberPaintInfo(i, day));
                }

                if (areWeekDaysVisible) {
                    paintLabel(calculateWeekDayPaintInfo(day, i));
                }

                day.setDate(day.getDate() + 1);
            }
        }

        function calculateTextSize() {
            var textSize = textUtil.measureText({
                text: "0jf",
                font: paintData.font
            });

            var textSizeEmphasized = textUtil.measureText({
                text: "0jf",
                font: paintData.sundaysFont
            });

            textHeight = Math.max(textSize[1], textSizeEmphasized[1]);
        }

        function calculateDayNumberPaintInfo(i, day) {
            var text = day.getDate().toString();
            var position = calculateDayNumberLocation(i, paintData.dayNumbersPosition);
            var isEmphasized = paintData.areSundaysEmphasized && day.getDay() === 0;

            var paintInfo = {
                text: text,
                position: position,
                isEmphasized: isEmphasized
            };

            return paintInfo;
        }

        function calculateWeekDayPaintInfo(day, i) {
            var text = weekDayNamesProvider.getWeekDayName(day.getDay());
            var position = calculateDayNumberLocation(i, paintData.weekDaysPosition);
            var isEmphasized = paintData.areSundaysEmphasized && day.getDay() === 0;

            var paintInfo = {
                text: text,
                position: position,
                isEmphasized: isEmphasized
            };

            return paintInfo;
        }

        function calculateDayNumberLocation(index, position) {
            var xStep = (paintRectangle.width) / paintData.totalDays;
            var daysFontHeight = (textHeight + 3) / 2;

            switch (position) {
                case dayLabelPosition.top:
                    return new Point(xStep * index + xStep / 2, daysFontHeight);

                default:
                case dayLabelPosition.aboveMiddle:
                    return new Point(xStep * index + xStep / 2, paintRectangle.height / 2 - daysFontHeight);

                case dayLabelPosition.belowMiddle:
                    return new Point(xStep * index + xStep / 2, paintRectangle.height / 2 + daysFontHeight);

                case dayLabelPosition.bottom:
                    return new Point(xStep * index + xStep / 2, paintRectangle.height - daysFontHeight);
            }
        }

        function paintLabel(label) {
            if (label.isEmphasized) {
                paintContext.fillStyle = paintData.sundaysColor;
                if (currentFont !== paintData.sundaysFont) {
                    paintContext.font = paintData.sundaysFont;
                }
            } else {
                paintContext.fillStyle = paintData.foreColor;
                if (currentFont !== paintData.font) {
                    paintContext.font = paintData.font;
                }
            }

            paintContext.fillText(label.text, label.position.x, label.position.y);
        }
    };
}(lu.Point, lu.TextUtil, lu.bioControls.biorhythmView.WeekDayNamesProvider, lu.bioControls.biorhythmView.DayLabelPosition));