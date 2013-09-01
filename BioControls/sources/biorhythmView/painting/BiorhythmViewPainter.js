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
lu.bioControls.biorhythmView.painting = lu.bioControls.biorhythmView.painting || {};

/**
 * Paints the whole control on the context of an html canvas.
 * 
 * @returns {lu.bioControls.biorhythmView.painting.BiorhythmViewPainter}
 */
lu.bioControls.biorhythmView.painting.BiorhythmViewPainter = function() {

    var rawPaintData = null;
    var context = null;
    var rect = null;
    var paintCount = 0;

    var todayMarkerPainter = null;
    var gridLinesPainter = null;
    var biorhythmCurvesPainter = null;
    var dayLabelsPainter = null;
    var xDayMarkerPainter = null;

    this.getPaintCount = function() {
        return paintCount;
    };

    this.paint = function(data, canvasContext, rectangle) {
        paintCount++;
        
        rawPaintData = data;
        rect = rectangle;
        context = canvasContext;

        var paintDataCalculator = new lu.bioControls.biorhythmView.coordinatesCalculation.PaintDataCalculator();
        var dataToPaint = paintDataCalculator.calculate(rawPaintData, rect);

        paintAll(dataToPaint);
    };

    function paintAll(dataToPaint) {
        clearCanvas(context);

        todayMarkerPainter.paint(context, dataToPaint.todayMarker);
        gridLinesPainter.paint(context, dataToPaint.gridLines);
        biorhythmCurvesPainter.paint(context, dataToPaint.biorhythms);
        dayLabelsPainter.paint(context, dataToPaint.dayLabels);
        xDayMarkerPainter.paint(context, dataToPaint.xDayMarker);
    }

    function clearCanvas(context) {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, rect.width, rect.height);
    }

    (function initialize() {
        todayMarkerPainter = new lu.bioControls.biorhythmView.painting.TodayMarkerPainter();
        gridLinesPainter = new lu.bioControls.biorhythmView.painting.GridLinesPainter();
        biorhythmCurvesPainter = new lu.bioControls.biorhythmView.painting.BiorhythmCurvesPainter();
        dayLabelsPainter = new lu.bioControls.biorhythmView.painting.DayLabelsPainter();
        xDayMarkerPainter = new lu.bioControls.biorhythmView.painting.XDayMarkerPainter();
    }());
};