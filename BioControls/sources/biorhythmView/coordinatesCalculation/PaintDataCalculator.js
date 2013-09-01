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
lu.bioControls.biorhythmView.coordinatesCalculation = lu.bioControls.biorhythmView.coordinatesCalculation || {};

lu.bioControls.biorhythmView.coordinatesCalculation.PaintDataCalculator = function() {

    var biorhythmCurvesCalculator = null;
    var gridLinesCalculator = null;
    var dayLabelsCalculator = null;
    var todayMarkerCalculator = null;
    var xDayMarkerCalculator = null;

    // --------------------------------------------------------------------------
    // Functions - "public"
    // --------------------------------------------------------------------------

    this.calculate = function(data, rectangle) {
        return {
            biorhythms: biorhythmCurvesCalculator.calculate(data, rectangle),
            gridLines: gridLinesCalculator.calculate(data, rectangle),
            dayLabels: dayLabelsCalculator.calculate(data, rectangle),
            todayMarker: todayMarkerCalculator.calculate(data, rectangle),
            xDayMarker: xDayMarkerCalculator.calculate(data, rectangle)
        };
    };

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        biorhythmCurvesCalculator = new lu.bioControls.biorhythmView.coordinatesCalculation.BiorhythmCurvesCalculator();
        gridLinesCalculator = new lu.bioControls.biorhythmView.coordinatesCalculation.GridLinesCalculator();
        dayLabelsCalculator = new lu.bioControls.biorhythmView.coordinatesCalculation.DayLablesCalculator();
        todayMarkerCalculator = new lu.bioControls.biorhythmView.coordinatesCalculation.TodayMarkerCalculator();
        xDayMarkerCalculator = new lu.bioControls.biorhythmView.coordinatesCalculation.XDayMarkerCalculator();
    }());
};