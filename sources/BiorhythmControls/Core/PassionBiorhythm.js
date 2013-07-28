var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};

lu.bioControls.core.biorhythms.PassionBiorhythm = function() {
    var biorhythm = null;

    this.getName = function() {
        return "Passion";
    };

    this.getValue = function(dayIndex) {
        return biorhythm.getValue(dayIndex);
    };

    (function initialize() {
        var physicalBiorhythm = new lu.bioControls.core.biorhythms.PhysicalBiorhythm();
        var emotionalBiorhythm = new lu.bioControls.core.biorhythms.EmotionalBiorhythm();

        biorhythm = new lu.bioControls.core.biorhythms.AverageBiorhythm(physicalBiorhythm, emotionalBiorhythm);
    }());
};