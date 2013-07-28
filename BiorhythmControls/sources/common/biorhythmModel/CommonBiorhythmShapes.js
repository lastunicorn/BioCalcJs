var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};
lu.biorhythmControls.common = lu.biorhythmControls.common || {};
lu.biorhythmControls.common.biorhythmModel = lu.biorhythmControls.common.biorhythmModel || {};

lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes = function() {

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
        physicalShape = lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createPhysicalBiorhythmShape();
        emotionalShape = lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createEmotionalBiorhythmShape();
        intellectualShape = lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createIntellectualBiorhythmShape();
        intuitiveShape = lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createIntuitiveBiorhythmShape();

        passionShape = lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createPassionBiorhythmShape();
        passionShape.setIsVisible(false);
        masteryShape = lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createMasteryBiorhythmShape();
        masteryShape.setIsVisible(false);
        wisdomShape = lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createWisdomBiorhythmShape();
        wisdomShape.setIsVisible(false);

        perceptionShape = lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createPerceptionBiorhythmShape();
        perceptionShape.setIsVisible(false);
        psychicShape = lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createPsychicBiorhythmShape();
        psychicShape.setIsVisible(false);
        successShape = lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createSuccessBiorhythmShape();
        successShape.setIsVisible(false);

        estheticShape = lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createEstheticBiorhythmShape();
        estheticShape.setIsVisible(false);
        selfAwarenessShape = lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createSelfAwarenessBiorhythmShape();
        selfAwarenessShape.setIsVisible(false);
        spiritualShape = lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createSpiritualBiorhythmShape();
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

    this.getAll = function() {
        return [ physicalShape, emotionalShape, intellectualShape, intuitiveShape,

        passionShape, masteryShape, wisdomShape,

        perceptionShape, psychicShape, successShape,

        estheticShape, selfAwarenessShape, spiritualShape ];
    };

    (function initialize() {
        createBiorhythmShapes();
    }());
};

lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday = new Date(1980, 05, 13);

// -----------------------------------------------------------------------------
// Primary Biorhythms
// -----------------------------------------------------------------------------

lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createPhysicalBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.PhysicalBiorhythm();

    var shape = new lu.biorhythmControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#ff0000"); // Red
    shape.setBirthday(lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createEmotionalBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.EmotionalBiorhythm();

    var shape = new lu.biorhythmControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#32cd32"); // LimeGreen
    shape.setBirthday(lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createIntellectualBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.IntellectualBiorhythm();

    var shape = new lu.biorhythmControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#1e90ff"); // DodgerBlue
    shape.setBirthday(lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createIntuitiveBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.IntuitiveBiorhythm();

    var shape = new lu.biorhythmControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#ffa500"); // Orange
    shape.setBirthday(lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

// -----------------------------------------------------------------------------
// Secondary Biorhythms
// -----------------------------------------------------------------------------

lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createPassionBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.PassionBiorhythm();

    var shape = new lu.biorhythmControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#ff0000"); // Red
    shape.setLineStyle(lu.LineStyle.dash);
    shape.setBirthday(lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createMasteryBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.MasteryBiorhythm();

    var shape = new lu.biorhythmControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#1e90ff"); // DodgerBlue
    shape.setLineStyle(lu.LineStyle.dashDot);
    shape.setBirthday(lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createWisdomBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.WisdomBiorhythm();

    var shape = new lu.biorhythmControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#32cd32"); // LimeGreen
    shape.setLineStyle(lu.LineStyle.dashDotDot);
    shape.setBirthday(lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

// -----------------------------------------------------------------------------
// Extra Biorhythms
// -----------------------------------------------------------------------------

lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createPerceptionBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.PerceptionBiorhythm();

    var shape = new lu.biorhythmControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#ff0000"); // Red
    shape.setLineStyle(lu.LineStyle.dash);
    shape.setBirthday(lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createPsychicBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.PsychicBiorhythm();

    var shape = new lu.biorhythmControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#32cd32"); // LimeGreen
    shape.setLineStyle(lu.LineStyle.dashDot);
    shape.setBirthday(lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createSuccessBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.SuccessBiorhythm();

    var shape = new lu.biorhythmControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#1e90ff"); // DodgerBlue
    shape.setLineStyle(lu.LineStyle.dashDotDot);
    shape.setBirthday(lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

// -----------------------------------------------------------------------------
// I-Ching Biorhythms
// -----------------------------------------------------------------------------

lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createEstheticBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.EstheticBiorhythm();

    var shape = new lu.biorhythmControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#ff0000"); // Red
    shape.setBirthday(lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createSelfAwarenessBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.SelfAwarenessBiorhythm();

    var shape = new lu.biorhythmControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#1e90ff"); // DodgerBlue
    shape.setBirthday(lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};

lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.createSpiritualBiorhythmShape = function() {
    var biorhythm = new lu.bioControls.core.biorhythms.SpiritualBiorhythm();

    var shape = new lu.biorhythmControls.common.biorhythmModel.BiorhythmShape();
    shape.setName(biorhythm.getName() + " Shape");
    shape.setBiorhythm(biorhythm);
    shape.setColor("#ffa500"); // Orange
    shape.setBirthday(lu.biorhythmControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);

    return shape;
};
