var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.BiorhythmView = function(id) {
  var canvas = null;
  var obj = this;
  var scroller = null;
  var biorhythms = [];
  var biorhythmAddedEvent = new lu.Event;
  this.subscribeToBiorhythmAdded = biorhythmAddedEvent.subscribe;
  var biorhythmRemovedEvent = new lu.Event;
  this.subscribeToBiorhythmRemoved = biorhythmRemovedEvent.subscribe;
  this.addBiorhythm = function(biorhythmShape) {
    addBiorhythm(biorhythmShape)
  };
  this.setBiorhythms = function(value) {
    removeAllBiorhythms();
    for(var i = 0;i < value.length;i++) {
      if($.type(value[i]) === "object") {
        addBiorhythm(value[i])
      }
    }
    paint()
  };
  this.getBiorhythms = function() {
    var list = [];
    for(var i = 0;i < biorhythms.length;i++) {
      list.push(biorhythms[i])
    }
    return list
  };
  function addBiorhythm(biorhythmShape) {
    biorhythms.push(biorhythmShape);
    biorhythmShape.subscribeToNameChanged(onBiorhithmShapeChanged);
    biorhythmShape.subscribeToBirthdayChanged(onBiorhithmShapeChanged);
    biorhythmShape.subscribeToBiorhythmChanged(onBiorhithmShapeChanged);
    biorhythmShape.subscribeToColorChanged(onBiorhithmShapeChanged);
    biorhythmShape.subscribeToIsVisibleChanged(onBiorhithmShapeChanged);
    biorhythmShape.subscribeToLineWidthChanged(onBiorhithmShapeChanged);
    biorhythmShape.subscribeToLineStyleChanged(onBiorhithmShapeChanged);
    biorhythmAddedEvent.raise(obj, biorhythmShape)
  }
  function onBiorhithmShapeChanged() {
    paint()
  }
  function removeAllBiorhythms() {
    for(var i = 0;i < biorhythms.length;i++) {
      removeBiorhythmAt(i)
    }
  }
  this.removeBiorhythm = function(biorhythmShape) {
    var index = biorhythms.indexOf(biorhythmShape);
    if(index !== -1) {
      removeBiorhythmAt(index)
    }
  };
  function removeBiorhythmAt(index) {
    var biorhythmShape = biorhythms[index];
    biorhythmShape.unsubscribeFromNameChanged(onBiorhithmShapeChanged);
    biorhythmShape.unsubscribeFromBirthdayChanged(onBiorhithmShapeChanged);
    biorhythmShape.unsubscribeFromBiorhythmChanged(onBiorhithmShapeChanged);
    biorhythmShape.unsubscribeFromColorChanged(onBiorhithmShapeChanged);
    biorhythmShape.unsubscribeFromIsVisibleChanged(onBiorhithmShapeChanged);
    biorhythmShape.unsubscribeFromLineWidthChanged(onBiorhithmShapeChanged);
    biorhythmShape.unsubscribeFromLineStyleChanged(onBiorhithmShapeChanged);
    biorhythms.splice(index, 1);
    biorhythmRemovedEvent.raise(obj, biorhythmShape)
  }
  var firstDay = new Date(Date.now() - 7 * 24 * 60 * 60 * 1E3);
  var firstDayChangedEvent = new lu.Event;
  this.setFirstDay = setFirstDay;
  function setFirstDay(value) {
    firstDay = value;
    firstDayChangedEvent.raise(obj, value);
    paint()
  }
  function incrementFirstDay(value) {
    var date = new Date(firstDay.getTime());
    date.setDate(date.getDate() + value);
    setFirstDay(date)
  }
  this.getFirstDay = getFirstDay;
  function getFirstDay() {
    return firstDay
  }
  Object.defineProperty(this, "firstDay", {enumerable:true, configurable:false, get:getFirstDay, set:setFirstDay});
  this.subscribeToFirstDayChanged = firstDayChangedEvent.subscribe;
  this.getLastDay = function() {
    return new Date(firstDay.getTime() + (totalDays - 1) * 24 * 60 * 60 * 1E3)
  };
  var isGridVisible = true;
  var isGridVisibleChangedEvent = new lu.Event;
  this.setGridVisibility = function(value) {
    isGridVisible = Boolean(value);
    isGridVisibleChangedEvent.raise(obj, value);
    paint()
  };
  this.getGridVisibility = function() {
    return isGridVisible
  };
  this.subscribeToGridVisibilityChanged = isGridVisibleChangedEvent.subscribe;
  var totalDays = 30;
  var totalDaysChangedEvent = new lu.Event;
  this.setTotalDays = function(value) {
    totalDays = value;
    totalDaysChangedEvent.raise(obj, value);
    paint()
  };
  this.getTotalDays = function() {
    return totalDays
  };
  this.subscribeToTotalDaysChanged = totalDaysChangedEvent.subscribe;
  var xDayIndex = 7;
  var xDayIndexChangedEvent = new lu.Event;
  this.setXDayIndex = setXDayIndex;
  function setXDayIndex(value) {
    if(xDayIndex === value || value < 0 || value >= totalDays) {
      return
    }
    xDayIndex = value;
    xDayIndexChangedEvent.raise(obj, value);
    paint()
  }
  this.getXDayIndex = getXDayIndex;
  function getXDayIndex() {
    return xDayIndex
  }
  this.subscribeToXDayIndexChanged = xDayIndexChangedEvent.subscribe;
  var gridColor = "#d3d3d3";
  var gridColorChangedEvent = new lu.Event;
  this.setGridColor = function(value) {
    gridColor = value;
    gridColorChangedEvent.raise(obj, value);
    paint()
  };
  this.getGridColor = function() {
    return xDayIndex
  };
  this.subscribeToGridColorChanged = gridColorChangedEvent.subscribe;
  var areDayNumbersVisible = true;
  var areDayNumbersVisibleChangedEvent = new lu.Event;
  this.setDayNumbersVisibility = function(value) {
    areDayNumbersVisible = value;
    areDayNumbersVisibleChangedEvent.raise(obj, value);
    paint()
  };
  this.getDayNumbersVisibility = function() {
    return areDayNumbersVisible
  };
  this.subscribeToDayNumbersVisibilityChanged = areDayNumbersVisibleChangedEvent.subscribe;
  var areWeekDaysVisible = true;
  var areWeekDaysVisibleChangedEvent = new lu.Event;
  this.setWeekDaysVisibility = function(value) {
    areWeekDaysVisible = value;
    areWeekDaysVisibleChangedEvent.raise(obj, value);
    paint()
  };
  this.getWeekDaysVisibility = function() {
    return areWeekDaysVisible
  };
  this.subscribeToWeekDaysVisibilityChanged = areWeekDaysVisibleChangedEvent.subscribe;
  var dayNumbersPosition = lu.DayLabelPosition.top;
  var dayNumbersPositionChangedEvent = new lu.Event;
  this.setDayNumbersPosition = function(value) {
    dayNumbersPosition = value;
    dayNumbersPositionChangedEvent.raise(obj, value);
    paint()
  };
  this.getDayNumbersPosition = function() {
    return dayNumbersPosition
  };
  this.subscribeToTodayNumbersPositionChanged = dayNumbersPositionChangedEvent.subscribe;
  var weekDaysPosition = lu.DayLabelPosition.bottom;
  var weekDaysPositionChangedEvent = new lu.Event;
  this.setWeekDaysPosition = function(value) {
    weekDaysPosition = value;
    weekDaysPositionChangedEvent.raise(obj, value);
    paint()
  };
  this.getWeekDaysPosition = function() {
    return weekDaysPosition
  };
  this.subscribeToWeekDaysPositionChanged = weekDaysPositionChangedEvent.subscribe;
  var areSundaysEmphasized = true;
  var areSundaysEmphasizedChangedEvent = new lu.Event;
  this.setAreSundaysEmphasized = function(value) {
    areSundaysEmphasized = value;
    areSundaysEmphasizedChangedEvent.raise(obj, value);
    paint()
  };
  this.getAreSundaysEmphasized = function() {
    return areSundaysEmphasized
  };
  this.subscribeToAreSundaysEmphasizedChanged = areSundaysEmphasizedChangedEvent.subscribe;
  var foreColor = "#b0b0b0";
  var foreColorChangedEvent = new lu.Event;
  this.setForeColor = function(value) {
    foreColor = value;
    foreColorChangedEvent.raise(obj, value);
    paint()
  };
  this.getForeColor = function() {
    return foreColor
  };
  this.subscribeToForeColorChanged = foreColorChangedEvent.subscribe;
  var sundaysColor = "#ff0000";
  var sundaysColorChangedEvent = new lu.Event;
  this.setSundaysColor = function(value) {
    sundaysColor = value;
    sundaysColorChangedEvent.raise(obj, value);
    paint()
  };
  this.getSundaysColor = function() {
    return sundaysColor
  };
  this.subscribeToSundaysColorChanged = sundaysColorChangedEvent.subscribe;
  var font = "12px Arial";
  var fontChangedEvent = new lu.Event;
  this.setFont = function(value) {
    font = value;
    fontChangedEvent.raise(obj, value);
    paint()
  };
  this.getFont = function() {
    return font
  };
  this.subscribeToFontChanged = fontChangedEvent.subscribe;
  var sundaysFont = "italic 12px Arial";
  var sundaysFontChangedEvent = new lu.Event;
  this.setSundaysFont = function(value) {
    sundaysFont = value;
    sundaysFontChangedEvent.raise(obj, value);
    paint()
  };
  this.getSundaysFont = function() {
    return sundaysFont
  };
  this.subscribeToSundaysFontChanged = sundaysFontChangedEvent.subscribe;
  var todayBackColor = "#ffe4b5";
  var todayBackColorChangedEvent = new lu.Event;
  this.setTodayBackColor = function(value) {
    todayBackColor = value;
    todayBackColorChangedEvent.raise(obj, value);
    paint()
  };
  this.getTodayBackColor = function() {
    return todayBackColor
  };
  this.subscribeToTodayBackColorChanged = todayBackColorChangedEvent.subscribe;
  var isXDayVisible = true;
  var isXDayVisibleChangedEvent = new lu.Event;
  this.setXDayVisibility = function(value) {
    isXDayVisible = value;
    isXDayVisibleChangedEvent.raise(obj, value);
    paint()
  };
  this.getXDayVisibility = function() {
    return isXDayVisible
  };
  this.subscribeToXDayVisibilityChanged = isXDayVisibleChangedEvent.subscribe;
  var xDayBorderColor = "#000000";
  var xDayBorderColorChangedEvent = new lu.Event;
  this.setXDayBorderColor = function(value) {
    xDayBorderColor = value;
    xDayBorderColorChangedEvent.raise(obj, value);
    paint()
  };
  this.getXDayBorderColor = function() {
    return xDayBorderColor
  };
  this.subscribeToXDayBorderColorChanged = xDayBorderColorChangedEvent.subscribe;
  var xDayBorderWidth = 2;
  var xDayBorderWidthChangedEvent = new lu.Event;
  this.setXDayBorderWidth = function(value) {
    xDayBorderWidth = value;
    xDayBorderWidthChangedEvent.raise(obj, value);
    paint()
  };
  this.getXDayBorderWidth = function() {
    return xDayBorderWidth
  };
  this.subscribeToXDayBorderWidthChanged = xDayBorderWidthChangedEvent.subscribe;
  this.setBirthdayOnAllBiorhythms = function(birthday) {
    suspendPaint();
    for(var i = 0;i < biorhythms.length;i++) {
      biorhythms[i].setBirthday(birthday)
    }
    resumePaint()
  };
  var painter = null;
  var allowRepaint = true;
  this.suspendPaint = suspendPaint;
  function suspendPaint() {
    allowRepaint = false
  }
  this.resumePaint = resumePaint;
  function resumePaint() {
    allowRepaint = true;
    paint()
  }
  function paint() {
    if(!allowRepaint) {
      return
    }
    var rawPaintData = {biorhythmShapes:biorhythms, firstDay:firstDay, totalDays:totalDays, xDayIndex:xDayIndex, isXDayVisible:isXDayVisible, xDayBorderColor:xDayBorderColor, xDayBorderWidth:xDayBorderWidth, gridColor:gridColor, isGridVisible:isGridVisible, todayBackColor:todayBackColor, areDayNumbersVisible:areDayNumbersVisible, areWeekDaysVisible:areWeekDaysVisible, dayNumbersPosition:dayNumbersPosition, weekDaysPosition:weekDaysPosition, areSundaysEmphasized:areSundaysEmphasized, foreColor:foreColor, 
    sundaysColor:sundaysColor, font:font, sundaysFont:sundaysFont};
    painter.paint(rawPaintData, canvas)
  }
  this.getPaintCount = function() {
    return painter.getPaintCount()
  };
  function onDrag(evt) {
    if(evt.isAlternative) {
      setXDayIndex(getXDayIndex() + evt.steps)
    }else {
      incrementFirstDay(-evt.steps)
    }
  }
  function onDragStart(evt) {
    evt.stepLength = canvas.width / totalDays
  }
  (function initialize() {
    canvas = document.getElementById(id);
    scroller = new lu.bioControls.Scroller({element:canvas, onDragStart:onDragStart, onDrag:onDrag});
    painter = new lu.bioControls.common.painting.BiorhythmViewPainter
  })()
};
var lu = lu || {};
lu.DayLabelPosition = {top:0, aboveMiddle:1, belowMiddle:2, bottom:3};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.biorhythmModel = lu.bioControls.common.biorhythmModel || {};
lu.bioControls.common.biorhythmModel.BiorhythmShape = function() {
  var obj = this;
  var name = "New Biorhythm Shape";
  var nameChangedEvent = new lu.Event;
  this.subscribeToNameChanged = nameChangedEvent.subscribe;
  this.unsubscribeFromNameChanged = nameChangedEvent.unsubscribe;
  this.getName = function() {
    return name
  };
  this.setName = function(value) {
    if(value === name) {
      return
    }
    name = value;
    nameChangedEvent.raise(obj, value)
  };
  var birthday = Date(80, 5, 13);
  var birthdayChangedEvent = new lu.Event;
  this.subscribeToBirthdayChanged = birthdayChangedEvent.subscribe;
  this.unsubscribeFromBirthdayChanged = birthdayChangedEvent.unsubscribe;
  this.getBirthday = function() {
    return birthday
  };
  this.setBirthday = function(value) {
    if(value === birthday) {
      return
    }
    birthday = value;
    birthdayChangedEvent.raise(obj, value)
  };
  var biorhythm = null;
  var biorhythmChangedEvent = new lu.Event;
  this.subscribeToBiorhythmChanged = biorhythmChangedEvent.subscribe;
  this.unsubscribeFromBiorhythmChanged = biorhythmChangedEvent.unsubscribe;
  this.getBiorhythm = function() {
    return biorhythm
  };
  this.setBiorhythm = function(value) {
    if(value === biorhythm) {
      return
    }
    biorhythm = value;
    biorhythmChangedEvent.raise(obj, value)
  };
  var color = null;
  var colorChangedEvent = new lu.Event;
  this.subscribeToColorChanged = colorChangedEvent.subscribe;
  this.unsubscribeFromColorChanged = colorChangedEvent.unsubscribe;
  this.getColor = function() {
    return color
  };
  this.setColor = function(value) {
    if(value === color) {
      return
    }
    color = value;
    colorChangedEvent.raise(obj, value)
  };
  var isVisible = true;
  var isVisibleChangedEvent = new lu.Event;
  this.subscribeToIsVisibleChanged = isVisibleChangedEvent.subscribe;
  this.unsubscribeFromIsVisibleChanged = isVisibleChangedEvent.unsubscribe;
  this.getIsVisible = function() {
    return isVisible
  };
  this.setIsVisible = function(value) {
    if(value === isVisible) {
      return
    }
    isVisible = value;
    isVisibleChangedEvent.raise(obj, value)
  };
  var lineWidth = 1;
  var lineWidthChangedEvent = new lu.Event;
  this.subscribeToLineWidthChanged = lineWidthChangedEvent.subscribe;
  this.unsubscribeFromLineWidthChanged = lineWidthChangedEvent.unsubscribe;
  this.getLineWidth = function() {
    return lineWidth
  };
  this.setLineWidth = function(value) {
    if(value === lineWidth) {
      return
    }
    lineWidth = value;
    lineWidthChangedEvent.raise(obj, value)
  };
  var lineStyle = lu.LineStyle.solid;
  var lineStyleChangedEvent = new lu.Event;
  this.subscribeToLineStyleChanged = lineStyleChangedEvent.subscribe;
  this.unsubscribeFromLineStyleChanged = lineStyleChangedEvent.unsubscribe;
  this.getLineStyle = function() {
    return lineStyle
  };
  this.setLineStyle = function(value) {
    if(value === lineStyle) {
      return
    }
    lineStyle = value;
    lineStyleChangedEvent.raise(obj, value)
  }
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.paintDataCalculation = lu.bioControls.common.paintDataCalculation || {};
lu.bioControls.common.paintDataCalculation.BiorhythmCurvesCalculator = function() {
  var rawPaintData = null;
  var canvas = null;
  var margin = 10;
  this.calculate = function(data, canvasElement) {
    rawPaintData = data;
    canvas = canvasElement;
    return calculateBiorhythms()
  };
  function calculateBiorhythms() {
    var values = [];
    var points;
    for(var i = 0;i < rawPaintData.biorhythmShapes.length;i++) {
      var biorhythmShape = rawPaintData.biorhythmShapes[i];
      if(!biorhythmShape.getIsVisible()) {
        continue
      }
      var biorhythm = biorhythmShape.getBiorhythm();
      var birthday = biorhythmShape.getBirthday();
      points = calculateBiorhythmPoints(biorhythm, birthday);
      values.push({points:points, color:biorhythmShape.getColor(), lineWidth:biorhythmShape.getLineWidth(), lineStyle:biorhythmShape.getLineStyle()})
    }
    return values
  }
  function calculateBiorhythmPoints(biorhythm, birthday) {
    var xStep = canvas.width / rawPaintData.totalDays;
    var xOffset = xStep / 2;
    var yOffset = margin + (canvas.height - 2 * margin) / 2;
    var amplitude = canvas.height / 2 - 2 * margin;
    var milisecondsLived = rawPaintData.firstDay - birthday;
    var daysLived = Math.floor(milisecondsLived / 1E3 / 60 / 60 / 24);
    var points = [];
    for(var index = 0;index < rawPaintData.totalDays;index++) {
      var x = xOffset + index * xStep;
      var y = yOffset - biorhythm.getValue(daysLived + index) * amplitude;
      points[index] = new lu.Point(x, y)
    }
    return points
  }
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.painting = lu.bioControls.common.painting || {};
lu.bioControls.common.painting.BiorhythmCurvesPainter = function() {
  var dataToPaint = null;
  var paintContext = null;
  this.paint = function(context, data) {
    paintContext = context;
    dataToPaint = data;
    paintBiorhythms()
  };
  function paintBiorhythms() {
    for(var i = 0;i < dataToPaint.length;i++) {
      paintBiorhythm(dataToPaint[i])
    }
  }
  function paintBiorhythm(biorhythmData) {
    var linePattern = calculateLinePattern(biorhythmData.lineStyle, biorhythmData.lineWidth);
    setLinePattern(linePattern);
    paintContext.strokeStyle = biorhythmData.color;
    paintContext.lineWidth = biorhythmData.lineWidth;
    paintContext.lineJoin = "round";
    paintContext.beginPath();
    for(var i = 0;i < biorhythmData.points.length;i++) {
      paintContext.lineTo(biorhythmData.points[i].getX(), biorhythmData.points[i].getY())
    }
    paintContext.stroke()
  }
  function calculateLinePattern(lineStyle, lineWidth) {
    switch(lineStyle) {
      case lu.LineStyle.solid:
        return null;
      case lu.LineStyle.dot:
        return[lineWidth * 1, lineWidth * 3];
      case lu.LineStyle.dash:
        return[lineWidth * 10, lineWidth * 5];
      case lu.LineStyle.dashDot:
        return[lineWidth * 10, lineWidth * 3, lineWidth * 1, lineWidth * 3];
      case lu.LineStyle.dashDotDot:
        return[lineWidth * 10, lineWidth * 3, lineWidth * 1, lineWidth * 3, lineWidth * 1, lineWidth * 3];
      default:
        return null
    }
  }
  function setLinePattern(linePattern) {
    if(paintContext.mozDash !== undefined) {
      paintContext.mozDash = linePattern
    }
    if(typeof paintContext.setLineDash === "function") {
      paintContext.setLineDash(linePattern)
    }
  }
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};
lu.bioControls.core.biorhythms.AverageBiorhythm = function(biorhythmA, biorhythmB) {
  this.getValue = function(dayIndex) {
    return(biorhythmA.getValue(dayIndex) + biorhythmB.getValue(dayIndex)) / 2
  }
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.Scroller = function(configuration) {
  var defaultStepLength = 1;
  var stepLength = 1;
  var isCtrlPressed = false;
  var buttonPressed = lu.MouseButton.none;
  var currentDayIndex = 0;
  var isDragging = false;
  function raiseOnDragStart(arg) {
    if(typeof configuration.onDragStart === "function") {
      configuration.onDragStart(arg)
    }
  }
  function raiseOnDrag(arg) {
    if(typeof configuration.onDrag === "function") {
      configuration.onDrag(arg)
    }
  }
  function calculateStepLength() {
    var arg = {};
    raiseOnDragStart(arg);
    if(typeof arg.stepLength === "number") {
      return arg.stepLength
    }else {
      return defaultStepLength
    }
  }
  function onMouseDown(evt) {
    var isLeftOrRightButton = evt.which === lu.MouseButton.left || evt.which === lu.MouseButton.right;
    if(!isLeftOrRightButton) {
      return
    }
    var rect = configuration.element.getBoundingClientRect();
    var clickX = evt.clientX - rect.left;
    stepLength = calculateStepLength();
    currentDayIndex = Math.floor(clickX / stepLength);
    buttonPressed = evt.which;
    isDragging = true
  }
  function onMouseMove(evt) {
    if(!isDragging) {
      return
    }
    evt.preventDefault();
    evt.stopPropagation();
    var rect = configuration.element.getBoundingClientRect();
    var clickX = evt.clientX - rect.left;
    var index = Math.floor(clickX / stepLength);
    var steps = index - currentDayIndex;
    if(steps == 0) {
      return
    }
    currentDayIndex = index;
    var isAlternative = isCtrlPressed || buttonPressed === lu.MouseButton.right;
    raiseOnDrag({steps:steps, isAlternative:isAlternative})
  }
  function onMouseUp(evt) {
    if(isDragging) {
      isDragging = false;
      buttonPressed = lu.MouseButton.none
    }else {
      evt.preventDefault();
      evt.stopPropagation()
    }
  }
  function onWheel(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    var delta = evt.detail ? evt.detail : evt.wheelDelta / -120;
    raiseOnDrag({steps:delta, isAlternative:false})
  }
  function onKeyDown(evt) {
    if(evt.keyCode === 17) {
      isCtrlPressed = true
    }
  }
  function onKeyUp(evt) {
    if(evt.keyCode === 17) {
      isCtrlPressed = false
    }
  }
  function onContextMenu(evt) {
    evt.preventDefault();
    evt.stopPropagation()
  }
  function onSelectStart(evt) {
    evt.preventDefault();
    evt.stopPropagation()
  }
  (function initialize() {
    var mouseWheelEventName = /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel";
    configuration.element.addEventListener("mousedown", onMouseDown, false);
    document.addEventListener("mousemove", onMouseMove, false);
    document.addEventListener("mouseup", onMouseUp, false);
    configuration.element.addEventListener(mouseWheelEventName, onWheel, false);
    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keyup", onKeyUp, false);
    configuration.element.addEventListener("contextmenu", onContextMenu, false);
    configuration.element.addEventListener("selectstart", onSelectStart, false)
  })()
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
Object.defineProperty(lu.bioControls, "version", {value:"1.3.0", writable:false, enumerable:true, configurable:false});
lu.bioControls.getVersion = function() {
  return lu.bioControls.version
};
var lu = lu || {};
lu.Event = function() {
  var eventHandlers = [];
  this.subscribe = function(eventHandler) {
    if(typeof eventHandler !== "function") {
      throw"eventHandler is not a function.";
    }
    eventHandlers.push(eventHandler)
  };
  this.unsubscribe = function(eventHandler) {
    if(typeof eventHandler !== "function") {
      throw"eventHandler is not a function.";
    }
    for(var i = 0;i < eventHandlers.length;i++) {
      if(eventHandlers[i] === eventHandler) {
        eventHandlers.splice(i, 1)
      }
    }
  };
  this.raise = function(sender, arg) {
    for(var i = 0;i < eventHandlers.length;i++) {
      eventHandlers[i].call(sender, arg)
    }
  }
};
var lu = lu || {};
lu.Line = function(startPoint, endPoint) {
  function getStartPoint() {
    return startPoint
  }
  this.getStartPoint = getStartPoint;
  function getEndPoint() {
    return endPoint
  }
  this.getEndPoint = getEndPoint;
  Object.defineProperty(this, "startPoint", {enumerable:true, get:getStartPoint});
  Object.defineProperty(this, "endPoint", {enumerable:true, get:getEndPoint});
  this.toString = function() {
    return startPoint.toString() + " - " + endPoint.toString()
  };
  (function initialize() {
    if(!(startPoint instanceof lu.Point)) {
      throw"startPoint is undefined.";
    }
    if(!(endPoint instanceof lu.Point)) {
      throw"endPoint is undefined.";
    }
  }).call(this)
};
var lu = lu || {};
lu.LineStyle = {solid:0, dash:1, dot:2, dashDot:3, dashDotDot:4};
var lu = lu || {};
lu.MouseButton = {none:0, left:1, middle:2, right:3};
var lu = lu || {};
lu.Point = function(x, y) {
  this.getX = function getX() {
    return x
  };
  this.getY = function getY() {
    return y
  };
  this.toString = function() {
    return"[" + x + "; " + y + "]"
  }
};
var lu = lu || {};
lu.Rectangle = function(left, top, width, height) {
  this.getLeft = function() {
    return left
  };
  this.getTop = function() {
    return top
  };
  this.getWidth = function() {
    return width
  };
  this.getHeight = function() {
    return height
  };
  this.toString = function() {
    return"[" + left.toString() + ", " + top.toString() + "] w=" + width.toString() + "; h=" + height.toString()
  }
};
var lu = lu || {};
lu.TextUtil = function() {
  function measureText(obj) {
    if(!obj) {
      return[0, 0]
    }
    var div = document.createElement("div");
    div.innerHTML = obj.text;
    div.style.position = "absolute";
    div.style.top = "-100px";
    div.style.left = "-100px";
    div.style.font = obj.font;
    div.style.fontWeight = obj.isBold ? "bold" : "normal";
    div.style.fontStyle = obj.isItalic ? "italic" : "normal";
    div.style.visibility = "hidden";
    document.body.appendChild(div);
    var size = [div.offsetWidth, div.offsetHeight];
    document.body.removeChild(div);
    return size
  }
  return{measureText:measureText}
}();
var lu = lu || {};
lu.WeekDayNamesProvider = function() {
  var weekDayShortNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  function getWeekDayName(weekDay) {
    if(typeof weekDay !== "number") {
      return""
    }
    return weekDayShortNames[weekDay]
  }
  return{getWeekDayName:getWeekDayName}
}();
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.biorhythmModel = lu.bioControls.common.biorhythmModel || {};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes = function() {
  var physicalShape = null;
  var emotionalShape = null;
  var intellectualShape = null;
  var intuitiveShape = null;
  var passionShape = null;
  var masteryShape = null;
  var wisdomShape = null;
  var perceptionShape = null;
  var psychicShape = null;
  var successShape = null;
  var estheticShape = null;
  var selfAwarenessShape = null;
  var spiritualShape = null;
  function createBiorhythmShapes() {
    physicalShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPhysicalBiorhythmShape();
    emotionalShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createEmotionalBiorhythmShape();
    intellectualShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createIntellectualBiorhythmShape();
    intuitiveShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createIntuitiveBiorhythmShape();
    passionShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPassionBiorhythmShape();
    passionShape.setIsVisible(false);
    masteryShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createMasteryBiorhythmShape();
    masteryShape.setIsVisible(false);
    wisdomShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createWisdomBiorhythmShape();
    wisdomShape.setIsVisible(false);
    perceptionShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPerceptionBiorhythmShape();
    perceptionShape.setIsVisible(false);
    psychicShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPsychicBiorhythmShape();
    psychicShape.setIsVisible(false);
    successShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSuccessBiorhythmShape();
    successShape.setIsVisible(false);
    estheticShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createEstheticBiorhythmShape();
    estheticShape.setIsVisible(false);
    selfAwarenessShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSelfAwarenessBiorhythmShape();
    selfAwarenessShape.setIsVisible(false);
    spiritualShape = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSpiritualBiorhythmShape();
    spiritualShape.setIsVisible(false)
  }
  this.getPhysicalShape = function getPhysicalShape() {
    return physicalShape
  };
  this.getEmotionalShape = function() {
    return emotionalShape
  };
  this.getIntellectualShape = function() {
    return intellectualShape
  };
  this.getIntuitiveShape = function() {
    return intuitiveShape
  };
  this.getPrimaryBiorhythmShapes = function() {
    return[physicalShape, emotionalShape, intellectualShape, intuitiveShape]
  };
  this.getPassionShape = function() {
    return passionShape
  };
  this.getMasteryShape = function() {
    return masteryShape
  };
  this.getWisdomShape = function() {
    return wisdomShape
  };
  this.getSecondaryBiorhythmShapes = function() {
    return[passionShape, masteryShape, wisdomShape]
  };
  this.getPerceptionShape = function() {
    return perceptionShape
  };
  this.getPsychicShape = function() {
    return psychicShape
  };
  this.getSuccessShape = function() {
    return successShape
  };
  this.getExtraBiorhythmShapes = function() {
    return[perceptionShape, psychicShape, successShape]
  };
  this.getEstheticShape = function() {
    return estheticShape
  };
  this.getSelfAwarenessShape = function() {
    return selfAwarenessShape
  };
  this.getSpiritualShape = function() {
    return spiritualShape
  };
  this.getIChingBiorhythmShapes = function() {
    return[estheticShape, selfAwarenessShape, spiritualShape]
  };
  this.getAll = getAll;
  function getAll() {
    return[physicalShape, emotionalShape, intellectualShape, intuitiveShape, passionShape, masteryShape, wisdomShape, perceptionShape, psychicShape, successShape, estheticShape, selfAwarenessShape, spiritualShape]
  }
  this.setBirthdayOnAll = function(birthday) {
    var biorhythms = getAll();
    for(var i = 0;i < biorhythms.length;i++) {
      biorhythms[i].setBirthday(birthday)
    }
  };
  (function initialize() {
    createBiorhythmShapes()
  })()
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday = new Date(1980, 5, 13);
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPhysicalBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.PhysicalBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.setName(biorhythm.getName() + " Shape");
  shape.setBiorhythm(biorhythm);
  shape.setColor("#ff0000");
  shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createEmotionalBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.EmotionalBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.setName(biorhythm.getName() + " Shape");
  shape.setBiorhythm(biorhythm);
  shape.setColor("#32cd32");
  shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createIntellectualBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.IntellectualBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.setName(biorhythm.getName() + " Shape");
  shape.setBiorhythm(biorhythm);
  shape.setColor("#1e90ff");
  shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createIntuitiveBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.IntuitiveBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.setName(biorhythm.getName() + " Shape");
  shape.setBiorhythm(biorhythm);
  shape.setColor("#ffa500");
  shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPassionBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.PassionBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.setName(biorhythm.getName() + " Shape");
  shape.setBiorhythm(biorhythm);
  shape.setColor("#ff0000");
  shape.setLineStyle(lu.LineStyle.dash);
  shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createMasteryBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.MasteryBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.setName(biorhythm.getName() + " Shape");
  shape.setBiorhythm(biorhythm);
  shape.setColor("#1e90ff");
  shape.setLineStyle(lu.LineStyle.dashDot);
  shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createWisdomBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.WisdomBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.setName(biorhythm.getName() + " Shape");
  shape.setBiorhythm(biorhythm);
  shape.setColor("#32cd32");
  shape.setLineStyle(lu.LineStyle.dashDotDot);
  shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPerceptionBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.PerceptionBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.setName(biorhythm.getName() + " Shape");
  shape.setBiorhythm(biorhythm);
  shape.setColor("#ff0000");
  shape.setLineStyle(lu.LineStyle.dash);
  shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPsychicBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.PsychicBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.setName(biorhythm.getName() + " Shape");
  shape.setBiorhythm(biorhythm);
  shape.setColor("#32cd32");
  shape.setLineStyle(lu.LineStyle.dashDot);
  shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSuccessBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.SuccessBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.setName(biorhythm.getName() + " Shape");
  shape.setBiorhythm(biorhythm);
  shape.setColor("#1e90ff");
  shape.setLineStyle(lu.LineStyle.dashDotDot);
  shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createEstheticBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.EstheticBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.setName(biorhythm.getName() + " Shape");
  shape.setBiorhythm(biorhythm);
  shape.setColor("#ff0000");
  shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSelfAwarenessBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.SelfAwarenessBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.setName(biorhythm.getName() + " Shape");
  shape.setBiorhythm(biorhythm);
  shape.setColor("#1e90ff");
  shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSpiritualBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.SpiritualBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.setName(biorhythm.getName() + " Shape");
  shape.setBiorhythm(biorhythm);
  shape.setColor("#ffa500");
  shape.setBirthday(lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday);
  return shape
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.paintDataCalculation = lu.bioControls.common.paintDataCalculation || {};
lu.bioControls.common.paintDataCalculation.DayLablesCalculator = function() {
  var rawPaintData = null;
  var canvas = null;
  var textHeight = 12;
  this.calculate = function(data, canvasElement) {
    rawPaintData = data;
    canvas = canvasElement;
    calculateTextSize();
    return calculateDayLabels()
  };
  function calculateDayLabels() {
    var areDayNumbersVisible = rawPaintData.areDayNumbersVisible;
    var areWeekDaysVisible = rawPaintData.areWeekDaysVisible && !(rawPaintData.areDayNumbersVisible && rawPaintData.weekDaysPosition === rawPaintData.dayNumbersPosition);
    if(!areDayNumbersVisible && !areWeekDaysVisible) {
      return null
    }
    var dayLabelsPaintData = [];
    var day = new Date(rawPaintData.firstDay.getTime());
    for(var i = 0;i < rawPaintData.totalDays;i++) {
      if(areDayNumbersVisible) {
        dayLabelsPaintData.push(calculateDayNumberPaintInfo(i, day))
      }
      if(areWeekDaysVisible) {
        dayLabelsPaintData.push(calculateWeekDayPaintInfo(day, i))
      }
      day.setDate(day.getDate() + 1)
    }
    return{labels:dayLabelsPaintData, color:rawPaintData.foreColor, emphasizedColor:rawPaintData.sundaysColor, font:rawPaintData.font, emphasizedFont:rawPaintData.sundaysFont}
  }
  function calculateTextSize() {
    var textSize = lu.TextUtil.measureText({text:"0jf", font:rawPaintData.font});
    var textSizeEmphasized = lu.TextUtil.measureText({text:"0jf", font:rawPaintData.sundaysFont});
    textHeight = Math.max(textSize[1], textSizeEmphasized[1])
  }
  function calculateDayNumberPaintInfo(i, day) {
    var text = day.getDate().toString();
    var location = calculateDayNumberLocation(i, rawPaintData.dayNumbersPosition);
    var isEmphasized = rawPaintData.areSundaysEmphasized && day.getDay() === 0;
    return{text:text, location:location, isEmphasized:isEmphasized}
  }
  function calculateWeekDayPaintInfo(day, i) {
    var text = lu.WeekDayNamesProvider.getWeekDayName(day.getDay());
    var location = calculateDayNumberLocation(i, rawPaintData.weekDaysPosition);
    var isEmphasized = rawPaintData.areSundaysEmphasized && day.getDay() === 0;
    return{text:text, location:location, isEmphasized:isEmphasized}
  }
  function calculateDayNumberLocation(index, position) {
    var xStep = canvas.width / rawPaintData.totalDays;
    var daysFontHeight = (textHeight + 3) / 2;
    switch(position) {
      case lu.DayLabelPosition.top:
        return new lu.Point(xStep * index + xStep / 2, daysFontHeight);
      default:
      ;
      case lu.DayLabelPosition.aboveMiddle:
        return new lu.Point(xStep * index + xStep / 2, canvas.height / 2 - daysFontHeight);
      case lu.DayLabelPosition.belowMiddle:
        return new lu.Point(xStep * index + xStep / 2, canvas.height / 2 + daysFontHeight);
      case lu.DayLabelPosition.bottom:
        return new lu.Point(xStep * index + xStep / 2, canvas.height - daysFontHeight)
    }
  }
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.paintDataCalculation = lu.bioControls.common.paintDataCalculation || {};
lu.bioControls.common.paintDataCalculation.GridLinesCalculator = function() {
  var rawPaintData = null;
  var canvas = null;
  this.calculate = function(data, canvasElement) {
    rawPaintData = data;
    canvas = canvasElement;
    return calculateGridLines()
  };
  function calculateGridLines() {
    if(!rawPaintData.isGridVisible) {
      return null
    }
    var lines = [];
    for(var i = 0;i < rawPaintData.totalDays - 1;i++) {
      var line = createDaySeparatorLine(i);
      lines.push(line)
    }
    var axis = createXAxis();
    lines.push(axis);
    return{lines:lines, color:rawPaintData.gridColor}
  }
  function createDaySeparatorLine(dayIndex) {
    var xStep = canvas.width / rawPaintData.totalDays;
    var index = dayIndex + 1;
    var startPoint = new lu.Point(xStep * index, 0);
    var endPoint = new lu.Point(xStep * index, canvas.height);
    return new lu.Line(startPoint, endPoint)
  }
  function createXAxis() {
    var startPoint = new lu.Point(0, canvas.height / 2);
    var endPoint = new lu.Point(canvas.width, canvas.height / 2);
    return new lu.Line(startPoint, endPoint)
  }
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.paintDataCalculation = lu.bioControls.common.paintDataCalculation || {};
lu.bioControls.common.paintDataCalculation.PaintDataCalculator = function() {
  var biorhythmCurvesCalculator = null;
  var gridLinesCalculator = null;
  var dayLabelsCalculator = null;
  var todayMarkerCalculator = null;
  var xDayMarkerCalculator = null;
  this.calculate = function(data, canvasElement) {
    return{biorhythms:biorhythmCurvesCalculator.calculate(data, canvasElement), gridLines:gridLinesCalculator.calculate(data, canvasElement), dayLabels:dayLabelsCalculator.calculate(data, canvasElement), todayMarker:todayMarkerCalculator.calculate(data, canvasElement), xDayMarker:xDayMarkerCalculator.calculate(data, canvasElement)}
  };
  (function initialize() {
    biorhythmCurvesCalculator = new lu.bioControls.common.paintDataCalculation.BiorhythmCurvesCalculator;
    gridLinesCalculator = new lu.bioControls.common.paintDataCalculation.GridLinesCalculator;
    dayLabelsCalculator = new lu.bioControls.common.paintDataCalculation.DayLablesCalculator;
    todayMarkerCalculator = new lu.bioControls.common.paintDataCalculation.TodayMarkerCalculator;
    xDayMarkerCalculator = new lu.bioControls.common.paintDataCalculation.XDayMarkerCalculator
  })()
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.paintDataCalculation = lu.bioControls.common.paintDataCalculation || {};
lu.bioControls.common.paintDataCalculation.TodayMarkerCalculator = function() {
  var rawPaintData = null;
  var canvas = null;
  this.calculate = function(data, canvasElement) {
    rawPaintData = data;
    canvas = canvasElement;
    return calculateTodayRectangle()
  };
  function calculateTodayRectangle() {
    var todayIndex = calculateTodayIndex();
    var todayIsVisible = todayIndex >= 0 && todayIndex < rawPaintData.totalDays;
    if(!todayIsVisible) {
      return null
    }
    var xStep = canvas.width / rawPaintData.totalDays;
    var x = todayIndex * xStep;
    var y = 0;
    var width = xStep;
    var height = canvas.height;
    return{rectangle:new lu.Rectangle(x, y, width, height), color:rawPaintData.todayBackColor}
  }
  function calculateTodayIndex() {
    var today = getDateComponent(new Date);
    var firstDay = getDateComponent(rawPaintData.firstDay);
    var todayIndexInMiliseconds = today - firstDay;
    return Math.floor(todayIndexInMiliseconds / 1E3 / 60 / 60 / 24)
  }
  function getDateComponent(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.paintDataCalculation = lu.bioControls.common.paintDataCalculation || {};
lu.bioControls.common.paintDataCalculation.XDayMarkerCalculator = function() {
  var rawPaintData = null;
  var canvas = null;
  this.calculate = function(data, canvasElement) {
    rawPaintData = data;
    canvas = canvasElement;
    return calculateXDayMarker()
  };
  function calculateXDayMarker() {
    if(!rawPaintData.isXDayVisible) {
      return null
    }
    var xStep = canvas.width / rawPaintData.totalDays;
    var x = xStep * rawPaintData.xDayIndex;
    var y = 0;
    var width = xStep;
    var height = canvas.height;
    return{rectangle:new lu.Rectangle(x, y, width, height), lineColor:rawPaintData.xDayBorderColor, lineWidth:rawPaintData.xDayBorderWidth}
  }
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.painting = lu.bioControls.common.painting || {};
lu.bioControls.common.painting.BiorhythmViewPainter = function() {
  var rawPaintData = null;
  var canvas = null;
  var paintCount = 0;
  this.getPaintCount = function() {
    return paintCount
  };
  this.paint = function(data, canvasElement) {
    paintCount++;
    rawPaintData = data;
    canvas = canvasElement;
    var paintDataCalculator = new lu.bioControls.common.paintDataCalculation.PaintDataCalculator;
    var dataToPaint = paintDataCalculator.calculate(rawPaintData, canvas);
    paintAll(dataToPaint)
  };
  function paintAll(dataToPaint) {
    if(canvas.getContext) {
      var context = canvas.getContext("2d");
      clearCanvas(context);
      var todayMarkerPainter = new lu.bioControls.common.painting.TodayMarkerPainter;
      todayMarkerPainter.paint(context, dataToPaint.todayMarker);
      var gridLinesPainter = new lu.bioControls.common.painting.GridLinesPainter;
      gridLinesPainter.paint(context, dataToPaint.gridLines);
      var biorhythmCurvesPainter = new lu.bioControls.common.painting.BiorhythmCurvesPainter;
      biorhythmCurvesPainter.paint(context, dataToPaint.biorhythms);
      var dayLabelsPainter = new lu.bioControls.common.painting.DayLabelsPainter;
      dayLabelsPainter.paint(context, dataToPaint.dayLabels);
      var xDayMarkerPainter = new lu.bioControls.common.painting.XDayMarkerPainter;
      xDayMarkerPainter.paint(context, dataToPaint.xDayMarker)
    }
  }
  function clearCanvas(context) {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height)
  }
};
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
    paintLabels()
  };
  function paintLabels() {
    paintContext.textAlign = "center";
    paintContext.textBaseline = "middle";
    var labelCount = dataToPaint.labels.length;
    currentFont = null;
    for(var i = 0;i < labelCount;i++) {
      paintLabel(dataToPaint.labels[i])
    }
  }
  function paintLabel(label) {
    if(label.isEmphasized) {
      paintContext.fillStyle = dataToPaint.emphasizedColor;
      if(currentFont !== dataToPaint.emphasizedFont) {
        paintContext.font = dataToPaint.emphasizedFont
      }
    }else {
      paintContext.fillStyle = dataToPaint.color;
      if(currentFont !== dataToPaint.font) {
        paintContext.font = dataToPaint.font
      }
    }
    paintContext.fillText(label.text, label.location.getX(), label.location.getY())
  }
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.painting = lu.bioControls.common.painting || {};
lu.bioControls.common.painting.GridLinesPainter = function() {
  var paintContext = null;
  var dataToPaint = null;
  this.paint = function(context, data) {
    paintContext = context;
    dataToPaint = data;
    var isGridVisible = dataToPaint && dataToPaint.lines && dataToPaint.lines.length > 0;
    if(!isGridVisible) {
      return
    }
    paintGrid()
  };
  function paintGrid() {
    paintContext.strokeStyle = dataToPaint.color;
    paintContext.lineWidth = 1;
    paintContext.lineJoin = "round";
    setLinePattern(null);
    for(var i = 0;i < dataToPaint.lines.length;i++) {
      paintLine(dataToPaint.lines[i])
    }
  }
  function paintLine(line) {
    paintContext.beginPath();
    paintContext.moveTo(line.startPoint.getX(), line.startPoint.getY());
    paintContext.lineTo(line.endPoint.getX(), line.endPoint.getY());
    paintContext.stroke()
  }
  function setLinePattern(linePattern) {
    if(paintContext.mozDash !== undefined) {
      paintContext.mozDash = linePattern
    }
    if(typeof paintContext.setLineDash === "function") {
      paintContext.setLineDash(linePattern)
    }
  }
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.painting = lu.bioControls.common.painting || {};
lu.bioControls.common.painting.TodayMarkerPainter = function() {
  var paintContext = null;
  var dataToPaint = null;
  this.paint = function(context, data) {
    paintContext = context;
    dataToPaint = data;
    if(!dataToPaint) {
      return
    }
    paintTodayMarker()
  };
  function paintTodayMarker() {
    var rect = dataToPaint.rectangle;
    paintContext.beginPath();
    paintContext.rect(rect.getLeft(), rect.getTop(), rect.getWidth(), rect.getHeight());
    paintContext.fillStyle = dataToPaint.color;
    paintContext.fill()
  }
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.painting = lu.bioControls.common.painting || {};
lu.bioControls.common.painting.XDayMarkerPainter = function() {
  var paintContext = null;
  var dataToPaint = null;
  this.paint = function(context, data) {
    paintContext = context;
    dataToPaint = data;
    if(!dataToPaint) {
      return
    }
    paintXDayMarker()
  };
  function paintXDayMarker() {
    if(!dataToPaint) {
      return
    }
    var rect = dataToPaint.rectangle;
    paintContext.beginPath();
    paintContext.rect(rect.getLeft(), rect.getTop(), rect.getWidth(), rect.getHeight());
    paintContext.strokeStyle = dataToPaint.lineColor;
    paintContext.lineWidth = dataToPaint.lineWidth;
    paintContext.stroke()
  }
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};
lu.bioControls.core.biorhythms.EmotionalBiorhythm = function() {
  var biorhythm = null;
  this.getName = function() {
    return"Emotional"
  };
  this.getPeriodLength = function() {
    return biorhythm.getPeriodLength()
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    biorhythm = new lu.bioControls.core.biorhythms.SinusoidalBiorhythm;
    biorhythm.setPeriodLength(28)
  })()
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};
lu.bioControls.core.biorhythms.EstheticBiorhythm = function() {
  var biorhythm = null;
  this.getName = function() {
    return"Esthetic"
  };
  this.getPeriodLength = function() {
    return biorhythm.getPeriodLength()
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    biorhythm = new lu.bioControls.core.biorhythms.SinusoidalBiorhythm;
    biorhythm.setPeriodLength(43)
  })()
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};
lu.bioControls.core.biorhythms.IntellectualBiorhythm = function() {
  var biorhythm = null;
  this.getName = function() {
    return"Intellectual"
  };
  this.getPeriodLength = function() {
    return biorhythm.getPeriodLength()
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    biorhythm = new lu.bioControls.core.biorhythms.SinusoidalBiorhythm;
    biorhythm.setPeriodLength(33)
  })()
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};
lu.bioControls.core.biorhythms.IntuitiveBiorhythm = function() {
  var biorhythm = null;
  this.getName = function() {
    return"Intuitive"
  };
  this.getPeriodLength = function() {
    return biorhythm.getPeriodLength()
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    biorhythm = new lu.bioControls.core.biorhythms.SinusoidalBiorhythm;
    biorhythm.setPeriodLength(38)
  })()
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};
lu.bioControls.core.biorhythms.MasteryBiorhythm = function() {
  var biorhythm = null;
  this.getName = function() {
    return"Mastery"
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    var physicalBiorhythm = new lu.bioControls.core.biorhythms.PhysicalBiorhythm;
    var intellectualBiorhythm = new lu.bioControls.core.biorhythms.IntellectualBiorhythm;
    biorhythm = new lu.bioControls.core.biorhythms.AverageBiorhythm(physicalBiorhythm, intellectualBiorhythm)
  })()
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};
lu.bioControls.core.biorhythms.PassionBiorhythm = function() {
  var biorhythm = null;
  this.getName = function() {
    return"Passion"
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    var physicalBiorhythm = new lu.bioControls.core.biorhythms.PhysicalBiorhythm;
    var emotionalBiorhythm = new lu.bioControls.core.biorhythms.EmotionalBiorhythm;
    biorhythm = new lu.bioControls.core.biorhythms.AverageBiorhythm(physicalBiorhythm, emotionalBiorhythm)
  })()
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};
lu.bioControls.core.biorhythms.PerceptionBiorhythm = function() {
  var biorhythm = null;
  this.getName = function() {
    return"Perception"
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    var physicalBiorhythm = new lu.bioControls.core.biorhythms.PhysicalBiorhythm;
    var intuitiveBiorhythm = new lu.bioControls.core.biorhythms.IntuitiveBiorhythm;
    biorhythm = new lu.bioControls.core.biorhythms.AverageBiorhythm(physicalBiorhythm, intuitiveBiorhythm)
  })()
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};
lu.bioControls.core.biorhythms.PhysicalBiorhythm = function() {
  var biorhythm = null;
  this.getName = function() {
    return"Physical"
  };
  this.getPeriodLength = function() {
    return biorhythm.getPeriodLength()
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    biorhythm = new lu.bioControls.core.biorhythms.SinusoidalBiorhythm;
    biorhythm.setPeriodLength(23)
  })()
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};
lu.bioControls.core.biorhythms.PsychicBiorhythm = function() {
  var biorhythm = null;
  this.getName = function() {
    return"Psychic"
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    var emotionalBiorhythm = new lu.bioControls.core.biorhythms.EmotionalBiorhythm;
    var intuitiveBiorhythm = new lu.bioControls.core.biorhythms.IntuitiveBiorhythm;
    biorhythm = new lu.bioControls.core.biorhythms.AverageBiorhythm(emotionalBiorhythm, intuitiveBiorhythm)
  })()
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};
lu.bioControls.core.biorhythms.SelfAwarenessBiorhythm = function() {
  var biorhythm = null;
  this.getName = function() {
    return"Self Awareness"
  };
  this.getPeriodLength = function() {
    return biorhythm.getPeriodLength()
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    biorhythm = new lu.bioControls.core.biorhythms.SinusoidalBiorhythm;
    biorhythm.setPeriodLength(48)
  })()
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};
lu.bioControls.core.biorhythms.SinusoidalBiorhythm = function() {
  var values = [];
  var periodLength = 0;
  this.getPeriodLength = function() {
    return periodLength
  };
  this.setPeriodLength = function(value) {
    periodLength = value;
    generateValues()
  };
  this.getValue = function(dayIndex) {
    var index = dayIndex % periodLength;
    if(index < 0) {
      index += periodLength
    }
    return values[index]
  };
  function generateValues() {
    values = [];
    for(var i = 0;i < periodLength;i++) {
      values[i] = Math.sin(i * 2 * Math.PI / periodLength)
    }
  }
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};
lu.bioControls.core.biorhythms.SpiritualBiorhythm = function() {
  var biorhythm = null;
  this.getName = function() {
    return"Spiritual"
  };
  this.getPeriodLength = function() {
    return biorhythm.getPeriodLength()
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    biorhythm = new lu.bioControls.core.biorhythms.SinusoidalBiorhythm;
    biorhythm.setPeriodLength(53)
  })()
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};
lu.bioControls.core.biorhythms.SuccessBiorhythm = function() {
  var biorhythm = null;
  this.getName = function() {
    return"Success"
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    var intellectualBiorhythm = new lu.bioControls.core.biorhythms.IntellectualBiorhythm;
    var intuitiveBiorhythm = new lu.bioControls.core.biorhythms.IntuitiveBiorhythm;
    biorhythm = new lu.bioControls.core.biorhythms.AverageBiorhythm(intellectualBiorhythm, intuitiveBiorhythm)
  })()
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};
lu.bioControls.core.biorhythms.WisdomBiorhythm = function() {
  var biorhythm = null;
  this.getName = function() {
    return"Wisdom"
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    var emotionalBiorhythm = new lu.bioControls.core.biorhythms.EmotionalBiorhythm;
    var intellectualBiorhythm = new lu.bioControls.core.biorhythms.IntellectualBiorhythm;
    biorhythm = new lu.bioControls.core.biorhythms.AverageBiorhythm(emotionalBiorhythm, intellectualBiorhythm)
  })()
};

