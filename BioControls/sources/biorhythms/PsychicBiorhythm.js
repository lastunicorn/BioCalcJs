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
 * Represents the psychic biorhythm. It is a biorhythm obtained by calculating
 * the average between emotional and intuitive biorhythms.
 * 
 * @returns {lu.bioControls.biorhythms.PsychicBiorhythm}
 */
lu.bioControls.biorhythms.PsychicBiorhythm = function() {

    Object.defineProperty(this, "name", {
        value: "Psychic",
        writable: false,
        enumerable: true,
        configurable: false
    });

    (function initialize() {
        var emotionalBiorhythm = new lu.bioControls.biorhythms.EmotionalBiorhythm();
        var intuitiveBiorhythm = new lu.bioControls.biorhythms.IntuitiveBiorhythm();

        lu.bioControls.biorhythms.AverageBiorhythm.call(this, emotionalBiorhythm, intuitiveBiorhythm);
    }).call(this);
};

lu.bioControls.biorhythms.PsychicBiorhythm.inherit(lu.bioControls.biorhythms.AverageBiorhythm);