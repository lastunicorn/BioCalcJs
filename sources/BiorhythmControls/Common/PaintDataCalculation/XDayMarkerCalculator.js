var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};
lu.biorhythmControls.common = lu.biorhythmControls.common || {};
lu.biorhythmControls.common.paintDataCalculation = lu.biorhythmControls.common.paintDataCalculation || {};

lu.biorhythmControls.common.paintDataCalculation.XDayMarkerCalculator = function() {
    
    var rawPaintData;
    var canvas;
    
	// --------------------------------------------------------------------------
	// Functions - "public"
	// --------------------------------------------------------------------------
	
    this.calculate = function(data, canvasElement) {
        rawPaintData = data;
        canvas = canvasElement;
        
        return calculateXDayMarker();
    };
    
    function calculateXDayMarker() {
        if (!rawPaintData.isXDayVisible) {
            return null;
        }

        var xStep = (canvas.width) / rawPaintData.totalDays;
        var x = xStep * rawPaintData.xDayIndex;
        var y = 0;
        var width = xStep;
        var height = canvas.height;

        return {
            rectangle: new lu.Rectangle(x, y, width, height),
            lineColor: rawPaintData.xDayBorderColor,
            lineWidth: rawPaintData.xDayBorderWidth
        };
    }
};