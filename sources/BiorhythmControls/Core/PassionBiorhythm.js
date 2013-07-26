var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};

lu.bioControls.core.biorhythms.PassionBiorhythm = function() {
    var biorhythm;

    this.getName = function getName() {
        return "Passion";
    };

    this.getValue = function getValue(dayIndex) {
        return biorhythm.getValue(dayIndex);
    };

    (function initialize() {
        var physicalBiorhythm = new lu.bioControls.core.biorhythms.PhysicalBiorhythm();
        var emotionalBiorhythm = new lu.bioControls.core.biorhythms.EmotionalBiorhythm();

        biorhythm = new lu.bioControls.core.biorhythms.AverageBiorhythm(physicalBiorhythm, emotionalBiorhythm);
    }());
};