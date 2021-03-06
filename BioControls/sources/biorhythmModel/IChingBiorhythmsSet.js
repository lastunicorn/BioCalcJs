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

    lu.bioControls.biorhythmModel.IChingBiorhythmsSet = function() {

        // --------------------------------------------------------------------------
        // estheticShape property
        // --------------------------------------------------------------------------

        var estheticShape = null;
        
        Object.defineProperty(this, "estheticShape", {
            enumerable: true,
            configurable: false,
            get: getEstheticShape
        });

        function getEstheticShape() {
            return estheticShape;
        }

        // --------------------------------------------------------------------------
        // selfAwarenessShape property
        // --------------------------------------------------------------------------

        var selfAwarenessShape = null;
        
        Object.defineProperty(this, "selfAwarenessShape", {
            enumerable: true,
            configurable: false,
            get: getSelfAwarenessShape
        });

        function getSelfAwarenessShape() {
            return selfAwarenessShape;
        }

        // --------------------------------------------------------------------------
        // spiritualShape property
        // --------------------------------------------------------------------------

        var spiritualShape = null;

        Object.defineProperty(this, "spiritualShape", {
            enumerable: true,
            configurable: false,
            get: getSpiritualShape
        });

        function getSpiritualShape() {
            return spiritualShape;
        }

        // --------------------------------------------------------------------------
        // Initialization
        // --------------------------------------------------------------------------

        (function initialize() {
            estheticShape = biorhythmShapesCreator.createEstheticBiorhythmShape();
            selfAwarenessShape = biorhythmShapesCreator.createSelfAwarenessBiorhythmShape();
            spiritualShape = biorhythmShapesCreator.createSpiritualBiorhythmShape();

            BiorhythmShapeSet.call(this, [ estheticShape, selfAwarenessShape, spiritualShape ]);
        }).call(this);
    };

    lu.bioControls.biorhythmModel.IChingBiorhythmsSet.inherit(BiorhythmShapeSet);

}(
        lu.bioControls.biorhythmModel.BiorhythmShapeSet,
        lu.bioControls.biorhythmModel.BiorhythmShapesCreator
    ));