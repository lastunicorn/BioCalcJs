var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};
lu.biorhythmControls.common = lu.biorhythmControls.common || {};
lu.biorhythmControls.common.painting = lu.biorhythmControls.common.painting || {};

lu.biorhythmControls.common.painting.BiorhythmCurvesPainter = function() {

    var dataToPaint = null;
    var paintContext = null;

    this.paint = function(context, data) {
        paintContext = context;
        dataToPaint = data;

        paintBiorhythms();
    };

    function paintBiorhythms() {
        for ( var i = 0; i < dataToPaint.length; i++) {
            paintBiorhythm(dataToPaint[i]);
        }
    }

    function paintBiorhythm(biorhythmData) {
        var linePattern = calculateLinePattern(biorhythmData.lineStyle, biorhythmData.lineWidth);
        setLinePattern(linePattern);

        paintContext.strokeStyle = biorhythmData.color;
        paintContext.lineWidth = biorhythmData.lineWidth;
        paintContext.lineJoin = "round";

        paintContext.beginPath();

        for ( var i = 0; i < biorhythmData.points.length; i++) {
            paintContext.lineTo(biorhythmData.points[i].getX(), biorhythmData.points[i].getY());
        }

        paintContext.stroke();
    }

    function calculateLinePattern(lineStyle, lineWidth) {
        switch (lineStyle) {
            case lu.LineStyle.solid:
                return null;

            case lu.LineStyle.dot:
                return [ lineWidth * 1, lineWidth * 3 ];

            case lu.LineStyle.dash:
                return [ lineWidth * 10, lineWidth * 5 ];

            case lu.LineStyle.dashDot:
                return [ lineWidth * 10, lineWidth * 3, lineWidth * 1, lineWidth * 3 ];

            case lu.LineStyle.dashDotDot:
                return [ lineWidth * 10, lineWidth * 3, lineWidth * 1, lineWidth * 3, lineWidth * 1, lineWidth * 3 ];

            default:
                return null;
        }
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