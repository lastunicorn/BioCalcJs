// BioCalc
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