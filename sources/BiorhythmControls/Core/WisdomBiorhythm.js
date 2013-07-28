var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};

lu.bioControls.core.biorhythms.WisdomBiorhythm = function() {
    var biorhythm = null;

    this.getName = function() {
        return "Wisdom";
    };

    this.getValue = function(dayIndex) {
        return biorhythm.getValue(dayIndex);
    };

    (function initialize() {
        var emotionalBiorhythm = new lu.bioControls.core.biorhythms.EmotionalBiorhythm();
        var intellectualBiorhythm = new lu.bioControls.core.biorhythms.IntellectualBiorhythm();

        biorhythm = new lu.bioControls.core.biorhythms.AverageBiorhythm(emotionalBiorhythm, intellectualBiorhythm);
    }());
};