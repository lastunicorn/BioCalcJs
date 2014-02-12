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

        var list = [];
        var listByName = {};



        // --------------------------------------------------------------------------
        // Functions
        // --------------------------------------------------------------------------

        this.addPerson = function (personName) {
            var existsPerson = listByName[personName] !== undefined;
            if (existsPerson)
                return;

            var onePersonBiorhythms = new OnePersonBiorhythms();
            onePersonBiorhythms.name = personName;

            list.push(onePersonBiorhythms);
            listByName[personName] = onePersonBiorhythms;

            return onePersonBiorhythms;
        };

        this.getByPerson = function (person) {
            var personType = typeof person;

            switch (personType) {
                case "string":
                    if (listByName[person] === undefined)
                        throw "There is no person with the name '" + person + "'.";

                    return listByName[person];

                case "number":
                    return list[person];

                default :
                    throw "Invalid argument 'person'.";
            }
        };

        this.setBirthdayOnAll = function (birthday, person) {
            if (!(birthday instanceof Date))
                throw "Invalid argument 'birthday'.";

            if (person === undefined) {
                for (var itemName in listByName) {
                    listByName[itemName].setBirthdayOnAll(birthday);
                }
            } else if (typeof person === "string") {
                if (listByName[person] != undefined)
                    listByName[person].setBirthdayOnAll(birthday);
            } else if (typeof person === "number") {
                if (list[person] != undefined)
                    list[person].setBirthdayOnAll(birthday);
            } else {
                throw "Invalid argument 'person'.";
            }
        };

        this.toArray = function (person) {
            var listToReturn = [];

            if (person === undefined) {
                for (var itemName in listByName) {
                    addRange(listByName[itemName].toArray(), listToReturn);
                }
            } else if (typeof person === "string"){
                if (listByName[person] != undefined)
                    listToReturn = listByName[person].toArray();
            } else if (typeof person === "number") {
                if (list[person] != undefined)
                    listToReturn = list[person].toArray();
            }

            return listToReturn;
        };

        function addRange(source, destination) {
            for (var i = 0; i < source.length; i++) {
                destination.push(source[i]);
            }
        }
    };

}(lu.bioControls.biorhythmModel.OnePersonBiorhythms));