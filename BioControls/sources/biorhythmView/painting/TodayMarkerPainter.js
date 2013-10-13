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

(function(Rectangle, dateUtil) {
    /**
     * Paints the colored recatangle representing the current day using an html
     * canvas context object.
     * 
     * @returns {lu.bioControls.biorhythmView.painting.TodayMarkerPainter}
     */
    lu.bioControls.biorhythmView.painting.TodayMarkerPainter = function() {

        var paintData = null;
        var paintContext = null;
        var paintRectangle = null;

        this.paint = function(data, context, rectangle) {
            paintData = data;
            paintRectangle = rectangle;
            paintContext = context;

            var rectangle = calculateTodayRectangle();
            if (rectangle) {
                paintTodayMarker(rectangle, paintData.todayBackColor);
            }
        };

        function calculateTodayRectangle() {
            var todayIndex = calculateTodayIndex();

            var isTodayVisible = todayIndex >= 0 && todayIndex < paintData.totalDays;
            if (!isTodayVisible) {
                return null;
            }

            var xStep = (paintRectangle.width) / paintData.totalDays;
            var x = todayIndex * xStep;
            var y = 0;
            var width = xStep;
            var height = paintRectangle.height;

            return new Rectangle(x, y, width, height);
        }

        function calculateTodayIndex() {
            var today = dateUtil.getDateComponent(new Date());
            var firstDay = dateUtil.getDateComponent(paintData.firstDay);
            var todayIndexInMiliseconds = today - firstDay;
            return dateUtil.milisecondsToWholeDays(todayIndexInMiliseconds);
        }

        function paintTodayMarker(rectangle, color) {
            paintContext.beginPath();
            paintContext.rect(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
            paintContext.fillStyle = color;
            paintContext.fill();
        }
    };
}(lu.Rectangle, lu.DateUtil));