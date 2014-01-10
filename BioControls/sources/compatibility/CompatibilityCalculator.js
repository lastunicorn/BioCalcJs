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
lu.bioControls.compatibility = lu.bioControls.compatibility || {};

(function (SinusoidalBiorhythm, dateUtil, ArgumentIsNotDateError, PeriodsIsNotNumberError, DisplacementCalculatorNotSetError) {

    lu.bioControls.compatibility.CompatibilityCalculator = function () {

        // --------------------------------------------------------------------------
        // displacementCalculator property
        // --------------------------------------------------------------------------

        var displacementCalculator = null;

        Object.defineProperty(this, "displacementCalculator", {
            enumerable: true,
            configurable: false,
            get: getDisplacementCalculator,
            set: setDisplacementCalculator
        })

        function getDisplacementCalculator() {
            return displacementCalculator;
        }

        function setDisplacementCalculator(value) {
            displacementCalculator = value;
        }

        // --------------------------------------------------------------------------
        // Functions
        // --------------------------------------------------------------------------

        this.calculate = function (birthday1, birthday2, period) {
            if (!(birthday1 instanceof Date))
                throw new ArgumentIsNotDateError("birthday1");

            if (!(birthday2 instanceof Date))
                throw new ArgumentIsNotDateError("birthday2");

            if (typeof period !== "number")
                throw new PeriodsIsNotNumberError();

            if (displacementCalculator === null ||
                typeof displacementCalculator !== "object" ||
                typeof displacementCalculator.calculate !== "function")
                throw new DisplacementCalculatorNotSetError();

            var birthdaysIntervalMilliseconds = birthday1 - birthday2;
            var birthdaysIntervalDays = dateUtil.millisecondsToWholeDays(birthdaysIntervalMilliseconds);
            var biorhythmsIntervalDays = Math.abs(birthdaysIntervalDays % period);

            return displacementCalculator.calculate(biorhythmsIntervalDays, period);
        };
    };

}(
        lu.bioControls.biorhythms.SinusoidalBiorhythm,
        lu.DateUtil,
        lu.bioControls.compatibility.ArgumentIsNotDateError,
        lu.bioControls.compatibility.PeriodsIsNotNumberError,
        lu.bioControls.compatibility.DisplacementCalculatorNotSetError
    ));