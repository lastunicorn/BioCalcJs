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

lu.bioControls.biorhythmModel.PrimaryBiorhythmsSet = function() {

    var physicalShape = null;
    var emotionalShape = null;
    var intellectualShape = null;
    var intuitiveShape = null;

    Object.defineProperty(this, "physicalShape", {
        enumerable: true,
        configurable: false,
        get: getPhysicalShape
    });

    function getPhysicalShape() {
        return physicalShape;
    }

    Object.defineProperty(this, "emotionalShape", {
        enumerable: true,
        configurable: false,
        get: getEmotionalShape
    });

    function getEmotionalShape() {
        return emotionalShape;
    }

    Object.defineProperty(this, "intellectualShape", {
        enumerable: true,
        configurable: false,
        get: getIntellectualShape
    });

    function getIntellectualShape() {
        return intellectualShape;
    }

    Object.defineProperty(this, "intuitiveShape", {
        enumerable: true,
        configurable: false,
        get: getIntuitiveShape
    });

    function getIntuitiveShape() {
        return intuitiveShape;
    }

    (function initialize() {
        var biorhythmShapesCreator = lu.bioControls.biorhythmModel.BiorhythShapesCreator;
        
        physicalShape = biorhythmShapesCreator.createPhysicalBiorhythmShape();
        emotionalShape = biorhythmShapesCreator.createEmotionalBiorhythmShape();
        intellectualShape = biorhythmShapesCreator.createIntellectualBiorhythmShape();
        intuitiveShape = biorhythmShapesCreator.createIntuitiveBiorhythmShape();
        
        lu.bioControls.biorhythmModel.BiorhythmShapeSet.call(this, [ physicalShape, emotionalShape, intellectualShape, intuitiveShape ]);
    }).call(this);
};

lu.inherit(lu.bioControls.biorhythmModel.PrimaryBiorhythmsSet, lu.bioControls.biorhythmModel.BiorhythmShapeSet);