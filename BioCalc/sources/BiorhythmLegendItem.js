var lu = lu || {};
lu.bioCalc = lu.bioCalc || {};

lu.bioCalc.BiorhythmLegendItem = function(biorhythmShape) {

	this.generate = function() {
		var $div = $("<div/>");

		$div.addClass("bioLegendItem");
		$div.attr("data-biorhythm", biorhythmShape.getName());

		$div.append(generateLegendColorTag(biorhythmShape));
		$div.append(generateLegendLabelTag(biorhythmShape));

		if (!biorhythmShape.getIsVisible()) {
			$div.hide();
		}

		return $div;
	};

	function generateLegendColorTag() {
		var $div = $("<div/>");
		$div.addClass("bioLegendColor");
		$div.css('background-color', biorhythmShape.getColor());
		return $div;
	}

	function generateLegendLabelTag(biorhythmShape) {
		var $div = $("<div/>");
		$div.addClass("bioLegendLabel");
		$div.text(biorhythmShape.getBiorhythm().getName());
		return $div;
	}

	function onColorPickerClosed(event, color) {
		biorhythmShape.setColor(color.formatted);
	}

	function onColorPickerOpened(event, color) {
		$(this).colorpicker("setColor", biorhythmShape.getColor());
	}
};