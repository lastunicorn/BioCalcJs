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

var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmModel = lu.bioControls.biorhythmModel || {};

lu.bioControls.biorhythmModel.ExtraBiorhythmsSet = function() {

    var perceptionShape = null;
    var psychicShape = null;
    var successShape = null;

    Object.defineProperty(this, "perceptionShape", {
        enumerable: true,
        configurable: false,
        get: getPerceptionShape
    });

    function getPerceptionShape() {
        return perceptionShape;
    }

    Object.defineProperty(this, "psychicShape", {
        enumerable: true,
        configurable: false,
        get: getPsychicShape
    });

    function getPsychicShape() {
        return psychicShape;
    }

    Object.defineProperty(this, "successShape", {
        enumerable: true,
        configurable: false,
        get: getSuccessShape
    });

    function getSuccessShape() {
        return successShape;
    }

    (function initialize() {
        var biorhythmShapesCreator = lu.bioControls.biorhythmModel.BiorhythShapesCreator;

        perceptionShape = biorhythmShapesCreator.createPerceptionBiorhythmShape();
        psychicShape = biorhythmShapesCreator.createPsychicBiorhythmShape();
        successShape = biorhythmShapesCreator.createSuccessBiorhythmShape();

        lu.bioControls.biorhythmModel.BiorhythmShapeSet.call(this, [ perceptionShape, psychicShape, successShape ]);
    }).call(this);
};

lu.inherit(lu.bioControls.biorhythmModel.ExtraBiorhythmsSet, lu.bioControls.biorhythmModel.BiorhythmShapeSet);