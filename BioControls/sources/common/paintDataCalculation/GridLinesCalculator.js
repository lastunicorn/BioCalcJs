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
lu.bioControls.common.paintDataCalculation = lu.bioControls.common.paintDataCalculation || {};

lu.bioControls.common.paintDataCalculation.GridLinesCalculator = function() {

    var rawPaintData = null;
    var canvas = null;
    
	// --------------------------------------------------------------------------
	// Functions - "public"
	// --------------------------------------------------------------------------
	
    this.calculate = function(data, canvasElement) {
        rawPaintData = data;
        canvas = canvasElement;
        
        return calculateGridLines();
    };
    
	// --------------------------------------------------------------------------
	// Functions - "private"
	// --------------------------------------------------------------------------
	
    function calculateGridLines() {
        if (!rawPaintData.isGridVisible) {
            return null;
        }
    
        var lines = [];
        
        for (var i = 0; i < rawPaintData.totalDays - 1; i++) {
            var line = createDaySeparatorLine(i);
            lines.push(line);
        }

        var axis = createXAxis();
        lines.push(axis);

        return {
            lines: lines,
            color: rawPaintData.gridColor
        };
    }
    
    function createDaySeparatorLine(dayIndex) {
        var xStep = (canvas.width) / rawPaintData.totalDays;
        var index = dayIndex + 1;
        
        var startPoint = new lu.Point(xStep * index, 0);
        var endPoint = new lu.Point(xStep * index, canvas.height);

        return new lu.Line(startPoint, endPoint);
    }

    function createXAxis() {
        var startPoint = new lu.Point(0, canvas.height / 2);
        var endPoint = new lu.Point(canvas.width, canvas.height / 2);

        return new lu.Line(startPoint, endPoint);
    }
};