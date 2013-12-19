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

(function (OnePersonBiorhythms) {

    lu.bioControls.biorhythmModel.MultiplePersonsBiorhythms = function () {

        var list = {};

        // --------------------------------------------------------------------------
        // Functions
        // --------------------------------------------------------------------------

        this.addPerson = function (personName) {
            var existsPerson = list[personName] !== undefined;
            if (existsPerson)
                return;

            var onePersonBiorhythms = new OnePersonBiorhythms();
            onePersonBiorhythms.name = personName;

            list[personName] = onePersonBiorhythms;
        };

        this.getByPersonName = function (personName) {
            if (list[personName] === undefined)
                return null;

            return list[personName];
        };

        this.setBirthdayOnAll = function (birthday, personName) {
            if (!(birthday instanceof Date))
                return;

            if (personName !== undefined) {
                if (list[personName] != undefined)
                    list[personName].setBirthdayOnAll(birthday);
            }
            else {
                for (var itemName in list) {
                    list[itemName].setBirthdayOnAll(birthday);
                }
            }
        };

        this.toArray = function (personName) {
            var list = [];

            if (personName !== undefined) {
                if (list[personName] != undefined)
                    list = list[personName].toArray();
            }
            else {
                for (var itemName in list) {
                    addRange(list[itemName].toArray(), list);
                }
            }

            return list;
        };

        function addRange(source, destination) {
            for (var i = 0; i < source.length; i++) {
                destination.push(source[i]);
            }
        }
    };

}(lu.bioControls.biorhythmModel.OnePersonBiorhythms));