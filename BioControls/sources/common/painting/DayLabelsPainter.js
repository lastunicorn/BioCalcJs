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
 * Paints the labels of the month days and week days using an html canvas context object.
 * 
 * @returns {lu.bioControls.common.painting.DayLabelsPainter}
 */
lu.bioControls.common.painting.DayLabelsPainter = function() {

    var dataToPaint = null;
    var paintContext = null;
    var currentFont = null;

    this.paint = function(context, data) {
        paintContext = context;
        dataToPaint = data;

        paintLabels();
    };

    function paintLabels() {
        paintContext.textAlign = "center";
        paintContext.textBaseline = "middle";

        var labelCount = dataToPaint.labels.length;

        currentFont = null;
        for ( var i = 0; i < labelCount; i++) {
            paintLabel(dataToPaint.labels[i]);
        }
    }

    function paintLabel(label) {
        if (label.isEmphasized) {
            paintContext.fillStyle = dataToPaint.emphasizedColor;
            if (currentFont !== dataToPaint.emphasizedFont) {
                paintContext.font = dataToPaint.emphasizedFont;
            }
        } else {
            paintContext.fillStyle = dataToPaint.color;
            if (currentFont !== dataToPaint.font) {
                paintContext.font = dataToPaint.font;
            }
        }

        paintContext.fillText(label.text, label.location.getX(), label.location.getY());
    }
};