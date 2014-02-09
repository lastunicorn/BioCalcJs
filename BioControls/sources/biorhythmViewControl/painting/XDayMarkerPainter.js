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

(function(Rectangle) {
    /**
     * Outlines the rectangle representing the X day using an html canvas
     * context object.
     * 
     * @returns {lu.bioControls.biorhythmView.painting.XDayMarkerPainter}
     */
    lu.bioControls.biorhythmView.painting.XDayMarkerPainter = function() {

        var paintData = null;
        var paintContext = null;
        var paintRectangle = null;

        this.paint = function(data, context, rectangle) {
            paintData = data;
            paintRectangle = rectangle;
            paintContext = context;

            var data = calculateXDayMarker();
            if (data) {
                paintXDayMarker(data);
            }
        };

        function calculateXDayMarker() {
            if (!paintData.isXDayVisible) {
                return null;
            }

            var xStep = (paintRectangle.width) / paintData.totalDays;
            var x = xStep * paintData.xDayIndex;
            var y = 0;
            var width = xStep;
            var height = paintRectangle.height;

            return new Rectangle(x, y, width, height);
        }

        function paintXDayMarker(rectangle) {
            setLinePattern([]);

            paintContext.beginPath();
            paintContext.rect(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
            paintContext.strokeStyle = paintData.xDayBorderColor;
            paintContext.lineWidth = paintData.xDayBorderWidth;
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
}(lu.Rectangle));