var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.BiorhythmView = function(id) {
  var canvas = null;
  var obj = this;
  var scroller = null;
  var biorhythms = new lu.List;
  var biorhythmAddedEvent = new lu.Event;
  this.biorhythmAdded = biorhythmAddedEvent.client;
  this.subscribeToBiorhythmAdded = biorhythmAddedEvent.subscribe;
  var biorhythmRemovedEvent = new lu.Event;
  this.biorhythmRemoved = biorhythmRemovedEvent.client;
  this.subscribeToBiorhythmRemoved = biorhythmRemovedEvent.subscribe;
  this.addBiorhythm = function addBiorhythm(biorhythmShape) {
    biorhythms.add(biorhythmShape)
  };
  this.removeBiorhythm = function(biorhythmShape) {
    biorhythms.remove(biorhythmShape)
  };
  this.setBiorhythms = function(biorhythmShapes) {
    suspendPaint();
    try {
      biorhythms.clear();
      biorhythms.addRange(biorhythmShapes)
    }finally {
      resumePaint()
    }
  };
  this.getBiorhythms = function() {
    return biorhythms.toArray()
  };
  function onBiorhithmAdded(biorhythmShape) {
    biorhythmShape.nameChanged.subscribe(onBiorhithmShapeChanged);
    biorhythmShape.birthdayChanged.subscribe(onBiorhithmShapeChanged);
    biorhythmShape.biorhythmChanged.subscribe(onBiorhithmShapeChanged);
    biorhythmShape.colorChanged.subscribe(onBiorhithmShapeChanged);
    biorhythmShape.isVisibleChanged.subscribe(onBiorhithmShapeChanged);
    biorhythmShape.lineWidthChanged.subscribe(onBiorhithmShapeChanged);
    biorhythmShape.lineStyleChanged.subscribe(onBiorhithmShapeChanged);
    biorhythmAddedEvent.raise(obj, biorhythmShape);
    paint()
  }
  function onBiorhithmRemoved(biorhythmShape) {
    biorhythmShape.nameChanged.unsubscribe(onBiorhithmShapeChanged);
    biorhythmShape.birthdayChanged.unsubscribe(onBiorhithmShapeChanged);
    biorhythmShape.biorhythmChanged.unsubscribe(onBiorhithmShapeChanged);
    biorhythmShape.colorChanged.unsubscribe(onBiorhithmShapeChanged);
    biorhythmShape.isVisibleChanged.unsubscribe(onBiorhithmShapeChanged);
    biorhythmShape.lineWidthChanged.unsubscribe(onBiorhithmShapeChanged);
    biorhythmShape.lineStyleChanged.unsubscribe(onBiorhithmShapeChanged);
    biorhythmRemovedEvent.raise(obj, biorhythmShape);
    paint()
  }
  function onBiorhithmShapeChanged() {
    paint()
  }
  this.setBirthdayOnAllBiorhythms = function(birthday) {
    suspendPaint();
    try {
      var list = biorhythms.toArray();
      for(var i = 0;i < list.length;i++) {
        list[i].birthday = birthday
      }
    }finally {
      resumePaint()
    }
  };
  var firstDay = lu.DateUtil.addDays(Date.now(), -7);
  var firstDayChangedEvent = new lu.Event;
  this.firstDayChanged = firstDayChangedEvent.client;
  this.setFirstDay = setFirstDay;
  function setFirstDay(value) {
    firstDay = value;
    firstDayChangedEvent.raise(obj, value);
    paint()
  }
  this.getFirstDay = getFirstDay;
  function getFirstDay() {
    return firstDay
  }
  Object.defineProperty(this, "firstDay", {enumerable:true, configurable:false, get:getFirstDay, set:setFirstDay});
  function incrementFirstDay(value) {
    var date = new Date(firstDay.getTime());
    date.setDate(date.getDate() + value);
    setFirstDay(date)
  }
  this.subscribeToFirstDayChanged = firstDayChangedEvent.subscribe;
  Object.defineProperty(this, "lastDay", {enumerable:true, configurable:false, get:getLastDay});
  function getLastDay() {
    return lu.DateUtil.addDays(firstDay, totalDays - 1)
  }
  Object.defineProperty(this, "xDay", {enumerable:true, configurable:false, get:getXDay});
  function getXDay() {
    return lu.DateUtil.addDays(firstDay, xDayIndex)
  }
  var isGridVisible = true;
  var isGridVisibleChangedEvent = new lu.Event;
  this.isGridVisibleChanged = isGridVisibleChangedEvent.client;
  this.setGridVisibility = setGridVisibility;
  function setGridVisibility(value) {
    isGridVisible = Boolean(value);
    isGridVisibleChangedEvent.raise(obj, value);
    paint()
  }
  this.getGridVisibility = getGridVisibility;
  function getGridVisibility() {
    return isGridVisible
  }
  Object.defineProperty(this, "isGridVisible", {enumerable:true, configurable:false, get:getGridVisibility, set:setGridVisibility});
  this.subscribeToGridVisibilityChanged = isGridVisibleChangedEvent.subscribe;
  var totalDays = 30;
  var totalDaysChangedEvent = new lu.Event;
  this.totalDaysChanged = totalDaysChangedEvent.client;
  this.setTotalDays = setTotalDays;
  function setTotalDays(value) {
    totalDays = value;
    totalDaysChangedEvent.raise(obj, value);
    paint()
  }
  this.getTotalDays = getTotalDays;
  function getTotalDays() {
    return totalDays
  }
  Object.defineProperty(this, "totalDays", {enumerable:true, configurable:false, get:getTotalDays, set:setTotalDays});
  this.subscribeToTotalDaysChanged = totalDaysChangedEvent.subscribe;
  var xDayIndex = 7;
  var xDayIndexChangedEvent = new lu.Event;
  this.xDayIndexChanged = xDayIndexChangedEvent.client;
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
  Object.defineProperty(this, "xDayIndex", {enumerable:true, configurable:false, get:getXDayIndex, set:setXDayIndex});
  this.subscribeToXDayIndexChanged = xDayIndexChangedEvent.subscribe;
  var gridColor = "#d3d3d3";
  var gridColorChangedEvent = new lu.Event;
  this.gridColorChanged = gridColorChangedEvent.client;
  this.setGridColor = setGridColor;
  function setGridColor(value) {
    gridColor = value;
    gridColorChangedEvent.raise(obj, value);
    paint()
  }
  this.getGridColor = getGridColor;
  function getGridColor() {
    return xDayIndex
  }
  Object.defineProperty(this, "gridColor", {enumerable:true, configurable:false, get:getGridColor, set:setGridColor});
  this.subscribeToGridColorChanged = gridColorChangedEvent.subscribe;
  var areDayNumbersVisible = true;
  var areDayNumbersVisibleChangedEvent = new lu.Event;
  this.areDayNumbersVisibleChanged = areDayNumbersVisibleChangedEvent.client;
  this.setDayNumbersVisibility = setDayNumbersVisibility;
  function setDayNumbersVisibility(value) {
    areDayNumbersVisible = value;
    areDayNumbersVisibleChangedEvent.raise(obj, value);
    paint()
  }
  this.getDayNumbersVisibility = getDayNumbersVisibility;
  function getDayNumbersVisibility() {
    return areDayNumbersVisible
  }
  Object.defineProperty(this, "areDayNumbersVisible", {enumerable:true, configurable:false, get:getDayNumbersVisibility, set:setDayNumbersVisibility});
  this.subscribeToDayNumbersVisibilityChanged = areDayNumbersVisibleChangedEvent.subscribe;
  var areWeekDaysVisible = true;
  var areWeekDaysVisibleChangedEvent = new lu.Event;
  this.areWeekDaysVisibleChanged = areWeekDaysVisibleChangedEvent.client;
  this.setWeekDaysVisibility = setWeekDaysVisibility;
  function setWeekDaysVisibility(value) {
    areWeekDaysVisible = value;
    areWeekDaysVisibleChangedEvent.raise(obj, value);
    paint()
  }
  this.getWeekDaysVisibility = getWeekDaysVisibility;
  function getWeekDaysVisibility() {
    return areWeekDaysVisible
  }
  Object.defineProperty(this, "areWeekDaysVisible", {enumerable:true, configurable:false, get:getWeekDaysVisibility, set:setWeekDaysVisibility});
  this.subscribeToWeekDaysVisibilityChanged = areWeekDaysVisibleChangedEvent.subscribe;
  var dayNumbersPosition = lu.DayLabelPosition.top;
  var dayNumbersPositionChangedEvent = new lu.Event;
  this.dayNumbersPositionChanged = dayNumbersPositionChangedEvent.client;
  this.setDayNumbersPosition = setDayNumbersPosition;
  function setDayNumbersPosition(value) {
    dayNumbersPosition = value;
    dayNumbersPositionChangedEvent.raise(obj, value);
    paint()
  }
  this.getDayNumbersPosition = getDayNumbersPosition;
  function getDayNumbersPosition() {
    return dayNumbersPosition
  }
  Object.defineProperty(this, "dayNumbersPosition", {enumerable:true, configurable:false, get:getDayNumbersPosition, set:setDayNumbersPosition});
  this.subscribeToTodayNumbersPositionChanged = dayNumbersPositionChangedEvent.subscribe;
  var weekDaysPosition = lu.DayLabelPosition.bottom;
  var weekDaysPositionChangedEvent = new lu.Event;
  this.weekDaysPositionChanged = weekDaysPositionChangedEvent.client;
  this.setWeekDaysPosition = setWeekDaysPosition;
  function setWeekDaysPosition(value) {
    weekDaysPosition = value;
    weekDaysPositionChangedEvent.raise(obj, value);
    paint()
  }
  this.getWeekDaysPosition = getWeekDaysPosition;
  function getWeekDaysPosition() {
    return weekDaysPosition
  }
  Object.defineProperty(this, "weekDaysPosition", {enumerable:true, configurable:false, get:getWeekDaysPosition, set:setWeekDaysPosition});
  this.subscribeToWeekDaysPositionChanged = weekDaysPositionChangedEvent.subscribe;
  var areSundaysEmphasized = true;
  var areSundaysEmphasizedChangedEvent = new lu.Event;
  this.areSundaysEmphasizedChanged = areSundaysEmphasizedChangedEvent.client;
  this.setAreSundaysEmphasized = setAreSundaysEmphasized;
  function setAreSundaysEmphasized(value) {
    areSundaysEmphasized = value;
    areSundaysEmphasizedChangedEvent.raise(obj, value);
    paint()
  }
  this.getAreSundaysEmphasized = getAreSundaysEmphasized;
  function getAreSundaysEmphasized() {
    return areSundaysEmphasized
  }
  Object.defineProperty(this, "areSundaysEmphasized", {enumerable:true, configurable:false, get:getAreSundaysEmphasized, set:setAreSundaysEmphasized});
  this.subscribeToAreSundaysEmphasizedChanged = areSundaysEmphasizedChangedEvent.subscribe;
  var foreColor = "#b0b0b0";
  var foreColorChangedEvent = new lu.Event;
  this.foreColorChanged = foreColorChangedEvent.client;
  this.setForeColor = setForeColor;
  function setForeColor(value) {
    foreColor = value;
    foreColorChangedEvent.raise(obj, value);
    paint()
  }
  this.getForeColor = getForeColor;
  function getForeColor() {
    return foreColor
  }
  Object.defineProperty(this, "foreColor", {enumerable:true, configurable:false, get:getForeColor, set:setForeColor});
  this.subscribeToForeColorChanged = foreColorChangedEvent.subscribe;
  var sundaysColor = "#ff0000";
  var sundaysColorChangedEvent = new lu.Event;
  this.sundaysColorChanged = sundaysColorChangedEvent.client;
  this.setSundaysColor = setSundaysColor;
  function setSundaysColor(value) {
    sundaysColor = value;
    sundaysColorChangedEvent.raise(obj, value);
    paint()
  }
  this.getSundaysColor = getSundaysColor;
  function getSundaysColor() {
    return sundaysColor
  }
  Object.defineProperty(this, "sundaysColor", {enumerable:true, configurable:false, get:getSundaysColor, set:setSundaysColor});
  this.subscribeToSundaysColorChanged = sundaysColorChangedEvent.subscribe;
  var font = "12px Arial";
  var fontChangedEvent = new lu.Event;
  this.fontChanged = fontChangedEvent.client;
  this.setFont = setFont;
  function setFont(value) {
    font = value;
    fontChangedEvent.raise(obj, value);
    paint()
  }
  this.getFont = getFont;
  function getFont() {
    return font
  }
  Object.defineProperty(this, "font", {enumerable:true, configurable:false, get:getFont, set:setFont});
  this.subscribeToFontChanged = fontChangedEvent.subscribe;
  var sundaysFont = "italic 12px Arial";
  var sundaysFontChangedEvent = new lu.Event;
  this.sundaysFontChanged = sundaysFontChangedEvent.client;
  this.setSundaysFont = setSundaysFont;
  function setSundaysFont(value) {
    sundaysFont = value;
    sundaysFontChangedEvent.raise(obj, value);
    paint()
  }
  this.getSundaysFont = getSundaysFont;
  function getSundaysFont() {
    return sundaysFont
  }
  Object.defineProperty(this, "sundaysFont", {enumerable:true, configurable:false, get:getSundaysFont, set:setSundaysFont});
  this.subscribeToSundaysFontChanged = sundaysFontChangedEvent.subscribe;
  var todayBackColor = "#ffe4b5";
  var todayBackColorChangedEvent = new lu.Event;
  this.todayBackColorChanged = todayBackColorChangedEvent.client;
  this.setTodayBackColor = setTodayBackColor;
  function setTodayBackColor(value) {
    todayBackColor = value;
    todayBackColorChangedEvent.raise(obj, value);
    paint()
  }
  this.getTodayBackColor = getTodayBackColor;
  function getTodayBackColor() {
    return todayBackColor
  }
  Object.defineProperty(this, "todayBackColor", {enumerable:true, configurable:false, get:getTodayBackColor, set:setTodayBackColor});
  this.subscribeToTodayBackColorChanged = todayBackColorChangedEvent.subscribe;
  var isXDayVisible = true;
  var isXDayVisibleChangedEvent = new lu.Event;
  this.isXDayVisibleChanged = isXDayVisibleChangedEvent.client;
  this.setXDayVisibility = setXDayVisibility;
  function setXDayVisibility(value) {
    isXDayVisible = value;
    isXDayVisibleChangedEvent.raise(obj, value);
    paint()
  }
  this.getXDayVisibility = getXDayVisibility;
  function getXDayVisibility() {
    return isXDayVisible
  }
  Object.defineProperty(this, "isXDayVisible", {enumerable:true, configurable:false, get:getXDayVisibility, set:setXDayVisibility});
  this.subscribeToXDayVisibilityChanged = isXDayVisibleChangedEvent.subscribe;
  var xDayBorderColor = "#000000";
  var xDayBorderColorChangedEvent = new lu.Event;
  this.xDayBorderColorChanged = xDayBorderColorChangedEvent.client;
  this.setXDayBorderColor = setXDayBorderColor;
  function setXDayBorderColor(value) {
    xDayBorderColor = value;
    xDayBorderColorChangedEvent.raise(obj, value);
    paint()
  }
  this.getXDayBorderColor = getXDayBorderColor;
  function getXDayBorderColor() {
    return xDayBorderColor
  }
  Object.defineProperty(this, "xDayBorderColor", {enumerable:true, configurable:false, get:getXDayBorderColor, set:setXDayBorderColor});
  this.subscribeToXDayBorderColorChanged = xDayBorderColorChangedEvent.subscribe;
  var xDayBorderWidth = 2;
  var xDayBorderWidthChangedEvent = new lu.Event;
  this.xDayBorderWidthChanged = xDayBorderWidthChangedEvent.client;
  this.setXDayBorderWidth = setXDayBorderWidth;
  function setXDayBorderWidth(value) {
    xDayBorderWidth = value;
    xDayBorderWidthChangedEvent.raise(obj, value);
    paint()
  }
  this.getXDayBorderWidth = getXDayBorderWidth;
  function getXDayBorderWidth() {
    return xDayBorderWidth
  }
  Object.defineProperty(this, "xDayBorderWidth", {enumerable:true, configurable:false, get:getXDayBorderWidth, set:setXDayBorderWidth});
  this.subscribeToXDayBorderWidthChanged = xDayBorderWidthChangedEvent.subscribe;
  var painter = null;
  var paintSuspendCount = 0;
  this.suspendPaint = suspendPaint;
  function suspendPaint() {
    paintSuspendCount++
  }
  this.resumePaint = resumePaint;
  function resumePaint() {
    if(paintSuspendCount > 0) {
      paintSuspendCount--
    }
    if(paintSuspendCount == 0) {
      paint()
    }
  }
  function paint() {
    if(paintSuspendCount > 0) {
      return
    }
    var rawPaintData = {biorhythmShapes:biorhythms.toArray(), firstDay:firstDay, totalDays:totalDays, xDayIndex:xDayIndex, isXDayVisible:isXDayVisible, xDayBorderColor:xDayBorderColor, xDayBorderWidth:xDayBorderWidth, gridColor:gridColor, isGridVisible:isGridVisible, todayBackColor:todayBackColor, areDayNumbersVisible:areDayNumbersVisible, areWeekDaysVisible:areWeekDaysVisible, dayNumbersPosition:dayNumbersPosition, weekDaysPosition:weekDaysPosition, areSundaysEmphasized:areSundaysEmphasized, foreColor:foreColor, 
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
    biorhythms.itemAdded.subscribe(onBiorhithmAdded);
    biorhythms.itemRemoved.subscribe(onBiorhithmRemoved);
    painter = new lu.bioControls.common.painting.BiorhythmViewPainter
  })()
};
var lu = lu || {};
lu.DateUtil = {daysToMiliseconds:function(days) {
  return days * 24 * 60 * 60 * 1E3
}, addDays:function(date, daysToAdd) {
  var miliseconds = daysToAdd * 24 * 60 * 60 * 1E3;
  if(date instanceof Date) {
    date = date.getTime()
  }
  if(typeof date !== "number") {
    throw"date argument is not a real date.";
  }
  if(typeof daysToAdd !== "number") {
    throw"daysToAdd should be a number.";
  }
  return new Date(date + miliseconds)
}};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.biorhythmModel = lu.bioControls.common.biorhythmModel || {};
lu.bioControls.common.biorhythmModel.BiorhythmShape = function() {
  var obj = this;
  var name = "New Biorhythm Shape";
  var nameChangedEvent = new lu.Event;
  this.nameChanged = nameChangedEvent.client;
  this.subscribeToNameChanged = nameChangedEvent.subscribe;
  this.unsubscribeFromNameChanged = nameChangedEvent.unsubscribe;
  this.getName = getName;
  function getName() {
    return name
  }
  this.setName = setName;
  function setName(value) {
    if(value === name) {
      return
    }
    name = value;
    nameChangedEvent.raise(obj, value)
  }
  Object.defineProperty(this, "name", {enumerable:true, configurable:false, get:getName, set:setName});
  var birthday = Date(80, 5, 13);
  var birthdayChangedEvent = new lu.Event;
  this.birthdayChanged = birthdayChangedEvent.client;
  this.subscribeToBirthdayChanged = birthdayChangedEvent.subscribe;
  this.unsubscribeFromBirthdayChanged = birthdayChangedEvent.unsubscribe;
  this.getBirthday = getBirthday;
  function getBirthday() {
    return birthday
  }
  this.setBirthday = setBirthday;
  function setBirthday(value) {
    if(value === birthday) {
      return
    }
    birthday = value;
    birthdayChangedEvent.raise(obj, value)
  }
  Object.defineProperty(this, "birthday", {enumerable:true, configurable:false, get:getBirthday, set:setBirthday});
  var biorhythm = null;
  var biorhythmChangedEvent = new lu.Event;
  this.biorhythmChanged = biorhythmChangedEvent.client;
  this.subscribeToBiorhythmChanged = biorhythmChangedEvent.subscribe;
  this.unsubscribeFromBiorhythmChanged = biorhythmChangedEvent.unsubscribe;
  this.getBiorhythm = getBiorhythm;
  function getBiorhythm() {
    return biorhythm
  }
  this.setBiorhythm = setBiorhythm;
  function setBiorhythm(value) {
    if(value === biorhythm) {
      return
    }
    biorhythm = value;
    biorhythmChangedEvent.raise(obj, value)
  }
  Object.defineProperty(this, "biorhythm", {enumerable:true, configurable:false, get:getBiorhythm, set:setBiorhythm});
  var color = null;
  var colorChangedEvent = new lu.Event;
  this.colorChanged = colorChangedEvent.client;
  this.subscribeToColorChanged = colorChangedEvent.subscribe;
  this.unsubscribeFromColorChanged = colorChangedEvent.unsubscribe;
  this.getColor = getColor;
  function getColor() {
    return color
  }
  this.setColor = setColor;
  function setColor(value) {
    if(value === color) {
      return
    }
    color = value;
    colorChangedEvent.raise(obj, value)
  }
  Object.defineProperty(this, "color", {enumerable:true, configurable:false, get:getColor, set:setColor});
  var isVisible = true;
  var isVisibleChangedEvent = new lu.Event;
  this.isVisibleChanged = isVisibleChangedEvent.client;
  this.subscribeToIsVisibleChanged = isVisibleChangedEvent.subscribe;
  this.unsubscribeFromIsVisibleChanged = isVisibleChangedEvent.unsubscribe;
  this.getIsVisible = getIsVisible;
  function getIsVisible() {
    return isVisible
  }
  this.setIsVisible = setIsVisible;
  function setIsVisible(value) {
    if(value === isVisible) {
      return
    }
    isVisible = value;
    isVisibleChangedEvent.raise(obj, value)
  }
  Object.defineProperty(this, "isVisible", {enumerable:true, configurable:false, get:getIsVisible, set:setIsVisible});
  var lineWidth = 1;
  var lineWidthChangedEvent = new lu.Event;
  this.lineWidthChanged = lineWidthChangedEvent.client;
  this.subscribeToLineWidthChanged = lineWidthChangedEvent.subscribe;
  this.unsubscribeFromLineWidthChanged = lineWidthChangedEvent.unsubscribe;
  this.getLineWidth = getLineWidth;
  function getLineWidth() {
    return lineWidth
  }
  this.setLineWidth = setLineWidth;
  function setLineWidth(value) {
    if(value === lineWidth) {
      return
    }
    lineWidth = value;
    lineWidthChangedEvent.raise(obj, value)
  }
  Object.defineProperty(this, "lineWidth", {enumerable:true, configurable:false, get:getLineWidth, set:setLineWidth});
  var lineStyle = lu.LineStyle.solid;
  var lineStyleChangedEvent = new lu.Event;
  this.lineStyleChanged = lineStyleChangedEvent.client;
  this.subscribeToLineStyleChanged = lineStyleChangedEvent.subscribe;
  this.unsubscribeFromLineStyleChanged = lineStyleChangedEvent.unsubscribe;
  this.getLineStyle = getLineStyle;
  function getLineStyle() {
    return lineStyle
  }
  this.setLineStyle = setLineStyle;
  function setLineStyle(value) {
    if(value === lineStyle) {
      return
    }
    lineStyle = value;
    lineStyleChangedEvent.raise(obj, value)
  }
  Object.defineProperty(this, "lineStyle", {enumerable:true, configurable:false, get:getLineStyle, set:setLineStyle})
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
    var linePattern = lu.LinePatternCalculator.calculatePattern(biorhythmData.lineStyle, biorhythmData.lineWidth);
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
    if(isDragging) {
      evt.preventDefault();
      evt.stopPropagation()
    }
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
    document.addEventListener("selectstart", onSelectStart, false)
  })()
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
Object.defineProperty(lu.bioControls, "version", {value:"1.3.0", writable:false, enumerable:true, configurable:false});
lu.bioControls.getVersion = function() {
  return lu.bioControls.version
};
var lu = lu || {};
lu.DayLabelPosition = {top:0, aboveMiddle:1, belowMiddle:2, bottom:3};
var lu = lu || {};
lu.Event = function() {
  var eventHandlers = [];
  this.subscribe = subscribe;
  function subscribe(eventHandler) {
    if(typeof eventHandler !== "function") {
      throw"eventHandler is not a function.";
    }
    eventHandlers.push(eventHandler)
  }
  this.unsubscribe = unsubscribe;
  function unsubscribe(eventHandler) {
    if(typeof eventHandler !== "function") {
      throw"eventHandler is not a function.";
    }
    for(var i = 0;i < eventHandlers.length;i++) {
      if(eventHandlers[i] === eventHandler) {
        eventHandlers.splice(i, 1)
      }
    }
  }
  this.raise = function(sender, arg) {
    for(var i = 0;i < eventHandlers.length;i++) {
      eventHandlers[i].call(sender, arg)
    }
  };
  Object.defineProperty(this, "client", {value:{subscribe:subscribe, unsubscribe:unsubscribe}, enumerable:true, configurable:false, writable:false})
};
var lu = lu || {};
lu.Line = function(startPoint, endPoint) {
  this.getStartPoint = getStartPoint;
  function getStartPoint() {
    return startPoint
  }
  this.getEndPoint = getEndPoint;
  function getEndPoint() {
    return endPoint
  }
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
lu.LinePatternCalculator = {calculatePattern:function(lineStyle, lineWidth) {
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
}};
var lu = lu || {};
lu.LineStyle = {solid:0, dash:1, dot:2, dashDot:3, dashDotDot:4};
var lu = lu || {};
lu.List = function() {
  var array = [];
  var itemAddedEvent = new lu.Event;
  this.itemAdded = itemAddedEvent.client;
  var itemAddingEvent = new lu.Event;
  this.itemAdding = itemAddingEvent.client;
  var itemRemovedEvent = new lu.Event;
  this.itemRemoved = itemRemovedEvent.client;
  this.add = function(item) {
    if(item === undefined || item === null) {
      throw"item should be an object.";
    }
    itemAddingEvent.raise(this, item);
    array.push(item);
    itemAddedEvent.raise(this, item)
  };
  this.addRange = function(items) {
    if(!(items instanceof Array)) {
      return
    }
    var i;
    for(i = 0;i < items.length;i++) {
      itemAddingEvent.raise(this, items[i])
    }
    for(i = 0;i < items.length;i++) {
      array.push(items[i]);
      itemAddedEvent.raise(this, items[i])
    }
  };
  this.contains = function(item) {
    if(item === undefined || item === null) {
      return false
    }
    for(var i = 0;i < array.length;i++) {
      if(array[i] === item) {
        return true
      }
    }
    return false
  };
  this.count = function() {
    return array.length
  };
  this.remove = function(item) {
    for(var i = 0;i < array.length;i++) {
      if(array[i] === item) {
        array.splice(i, 1);
        itemRemovedEvent.raise(this, item);
        break
      }
    }
  };
  this.clear = function() {
    var removedarray = this.toArray();
    array.length = 0;
    for(var i = 0;i < removedarray.length;i++) {
      try {
        itemRemovedEvent.raise(this, array[i])
      }catch(err) {
      }
    }
  };
  this.toArray = function() {
    var list = [];
    for(var i = 0;i < array.length;i++) {
      list.push(array[i])
    }
    return list
  }
};
var lu = lu || {};
lu.MouseButton = {none:0, left:1, middle:2, right:3};
var lu = lu || {};
lu.Point = function(x, y) {
  this.getX = getX;
  function getX() {
    return x
  }
  this.getY = getY;
  function getY() {
    return y
  }
  Object.defineProperty(this, "x", {enumerable:true, get:getX});
  Object.defineProperty(this, "y", {enumerable:true, get:getY});
  this.toString = function() {
    return"[" + x + "; " + y + "]"
  };
  (function initialize() {
    if(typeof x !== "number") {
      throw"x has to be a number.";
    }
    if(typeof y !== "number") {
      throw"y has to be a number.";
    }
  }).call(this)
};
var lu = lu || {};
lu.Rectangle = function(left, top, width, height) {
  this.getLeft = getLeft;
  function getLeft() {
    return left
  }
  Object.defineProperty(this, "left", {enumerable:true, get:getLeft});
  this.getTop = getTop;
  function getTop() {
    return top
  }
  Object.defineProperty(this, "top", {enumerable:true, get:getTop});
  this.getWidth = getWidth;
  function getWidth() {
    return width
  }
  Object.defineProperty(this, "width", {enumerable:true, get:getWidth});
  this.getHeight = getHeight;
  function getHeight() {
    return height
  }
  Object.defineProperty(this, "height", {enumerable:true, get:getHeight});
  this.toString = function() {
    return"[" + left.toString() + ", " + top.toString() + "] w=" + width.toString() + "; h=" + height.toString()
  };
  (function initialize() {
    if(typeof left !== "number") {
      throw"left has to be a number.";
    }
    if(typeof top !== "number") {
      throw"top has to be a number.";
    }
    if(typeof width !== "number") {
      throw"width has to be a number.";
    }
    if(typeof height !== "number") {
      throw"height has to be a number.";
    }
  }).call(this)
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
  this.getPhysicalShape = getPhysicalShape;
  function getPhysicalShape() {
    return physicalShape
  }
  Object.defineProperty(this, "physicalShape", {enumerable:true, configurable:false, get:getPhysicalShape});
  this.getEmotionalShape = getEmotionalShape;
  function getEmotionalShape() {
    return emotionalShape
  }
  Object.defineProperty(this, "emotionalShape", {enumerable:true, configurable:false, get:getEmotionalShape});
  this.getIntellectualShape = getIntellectualShape;
  function getIntellectualShape() {
    return intellectualShape
  }
  Object.defineProperty(this, "intellectualShape", {enumerable:true, configurable:false, get:getIntellectualShape});
  this.getIntuitiveShape = getIntuitiveShape;
  function getIntuitiveShape() {
    return intuitiveShape
  }
  Object.defineProperty(this, "intuitiveShape", {enumerable:true, configurable:false, get:getIntuitiveShape});
  this.getPrimaryBiorhythmShapes = function getPrimaryBiorhythmShapes() {
    return[physicalShape, emotionalShape, intellectualShape, intuitiveShape]
  };
  this.getPassionShape = getPassionShape;
  function getPassionShape() {
    return passionShape
  }
  Object.defineProperty(this, "passionShape", {enumerable:true, configurable:false, get:getPassionShape});
  this.getMasteryShape = getMasteryShape;
  function getMasteryShape() {
    return masteryShape
  }
  Object.defineProperty(this, "masteryShape", {enumerable:true, configurable:false, get:getMasteryShape});
  this.getWisdomShape = getWisdomShape;
  function getWisdomShape() {
    return wisdomShape
  }
  Object.defineProperty(this, "wisdomShape", {enumerable:true, configurable:false, get:getWisdomShape});
  this.getSecondaryBiorhythmShapes = function getSecondaryBiorhythmShapes() {
    return[passionShape, masteryShape, wisdomShape]
  };
  this.getPerceptionShape = getPerceptionShape;
  function getPerceptionShape() {
    return perceptionShape
  }
  Object.defineProperty(this, "perceptionShape", {enumerable:true, configurable:false, get:getPerceptionShape});
  this.getPsychicShape = getPsychicShape;
  function getPsychicShape() {
    return psychicShape
  }
  Object.defineProperty(this, "psychicShape", {enumerable:true, configurable:false, get:getPsychicShape});
  this.getSuccessShape = getSuccessShape;
  function getSuccessShape() {
    return successShape
  }
  Object.defineProperty(this, "successShape", {enumerable:true, configurable:false, get:getSuccessShape});
  this.getExtraBiorhythmShapes = function getExtraBiorhythmShapes() {
    return[perceptionShape, psychicShape, successShape]
  };
  this.getEstheticShape = getEstheticShape;
  function getEstheticShape() {
    return estheticShape
  }
  Object.defineProperty(this, "estheticShape", {enumerable:true, configurable:false, get:getEstheticShape});
  this.getSelfAwarenessShape = getSelfAwarenessShape;
  function getSelfAwarenessShape() {
    return selfAwarenessShape
  }
  Object.defineProperty(this, "selfAwarenessShape", {enumerable:true, configurable:false, get:getSelfAwarenessShape});
  this.getSpiritualShape = getSpiritualShape;
  function getSpiritualShape() {
    return spiritualShape
  }
  Object.defineProperty(this, "spiritualShape", {enumerable:true, configurable:false, get:getSpiritualShape});
  this.getIChingBiorhythmShapes = function getIChingBiorhythmShapes() {
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
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#ff0000";
  shape.birthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createEmotionalBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.EmotionalBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#32cd32";
  shape.birthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createIntellectualBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.IntellectualBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#1e90ff";
  shape.birthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createIntuitiveBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.IntuitiveBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#ffa500";
  shape.birthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPassionBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.PassionBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#ff0000";
  shape.setLineStyle(lu.LineStyle.dash);
  shape.birthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createMasteryBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.MasteryBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#1e90ff";
  shape.setLineStyle(lu.LineStyle.dashDot);
  shape.birthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createWisdomBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.WisdomBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#32cd32";
  shape.setLineStyle(lu.LineStyle.dashDotDot);
  shape.birthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPerceptionBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.PerceptionBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#ff0000";
  shape.setLineStyle(lu.LineStyle.dash);
  shape.birthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createPsychicBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.PsychicBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#32cd32";
  shape.setLineStyle(lu.LineStyle.dashDot);
  shape.birthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSuccessBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.SuccessBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#1e90ff";
  shape.setLineStyle(lu.LineStyle.dashDotDot);
  shape.birthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createEstheticBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.EstheticBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#ff0000";
  shape.birthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSelfAwarenessBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.SelfAwarenessBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#1e90ff";
  shape.birthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
  return shape
};
lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.createSpiritualBiorhythmShape = function() {
  var biorhythm = new lu.bioControls.core.biorhythms.SpiritualBiorhythm;
  var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#ffa500";
  shape.birthday = lu.bioControls.common.biorhythmModel.CommonBiorhythmShapes.defaultBirthday;
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
  var todayMarkerPainter = null;
  var gridLinesPainter = null;
  var biorhythmCurvesPainter = null;
  var dayLabelsPainter = null;
  var xDayMarkerPainter = null;
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
      todayMarkerPainter.paint(context, dataToPaint.todayMarker);
      gridLinesPainter.paint(context, dataToPaint.gridLines);
      biorhythmCurvesPainter.paint(context, dataToPaint.biorhythms);
      dayLabelsPainter.paint(context, dataToPaint.dayLabels);
      xDayMarkerPainter.paint(context, dataToPaint.xDayMarker)
    }
  }
  function clearCanvas(context) {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height)
  }
  (function initialize() {
    todayMarkerPainter = new lu.bioControls.common.painting.TodayMarkerPainter;
    gridLinesPainter = new lu.bioControls.common.painting.GridLinesPainter;
    biorhythmCurvesPainter = new lu.bioControls.common.painting.BiorhythmCurvesPainter;
    dayLabelsPainter = new lu.bioControls.common.painting.DayLabelsPainter;
    xDayMarkerPainter = new lu.bioControls.common.painting.XDayMarkerPainter
  })()
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
    setLinePattern(null);
    paintContext.beginPath();
    paintContext.rect(rect.getLeft(), rect.getTop(), rect.getWidth(), rect.getHeight());
    paintContext.strokeStyle = dataToPaint.lineColor;
    paintContext.lineWidth = dataToPaint.lineWidth;
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
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};
lu.bioControls.core.biorhythms.EmotionalBiorhythm = function() {
  var biorhythm = null;
  this.getName = function() {
    return"Emotional"
  };
  Object.defineProperty(this, "name", {value:"Emotional", writable:false, enumerable:true, configurable:false});
  this.getPeriodLength = function() {
    return biorhythm.period
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    biorhythm = new lu.bioControls.core.biorhythms.SinusoidalBiorhythm(28)
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
  Object.defineProperty(this, "name", {value:"Esthetic", writable:false, enumerable:true, configurable:false});
  this.getPeriodLength = function() {
    return biorhythm.period
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    biorhythm = new lu.bioControls.core.biorhythms.SinusoidalBiorhythm(43)
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
  Object.defineProperty(this, "name", {value:"Intellectual", writable:false, enumerable:true, configurable:false});
  this.getPeriodLength = function() {
    return biorhythm.period
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    biorhythm = new lu.bioControls.core.biorhythms.SinusoidalBiorhythm(33)
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
  Object.defineProperty(this, "name", {value:"Intuitive", writable:false, enumerable:true, configurable:false});
  this.getPeriodLength = function() {
    return biorhythm.period
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    biorhythm = new lu.bioControls.core.biorhythms.SinusoidalBiorhythm(38)
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
  Object.defineProperty(this, "name", {value:"Mastery", writable:false, enumerable:true, configurable:false});
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
  Object.defineProperty(this, "name", {value:"Passion", writable:false, enumerable:true, configurable:false});
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
  Object.defineProperty(this, "name", {value:"Perception", writable:false, enumerable:true, configurable:false});
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
  Object.defineProperty(this, "name", {value:"Physical", writable:false, enumerable:true, configurable:false});
  this.getPeriodLength = function() {
    return biorhythm.period
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    biorhythm = new lu.bioControls.core.biorhythms.SinusoidalBiorhythm(23)
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
  Object.defineProperty(this, "name", {value:"Psychic", writable:false, enumerable:true, configurable:false});
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
  Object.defineProperty(this, "name", {value:"Self Awareness", writable:false, enumerable:true, configurable:false});
  this.getPeriodLength = function() {
    return biorhythm.period
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    biorhythm = new lu.bioControls.core.biorhythms.SinusoidalBiorhythm(48)
  })()
};
var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};
lu.bioControls.core.biorhythms.SinusoidalBiorhythm = function(period) {
  var values = [];
  this.getPeriodLength = getPeriod;
  function getPeriod() {
    return period
  }
  this.setPeriodLength = function(value) {
    period = value;
    generateValues()
  };
  Object.defineProperty(this, "period", {enumerable:true, configurable:false, get:getPeriod});
  this.getValue = function(dayIndex) {
    if(period == 0) {
      return 0
    }
    var index = dayIndex % period;
    if(index < 0) {
      index += period
    }
    return values[index]
  };
  function generateValues() {
    values = [];
    for(var i = 0;i < period;i++) {
      values[i] = Math.sin(i * 2 * Math.PI / period)
    }
  }
  (function initialize() {
    if(period !== undefined) {
      if(typeof period !== "number") {
        throw"period should be a number.";
      }
      generateValues()
    }else {
      period = 0
    }
  })()
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
  Object.defineProperty(this, "name", {value:"Spiritual", writable:false, enumerable:true, configurable:false});
  this.getPeriodLength = function() {
    return biorhythm.period
  };
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    biorhythm = new lu.bioControls.core.biorhythms.SinusoidalBiorhythm(53)
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
  Object.defineProperty(this, "name", {value:"Success", writable:false, enumerable:true, configurable:false});
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
  Object.defineProperty(this, "name", {value:"Wisdom", writable:false, enumerable:true, configurable:false});
  this.getValue = function(dayIndex) {
    return biorhythm.getValue(dayIndex)
  };
  (function initialize() {
    var emotionalBiorhythm = new lu.bioControls.core.biorhythms.EmotionalBiorhythm;
    var intellectualBiorhythm = new lu.bioControls.core.biorhythms.IntellectualBiorhythm;
    biorhythm = new lu.bioControls.core.biorhythms.AverageBiorhythm(emotionalBiorhythm, intellectualBiorhythm)
  })()
};

