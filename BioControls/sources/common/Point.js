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
 * Represents a point determined by two values in the cartesian reference
 * system.
 * 
 * @param x
 *            The x coordinate of the point.
 *            
 * @param y
 *            The y coordinate of the point.
 *            
 * @returns {lu.Point}
 */
lu.Point = function(x, y) {

    Object.defineProperty(this, "x", {
        enumerable: true,
        get: getX
    });

    function getX() {
        return x;
    }

    Object.defineProperty(this, "y", {
        enumerable: true,
        get: getY
    });

    function getY() {
        return y;
    }

    this.toString = function() {
        return "[" + x + "; " + y + "]";
    };

    // --------------------------------------------------------------------------
    // Initialization
    // --------------------------------------------------------------------------

    (function initialize() {
        if (typeof x !== "number") {
            throw "x has to be a number.";
        }

        if (typeof y !== "number") {
            throw "y has to be a number.";
        }
    }).call(this);
};