var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};
lu.biorhythmControls.common = lu.biorhythmControls.common || {};
lu.biorhythmControls.common.paintDataCalculation = lu.biorhythmControls.common.paintDataCalculation || {};

lu.biorhythmControls.common.paintDataCalculation.DayLablesCalculator = function() {
    
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
        
        var calculatedData = calculateDayLabels();
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

    function calculateDayLabels() {
        var areDayNumbersVisible = rawPaintData.areDayNumbersVisible;
        var areWeekDaysVisible = rawPaintData.areWeekDaysVisible &&
                !(rawPaintData.areDayNumbersVisible &&
                rawPaintData.weekDaysPosition === rawPaintData.dayNumbersPosition);

        if (!areDayNumbersVisible && !areWeekDaysVisible) {
            return null;
        }

        var dayLabelsPaintData = [];

        var day = new Date(rawPaintData.firstDay.getTime());
        var xStep = (canvas.width) / rawPaintData.totalDays;

        for (var i = 0; i < rawPaintData.totalDays; i++) {
            if (areDayNumbersVisible) {
                dayLabelsPaintData.push(calculateDayNumberPaintInfo(i, day));
            }

            //if (areWeekDaysVisible) {
            //    dayLabelsPaintData.push(calculateWeekDayPaintInfo(day, size, i));
            //}

            day.setDate(day.getDate() + 1);
        }

        return {
            labels: dayLabelsPaintData,
            color: rawPaintData.foreColor,
            emphasizedColor: rawPaintData.sundaysColor,
            font: rawPaintData.font,
            emphasizedFont: rawPaintData.sundaysFont
        };
    }

    function calculateDayNumberPaintInfo(i, day) {
        var location = calculateDayNumberLocation(i, rawPaintData.dayNumbersPosition);

        var isEmphasized = rawPaintData.areSundaysEmphasized && day.getDay() === 6;
        
        return {
            text: day.getDate().toString(),
            location: location,
            isEmphasized: isEmphasized
        };
    }

        /*private DayLabelPaintData CalculateWeekDayPaintInfo(DateTime day, SizeF size, int i)
        {
            PointF location = CalculateDayNumberLocation(i, rawPaintData.WeekDaysPosition);

            bool isEmphasized = rawPaintData.AreSundaysEmphasized && day.DayOfWeek == DayOfWeek.Sunday;
            return new DayLabelPaintData
                {
                    Text = weekDaysNamesProvider.GetWeekDayName(day.DayOfWeek),
                    Rectangle = new RectangleF(location, size),
                    IsEmphasized = isEmphasized
                };
        }*/

    function calculateDayNumberLocation(index, position) {
        var xStep = (canvas.width) / rawPaintData.totalDays;
        var daysFontHeight = 8;
        
        switch (position) {
            case lu.DayLabelPosition.top:
                return new lu.Point(xStep * index + xStep / 2, daysFontHeight);

            default:
            case lu.DayLabelPosition.aboveMiddle:
                return new lu.Point(xStep * index + xStep / 2, canvas.height / 2 - daysFontHeight);

            case lu.DayLabelPosition.belowMiddle:
                return new lu.Point(xStep * index + xStep / 2, canvas.height / 2 + daysFontHeight);

            case lu.DayLabelPosition.bottom:
                return new lu.Point(xStep * index + xStep / 2, canvas.height - daysFontHeight);
        }
    }
    
	// --------------------------------------------------------------------------
	// Initializer
	// --------------------------------------------------------------------------
	
    this.setNext = setNext;
    this.calculate = calculate;
};