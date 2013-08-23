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
 * Paints the colored recatangle representing the current day using an html
 * canvas context object.
 * 
 * @returns {lu.bioControls.common.painting.TodayMarkerPainter}
 */
lu.bioControls.common.painting.TodayMarkerPainter = function() {

    var paintContext = null;
    var dataToPaint = null;

    this.paint = function(context, data) {
        paintContext = context;
        dataToPaint = data;

        if (!dataToPaint) {
            return;
        }

        paintTodayMarker();
    };

    function paintTodayMarker() {
        var rect = dataToPaint.rectangle;

        paintContext.beginPath();
        paintContext.rect(rect.getLeft(), rect.getTop(), rect.getWidth(), rect.getHeight());
        paintContext.fillStyle = dataToPaint.color;
        paintContext.fill();
    }
};