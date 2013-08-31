﻿// BioControls
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

    var dataToPaint = null;
    var paintContext = null;

    this.paint = function(context, data) {
        paintContext = context;
        dataToPaint = data;

        paintBiorhythms();
    };

    function paintBiorhythms() {
        for ( var i = 0; i < dataToPaint.length; i++) {
            paintBiorhythm(dataToPaint[i]);
        }
    }

    function paintBiorhythm(biorhythmData) {
        var linePattern = lu.LinePatternCalculator.calculatePattern(biorhythmData.lineStyle, biorhythmData.lineWidth);
        setLinePattern(linePattern);

        paintContext.strokeStyle = biorhythmData.color;
        paintContext.lineWidth = biorhythmData.lineWidth;
        paintContext.lineJoin = "round";

        paintContext.beginPath();

        for ( var i = 0; i < biorhythmData.points.length; i++) {
            paintContext.lineTo(biorhythmData.points[i].x, biorhythmData.points[i].y);
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