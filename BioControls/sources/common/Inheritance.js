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

lu.Inheritance = (function() {

    /**
     * Links two constructor functions in the way that the first one (ctor) will
     * inherit the second one (baseCtor). An object created by the ctor function
     * will have in its prototype chain the prototype from the baseCtor
     * function.
     * 
     * @param ctor
     *            The constructor function that should inherit the second one.
     * 
     * @param baseCtor
     *            The base constructor function.
     */
    function inherit(ctor, baseCtor) {
        if (typeof ctor !== "function") {
            throw "ctor parameter has to be a function";
        }

        if (typeof baseCtor !== "function") {
            throw "baseCtor parameter has to be a function";
        }

        ctor.prototype = Object.create(baseCtor.prototype);
        ctor.prototype.constructor = ctor;
    }

    (function() {
        if (typeof Function.prototype.inherit === "undefined") {
            Function.prototype.inherit = function(baseCtor) {
                inherit(this, baseCtor);
            };
        } else {
            throw "Function.prototype.inherit already exists.";
        }
    }());

    return {
        inherit: inherit
    };
}());
