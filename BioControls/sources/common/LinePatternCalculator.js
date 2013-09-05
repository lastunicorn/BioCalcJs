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

lu.LinePatternCalculator = {
    /**
     * Creates a new line pattern based on the requested style and the line
     * width. The pattern is an array of numbers. The numbers from the odd
     * positions represents the length (in pixels) of the filled segments. The
     * numbers from the even positions represents the gaps (in pixels) between
     * those segments.
     * 
     * @param lineStyle
     *            {lu.LineStyle} The style based on which to create the pattern.
     * 
     * @param lineWidth
     *            {Number} The width of the line on which the pattern will be
     *            applied. This is used to scale the gaps according to the
     *            width.
     * 
     * @returns {Array} An array of numbers representing the pattern.
     */
    createPattern: function(lineStyle, lineWidth) {
        switch (lineStyle) {
            case lu.LineStyle.solid:
                return null;

            case lu.LineStyle.dot:
                return [ lineWidth * 1, lineWidth * 3 ];

            case lu.LineStyle.dash:
                return [ lineWidth * 10, lineWidth * 5 ];

            case lu.LineStyle.dashDot:
                return [ lineWidth * 10, lineWidth * 3, lineWidth * 1, lineWidth * 3 ];

            case lu.LineStyle.dashDotDot:
                return [ lineWidth * 10, lineWidth * 3, lineWidth * 1, lineWidth * 3, lineWidth * 1, lineWidth * 3 ];

            default:
                return null;
        }
    }
};