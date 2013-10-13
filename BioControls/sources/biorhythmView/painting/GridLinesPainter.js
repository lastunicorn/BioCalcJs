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

(function(Point, Line) {
    /**
     * Paints the lines delimiting the days and the horizontal axis using an
     * html canvas context object.
     * 
     * @returns {lu.bioControls.biorhythmView.painting.GridLinesPainter}
     */
    lu.bioControls.biorhythmView.painting.GridLinesPainter = function() {

        var paintData = null;
        var paintContext = null;
        var paintRectangle = null;

        this.paint = function(data, context, rectangle) {
            paintData = data;
            paintRectangle = rectangle;
            paintContext = context;

            if (!paintData.isGridVisible) {
                return;
            }

            for ( var i = 0; i < paintData.totalDays - 1; i++) {
                paintContext.strokeStyle = paintData.gridColor;
                paintContext.lineWidth = 1;
                paintContext.lineJoin = "round";
                setLinePattern(null);

                var line = calculateDaySeparatorLine(i);
                paintLine(line);
            }

            var axis = calculateXAxis();
            paintLine(axis);
        };

        function calculateDaySeparatorLine(dayIndex) {
            var xStep = (paintRectangle.width) / paintData.totalDays;
            var index = dayIndex + 1;

            var startPoint = new Point(xStep * index, 0);
            var endPoint = new Point(xStep * index, paintRectangle.height);

            return new Line(startPoint, endPoint);
        }

        function calculateXAxis() {
            var startPoint = new Point(0, paintRectangle.height / 2);
            var endPoint = new Point(paintRectangle.width, paintRectangle.height / 2);

            return new Line(startPoint, endPoint);
        }

        function paintLine(line) {
            paintContext.beginPath();
            paintContext.moveTo(line.startPoint.x, line.startPoint.y);
            paintContext.lineTo(line.endPoint.x, line.endPoint.y);
            paintContext.stroke();
        }

        function setLinePattern(linePattern) {
            if (paintContext.mozDash !== undefined) {
                paintContext.mozDash = linePattern;
            }

            if (typeof (paintContext.setLineDash) === "function") {
                paintContext.setLineDash(linePattern);
            }
        }
    };
}(lu.Point, lu.Line));