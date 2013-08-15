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

lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes = function() {

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
        physicalShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPhysicalBiorhythmShape();
        emotionalShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createEmotionalBiorhythmShape();
        intellectualShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createIntellectualBiorhythmShape();
        intuitiveShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createIntuitiveBiorhythmShape();

        passionShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPassionBiorhythmShape();
        passionShape.setIsVisible(false);
        masteryShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createMasteryBiorhythmShape();
        masteryShape.setIsVisible(false);
        wisdomShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createWisdomBiorhythmShape();
        wisdomShape.setIsVisible(false);

        perceptionShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPerceptionBiorhythmShape();
        perceptionShape.setIsVisible(false);
        psychicShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPsychicBiorhythmShape();
        psychicShape.setIsVisible(false);
        successShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSuccessBiorhythmShape();
        successShape.setIsVisible(false);

        estheticShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createEstheticBiorhythmShape();
        estheticShape.setIsVisible(false);
        selfAwarenessShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSelfAwarenessBiorhythmShape();
        selfAwarenessShape.setIsVisible(false);
        spiritualShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSpiritualBiorhythmShape();
        spiritualShape.setIsVisible(false);
    }

    this.getPhysicalShape = function getPhysicalShape() {
        return physicalShape;
    };

    this.getEmotionalShape = function() {
        return emotionalShape;
    };

    this.getIntellectualShape = function() {
        return intellectualShape;
    };

    this.getIntuitiveShape = function() {
        return intuitiveShape;
    };

    this.getPrimaryBiorhythmShapes = function() {
        return [ physicalShape, emotionalShape, intellectualShape, intuitiveShape ];
    };

    this.getPassionShape = function() {
        return passionShape;
    };

    this.getMasteryShape = function() {
        return masteryShape;
    };

    this.getWisdomShape = function() {
        return wisdomShape;
    };

    this.getSecondaryBiorhythmShapes = function() {
        return [ passionShape, masteryShape, wisdomShape ];
    };

    this.getPerceptionShape = function() {
        return perceptionShape;
    };

    this.getPsychicShape = function() {
        return psychicShape;
    };

    this.getSuccessShape = function() {
        return successShape;
    };

    this.getExtraBiorhythmShapes = function() {
        return [ perceptionShape, psychicShape, successShape ];
    };

    this.getEstheticShape = function() {
        return estheticShape;
    };

    this.getSelfAwarenessShape = function() {
        return selfAwarenessShape;
    };

    this.getSpiritualShape = function() {
        return spiritualShape;
    };

    this.getIChingBiorhythmShapes = function() {
        return [ estheticShape, selfAwarenessShape, spiritualShape ];
    };

    this.getAll = getAll;
    function getAll() {
        return [ physicalShape, emotionalShape, intellectualShape, intuitiveShape,

        passionShape, masteryShape, wisdomShape,

        perceptionShape, psychicShape, successShape,

        estheticShape, selfAwarenessShape, spiritualShape ];
    };

    this.setBirthdayOnAll = function(birthday) {
        var biorhythms = getAll();
        
        for ( var i = 0; i < biorhythms.length; i++) {
            biorhythms[i].setBirthday(birthday);
        }
    };

    (function initialize() {
        createBiorhythmShapes();
    }());
};

lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday = new Date(1980, 05, 13);

// -----------------------------------------------------------------------------
// Primary Biorhythms
// -----------------------------------------------------------------------------

lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPhysicalBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.PhysicalBiorhythm();

    var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#ff0000"); // Red
    shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createEmotionalBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.EmotionalBiorhythm();

    var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#32cd32"); // LimeGreen
    shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createIntellectualBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.IntellectualBiorhythm();

    var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#1e90ff"); // DodgerBlue
    shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createIntuitiveBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.IntuitiveBiorhythm();

    var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#ffa500"); // Orange
    shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

// -----------------------------------------------------------------------------
// Secondary Biorhythms
// -----------------------------------------------------------------------------

lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPassionBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.PassionBiorhythm();

    var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#ff0000"); // Red
    shape.setLineStyle(lu.LineStyle.dash);
    shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createMasteryBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.MasteryBiorhythm();

    var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#1e90ff"); // DodgerBlue
    shape.setLineStyle(lu.LineStyle.dashDot);
    shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createWisdomBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.WisdomBiorhythm();

    var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#32cd32"); // LimeGreen
    shape.setLineStyle(lu.LineStyle.dashDotDot);
    shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

// -----------------------------------------------------------------------------
// Extra Biorhythms
// -----------------------------------------------------------------------------

lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPerceptionBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.PerceptionBiorhythm();

    var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#ff0000"); // Red
    shape.setLineStyle(lu.LineStyle.dash);
    shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPsychicBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.PsychicBiorhythm();

    var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#32cd32"); // LimeGreen
    shape.setLineStyle(lu.LineStyle.dashDot);
    shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSuccessBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.SuccessBiorhythm();

    var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#1e90ff"); // DodgerBlue
    shape.setLineStyle(lu.LineStyle.dashDotDot);
    shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

// -----------------------------------------------------------------------------
// I-Ching Biorhythms
// -----------------------------------------------------------------------------

lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createEstheticBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.EstheticBiorhythm();

    var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#ff0000"); // Red
    shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSelfAwarenessBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.SelfAwarenessBiorhythm();

    var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#1e90ff"); // DodgerBlue
    shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSpiritualBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.SpiritualBiorhythm();

    var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#ffa500"); // Orange
    shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};
