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
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};

/**
 * Represents the success biorhythm. It is a biorhythm obtained by calculating
 * the average between intellectual and intuitive biorhythms.
 * 
 * @returns {lu.bioControls.core.biorhythms.SuccessBiorhythm}
 */
lu.bioControls.core.biorhythms.SuccessBiorhythm = function() {
    var biorhythm = null;

    /**
     * @deprecated
     */
    this.getName = function() {
        return "Success";
    };
    
    Object.defineProperty(this, "name",{
        value: "Success",
        writable: false,
        enumerable: true,
        configurable: false
    });

    this.getValue = function(dayIndex) {
        return biorhythm.getValue(dayIndex);
    };

    (function initialize() {
        var intellectualBiorhythm = new lu.bioControls.core.biorhythms.IntellectualBiorhythm();
        var intuitiveBiorhythm = new lu.bioControls.core.biorhythms.IntuitiveBiorhythm();

        biorhythm = new lu.bioControls.core.biorhythms.AverageBiorhythm(intellectualBiorhythm, intuitiveBiorhythm);
    }());
};