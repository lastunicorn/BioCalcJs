var lu = lu || {};
lu.bioCalc = lu.bioCalc || {};

lu.bioCalc.BiorhythmLegend = function (biorhythmView, legendContainerSelector) {
    var $legendContainer;

    function onBiorhythmNameChanged() {
        // todo: implement this
    }
    
    function onBiorhythmColorChanged() {
        // todo: implement this
    }
    
    function onBiorhythmAdded() {
        // todo: implement this
    }
    
    function onBiorhythmRemoved() {
        // todo: implement this
    }

    this.populate = function populate() {
        var biorhythmShapes = biorhythmView.getBiorhythms();
        
        biorhythmView.subscribeToBiorhythmAdded(onBiorhythmAdded);
        biorhythmView.subscribeToBiorhythmRemoved(onBiorhythmRemoved);
        
        $legendContainer.empty();        
        
        for (var i = 0; i < biorhythmShapes.length; i++) {
            biorhythmShapes[i].subscribeToNameChanged(onBiorhythmNameChanged);
            biorhythmShapes[i].subscribeToColorChanged(onBiorhythmColorChanged);

            var $legendItemTag = generateLegendItemTag(biorhythmShapes[i]);
            
            $legendContainer.prepend($legendItemTag);
        }
    }
    
    function generateLegendItemTag(biorhythmShape) {
        var $div = $("<div/>");
        
        $div.addClass("bioLegendItem");
        $div.attr("data-biorhythm", biorhythmShape.getName());
        
        $div.append(generateLegendColorTag(biorhythmShape));
        $div.append(generateLegendLabelTag(biorhythmShape));
        
        if (!biorhythmShape.getIsVisible()) {
            $div.hide();
        }
        
        return $div;
    }
    
    function generateLegendColorTag(biorhythmShape) {
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
    
	// --------------------------------------------------------------------------
	// Initializer
	// --------------------------------------------------------------------------
	
    (function initialize() {
        $legendContainer = $(legendContainerSelector);
    }());
};