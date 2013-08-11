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

/**
 * A segment of a line determined by two points.
 * 
 * @param startPoint
 *            The point of start of the line's segment.
 * 
 * @param endPoint
 *            The point of end of the line's segment.
 * 
 * @returns {lu.Line}
 */
lu.Line = function(startPoint, endPoint) {

    /**
     * Returns the starting point of the line segment.
     * 
     * @returns The starting point of the line segment.
     */
    function getStartPoint() {
        return startPoint;
    }

    /**
     * @deprecated
     */
    this.getStartPoint = getStartPoint;

    /**
     * Returns the ending point of the line segment.
     * 
     * @returns The ending point of the line segment.
     */
    function getEndPoint() {
        return endPoint;
    }

    /**
     * @deprecated
     */
    this.getEndPoint = getEndPoint;

    Object.defineProperty(this, "startPoint", {
        enumerable: true,
        get: getStartPoint
    });

    Object.defineProperty(this, "endPoint", {
        enumerable: true,
        get: getEndPoint
    });

    /**
     * Returns a string representation of the current object.
     * 
     * @returns A string representation of the current object.
     */
    this.toString = function() {
        return startPoint.toString() + " - " + endPoint.toString();
    };

    /**
     * Performs the needed initialization of a new Point object.
     */
    (function initialize() {
        if (!(startPoint instanceof lu.Point)) {
            throw "startPoint is undefined.";
        }

        if (!(endPoint instanceof lu.Point)) {
            throw "endPoint is undefined.";
        }
    }).call(this);
};