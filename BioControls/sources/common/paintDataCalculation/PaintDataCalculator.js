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
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.paintDataCalculation = lu.bioControls.common.paintDataCalculation || {};

lu.bioControls.common.paintDataCalculation.PaintDataCalculator = function() {

    var biorhythmCurvesCalculator = null;
    var gridLinesCalculator = null;
    var dayLabelsCalculator = null;
    var todayMarkerCalculator = null;
    var xDayMarkerCalculator = null;

    // --------------------------------------------------------------------------
    // Functions - "public"
    // --------------------------------------------------------------------------

    this.calculate = function(data, canvasElement) {
        return {
            biorhythms: biorhythmCurvesCalculator.calculate(data, canvasElement),
            gridLines: gridLinesCalculator.calculate(data, canvasElement),
            dayLabels: dayLabelsCalculator.calculate(data, canvasElement),
            todayMarker: todayMarkerCalculator.calculate(data, canvasElement),
            xDayMarker: xDayMarkerCalculator.calculate(data, canvasElement)
        };
    };

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        biorhythmCurvesCalculator = new lu.bioControls.common.paintDataCalculation.BiorhythmCurvesCalculator();
        gridLinesCalculator = new lu.bioControls.common.paintDataCalculation.GridLinesCalculator();
        dayLabelsCalculator = new lu.bioControls.common.paintDataCalculation.DayLablesCalculator();
        todayMarkerCalculator = new lu.bioControls.common.paintDataCalculation.TodayMarkerCalculator();
        xDayMarkerCalculator = new lu.bioControls.common.paintDataCalculation.XDayMarkerCalculator();
    }());
};