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
lu.bioControls.biorhythmModel = lu.bioControls.biorhythmModel || {};

(function () {

    /**
     * It is a repository containing a list of BiorhythmShape objects; one for
     * each known biorhythm.
     */
    lu.bioControls.biorhythmModel.OnePersonBiorhythms = function () {
        var proto = this.constructor.prototype;

        // --------------------------------------------------------------------------
        // name property
        // --------------------------------------------------------------------------

        var name = null;

        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: false,
            get: function () {
                return name;
            },
            set: function (value) {
                name = value;
            }
        });
    };

    lu.bioControls.biorhythmModel.OnePersonBiorhythms.inherit(lu.bioControls.biorhythmModel.CommonBiorhythmsCollection);

}());