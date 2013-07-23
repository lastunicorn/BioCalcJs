var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};
lu.biorhythmControls.common = lu.biorhythmControls.common || {};
lu.biorhythmControls.common.paintDataCalculation = lu.biorhythmControls.common.paintDataCalculation || {};

lu.biorhythmControls.common.paintDataCalculation.GridLinesCalculator = function() {
    
    var nextCalculator;
    var rawPaintData;
    var canvas;
    
	// --------------------------------------------------------------------------
	// Functions - "public"
	// --------------------------------------------------------------------------
	
    function setNext(calculator) {
        if (typeof(calculator) === "object" && typeof(calculator.calculate) === "function") {
            nextCalculator = calculator;
        }
    }
    
    function calculate(data, canvasElement) {
        rawPaintData = data;
        canvas = canvasElement;
        
        var calculatedData = calculateGridLines();
        callNext();
        return calculatedData;
    }
    
	// --------------------------------------------------------------------------
	// Functions - "private"
	// --------------------------------------------------------------------------
	
    function callNext() {
        if (nextCalculator) {
            nextCalculator.calculate(rawPaintData, canvas);
        }
    }

    function calculateGridLines() {
        if (!rawPaintData.isGridVisible) {
            return {
                lines: [],
                color: null
            };
        }
    
        var lines = [];
        
        for (var i = 0; i < rawPaintData.totalDays - 1; i++) {
            var line = createDaySeparatorLine(i);
            lines.push(line);
        }

        var axis = createXAxis();
        lines.push(axis);

        return {
            lines: lines,
            color: rawPaintData.gridColor
        };
    }
    
    function createDaySeparatorLine(dayIndex) {
        var xStep = (canvas.width) / rawPaintData.totalDays;
        var index = dayIndex + 1;
        
        var startPoint = new lu.Point(xStep * index, 0);
        var endPoint = new lu.Point(xStep * index, canvas.height);

        return new lu.Line(startPoint, endPoint);
    }

    function createXAxis() {
        var startPoint = new lu.Point(0, canvas.height / 2);
        var endPoint = new lu.Point(canvas.width, canvas.height / 2);

        return new lu.Line(startPoint, endPoint);
    }
    
	// --------------------------------------------------------------------------
	// Initializer
	// --------------------------------------------------------------------------
	
    this.setNext = setNext;
    this.calculate = calculate;
};