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

/**
 * Paints the lines delimiting the days and the horizontal axis using an html
 * canvas context object.
 * 
 * @returns {lu.bioControls.common.painting.GridLinesPainter}
 */
lu.bioControls.common.painting.GridLinesPainter = function() {

    var paintContext = null;
    var dataToPaint = null;

    this.paint = function(context, data) {
        paintContext = context;
        dataToPaint = data;

        var isGridVisible = dataToPaint && dataToPaint.lines && dataToPaint.lines.length > 0;

        if (!isGridVisible) {
            return;
        }

        paintGrid();
    };

    function paintGrid() {
        paintContext.strokeStyle = dataToPaint.color;
        paintContext.lineWidth = 1;
        paintContext.lineJoin = "round";
        setLinePattern(null);

        for ( var i = 0; i < dataToPaint.lines.length; i++) {
            paintLine(dataToPaint.lines[i]);
        }
    }

    function paintLine(line) {
        paintContext.beginPath();
        paintContext.moveTo(line.startPoint.getX(), line.startPoint.getY());
        paintContext.lineTo(line.endPoint.getX(), line.endPoint.getY());
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