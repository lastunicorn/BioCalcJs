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

lu.bioControls.biorhythmModel.IChingBiorhythmsSet = function() {

    var estheticShape = null;
    var selfAwarenessShape = null;
    var spiritualShape = null;

    Object.defineProperty(this, "estheticShape", {
        enumerable: true,
        configurable: false,
        get: getEstheticShape
    });

    function getEstheticShape() {
        return estheticShape;
    }

    Object.defineProperty(this, "selfAwarenessShape", {
        enumerable: true,
        configurable: false,
        get: getSelfAwarenessShape
    });

    function getSelfAwarenessShape() {
        return selfAwarenessShape;
    }

    Object.defineProperty(this, "spiritualShape", {
        enumerable: true,
        configurable: false,
        get: getSpiritualShape
    });

    function getSpiritualShape() {
        return spiritualShape;
    }

    (function initialize() {
        var biorhythmShapesCreator = lu.bioControls.biorhythmModel.BiorhythShapesCreator;
        
        estheticShape = biorhythmShapesCreator.createEstheticBiorhythmShape();
        selfAwarenessShape = biorhythmShapesCreator.createSelfAwarenessBiorhythmShape();
        spiritualShape = biorhythmShapesCreator.createSpiritualBiorhythmShape();
        
        lu.bioControls.biorhythmModel.BiorhythmShapeSet.call(this, [ estheticShape, selfAwarenessShape, spiritualShape ]);
    }).call(this);
};

lu.bioControls.biorhythmModel.IChingBiorhythmsSet.inherit(lu.bioControls.biorhythmModel.BiorhythmShapeSet);