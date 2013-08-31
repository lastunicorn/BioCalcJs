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
lu.bioControls.biorhythmModel = lu.bioControls.biorhythmModel || {};

/**
 * Represents a set of BiorhythmShape objects that are managed together.
 * 
 * @param items
 *            An array containing the BiorhythmShape objects.
 * 
 * @returns {lu.bioControls.biorhythmModel.BiorhythmShapeSet}
 */
lu.bioControls.biorhythmModel.BiorhythmShapeSet = function(items) {

    Object.defineProperty(this, "items", {
        value: items,
        enumerable: true,
        configurable: false,
        writable: false
    });

    this.isAnyVisible = function() {
        for ( var i = 0; i < items.length; i++) {
            if (items[i].isVisible) {
                return true;
            }
        }

        return false;
    };

    this.isAnyHidden = function() {
        for ( var i = 0; i < items.length; i++) {
            if (!items[i].isVisible) {
                return true;
            }
        }

        return false;
    };

    this.areAllVisible = function() {
        for ( var i = 0; i < items.length; i++) {
            if (!items[i].isVisible) {
                return false;
            }
        }

        return true;
    };

    this.areAllHidden = function() {
        for ( var i = 0; i < items.length; i++) {
            if (items[i].isVisible) {
                return false;
            }
        }

        return true;
    };

    this.showAll = function(value) {
        if (value === undefined || value) {
            for ( var i = 0; i < items.length; i++) {
                items[i].isVisible = true;
            }
        } else {
            this.hideAll();
        }
    };

    this.hideAll = function() {
        for ( var i = 0; i < items.length; i++) {
            items[i].isVisible = false;
        }
    };

    (function initialize() {
        if (typeof items !== "object" || !(items instanceof Array)) {
            throw "items must be an array of BiorhythmShape objects.";
        }
    }());
};