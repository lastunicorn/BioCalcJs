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
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};

(function(AverageBiorhythm) {
    /**
     * Represents the mastery biorhythm. It is a biorhythm obtained by
     * calculating the average between physical and intellectual biorhythms.
     *
     * @constructor
     */
    lu.bioControls.biorhythms.MasteryBiorhythm = function() {

        Object.defineProperty(this, "name", {
            value: "Mastery",
            writable: false,
            enumerable: true,
            configurable: false
        });

        (function initialize() {
            var physicalBiorhythm = new lu.bioControls.biorhythms.PhysicalBiorhythm();
            var intellectualBiorhythm = new lu.bioControls.biorhythms.IntellectualBiorhythm();

            AverageBiorhythm.call(this, physicalBiorhythm, intellectualBiorhythm);
        }).call(this);
    };

    lu.bioControls.biorhythms.MasteryBiorhythm.inherit(AverageBiorhythm);

}(lu.bioControls.biorhythms.AverageBiorhythm));