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

/**
 * Paints the whole control on the context of an html canvas.
 * 
 * @returns {lu.bioControls.biorhythmView.painting.Painter}
 */
lu.bioControls.biorhythmView.painting.Painter = function() {

    var paintData = null;
    var paintContext = null;
    var paintRectangle = null;
    var paintCount = 0;
    var painters = [];

    this.getPaintCount = function() {
        return paintCount;
    };

    this.paint = function(data, context, rectangle) {
        paintCount++;

        paintData = data;
        paintRectangle = rectangle;
        paintContext = context;

        paintAll();
    };

    function paintAll() {
        clearCanvas(paintContext);

        for ( var i = 0; i < painters.length; i++) {
            runPainter(painters[i]);
        }
    }

    function runPainter(painter) {
        if ($.isFunction(painter.paint)) {
            painter.paint(paintData, paintContext, paintRectangle);
        }
    }

    function clearCanvas(context) {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, paintRectangle.width, paintRectangle.height);
    }

    (function initialize() {
        painters.push(new lu.bioControls.biorhythmView.painting.TodayMarkerPainter());
        painters.push(new lu.bioControls.biorhythmView.painting.GridLinesPainter());
        painters.push(new lu.bioControls.biorhythmView.painting.BiorhythmCurvesPainter());
        painters.push(new lu.bioControls.biorhythmView.painting.DayLabelsPainter());
        painters.push(new lu.bioControls.biorhythmView.painting.XDayMarkerPainter());
    }());
};