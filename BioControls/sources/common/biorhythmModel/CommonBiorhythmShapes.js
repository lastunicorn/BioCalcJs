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
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.biorhythmModel = lu.bioControls.common.biorhythmModel || {};

/**
 * It is a repository containing a list of BiorhythmShape objects; one for each
 * known biorhythm.
 * 
 * @returns {lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes}
 */
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes = function() {

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
        var biorhythmShapesCreator = lu.bioControls.common.biorhythmModel.BiorhythShapesCreator;

        // Create primary biorhythms

        physicalShape = biorhythmShapesCreator.createPhysicalBiorhythmShape();
        emotionalShape = biorhythmShapesCreator.createEmotionalBiorhythmShape();
        intellectualShape = biorhythmShapesCreator.createIntellectualBiorhythmShape();
        intuitiveShape = biorhythmShapesCreator.createIntuitiveBiorhythmShape();

        var primaryBiorhythmShapes = [ physicalShape, emotionalShape, intellectualShape, intuitiveShape ];
        primaryBiorhythmsSet = new lu.bioControls.common.biorhythmModel.BiorhythmShapeSet(primaryBiorhythmShapes);

        // Create secondary biorhythms

        passionShape = biorhythmShapesCreator.createPassionBiorhythmShape();
        masteryShape = biorhythmShapesCreator.createMasteryBiorhythmShape();
        wisdomShape = biorhythmShapesCreator.createWisdomBiorhythmShape();

        var secondaryBiorhythmShapes = [ passionShape, masteryShape, wisdomShape ];
        secondaryBiorhythmsSet = new lu.bioControls.common.biorhythmModel.BiorhythmShapeSet(secondaryBiorhythmShapes);
        secondaryBiorhythmsSet.hideAll();

        // Create extra biorhythms

        perceptionShape = biorhythmShapesCreator.createPerceptionBiorhythmShape();
        psychicShape = biorhythmShapesCreator.createPsychicBiorhythmShape();
        successShape = biorhythmShapesCreator.createSuccessBiorhythmShape();

        var extraBiorhythmShapes = [ perceptionShape, psychicShape, successShape ];
        extraBiorhythmsSet = new lu.bioControls.common.biorhythmModel.BiorhythmShapeSet(extraBiorhythmShapes);
        extraBiorhythmsSet.hideAll();

        // Create i-ching biorhythms

        estheticShape = biorhythmShapesCreator.createEstheticBiorhythmShape();
        selfAwarenessShape = biorhythmShapesCreator.createSelfAwarenessBiorhythmShape();
        spiritualShape = biorhythmShapesCreator.createSpiritualBiorhythmShape();

        var iChingBiorhythmShapes = [ estheticShape, selfAwarenessShape, spiritualShape ];
        iChingBiorhythmsSet = new lu.bioControls.common.biorhythmModel.BiorhythmShapeSet(iChingBiorhythmShapes);
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

    this.getPhysicalShape = getPhysicalShape;

    /**
     * @deprecated
     */
    function getPhysicalShape() {
        return physicalShape;
    }

    Object.defineProperty(this, "physicalShape", {
        enumerable: true,
        configurable: false,
        get: getPhysicalShape
    });

    this.getEmotionalShape = getEmotionalShape;

    /**
     * @deprecated
     */
    function getEmotionalShape() {
        return emotionalShape;
    }

    Object.defineProperty(this, "emotionalShape", {
        enumerable: true,
        configurable: false,
        get: getEmotionalShape
    });

    this.getIntellectualShape = getIntellectualShape;

    /**
     * @deprecated
     */
    function getIntellectualShape() {
        return intellectualShape;
    }

    Object.defineProperty(this, "intellectualShape", {
        enumerable: true,
        configurable: false,
        get: getIntellectualShape
    });

    this.getIntuitiveShape = getIntuitiveShape;

    /**
     * @deprecated
     */
    function getIntuitiveShape() {
        return intuitiveShape;
    }

    Object.defineProperty(this, "intuitiveShape", {
        enumerable: true,
        configurable: false,
        get: getIntuitiveShape
    });

    /**
     * @deprecated Use primaryBiorhythmShapes property instead.
     */
    this.getPrimaryBiorhythmShapes = function getPrimaryBiorhythmShapes() {
        return primaryBiorhythmsSet.items;
    };

    this.getPassionShape = getPassionShape;

    /**
     * @deprecated
     */
    function getPassionShape() {
        return passionShape;
    }

    Object.defineProperty(this, "passionShape", {
        enumerable: true,
        configurable: false,
        get: getPassionShape
    });

    this.getMasteryShape = getMasteryShape;

    /**
     * @deprecated
     */
    function getMasteryShape() {
        return masteryShape;
    }

    Object.defineProperty(this, "masteryShape", {
        enumerable: true,
        configurable: false,
        get: getMasteryShape
    });

    this.getWisdomShape = getWisdomShape;

    /**
     * @deprecated
     */
    function getWisdomShape() {
        return wisdomShape;
    }

    Object.defineProperty(this, "wisdomShape", {
        enumerable: true,
        configurable: false,
        get: getWisdomShape
    });

    /**
     * @deprecated Use secondaryBiorhythmShapes property instead.
     */
    this.getSecondaryBiorhythmShapes = function getSecondaryBiorhythmShapes() {
        return secondaryBiorhythmsSet.items;
    };

    this.getPerceptionShape = getPerceptionShape;

    /**
     * @deprecated
     */
    function getPerceptionShape() {
        return perceptionShape;
    }

    Object.defineProperty(this, "perceptionShape", {
        enumerable: true,
        configurable: false,
        get: getPerceptionShape
    });

    this.getPsychicShape = getPsychicShape;

    /**
     * @deprecated
     */
    function getPsychicShape() {
        return psychicShape;
    }

    Object.defineProperty(this, "psychicShape", {
        enumerable: true,
        configurable: false,
        get: getPsychicShape
    });

    this.getSuccessShape = getSuccessShape;

    /**
     * @deprecated
     */
    function getSuccessShape() {
        return successShape;
    }

    Object.defineProperty(this, "successShape", {
        enumerable: true,
        configurable: false,
        get: getSuccessShape
    });

    /**
     * @deprecated Use extraBiorhythmShapes property instead.
     */
    this.getExtraBiorhythmShapes = function getExtraBiorhythmShapes() {
        return extraBiorhythmsSet.items;
    };

    this.getEstheticShape = getEstheticShape;

    /**
     * @deprecated
     */
    function getEstheticShape() {
        return estheticShape;
    }

    Object.defineProperty(this, "estheticShape", {
        enumerable: true,
        configurable: false,
        get: getEstheticShape
    });

    this.getSelfAwarenessShape = getSelfAwarenessShape;

    /**
     * @deprecated
     */
    function getSelfAwarenessShape() {
        return selfAwarenessShape;
    }

    Object.defineProperty(this, "selfAwarenessShape", {
        enumerable: true,
        configurable: false,
        get: getSelfAwarenessShape
    });

    this.getSpiritualShape = getSpiritualShape;

    /**
     * @deprecated
     */
    function getSpiritualShape() {
        return spiritualShape;
    }

    Object.defineProperty(this, "spiritualShape", {
        enumerable: true,
        configurable: false,
        get: getSpiritualShape
    });

    /**
     * @deprecated Use iChingBiorhythmShapes property instead.
     */
    this.getIChingBiorhythmShapes = function getIChingBiorhythmShapes() {
        return iChingBiorhythmsSet.items;
    };

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

/**
 * @deprecated Use lu.bioControls.common.biorhythmModel.BiorhythShapesCreator
 *             object instead.
 */
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday = new Date(1980, 05, 13);

// -----------------------------------------------------------------------------
// Primary Biorhythms
// -----------------------------------------------------------------------------

/**
 * @deprecated Use lu.bioControls.common.biorhythmModel.BiorhythShapesCreator
 *             object instead.
 */
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPhysicalBiorhythmShape = function() {
    lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.defaultBirthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
    return lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.createPhysicalBiorhythmShape;
};

/**
 * @deprecated Use lu.bioControls.common.biorhythmModel.BiorhythShapesCreator
 *             object instead.
 */
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createEmotionalBiorhythmShape = function() {
    lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.defaultBirthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
    return lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.createEmotionalBiorhythmShape;
};

/**
 * @deprecated Use lu.bioControls.common.biorhythmModel.BiorhythShapesCreator
 *             object instead.
 */
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createIntellectualBiorhythmShape = function() {
    lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.defaultBirthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
    return lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.createIntellectualBiorhythmShape;
};

/**
 * @deprecated Use lu.bioControls.common.biorhythmModel.BiorhythShapesCreator
 *             object instead.
 */
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createIntuitiveBiorhythmShape = function() {
    lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.defaultBirthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
    return lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.createIntuitiveBiorhythmShape;
};

// -----------------------------------------------------------------------------
// Secondary Biorhythms
// -----------------------------------------------------------------------------

/**
 * @deprecated Use lu.bioControls.common.biorhythmModel.BiorhythShapesCreator
 *             object instead.
 */
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPassionBiorhythmShape = function() {
    lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.defaultBirthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
    return lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.createPassionBiorhythmShape;
};

/**
 * @deprecated Use lu.bioControls.common.biorhythmModel.BiorhythShapesCreator
 *             object instead.
 */
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createMasteryBiorhythmShape = function() {
    lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.defaultBirthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
    return lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.createMasteryBiorhythmShape;
};

/**
 * @deprecated Use lu.bioControls.common.biorhythmModel.BiorhythShapesCreator
 *             object instead.
 */
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createWisdomBiorhythmShape = function() {
    lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.defaultBirthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
    return lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.createWisdomBiorhythmShape;
};

// -----------------------------------------------------------------------------
// Extra Biorhythms
// -----------------------------------------------------------------------------

/**
 * @deprecated Use lu.bioControls.common.biorhythmModel.BiorhythShapesCreator
 *             object instead.
 */
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPerceptionBiorhythmShape = function() {
    lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.defaultBirthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
    return lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.createPerceptionBiorhythmShape;
};

/**
 * @deprecated Use lu.bioControls.common.biorhythmModel.BiorhythShapesCreator
 *             object instead.
 */
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPsychicBiorhythmShape = function() {
    lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.defaultBirthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
    return lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.createPsychicBiorhythmShape;
};

/**
 * @deprecated Use lu.bioControls.common.biorhythmModel.BiorhythShapesCreator
 *             object instead.
 */
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSuccessBiorhythmShape = function() {
    lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.defaultBirthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
    return lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.createSuccessBiorhythmShape;
};

// -----------------------------------------------------------------------------
// I-Ching Biorhythms
// -----------------------------------------------------------------------------

/**
 * @deprecated Use lu.bioControls.common.biorhythmModel.BiorhythShapesCreator
 *             object instead.
 */
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createEstheticBiorhythmShape = function() {
    lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.defaultBirthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
    return lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.createEstheticBiorhythmShape;
};

/**
 * @deprecated Use lu.bioControls.common.biorhythmModel.BiorhythShapesCreator
 *             object instead.
 */
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSelfAwarenessBiorhythmShape = function() {
    lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.defaultBirthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
    return lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.createSelfAwarenessBiorhythmShape;
};

/**
 * @deprecated Use lu.bioControls.common.biorhythmModel.BiorhythShapesCreator
 *             object instead.
 */
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSpiritualBiorhythmShape = function() {
    lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.defaultBirthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
    return lu.bioControls.common.biorhythmModel.BiorhythShapesCreator.createSpiritualBiorhythmShape;
};