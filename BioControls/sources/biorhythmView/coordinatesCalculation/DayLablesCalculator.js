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

var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmView = lu.bioControls.biorhythmView || {};
lu.bioControls.biorhythmView.paintDataCalculation = lu.bioControls.biorhythmView.paintDataCalculation || {};

lu.bioControls.biorhythmView.paintDataCalculation.DayLablesCalculator = function() {

    var rawPaintData = null;
    var rect = null;
    var textHeight = 12;

    // --------------------------------------------------------------------------
    // Functions - "public"
    // --------------------------------------------------------------------------

    this.calculate = function(data, rectangle) {
        rawPaintData = data;
        rect = rectangle;

        calculateTextSize();

        return calculateDayLabels();
    };

    // --------------------------------------------------------------------------
    // Functions - "private"
    // --------------------------------------------------------------------------

    function calculateDayLabels() {
        var areDayNumbersVisible = rawPaintData.areDayNumbersVisible;
        var areWeekDaysVisible = rawPaintData.areWeekDaysVisible && !(rawPaintData.areDayNumbersVisible && rawPaintData.weekDaysPosition === rawPaintData.dayNumbersPosition);

        if (!areDayNumbersVisible && !areWeekDaysVisible) {
            return null;
        }

        var dayLabelsPaintData = [];
        var day = new Date(rawPaintData.firstDay.getTime());

        for ( var i = 0; i < rawPaintData.totalDays; i++) {
            if (areDayNumbersVisible) {
                dayLabelsPaintData.push(calculateDayNumberPaintInfo(i, day));
            }

            if (areWeekDaysVisible) {
                dayLabelsPaintData.push(calculateWeekDayPaintInfo(day, i));
            }

            day.setDate(day.getDate() + 1);
        }

        return {
            labels: dayLabelsPaintData,
            color: rawPaintData.foreColor,
            emphasizedColor: rawPaintData.sundaysColor,
            font: rawPaintData.font,
            emphasizedFont: rawPaintData.sundaysFont
        };
    }

    function calculateTextSize() {
        var textSize = lu.TextUtil.measureText({
            text: "0jf",
            font: rawPaintData.font
        });

        var textSizeEmphasized = lu.TextUtil.measureText({
            text: "0jf",
            font: rawPaintData.sundaysFont
        });

        textHeight = Math.max(textSize[1], textSizeEmphasized[1]);
    }

    function calculateDayNumberPaintInfo(i, day) {
        var text = day.getDate().toString();
        var location = calculateDayNumberLocation(i, rawPaintData.dayNumbersPosition);
        var isEmphasized = rawPaintData.areSundaysEmphasized && day.getDay() === 0;

        return {
            text: text,
            location: location,
            isEmphasized: isEmphasized
        };
    }

    function calculateWeekDayPaintInfo(day, i) {
        var text = lu.WeekDayNamesProvider.getWeekDayName(day.getDay());
        var location = calculateDayNumberLocation(i, rawPaintData.weekDaysPosition);
        var isEmphasized = rawPaintData.areSundaysEmphasized && day.getDay() === 0;

        return {
            text: text,
            location: location,
            isEmphasized: isEmphasized
        };
    }

    function calculateDayNumberLocation(index, position) {
        var xStep = (rect.width) / rawPaintData.totalDays;
        var daysFontHeight = (textHeight + 3) / 2;

        switch (position) {
            case lu.DayLabelPosition.top:
                return new lu.Point(xStep * index + xStep / 2, daysFontHeight);

            default:
            case lu.DayLabelPosition.aboveMiddle:
                return new lu.Point(xStep * index + xStep / 2, rect.height / 2 - daysFontHeight);

            case lu.DayLabelPosition.belowMiddle:
                return new lu.Point(xStep * index + xStep / 2, rect.height / 2 + daysFontHeight);

            case lu.DayLabelPosition.bottom:
                return new lu.Point(xStep * index + xStep / 2, rect.height - daysFontHeight);
        }
    }
};