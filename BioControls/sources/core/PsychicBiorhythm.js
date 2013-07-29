var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};

lu.bioControls.core.biorhythms.PsychicBiorhythm = function() {
    var biorhythm = null;

    this.getName = function() {
        return "Psychic";
    };

    this.getValue = function(dayIndex) {
        return biorhythm.getValue(dayIndex);
    };

    (function initialize() {
        var emotionalBiorhythm = new lu.bioControls.core.biorhythms.EmotionalBiorhythm();
        var intuitiveBiorhythm = new lu.bioControls.core.biorhythms.IntuitiveBiorhythm();

        biorhythm = new lu.bioControls.core.biorhythms.AverageBiorhythm(emotionalBiorhythm, intuitiveBiorhythm);
    }());
};