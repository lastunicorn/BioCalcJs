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
    calculatePattern: function(lineStyle, lineWidth) {
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