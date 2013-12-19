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
            var personBiorhythms = list[personName];
            if (personBiorhythms === undefined)
                return null;

            return personBiorhythms;
        };

        this.setBirthdayOnAll = function (birthday, personName) {
            if (!(birthday instanceof Date))
                return;

            if (personName !== undefined) {
                var onePersonBiorhythms = list[personName];
                if (onePersonBiorhythms != undefined)
                    onePersonBiorhythms.setBirthdayOnAll(birthday);
            }
            else {
                for (var item in list) {
                    list[item].setBirthdayOnAll(birthday);
                }
            }
        };

        this.toArray = function (personName) {
            var onePersonBiorhythms;
            var list = [];

            if (personName !== undefined) {
                onePersonBiorhythms = list[personName];
                if (onePersonBiorhythms != undefined)
                    list = onePersonBiorhythms.toArray();
            }
            else {
                for (onePersonBiorhythms in list) {
                    addRange(onePersonBiorhythms.toArray(), list);
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