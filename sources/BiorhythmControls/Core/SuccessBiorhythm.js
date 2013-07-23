var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};

lu.bioControls.core.biorhythms.SuccessBiorhythm = function() {
	var biorhythm;
	
	function getName() {
		return "Success";
	}

	function getValue(dayIndex) {
		return biorhythm.getValue(dayIndex);
	}
	
	(function initialize() {
		var intellectualBiorhythm = new lu.bioControls.core.biorhythms.IntellectualBiorhythm();
		var intuitiveBiorhythm = new lu.bioControls.core.biorhythms.IntuitiveBiorhythm();
		
		biorhythm = new lu.bioControls.core.biorhythms.AverageBiorhythm(intellectualBiorhythm, intuitiveBiorhythm);
	}());

	this.getName = getName;
	this.getValue = getValue;
};