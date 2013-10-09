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
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};

/**
 * Represents the intelectual biorhythm. It is a sinusoidal biorhythm with the
 * period of 33 days.
 * 
 * @returns {lu.bioControls.biorhythms.IntellectualBiorhythm}
 */
lu.bioControls.biorhythms.IntellectualBiorhythm = function() {

    Object.defineProperty(this, "name", {
        value: "Intellectual",
        writable: false,
        enumerable: true,
        configurable: false
    });

    (function initialize() {
        lu.bioControls.biorhythms.SinusoidalBiorhythm.call(this, 33);
    }).call(this);
};

lu.bioControls.biorhythms.IntellectualBiorhythm.inherit(lu.bioControls.biorhythms.SinusoidalBiorhythm);
