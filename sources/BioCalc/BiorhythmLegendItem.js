var lu = lu || {};
lu.bioCalc = lu.bioCalc || {};

lu.bioCalc.BiorhythmLegendItem = function (biorhythmShape) {
    
    var $legendColorTag;
    var $legendLabelTag;
    
    this.generate = function () {
        var $div = $("<div/>");
        
        $div.addClass("bioLegendItem");
        $div.attr("data-biorhythm", biorhythmShape.getName());
        
        $legendColorTag = generateLegendColorTag(biorhythmShape);
        $legendLabelTag = generateLegendLabelTag(biorhythmShape);
        
        $div.append($legendColorTag);
        $div.append($legendLabelTag);
        
        if (!biorhythmShape.getIsVisible()) {
            $div.hide();
        }
        
        return $div;
    }
    
    function generateLegendColorTag() {
        var $div = $("<div/>");
        $div.addClass("bioLegendColor");
        $div.css('background-color', biorhythmShape.getColor());

        var biorhythmName = biorhythmShape.getBiorhythm().getName(); 
        var title = biorhythmName ? biorhythmName + " Biorhythm" : null;

        /*$div.colorpicker({
				inline: false,
				altField: function(element) { return $(element); },
				altProperties: 'background-color',
				buttonColorize: true,
				color: biorhythmShape.getColor(),
				colorFormat: "#HEX",
				close: onColorPickerClosed,
				open: onColorPickerOpened,
				revert: true,
				showOn: 'click',
				title: title,
				parts: title ? "draggable" : "popup"
        });*/
				
        return $div;
    }
    
    function generateLegendLabelTag(biorhythmShape) {
        var $div = $("<div/>");
        $div.addClass("bioLegendLabel");
        $div.text(biorhythmShape.getBiorhythm().getName());

        var biorhythmName = biorhythmShape.getBiorhythm().getName(); 
        var title = biorhythmName ? biorhythmName + " Biorhythm" : null;
            
			$div.colorpicker({
				inline: false,
				altField: $legendColorTag,
				altProperties: 'background-color',
				buttonColorize: true,
				color: biorhythmShape.getColor(),
				colorFormat: "#HEX",
				close:  onColorPickerClosed,
				open: onColorPickerOpened,
				showOn: 'click alt',
				title: title,
				parts: title ? "draggable" : "popup",
			});
			
        return $div;
    }

    function onColorPickerClosed(event, color) {
        biorhythmShape.setColor(color.formatted);
    }

    function onColorPickerOpened(event, color) {
        $(this).colorpicker("setColor", biorhythmShape.getColor());
    }
};