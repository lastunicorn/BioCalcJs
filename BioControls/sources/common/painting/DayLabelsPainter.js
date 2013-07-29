var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.painting = lu.bioControls.common.painting || {};

lu.bioControls.common.painting.DayLabelsPainter = function() {

    var dataToPaint = null;
    var paintContext = null;
    var currentFont = null;

    this.paint = function(context, data) {
        paintContext = context;
        dataToPaint = data;

        paintLabels();
    };

    function paintLabels() {
        paintContext.textAlign = "center";
        paintContext.textBaseline = "middle";

        var labelCount = dataToPaint.labels.length;

        currentFont = null;
        for ( var i = 0; i < labelCount; i++) {
            paintLabel(dataToPaint.labels[i]);
        }
    }

    function paintLabel(label) {
        if (label.isEmphasized) {
            paintContext.fillStyle = dataToPaint.emphasizedColor;
            if (currentFont !== dataToPaint.emphasizedFont) {
                paintContext.font = dataToPaint.emphasizedFont;
            }
        } else {
            paintContext.fillStyle = dataToPaint.color;
            if (currentFont !== dataToPaint.font) {
                paintContext.font = dataToPaint.font;
            }
        }

        paintContext.fillText(label.text, label.location.getX(), label.location.getY());
    }
};