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
lu.bioControls.common.painting = lu.bioControls.common.painting || {};

lu.bioControls.common.painting.BiorhythmViewPainter = function() {

    var rawPaintData = null;
    var canvas = null;
    var paintCount = 0;

    this.getPaintCount = function() {
        return paintCount;
    };

    this.paint = function(data, canvasElement) {
        paintCount++;
        rawPaintData = data;
        canvas = canvasElement;

        var paintDataCalculator = new lu.bioControls.common.paintDataCalculation.PaintDataCalculator();
        var dataToPaint = paintDataCalculator.calculate(rawPaintData, canvas);

        paintAll(dataToPaint);
    };

    function paintAll(dataToPaint) {
        if (canvas.getContext) {
            var context = canvas.getContext('2d');

            clearCanvas(context);

            var todayMarkerPainter = new lu.bioControls.common.painting.TodayMarkerPainter();
            todayMarkerPainter.paint(context, dataToPaint.todayMarker);

            var gridLinesPainter = new lu.bioControls.common.painting.GridLinesPainter();
            gridLinesPainter.paint(context, dataToPaint.gridLines);

            var biorhythmCurvesPainter = new lu.bioControls.common.painting.BiorhythmCurvesPainter();
            biorhythmCurvesPainter.paint(context, dataToPaint.biorhythms);

            var dayLabelsPainter = new lu.bioControls.common.painting.DayLabelsPainter();
            dayLabelsPainter.paint(context, dataToPaint.dayLabels);
            
            var xDayMarkerPainter = new lu.bioControls.common.painting.XDayMarkerPainter();
            xDayMarkerPainter.paint(context, dataToPaint.xDayMarker);
        }
    }

    function clearCanvas(context) {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
};