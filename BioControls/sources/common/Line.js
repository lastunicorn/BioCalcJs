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

window.lu = window.lu || {};

/**
 * A segment of a geometric line determined by two points.
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

    Object.defineProperty(this, "startPoint", {
        enumerable: true,
        get: getStartPoint
    });

    function getStartPoint() {
        return startPoint;
    }

    Object.defineProperty(this, "endPoint", {
        enumerable: true,
        get: getEndPoint
    });

    function getEndPoint() {
        return endPoint;
    }

    this.toString = function() {
        return startPoint.toString() + " - " + endPoint.toString();
    };

    // --------------------------------------------------------------------------
    // Initialization
    // --------------------------------------------------------------------------

    (function initialize() {
        if (!(startPoint instanceof lu.Point)) {
            throw "startPoint is undefined.";
        }

        if (!(endPoint instanceof lu.Point)) {
            throw "endPoint is undefined.";
        }
    }).call(this);
};