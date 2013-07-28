var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};
lu.biorhythmControls.common = lu.biorhythmControls.common || {};
lu.biorhythmControls.common.paintDataCalculation = lu.biorhythmControls.common.paintDataCalculation || {};

lu.biorhythmControls.common.paintDataCalculation.TodayMarkerCalculator = function() {

    var rawPaintData = null;
    var canvas = null;
    
	// --------------------------------------------------------------------------
	// Functions - "public"
	// --------------------------------------------------------------------------
	
    this.calculate = function(data, canvasElement) {
        rawPaintData = data;
        canvas = canvasElement;
        
        return calculateTodayRectangle();
    };
    
    function calculateTodayRectangle() {
        var todayIndex = calculateTodayIndex();
        
        var todayIsVisible = todayIndex >= 0 && todayIndex < rawPaintData.totalDays;
        if (!todayIsVisible) {
            return null;
        }

        var xStep = (canvas.width) / rawPaintData.totalDays;
        var x = todayIndex * xStep;
        var y = 0;
        var width = xStep;
        var height = canvas.height;

        return {
            rectangle: new lu.Rectangle(x, y, width, height),
            color: rawPaintData.todayBackColor
        };
    }
    
    function calculateTodayIndex() {
        var today = getDateComponent(new Date());
        var firstDay = getDateComponent(rawPaintData.firstDay);
        var todayIndexInMiliseconds = today - firstDay;
        return Math.floor(todayIndexInMiliseconds / 1000 / 60 / 60 / 24);
    }
    
    function getDateComponent(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
};