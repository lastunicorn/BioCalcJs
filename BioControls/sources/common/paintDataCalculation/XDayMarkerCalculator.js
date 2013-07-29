var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.paintDataCalculation = lu.bioControls.common.paintDataCalculation || {};

lu.bioControls.common.paintDataCalculation.XDayMarkerCalculator = function() {

    var rawPaintData = null;
    var canvas = null;
    
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