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
    lu.bioControls.biorhythmModel.PrimaryBiorhythmsSet = function() {

        // --------------------------------------------------------------------------
        // physicalShape property
        // --------------------------------------------------------------------------

        var physicalShape = null;

        Object.defineProperty(this, "physicalShape", {
            enumerable: true,
            configurable: false,
            get: getPhysicalShape
        });

        function getPhysicalShape() {
            return physicalShape;
        }

        // --------------------------------------------------------------------------
        // emotionalShape property
        // --------------------------------------------------------------------------

        var emotionalShape = null;
        
        Object.defineProperty(this, "emotionalShape", {
            enumerable: true,
            configurable: false,
            get: getEmotionalShape
        });

        function getEmotionalShape() {
            return emotionalShape;
        }

        // --------------------------------------------------------------------------
        // intellectualShape property
        // --------------------------------------------------------------------------
        
        var intellectualShape = null;

        Object.defineProperty(this, "intellectualShape", {
            enumerable: true,
            configurable: false,
            get: getIntellectualShape
        });

        function getIntellectualShape() {
            return intellectualShape;
        }

        // --------------------------------------------------------------------------
        // intuitiveShape property
        // --------------------------------------------------------------------------
        
        var intuitiveShape = null;

        Object.defineProperty(this, "intuitiveShape", {
            enumerable: true,
            configurable: false,
            get: getIntuitiveShape
        });

        function getIntuitiveShape() {
            return intuitiveShape;
        }

        // --------------------------------------------------------------------------
        // Initialization
        // --------------------------------------------------------------------------

        (function initialize() {
            physicalShape = biorhythmShapesCreator.createPhysicalBiorhythmShape();
            emotionalShape = biorhythmShapesCreator.createEmotionalBiorhythmShape();
            intellectualShape = biorhythmShapesCreator.createIntellectualBiorhythmShape();
            intuitiveShape = biorhythmShapesCreator.createIntuitiveBiorhythmShape();

            BiorhythmShapeSet.call(this, [ physicalShape, emotionalShape, intellectualShape, intuitiveShape ]);
        }).call(this);
    };

    lu.bioControls.biorhythmModel.PrimaryBiorhythmsSet.inherit(BiorhythmShapeSet);

}(lu.bioControls.biorhythmModel.BiorhythmShapeSet, lu.bioControls.biorhythmModel.BiorhythmShapesCreator));