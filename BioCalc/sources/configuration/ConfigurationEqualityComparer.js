// BioCalc
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
lu.bioCalc = lu.bioCalc || {};
lu.bioCalc.configuration = lu.bioCalc.configuration || {};

(function () {

    lu.bioCalc.configuration.ConfigurationEqualityComparer = function () {

        var firstConfig = null;
        var secondConfig = null;

        this.areEqual = function (config1, config2) {
            if (config1 === undefined || config2 === undefined || config1 === null || config2 === null)
                return false;

            firstConfig = config1;
            secondConfig = config2;

            return areEqualBirthdays() &&
                areEqualSecondBirthdays() &&
                areEqualBiorhythmArrays();
        };

        function areEqualBirthdays() {
            if (!firstConfig.birthday && !secondConfig.birthday)
                return true;

            if (!firstConfig.birthday || !secondConfig.birthday)
                return false;

            return firstConfig.birthday.getTime() === secondConfig.birthday.getTime();
        }

        function areEqualSecondBirthdays() {
            if (!firstConfig.secondBirthday && !secondConfig.secondBirthday)
                return true;

            if (!firstConfig.secondBirthday || !secondConfig.secondBirthday)
                return false;

            return firstConfig.secondBirthday.getTime() === secondConfig.secondBirthday.getTime();
        }

        function areEqualBiorhythmArrays() {
            if (!firstConfig.biorhythms && !secondConfig.biorhythms)
                return true;

            if (!firstConfig.biorhythms || !secondConfig.biorhythms)
                return false;

            if (!(firstConfig.biorhythms instanceof Array) || !(secondConfig.biorhythms instanceof Array))
                return false;

            var unchangedCount = 0;

            for (var i = 0; i < firstConfig.biorhythms.length; i++) {
                var secondBiorhythm = getBiorhythmByName(secondConfig.biorhythms, firstConfig.biorhythms[i].name);
                if (secondBiorhythm === null)
                    return false;

                var areEqual = areBiorhythmsEqual(firstConfig.biorhythms[i], secondBiorhythm);
                if (!areEqual)
                    return false;

                unchangedCount++;
            }

            return unchangedCount === firstConfig.biorhythms.length;
        }

        function getBiorhythmByName(biorhythms, name) {
            for (var j = 0; j < biorhythms.length; j++) {
                if (biorhythms[j].name === name)
                    return biorhythms[j];
            }

            return null;
        }

        function areBiorhythmsEqual(biorhythm1, biorhythm2) {
            return biorhythm1.color === biorhythm2.color;
        }
    };
}());