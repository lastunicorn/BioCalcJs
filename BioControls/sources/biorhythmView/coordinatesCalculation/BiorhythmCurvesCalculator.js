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

lu.bioControls.biorhythmView.coordinatesCalculation.BiorhythmCurvesCalculator = function() {

    var rawPaintData = null;
    var rect = null;
    var margin = 10;

    // --------------------------------------------------------------------------
    // Functions - "public"
    // --------------------------------------------------------------------------

    this.calculate = function(data, rectangle) {
        rawPaintData = data;
        rect = rectangle;

        return calculateBiorhythms();
    };

    // --------------------------------------------------------------------------
    // Functions - "private"
    // --------------------------------------------------------------------------

    function calculateBiorhythms() {
        var values = [];
        var points;

        for ( var i = 0; i < rawPaintData.biorhythmShapes.length; i++) {
            var biorhythmShape = rawPaintData.biorhythmShapes[i];

            if (!biorhythmShape.isVisible) {
                continue;
            }

            points = calculateBiorhythmPoints(biorhythmShape.biorhythm);

            values.push({
                points: points,
                color: biorhythmShape.color,
                lineWidth: biorhythmShape.lineWidth,
                lineStyle: biorhythmShape.lineStyle
            });
        }

        return values;
    }

    function calculateBiorhythmPoints(biorhythm) {
        var xStep = (rect.width) / rawPaintData.totalDays;
        var xOffset = xStep / 2;
        var yOffset = margin + (rect.height - 2 * margin) / 2;
        var amplitude = rect.height / 2 - 2 * margin;

        var points = [];

        for ( var index = 0; index < rawPaintData.totalDays; index++) {
            var x = xOffset + index * xStep;
            
            var date = lu.DateUtil.addDays(rawPaintData.firstDay, index);
            var y = yOffset - biorhythm.getValue(date) * amplitude;

            points[index] = new lu.Point(x, y);
        }

        return points;
    }
};