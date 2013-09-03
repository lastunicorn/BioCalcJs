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
 * Paints the biorhythm curves using an html canvas context object.
 * 
 * @returns {lu.bioControls.biorhythmView.painting.BiorhythmCurvesPainter}
 */
lu.bioControls.biorhythmView.painting.BiorhythmCurvesPainter = function() {

    var paintData = null;
    var paintContext = null;
    var paintRectangle = null;
    var margin = 10;

    this.paint = function(data, context, rectangle) {

        paintData = data;
        paintRectangle = rectangle;
        paintContext = context;

        paintBiorhythms();
    };

    function paintBiorhythms() {
        for ( var i = 0; i < paintData.biorhythmShapes.length; i++) {
            var biorhythmShape = paintData.biorhythmShapes[i];

            if (!biorhythmShape.isVisible) {
                continue;
            }

            var points = calculateBiorhythmPoints(biorhythmShape.biorhythm);

            paintBiorhythm({
                points: points,
                color: biorhythmShape.color,
                lineWidth: biorhythmShape.lineWidth,
                lineStyle: biorhythmShape.lineStyle
            });
        }
    }

    function calculateBiorhythmPoints(biorhythm) {
        var xStep = (paintRectangle.width) / paintData.totalDays;
        var xOffset = xStep / 2;
        var yOffset = margin + (paintRectangle.height - 2 * margin) / 2;
        var amplitude = paintRectangle.height / 2 - 2 * margin;

        var points = [];

        for ( var index = 0; index < paintData.totalDays; index++) {
            var x = xOffset + index * xStep;
            
            var date = lu.DateUtil.addDays(paintData.firstDay, index);
            var y = yOffset - biorhythm.getValue(date) * amplitude;

            points[index] = new lu.Point(x, y);
        }

        return points;
    }

    function paintBiorhythm(biorhythmPaintData) {
        var linePattern = lu.LinePatternCalculator.calculatePattern(biorhythmPaintData.lineStyle, biorhythmPaintData.lineWidth);
        setLinePattern(linePattern);

        paintContext.strokeStyle = biorhythmPaintData.color;
        paintContext.lineWidth = biorhythmPaintData.lineWidth;
        paintContext.lineJoin = "round";

        paintContext.beginPath();

        for ( var i = 0; i < biorhythmPaintData.points.length; i++) {
            paintContext.lineTo(biorhythmPaintData.points[i].x, biorhythmPaintData.points[i].y);
        }

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