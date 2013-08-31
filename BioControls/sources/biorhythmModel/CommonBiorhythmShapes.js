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

/**
 * It is a repository containing a list of BiorhythmShape objects; one for each
 * known biorhythm.
 * 
 * @returns {lu.bioControls.biorhythmModel.CommonBiorhythmShapes}
 */
lu.bioControls.biorhythmModel.CommonBiorhythmShapes = function() {

    var primaryBiorhythmsSet = null;
    var secondaryBiorhythmsSet = null;
    var extraBiorhythmsSet = null;
    var iChingBiorhythmsSet = null;

    var physicalShape = null;
    var emotionalShape = null;
    var intellectualShape = null;
    var intuitiveShape = null;

    var passionShape = null;
    var masteryShape = null;
    var wisdomShape = null;

    var perceptionShape = null;
    var psychicShape = null;
    var successShape = null;

    var estheticShape = null;
    var selfAwarenessShape = null;
    var spiritualShape = null;

    function createBiorhythmShapes() {
        var biorhythmShapesCreator = lu.bioControls.biorhythmModel.BiorhythShapesCreator;

        // Create primary biorhythms

        physicalShape = biorhythmShapesCreator.createPhysicalBiorhythmShape();
        emotionalShape = biorhythmShapesCreator.createEmotionalBiorhythmShape();
        intellectualShape = biorhythmShapesCreator.createIntellectualBiorhythmShape();
        intuitiveShape = biorhythmShapesCreator.createIntuitiveBiorhythmShape();

        var primaryBiorhythmShapes = [ physicalShape, emotionalShape, intellectualShape, intuitiveShape ];
        primaryBiorhythmsSet = new lu.bioControls.biorhythmModel.BiorhythmShapeSet(primaryBiorhythmShapes);

        // Create secondary biorhythms

        passionShape = biorhythmShapesCreator.createPassionBiorhythmShape();
        masteryShape = biorhythmShapesCreator.createMasteryBiorhythmShape();
        wisdomShape = biorhythmShapesCreator.createWisdomBiorhythmShape();

        var secondaryBiorhythmShapes = [ passionShape, masteryShape, wisdomShape ];
        secondaryBiorhythmsSet = new lu.bioControls.biorhythmModel.BiorhythmShapeSet(secondaryBiorhythmShapes);
        secondaryBiorhythmsSet.hideAll();

        // Create extra biorhythms

        perceptionShape = biorhythmShapesCreator.createPerceptionBiorhythmShape();
        psychicShape = biorhythmShapesCreator.createPsychicBiorhythmShape();
        successShape = biorhythmShapesCreator.createSuccessBiorhythmShape();

        var extraBiorhythmShapes = [ perceptionShape, psychicShape, successShape ];
        extraBiorhythmsSet = new lu.bioControls.biorhythmModel.BiorhythmShapeSet(extraBiorhythmShapes);
        extraBiorhythmsSet.hideAll();

        // Create i-ching biorhythms

        estheticShape = biorhythmShapesCreator.createEstheticBiorhythmShape();
        selfAwarenessShape = biorhythmShapesCreator.createSelfAwarenessBiorhythmShape();
        spiritualShape = biorhythmShapesCreator.createSpiritualBiorhythmShape();

        var iChingBiorhythmShapes = [ estheticShape, selfAwarenessShape, spiritualShape ];
        iChingBiorhythmsSet = new lu.bioControls.biorhythmModel.BiorhythmShapeSet(iChingBiorhythmShapes);
        iChingBiorhythmsSet.hideAll();
    }

    Object.defineProperty(this, "primaryBiorhythmShapes", {
        enumerable: true,
        configurable: false,
        get: function() {
            return primaryBiorhythmsSet;
        }
    });

    Object.defineProperty(this, "secondaryBiorhythmShapes", {
        enumerable: true,
        configurable: false,
        get: function() {
            return secondaryBiorhythmsSet;
        }
    });

    Object.defineProperty(this, "extraBiorhythmShapes", {
        enumerable: true,
        configurable: false,
        get: function() {
            return extraBiorhythmsSet;
        }
    });

    Object.defineProperty(this, "iChingBiorhythmShapes", {
        enumerable: true,
        configurable: false,
        get: function() {
            return iChingBiorhythmsSet;
        }
    });

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

    Object.defineProperty(this, "passionShape", {
        enumerable: true,
        configurable: false,
        get: getPassionShape
    });

    function getPassionShape() {
        return passionShape;
    }

    Object.defineProperty(this, "masteryShape", {
        enumerable: true,
        configurable: false,
        get: getMasteryShape
    });

    function getMasteryShape() {
        return masteryShape;
    }

    Object.defineProperty(this, "wisdomShape", {
        enumerable: true,
        configurable: false,
        get: getWisdomShape
    });

    function getWisdomShape() {
        return wisdomShape;
    }

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

    this.getAll = getAll;
    function getAll() {
        return [ physicalShape, emotionalShape, intellectualShape, intuitiveShape,

        passionShape, masteryShape, wisdomShape,

        perceptionShape, psychicShape, successShape,

        estheticShape, selfAwarenessShape, spiritualShape ];
    }

    this.setBirthdayOnAll = function(birthday) {
        var biorhythms = getAll();

        for ( var i = 0; i < biorhythms.length; i++) {
            biorhythms[i].biorhythm.birthday = birthday;
        }
    };

    (function initialize() {
        createBiorhythmShapes();
    }());
};