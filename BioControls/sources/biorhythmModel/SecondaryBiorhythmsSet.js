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

(function(BiorhythmShapeSet, biorhythmShapesCreator) {

    lu.bioControls.biorhythmModel.SecondaryBiorhythmsSet = function() {

        // --------------------------------------------------------------------------
        // passionShape property
        // --------------------------------------------------------------------------

        var passionShape = null;

        Object.defineProperty(this, "passionShape", {
            enumerable: true,
            configurable: false,
            get: getPassionShape
        });

        function getPassionShape() {
            return passionShape;
        }

        // --------------------------------------------------------------------------
        // masteryShape property
        // --------------------------------------------------------------------------

        var masteryShape = null;
        
        Object.defineProperty(this, "masteryShape", {
            enumerable: true,
            configurable: false,
            get: getMasteryShape
        });

        function getMasteryShape() {
            return masteryShape;
        }

        // --------------------------------------------------------------------------
        // wisdomShape property
        // --------------------------------------------------------------------------

        var wisdomShape = null;
        
        Object.defineProperty(this, "wisdomShape", {
            enumerable: true,
            configurable: false,
            get: getWisdomShape
        });

        function getWisdomShape() {
            return wisdomShape;
        }

        // --------------------------------------------------------------------------
        // Functions
        // --------------------------------------------------------------------------

        this.getByName = function (name) {
            if (passionShape.name == name)
                return passionShape;

            if (masteryShape.name == name)
                return masteryShape;

            if (wisdomShape.name == name)
                return wisdomShape;

            return null;
        };

        // --------------------------------------------------------------------------
        // Initialization
        // --------------------------------------------------------------------------

        (function initialize() {
            passionShape = biorhythmShapesCreator.createPassionBiorhythmShape();
            masteryShape = biorhythmShapesCreator.createMasteryBiorhythmShape();
            wisdomShape = biorhythmShapesCreator.createWisdomBiorhythmShape();

            BiorhythmShapeSet.call(this, [ passionShape, masteryShape, wisdomShape ]);
        }).call(this);
    };

    lu.bioControls.biorhythmModel.SecondaryBiorhythmsSet.inherit(BiorhythmShapeSet);

}(
        lu.bioControls.biorhythmModel.BiorhythmShapeSet,
        lu.bioControls.biorhythmModel.BiorhythmShapesCreator
    ));