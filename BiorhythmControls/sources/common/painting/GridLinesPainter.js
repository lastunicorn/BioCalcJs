var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};
lu.biorhythmControls.common = lu.biorhythmControls.common || {};
lu.biorhythmControls.common.painting = lu.biorhythmControls.common.painting || {};

lu.biorhythmControls.common.painting.GridLinesPainter = function() {

    var paintContext = null;
    var dataToPaint = null;

    this.paint = function(context, data) {
        paintContext = context;
        dataToPaint = data;

        var isGridVisible = dataToPaint && dataToPaint.lines && dataToPaint.lines.length > 0;

        if (!isGridVisible) {
            return;
        }

        paintGrid();
    };

    function paintGrid() {
        paintContext.strokeStyle = dataToPaint.color;
        paintContext.lineWidth = 1;
        paintContext.lineJoin = "round";
        setLinePattern(null);

        for ( var i = 0; i < dataToPaint.lines.length; i++) {
            paintLine(dataToPaint.lines[i]);
        }
    }

    function paintLine(line) {
        paintContext.beginPath();
        paintContext.moveTo(line.getStartPoint().getX(), line.getStartPoint().getY());
        paintContext.lineTo(line.getEndPoint().getX(), line.getEndPoint().getY());
        paintContext.stroke();
    }

    function setLinePattern(linePattern) {
        if (paintContext.mozDash !== undefined) {
            paintContext.mozDash = linePattern;
        }

        if (typeof (paintContext.setLineDash) === "function") {
            paintContext.setLineDash(linePattern);
        }
    }
};