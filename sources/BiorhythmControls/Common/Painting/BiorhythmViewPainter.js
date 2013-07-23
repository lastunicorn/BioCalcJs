var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};
lu.biorhythmControls.common = lu.biorhythmControls.common || {};
lu.biorhythmControls.common.painting = lu.biorhythmControls.common.painting || {};

lu.biorhythmControls.common.painting.BiorhythmViewPainter = function() {
	
	var rawPaintData;
	var canvas;
	var paintCount = 0;
	
	this.getPaintCount = function () {
        return paintCount;
	}
	
	// --------------------------------------------------------------------------
	// Functions - "public"
	// --------------------------------------------------------------------------

	function paint(data, canvasElement) {
	    paintCount++;
		rawPaintData = data;
		canvas = canvasElement;
		
		var paintDataCalculator = new lu.biorhythmControls.common.paintDataCalculation.PaintDataCalculator();
		var dataToPaint = paintDataCalculator.calculate(rawPaintData, canvas);
		
		paintAll(dataToPaint);
	}

	// --------------------------------------------------------------------------
	// Functions - "private"
	// --------------------------------------------------------------------------
	
	function paintAll(dataToPaint) {
		if (canvas.getContext) {
			var context = canvas.getContext('2d');
	
            context.fillStyle = "#ffffff";
			context.fillRect(0, 0, canvas.width, canvas.height);
			
			paintGrid(context, dataToPaint.gridLines);
			paintBiorhythms(context, dataToPaint.biorhythms);
			paintDayLables(context, dataToPaint.dayLabels);
		}
	}

    function paintDayLables(context, data) {
        context.textAlign = "center";
        context.textBaseline = "middle";
        
        for (var i = 0; i < data.labels.length; i++) {
            if (data.labels[i].isEmphasized) {
                context.fillStyle = data.emphasizedColor;
                context.font = data.emphasizedFont;
            } else {
                context.fillStyle = data.color;
                context.font = data.font;
            }
       
            context.fillText(data.labels[i].text, data.labels[i].location.getX(), data.labels[i].location.getY());
        }
    }
	
	function paintBiorhythms(context, data) {
		for (var i = 0; i < data.length; i++) {
			paintBiorhythm(context, data[i]);
		}
	}

	function paintBiorhythm(context, data) {
		var linePattern = calculateLinePattern(data.lineStyle, data.lineWidth);
		setLinePattern(context, linePattern);
		
		context.strokeStyle = data.color;
		context.lineWidth = data.lineWidth;
		context.lineJoin = "round";
		
		context.beginPath();
		
		for (var i = 0; i < data.points.length; i++) {
			context.lineTo(data.points[i].getX(), data.points[i].getY());
		}
	
		context.stroke();
	}

	function calculateLinePattern(lineStyle, lineWidth) {
		switch(lineStyle) {
			case lu.LineStyle.solid:
				return null;
				
			case lu.LineStyle.dot:
				return [lineWidth * 1, lineWidth * 3];
				
			case lu.LineStyle.dash:
				return [lineWidth * 10, lineWidth * 5];
				
			case lu.LineStyle.dashDot:
				return [lineWidth * 10, lineWidth * 3, lineWidth * 1, lineWidth * 3];
				
			case lu.LineStyle.dashDotDot:
				return [lineWidth * 10, lineWidth * 3, lineWidth * 1, lineWidth * 3, lineWidth * 1, lineWidth * 3];
				
			default:
				return null;
		}
	}

	function setLinePattern(context, linePattern) {
		if (context.mozDash !== undefined) {
			context.mozDash = linePattern;
		}
	
		if (typeof(context.setLineDash) === "function") {
			context.setLineDash(linePattern);
		}		
	}

    function paintGrid(context, gridLines) {
        var isGridVisible = gridLines && gridLines.lines && gridLines.lines.length > 0;

        if (!isGridVisible) {
            return;
        }
   
        context.strokeStyle = gridLines.color;
		context.lineWidth = 1;
		context.lineJoin = "round";
		setLinePattern(context, null);

        for (var i = 0; i < gridLines.lines.length; i++) {
            var line = gridLines.lines[i];
            context.beginPath();
            context.moveTo(line.getStartPoint().getX(), line.getStartPoint().getY());
            context.lineTo(line.getEndPoint().getX(), line.getEndPoint().getY());
            context.stroke();
        }
    }
	
	// --------------------------------------------------------------------------
	// Initializer
	// --------------------------------------------------------------------------
	
	(function initialize() {
	}());
	
	this.paint = paint;
};