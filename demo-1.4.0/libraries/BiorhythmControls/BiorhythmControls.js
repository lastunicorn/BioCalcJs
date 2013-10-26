window.lu = window.lu || {};
lu.Namespacing = function() {
  function ensureNamespace(fullNamespaceName) {
    if(typeof fullNamespaceName !== "string") {
      throw"The name of the namespace to create has to be a string.";
    }
    if(fullNamespaceName === "") {
      throw"The name of the namespace to create has to be a non empty string.";
    }
    if(fullNamespaceName === ".") {
      throw"The name of the namespace to create cannot be a dot [.].";
    }
    var namespaceNames = fullNamespaceName.split(".");
    if(namespaceNames.length === 0) {
      throw"The name of the namespace to create has to be a non empty string.";
    }
    if(namespaceNames.length === 0) {
      return null
    }
    var lastNamespace = ensureNamespaceChain(namespaceNames);
    return lastNamespace
  }
  function ensureNamespaceChain(namespaceNames) {
    var currentNamespace = window;
    for(var i = 0;i < namespaceNames.length;i++) {
      currentNamespace = getOrCreateNamespace(namespaceNames[i], currentNamespace)
    }
    return currentNamespace
  }
  function getOrCreateNamespace(namespaceName, parentNamespace) {
    if(typeof parentNamespace[namespaceName] === "undefined") {
      parentNamespace[namespaceName] = {}
    }
    return parentNamespace[namespaceName]
  }
  function createModule(fullModuleName, module) {
    if(typeof fullModuleName !== "string") {
      return null
    }
    var moduleNameInfo = analizeModuleName(fullModuleName);
    var namespace = ensureNamespace(moduleNameInfo.namespaceName);
    namespace[moduleNameInfo.moduleName] = module;
    return module
  }
  function analizeModuleName(fullModuleName) {
    var namespaceName = null;
    var moduleName = null;
    var pos = fullModuleName.lastIndexOf(".");
    if(pos == -1) {
      moduleName = fullModuleName
    }else {
      namespaceName = fullModuleName.sustr(0, pos);
      moduleName = fullModuleName.subscr(pos + 1)
    }
    return{namespaceName:namespaceName, moduleName:moduleName}
  }
  return{createModule:createModule, ensureNamespace:ensureNamespace}
}();
window.lu = window.lu || {};
lu.DateUtil = {daysToMiliseconds:function(days) {
  return days * 24 * 60 * 60 * 1E3
}, milisecondsToDays:function(miliseconds) {
  return miliseconds / 1E3 / 60 / 60 / 24
}, milisecondsToWholeDays:function(miliseconds) {
  return Math.floor(this.milisecondsToDays(miliseconds))
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
}, getDateComponent:function(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}};
window.lu = window.lu || {};
lu.Event = function() {
  var eventHandlers = [];
  function subscribe(eventHandler) {
    if(typeof eventHandler !== "function") {
      throw"eventHandler is not a function.";
    }
    eventHandlers.push(eventHandler)
  }
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
  Object.defineProperty(this, "client", {value:{subscribe:subscribe, unsubscribe:unsubscribe}, enumerable:true, configurable:false, writable:false});
  this.raise = function(sender, arg) {
    for(var i = 0;i < eventHandlers.length;i++) {
      eventHandlers[i].call(sender, arg)
    }
  }
};
window.lu = window.lu || {};
lu.Inheritance = function() {
  function inherit(ctor, baseCtor) {
    if(typeof ctor !== "function") {
      throw"ctor parameter has to be a function";
    }
    if(typeof baseCtor !== "function") {
      throw"baseCtor parameter has to be a function";
    }
    ctor.prototype = Object.create(baseCtor.prototype);
    ctor.prototype.constructor = ctor
  }
  (function() {
    if(typeof Function.prototype.inherit === "undefined") {
      Function.prototype.inherit = function(baseCtor) {
        inherit(this, baseCtor)
      }
    }else {
      throw"Function.prototype.inherit already exists.";
    }
  })();
  return{inherit:inherit}
}();
window.lu = window.lu || {};
lu.Point = function(x, y) {
  Object.defineProperty(this, "x", {enumerable:true, get:getX});
  function getX() {
    return x
  }
  Object.defineProperty(this, "y", {enumerable:true, get:getY});
  function getY() {
    return y
  }
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
window.lu = window.lu || {};
(function(Point) {
  lu.Line = function(startPoint, endPoint) {
    Object.defineProperty(this, "startPoint", {enumerable:true, get:getStartPoint});
    function getStartPoint() {
      return startPoint
    }
    Object.defineProperty(this, "endPoint", {enumerable:true, get:getEndPoint});
    function getEndPoint() {
      return endPoint
    }
    this.toString = function() {
      return startPoint.toString() + " - " + endPoint.toString()
    };
    (function initialize() {
      if(!(startPoint instanceof Point)) {
        throw"startPoint is undefined.";
      }
      if(!(endPoint instanceof Point)) {
        throw"endPoint is undefined.";
      }
    }).call(this)
  }
})(lu.Point);
window.lu = window.lu || {};
lu.Rectangle = function(left, top, width, height) {
  Object.defineProperty(this, "left", {enumerable:true, get:getLeft});
  function getLeft() {
    return left
  }
  Object.defineProperty(this, "top", {enumerable:true, get:getTop});
  function getTop() {
    return top
  }
  Object.defineProperty(this, "width", {enumerable:true, get:getWidth});
  function getWidth() {
    return width
  }
  Object.defineProperty(this, "height", {enumerable:true, get:getHeight});
  function getHeight() {
    return height
  }
  this.toString = function() {
    return"[" + left.toString() + ", " + top.toString() + "] w\x3d" + width.toString() + "; h\x3d" + height.toString()
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
window.lu = window.lu || {};
lu.LineStyle = {solid:0, dash:1, dot:2, dashDot:3, dashDotDot:4};
window.lu = window.lu || {};
lu.LinePatternCalculator = function(LineStyle) {
  return{createPattern:function(lineStyle, lineWidth) {
    switch(lineStyle) {
      case LineStyle.solid:
        return[];
      case LineStyle.dot:
        return[lineWidth * 1, lineWidth * 3];
      case LineStyle.dash:
        return[lineWidth * 10, lineWidth * 5];
      case LineStyle.dashDot:
        return[lineWidth * 10, lineWidth * 3, lineWidth * 1, lineWidth * 3];
      case LineStyle.dashDotDot:
        return[lineWidth * 10, lineWidth * 3, lineWidth * 1, lineWidth * 3, lineWidth * 1, lineWidth * 3];
      default:
        return[]
    }
  }}
}(lu.LineStyle);
window.lu = window.lu || {};
(function(Event) {
  lu.List = function() {
    var array = [];
    var itemAddedEvent = new Event;
    this.itemAdded = itemAddedEvent.client;
    var itemAddingEvent = new Event;
    this.itemAdding = itemAddingEvent.client;
    var itemRemovedEvent = new Event;
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
  }
})(lu.Event);
window.lu = window.lu || {};
lu.MouseButton = {none:0, left:1, middle:2, right:3};
window.lu = window.lu || {};
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
    var size;
    size = [div.offsetWidth, div.offsetHeight];
    document.body.removeChild(div);
    return size
  }
  return{measureText:measureText}
}();
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
(function Version(bioControls) {
  Object.defineProperty(bioControls, "version", {value:"2.0.0", writable:false, enumerable:true, configurable:false})
})(lu.bioControls);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};
(function(Event, dateUtil) {
  lu.bioControls.biorhythms.SinusoidalBiorhythm = function(period) {
    var birthday = Date(80, 5, 13);
    var values = [];
    Object.defineProperty(this, "period", {enumerable:true, configurable:false, get:getPeriod});
    function getPeriod() {
      return period
    }
    function setPeriod(value) {
      period = value;
      generateValues()
    }
    var birthdayChangedEvent = new Event;
    this.birthdayChanged = birthdayChangedEvent.client;
    Object.defineProperty(this, "birthday", {enumerable:true, configurable:false, get:getBirthday, set:setBirthday});
    function getBirthday() {
      return birthday
    }
    function setBirthday(value) {
      if(typeof value !== "object" || !(value instanceof Date)) {
        throw"birthday should be a Date.";
      }
      if(value === birthday) {
        return
      }
      birthday = value;
      birthdayChangedEvent.raise(this, value)
    }
    this.getValue = function(day) {
      if(typeof day === "number") {
        return getValueByIndex(day)
      }
      if(typeof day === "object" && day instanceof Date) {
        return getValueByDate(day)
      }
      return 0
    };
    function getValueByIndex(dayIndex) {
      if(period == 0) {
        return 0
      }
      var index = dayIndex % period;
      if(index < 0) {
        index += period
      }
      return values[index]
    }
    function getValueByDate(date) {
      var milisecondsLived = date - birthday;
      var daysLived = dateUtil.milisecondsToWholeDays(milisecondsLived);
      return getValueByIndex(daysLived)
    }
    function generateValues() {
      values.length = 0;
      for(var i = 0;i < period;i++) {
        values[i] = Math.sin(i * 2 * Math.PI / period)
      }
    }
    (function initialize() {
      if(typeof period === "undefined") {
        period = 0
      }
      if(typeof period !== "number") {
        throw"period should be a number.";
      }
      generateValues()
    })()
  }
})(lu.Event, lu.DateUtil);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};
(function(Event) {
  lu.bioControls.biorhythms.AverageBiorhythm = function(biorhythmA, biorhythmB) {
    var birthdayChangedEvent = new Event;
    this.birthdayChanged = birthdayChangedEvent.client;
    Object.defineProperty(this, "birthday", {enumerable:true, configurable:false, get:getBirthday, set:setBirthday});
    function getBirthday() {
      return biorhythmA.birthday
    }
    function setBirthday(value) {
      if(typeof value !== "object" || !(value instanceof Date)) {
        throw"birthday should be a Date.";
      }
      if(value === biorhythmA.birthday && value === biorhythmB.birthday) {
        return
      }
      biorhythmA.birthday = value;
      biorhythmB.birthday = value;
      birthdayChangedEvent.raise(this, value)
    }
    this.getValue = function(day) {
      return(biorhythmA.getValue(day) + biorhythmB.getValue(day)) / 2
    };
    (function initialize() {
      if(!biorhythmA) {
        throw"biorhythmA should be an object.";
      }
      if(!biorhythmB) {
        throw"biorhythmB should be an object.";
      }
    }).call(this)
  }
})(lu.Event);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};
(function(SinusoidalBiorhythm) {
  lu.bioControls.biorhythms.EmotionalBiorhythm = function() {
    Object.defineProperty(this, "name", {value:"Emotional", writable:false, enumerable:true, configurable:false});
    (function initialize() {
      SinusoidalBiorhythm.call(this, 28)
    }).call(this)
  };
  lu.bioControls.biorhythms.EmotionalBiorhythm.inherit(SinusoidalBiorhythm)
})(lu.bioControls.biorhythms.SinusoidalBiorhythm);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};
(function(SinusoidalBiorhythm) {
  lu.bioControls.biorhythms.EstheticBiorhythm = function() {
    Object.defineProperty(this, "name", {value:"Esthetic", writable:false, enumerable:true, configurable:false});
    (function initialize() {
      SinusoidalBiorhythm.call(this, 43)
    }).call(this)
  };
  lu.bioControls.biorhythms.EstheticBiorhythm.inherit(SinusoidalBiorhythm)
})(lu.bioControls.biorhythms.SinusoidalBiorhythm);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};
(function(SinusoidalBiorhythm) {
  lu.bioControls.biorhythms.IntellectualBiorhythm = function() {
    Object.defineProperty(this, "name", {value:"Intellectual", writable:false, enumerable:true, configurable:false});
    (function initialize() {
      SinusoidalBiorhythm.call(this, 33)
    }).call(this)
  };
  lu.bioControls.biorhythms.IntellectualBiorhythm.inherit(SinusoidalBiorhythm)
})(lu.bioControls.biorhythms.SinusoidalBiorhythm);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};
(function(SinusoidalBiorhythm) {
  lu.bioControls.biorhythms.IntuitiveBiorhythm = function() {
    Object.defineProperty(this, "name", {value:"Intuitive", writable:false, enumerable:true, configurable:false});
    (function initialize() {
      SinusoidalBiorhythm.call(this, 38)
    }).call(this)
  };
  lu.bioControls.biorhythms.IntuitiveBiorhythm.inherit(SinusoidalBiorhythm)
})(lu.bioControls.biorhythms.SinusoidalBiorhythm);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};
(function(AverageBiorhythm) {
  lu.bioControls.biorhythms.MasteryBiorhythm = function() {
    Object.defineProperty(this, "name", {value:"Mastery", writable:false, enumerable:true, configurable:false});
    (function initialize() {
      var physicalBiorhythm = new lu.bioControls.biorhythms.PhysicalBiorhythm;
      var intellectualBiorhythm = new lu.bioControls.biorhythms.IntellectualBiorhythm;
      AverageBiorhythm.call(this, physicalBiorhythm, intellectualBiorhythm)
    }).call(this)
  };
  lu.bioControls.biorhythms.MasteryBiorhythm.inherit(AverageBiorhythm)
})(lu.bioControls.biorhythms.AverageBiorhythm);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};
(function(AverageBiorhythm) {
  lu.bioControls.biorhythms.PassionBiorhythm = function() {
    Object.defineProperty(this, "name", {value:"Passion", writable:false, enumerable:true, configurable:false});
    (function initialize() {
      var physicalBiorhythm = new lu.bioControls.biorhythms.PhysicalBiorhythm;
      var emotionalBiorhythm = new lu.bioControls.biorhythms.EmotionalBiorhythm;
      AverageBiorhythm.call(this, physicalBiorhythm, emotionalBiorhythm)
    }).call(this)
  };
  lu.bioControls.biorhythms.PassionBiorhythm.inherit(AverageBiorhythm)
})(lu.bioControls.biorhythms.AverageBiorhythm);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};
(function(AverageBiorhythm) {
  lu.bioControls.biorhythms.PerceptionBiorhythm = function() {
    Object.defineProperty(this, "name", {value:"Perception", writable:false, enumerable:true, configurable:false});
    (function initialize() {
      var physicalBiorhythm = new lu.bioControls.biorhythms.PhysicalBiorhythm;
      var intuitiveBiorhythm = new lu.bioControls.biorhythms.IntuitiveBiorhythm;
      AverageBiorhythm.call(this, physicalBiorhythm, intuitiveBiorhythm)
    }).call(this)
  };
  lu.bioControls.biorhythms.PerceptionBiorhythm.inherit(AverageBiorhythm)
})(lu.bioControls.biorhythms.AverageBiorhythm);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};
(function(SinusoidalBiorhythm) {
  lu.bioControls.biorhythms.PhysicalBiorhythm = function() {
    Object.defineProperty(this, "name", {value:"Physical", writable:false, enumerable:true, configurable:false});
    (function initialize() {
      SinusoidalBiorhythm.call(this, 23)
    }).call(this)
  };
  lu.bioControls.biorhythms.PhysicalBiorhythm.inherit(SinusoidalBiorhythm)
})(lu.bioControls.biorhythms.SinusoidalBiorhythm);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};
(function(AverageBiorhythm) {
  lu.bioControls.biorhythms.PsychicBiorhythm = function() {
    Object.defineProperty(this, "name", {value:"Psychic", writable:false, enumerable:true, configurable:false});
    (function initialize() {
      var emotionalBiorhythm = new lu.bioControls.biorhythms.EmotionalBiorhythm;
      var intuitiveBiorhythm = new lu.bioControls.biorhythms.IntuitiveBiorhythm;
      AverageBiorhythm.call(this, emotionalBiorhythm, intuitiveBiorhythm)
    }).call(this)
  };
  lu.bioControls.biorhythms.PsychicBiorhythm.inherit(AverageBiorhythm)
})(lu.bioControls.biorhythms.AverageBiorhythm);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};
(function(SinusoidalBiorhythm) {
  lu.bioControls.biorhythms.SelfAwarenessBiorhythm = function() {
    Object.defineProperty(this, "name", {value:"Self Awareness", writable:false, enumerable:true, configurable:false});
    (function initialize() {
      SinusoidalBiorhythm.call(this, 48)
    }).call(this)
  };
  lu.bioControls.biorhythms.SelfAwarenessBiorhythm.inherit(SinusoidalBiorhythm)
})(lu.bioControls.biorhythms.SinusoidalBiorhythm);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};
(function(SinusoidalBiorhythm) {
  lu.bioControls.biorhythms.SpiritualBiorhythm = function() {
    Object.defineProperty(this, "name", {value:"Spiritual", writable:false, enumerable:true, configurable:false});
    (function initialize() {
      SinusoidalBiorhythm.call(this, 53)
    }).call(this)
  };
  lu.bioControls.biorhythms.SpiritualBiorhythm.inherit(SinusoidalBiorhythm)
})(lu.bioControls.biorhythms.SinusoidalBiorhythm);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};
(function(AverageBiorhythm) {
  lu.bioControls.biorhythms.SuccessBiorhythm = function() {
    Object.defineProperty(this, "name", {value:"Success", writable:false, enumerable:true, configurable:false});
    (function initialize() {
      var intellectualBiorhythm = new lu.bioControls.biorhythms.IntellectualBiorhythm;
      var intuitiveBiorhythm = new lu.bioControls.biorhythms.IntuitiveBiorhythm;
      AverageBiorhythm.call(this, intellectualBiorhythm, intuitiveBiorhythm)
    }).call(this)
  };
  lu.bioControls.biorhythms.SuccessBiorhythm.inherit(AverageBiorhythm)
})(lu.bioControls.biorhythms.AverageBiorhythm);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};
(function(AverageBiorhythm) {
  lu.bioControls.biorhythms.WisdomBiorhythm = function() {
    Object.defineProperty(this, "name", {value:"Wisdom", writable:false, enumerable:true, configurable:false});
    (function initialize() {
      var emotionalBiorhythm = new lu.bioControls.biorhythms.EmotionalBiorhythm;
      var intellectualBiorhythm = new lu.bioControls.biorhythms.IntellectualBiorhythm;
      AverageBiorhythm.call(this, emotionalBiorhythm, intellectualBiorhythm)
    }).call(this)
  };
  lu.bioControls.biorhythms.WisdomBiorhythm.inherit(AverageBiorhythm)
})(lu.bioControls.biorhythms.AverageBiorhythm);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmModel = lu.bioControls.biorhythmModel || {};
lu.bioControls.biorhythmModel.BiorhythmsAdapter = function(configuration) {
  this.toArray = function() {
    return biorhythmsToArray()
  };
  this.destroy = function() {
    unsubscribeFromBiorhythmsEvents();
    var biorhythmsArray = biorhythmsToArray();
    for(var i = 0;i < biorhythmsArray.length;i++) {
      onBiorhithmRemoved(biorhythmsArray[i])
    }
  };
  function subscribeToBiorhythmsEvents() {
    if(!configuration || !configuration.biorhythms) {
      return
    }
    if(configuration.biorhythms.itemAdded && $.isFunction(configuration.biorhythms.itemAdded.subscribe)) {
      configuration.biorhythms.itemAdded.subscribe(onBiorhithmAdded)
    }
    if(configuration.biorhythms.itemRemoved && $.isFunction(configuration.biorhythms.itemRemoved.subscribe)) {
      configuration.biorhythms.itemRemoved.subscribe(onBiorhithmRemoved)
    }
  }
  function unsubscribeFromBiorhythmsEvents() {
    if(!configuration || !configuration.biorhythms) {
      return
    }
    if(configuration.biorhythms.itemAdded && $.isFunction(configuration.biorhythms.itemAdded.unsubscribe)) {
      configuration.biorhythms.itemAdded.unsubscribe(onBiorhithmAdded)
    }
    if(configuration.biorhythms.itemRemoved && $.isFunction(configuration.biorhythms.itemRemoved.unsubscribe)) {
      configuration.biorhythms.itemRemoved.unsubscribe(onBiorhithmRemoved)
    }
  }
  function onBiorhithmAdded(biorhythmShape) {
    if($.isFunction(configuration.onBiorhithmAdded)) {
      configuration.onBiorhithmAdded.call(this, biorhythmShape)
    }
  }
  function onBiorhithmRemoved(biorhythmShape) {
    if($.isFunction(configuration.onBiorhithmRemoved)) {
      configuration.onBiorhithmRemoved.call(this, biorhythmShape)
    }
  }
  function biorhythmsToArray() {
    if(!configuration || !configuration.biorhythms) {
      return[]
    }
    if(configuration.biorhythms instanceof Array) {
      return configuration.biorhythms
    }
    if($.isFunction(configuration.biorhythms.toArray)) {
      return configuration.biorhythms.toArray()
    }
    return[]
  }
  (function initialize() {
    subscribeToBiorhythmsEvents();
    var biorhythmsArray = biorhythmsToArray();
    for(var i = 0;i < biorhythmsArray.length;i++) {
      onBiorhithmAdded(biorhythmsArray[i])
    }
  })()
};
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmModel = lu.bioControls.biorhythmModel || {};
(function(Event, LineStyle) {
  lu.bioControls.biorhythmModel.BiorhythmShape = function() {
    var obj = this;
    var name = "New Biorhythm Shape";
    var nameChangedEvent = new Event;
    this.nameChanged = nameChangedEvent.client;
    Object.defineProperty(this, "name", {enumerable:true, configurable:false, get:getName, set:setName});
    function getName() {
      return name
    }
    function setName(value) {
      if(value === name) {
        return
      }
      name = value;
      nameChangedEvent.raise(obj, value)
    }
    var biorhythm = null;
    var biorhythmChangedEvent = new Event;
    this.biorhythmChanged = biorhythmChangedEvent.client;
    Object.defineProperty(this, "biorhythm", {enumerable:true, configurable:false, get:getBiorhythm, set:setBiorhythm});
    function getBiorhythm() {
      return biorhythm
    }
    function setBiorhythm(value) {
      if(value === biorhythm) {
        return
      }
      biorhythm = value;
      biorhythmChangedEvent.raise(obj, value)
    }
    var color = null;
    var colorChangedEvent = new Event;
    this.colorChanged = colorChangedEvent.client;
    Object.defineProperty(this, "color", {enumerable:true, configurable:false, get:getColor, set:setColor});
    function getColor() {
      return color
    }
    function setColor(value) {
      if(value === color) {
        return
      }
      color = value;
      colorChangedEvent.raise(obj, value)
    }
    var isVisible = true;
    var isVisibleChangedEvent = new Event;
    this.isVisibleChanged = isVisibleChangedEvent.client;
    Object.defineProperty(this, "isVisible", {enumerable:true, configurable:false, get:getIsVisible, set:setIsVisible});
    function getIsVisible() {
      return isVisible
    }
    function setIsVisible(value) {
      if(value === isVisible) {
        return
      }
      isVisible = value;
      isVisibleChangedEvent.raise(obj, value)
    }
    var lineWidth = 1;
    var lineWidthChangedEvent = new Event;
    this.lineWidthChanged = lineWidthChangedEvent.client;
    Object.defineProperty(this, "lineWidth", {enumerable:true, configurable:false, get:getLineWidth, set:setLineWidth});
    function getLineWidth() {
      return lineWidth
    }
    function setLineWidth(value) {
      if(value === lineWidth) {
        return
      }
      lineWidth = value;
      lineWidthChangedEvent.raise(obj, value)
    }
    var lineStyle = LineStyle.solid;
    var lineStyleChangedEvent = new Event;
    this.lineStyleChanged = lineStyleChangedEvent.client;
    Object.defineProperty(this, "lineStyle", {enumerable:true, configurable:false, get:getLineStyle, set:setLineStyle});
    function getLineStyle() {
      return lineStyle
    }
    function setLineStyle(value) {
      if(value === lineStyle) {
        return
      }
      lineStyle = value;
      lineStyleChangedEvent.raise(obj, value)
    }
  }
})(lu.Event, lu.LineStyle);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmModel = lu.bioControls.biorhythmModel || {};
lu.bioControls.biorhythmModel.BiorhythmShapesCreator = {defaultBirthday:new Date(1980, 5, 13), createPhysicalBiorhythmShape:function() {
  var biorhythm = new lu.bioControls.biorhythms.PhysicalBiorhythm;
  biorhythm.birthday = this.defaultBirthday;
  var shape = new lu.bioControls.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#ff0000";
  return shape
}, createEmotionalBiorhythmShape:function() {
  var biorhythm = new lu.bioControls.biorhythms.EmotionalBiorhythm;
  biorhythm.birthday = this.defaultBirthday;
  var shape = new lu.bioControls.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#32cd32";
  return shape
}, createIntellectualBiorhythmShape:function() {
  var biorhythm = new lu.bioControls.biorhythms.IntellectualBiorhythm;
  biorhythm.birthday = this.defaultBirthday;
  var shape = new lu.bioControls.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#1e90ff";
  return shape
}, createIntuitiveBiorhythmShape:function() {
  var biorhythm = new lu.bioControls.biorhythms.IntuitiveBiorhythm;
  biorhythm.birthday = this.defaultBirthday;
  var shape = new lu.bioControls.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#ffa500";
  return shape
}, createPassionBiorhythmShape:function() {
  var biorhythm = new lu.bioControls.biorhythms.PassionBiorhythm;
  biorhythm.birthday = this.defaultBirthday;
  var shape = new lu.bioControls.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#ff0000";
  shape.lineStyle = lu.LineStyle.dash;
  return shape
}, createMasteryBiorhythmShape:function() {
  var biorhythm = new lu.bioControls.biorhythms.MasteryBiorhythm;
  biorhythm.birthday = this.defaultBirthday;
  var shape = new lu.bioControls.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#1e90ff";
  shape.lineStyle = lu.LineStyle.dashDot;
  return shape
}, createWisdomBiorhythmShape:function() {
  var biorhythm = new lu.bioControls.biorhythms.WisdomBiorhythm;
  biorhythm.birthday = this.defaultBirthday;
  var shape = new lu.bioControls.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#32cd32";
  shape.lineStyle = lu.LineStyle.dashDotDot;
  return shape
}, createPerceptionBiorhythmShape:function() {
  var biorhythm = new lu.bioControls.biorhythms.PerceptionBiorhythm;
  biorhythm.birthday = this.defaultBirthday;
  var shape = new lu.bioControls.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#ff0000";
  shape.lineStyle = lu.LineStyle.dash;
  return shape
}, createPsychicBiorhythmShape:function() {
  var biorhythm = new lu.bioControls.biorhythms.PsychicBiorhythm;
  biorhythm.birthday = this.defaultBirthday;
  var shape = new lu.bioControls.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#32cd32";
  shape.lineStyle = lu.LineStyle.dashDot;
  return shape
}, createSuccessBiorhythmShape:function() {
  var biorhythm = new lu.bioControls.biorhythms.SuccessBiorhythm;
  biorhythm.birthday = this.defaultBirthday;
  var shape = new lu.bioControls.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#1e90ff";
  shape.lineStyle = lu.LineStyle.dashDotDot;
  return shape
}, createEstheticBiorhythmShape:function() {
  var biorhythm = new lu.bioControls.biorhythms.EstheticBiorhythm;
  biorhythm.birthday = this.defaultBirthday;
  var shape = new lu.bioControls.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#ff0000";
  return shape
}, createSelfAwarenessBiorhythmShape:function() {
  var biorhythm = new lu.bioControls.biorhythms.SelfAwarenessBiorhythm;
  biorhythm.birthday = this.defaultBirthday;
  var shape = new lu.bioControls.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#1e90ff";
  return shape
}, createSpiritualBiorhythmShape:function() {
  var biorhythm = new lu.bioControls.biorhythms.SpiritualBiorhythm;
  biorhythm.birthday = this.defaultBirthday;
  var shape = new lu.bioControls.biorhythmModel.BiorhythmShape;
  shape.name = biorhythm.name + " Shape";
  shape.biorhythm = biorhythm;
  shape.color = "#ffa500";
  return shape
}};
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmModel = lu.bioControls.biorhythmModel || {};
lu.bioControls.biorhythmModel.BiorhythmShapeSet = function(items) {
  Object.defineProperty(this, "items", {value:items, enumerable:true, configurable:false, writable:false});
  this.isAnyVisible = function() {
    for(var i = 0;i < items.length;i++) {
      if(items[i].isVisible) {
        return true
      }
    }
    return false
  };
  this.isAnyHidden = function() {
    for(var i = 0;i < items.length;i++) {
      if(!items[i].isVisible) {
        return true
      }
    }
    return false
  };
  this.areAllVisible = function() {
    for(var i = 0;i < items.length;i++) {
      if(!items[i].isVisible) {
        return false
      }
    }
    return true
  };
  this.areAllHidden = function() {
    for(var i = 0;i < items.length;i++) {
      if(items[i].isVisible) {
        return false
      }
    }
    return true
  };
  this.showAll = function(value) {
    if(value === undefined || value) {
      for(var i = 0;i < items.length;i++) {
        items[i].isVisible = true
      }
    }else {
      this.hideAll()
    }
  };
  this.hideAll = function() {
    for(var i = 0;i < items.length;i++) {
      items[i].isVisible = false
    }
  };
  this.setBirthdayOnAll = function(birthday) {
    for(var i = 0;i < items.length;i++) {
      items[i].biorhythm.birthday = birthday
    }
  };
  (function initialize() {
    if(typeof items !== "object" || !(items instanceof Array)) {
      throw"items must be an array of BiorhythmShape objects.";
    }
  })()
};
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmModel = lu.bioControls.biorhythmModel || {};
(function(BiorhythmShapeSet, biorhythmShapesCreator) {
  lu.bioControls.biorhythmModel.PrimaryBiorhythmsSet = function() {
    var physicalShape = null;
    Object.defineProperty(this, "physicalShape", {enumerable:true, configurable:false, get:getPhysicalShape});
    function getPhysicalShape() {
      return physicalShape
    }
    var emotionalShape = null;
    Object.defineProperty(this, "emotionalShape", {enumerable:true, configurable:false, get:getEmotionalShape});
    function getEmotionalShape() {
      return emotionalShape
    }
    var intellectualShape = null;
    Object.defineProperty(this, "intellectualShape", {enumerable:true, configurable:false, get:getIntellectualShape});
    function getIntellectualShape() {
      return intellectualShape
    }
    var intuitiveShape = null;
    Object.defineProperty(this, "intuitiveShape", {enumerable:true, configurable:false, get:getIntuitiveShape});
    function getIntuitiveShape() {
      return intuitiveShape
    }
    (function initialize() {
      physicalShape = biorhythmShapesCreator.createPhysicalBiorhythmShape();
      emotionalShape = biorhythmShapesCreator.createEmotionalBiorhythmShape();
      intellectualShape = biorhythmShapesCreator.createIntellectualBiorhythmShape();
      intuitiveShape = biorhythmShapesCreator.createIntuitiveBiorhythmShape();
      BiorhythmShapeSet.call(this, [physicalShape, emotionalShape, intellectualShape, intuitiveShape])
    }).call(this)
  };
  lu.bioControls.biorhythmModel.PrimaryBiorhythmsSet.inherit(BiorhythmShapeSet)
})(lu.bioControls.biorhythmModel.BiorhythmShapeSet, lu.bioControls.biorhythmModel.BiorhythmShapesCreator);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmModel = lu.bioControls.biorhythmModel || {};
(function(BiorhythmShapeSet, biorhythmShapesCreator) {
  lu.bioControls.biorhythmModel.SecondaryBiorhythmsSet = function() {
    var passionShape = null;
    Object.defineProperty(this, "passionShape", {enumerable:true, configurable:false, get:getPassionShape});
    function getPassionShape() {
      return passionShape
    }
    var masteryShape = null;
    Object.defineProperty(this, "masteryShape", {enumerable:true, configurable:false, get:getMasteryShape});
    function getMasteryShape() {
      return masteryShape
    }
    var wisdomShape = null;
    Object.defineProperty(this, "wisdomShape", {enumerable:true, configurable:false, get:getWisdomShape});
    function getWisdomShape() {
      return wisdomShape
    }
    (function initialize() {
      passionShape = biorhythmShapesCreator.createPassionBiorhythmShape();
      masteryShape = biorhythmShapesCreator.createMasteryBiorhythmShape();
      wisdomShape = biorhythmShapesCreator.createWisdomBiorhythmShape();
      BiorhythmShapeSet.call(this, [passionShape, masteryShape, wisdomShape])
    }).call(this)
  };
  lu.bioControls.biorhythmModel.SecondaryBiorhythmsSet.inherit(BiorhythmShapeSet)
})(lu.bioControls.biorhythmModel.BiorhythmShapeSet, lu.bioControls.biorhythmModel.BiorhythmShapesCreator);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmModel = lu.bioControls.biorhythmModel || {};
(function(BiorhythmShapeSet, biorhythmShapesCreator) {
  lu.bioControls.biorhythmModel.ExtraBiorhythmsSet = function() {
    var perceptionShape = null;
    Object.defineProperty(this, "perceptionShape", {enumerable:true, configurable:false, get:getPerceptionShape});
    function getPerceptionShape() {
      return perceptionShape
    }
    var psychicShape = null;
    Object.defineProperty(this, "psychicShape", {enumerable:true, configurable:false, get:getPsychicShape});
    function getPsychicShape() {
      return psychicShape
    }
    var successShape = null;
    Object.defineProperty(this, "successShape", {enumerable:true, configurable:false, get:getSuccessShape});
    function getSuccessShape() {
      return successShape
    }
    (function initialize() {
      perceptionShape = biorhythmShapesCreator.createPerceptionBiorhythmShape();
      psychicShape = biorhythmShapesCreator.createPsychicBiorhythmShape();
      successShape = biorhythmShapesCreator.createSuccessBiorhythmShape();
      BiorhythmShapeSet.call(this, [perceptionShape, psychicShape, successShape])
    }).call(this)
  };
  lu.bioControls.biorhythmModel.ExtraBiorhythmsSet.inherit(BiorhythmShapeSet)
})(lu.bioControls.biorhythmModel.BiorhythmShapeSet, lu.bioControls.biorhythmModel.BiorhythmShapesCreator);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmModel = lu.bioControls.biorhythmModel || {};
(function(BiorhythmShapeSet, biorhythmShapesCreator) {
  lu.bioControls.biorhythmModel.IChingBiorhythmsSet = function() {
    var estheticShape = null;
    Object.defineProperty(this, "estheticShape", {enumerable:true, configurable:false, get:getEstheticShape});
    function getEstheticShape() {
      return estheticShape
    }
    var selfAwarenessShape = null;
    Object.defineProperty(this, "selfAwarenessShape", {enumerable:true, configurable:false, get:getSelfAwarenessShape});
    function getSelfAwarenessShape() {
      return selfAwarenessShape
    }
    var spiritualShape = null;
    Object.defineProperty(this, "spiritualShape", {enumerable:true, configurable:false, get:getSpiritualShape});
    function getSpiritualShape() {
      return spiritualShape
    }
    (function initialize() {
      estheticShape = biorhythmShapesCreator.createEstheticBiorhythmShape();
      selfAwarenessShape = biorhythmShapesCreator.createSelfAwarenessBiorhythmShape();
      spiritualShape = biorhythmShapesCreator.createSpiritualBiorhythmShape();
      BiorhythmShapeSet.call(this, [estheticShape, selfAwarenessShape, spiritualShape])
    }).call(this)
  };
  lu.bioControls.biorhythmModel.IChingBiorhythmsSet.inherit(BiorhythmShapeSet)
})(lu.bioControls.biorhythmModel.BiorhythmShapeSet, lu.bioControls.biorhythmModel.BiorhythmShapesCreator);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmModel = lu.bioControls.biorhythmModel || {};
(function(PrimaryBiorhythmsSet, SecondaryBiorhythmsSet, ExtraBiorhythmsSet, IChingBiorhythmsSet) {
  lu.bioControls.biorhythmModel.CommonBiorhythmsContainer = function() {
    var primaryBiorhythmsSet = null;
    Object.defineProperty(this, "primaryBiorhythmShapes", {enumerable:true, configurable:false, get:function() {
      return primaryBiorhythmsSet
    }});
    var secondaryBiorhythmsSet = null;
    Object.defineProperty(this, "secondaryBiorhythmShapes", {enumerable:true, configurable:false, get:function() {
      return secondaryBiorhythmsSet
    }});
    var extraBiorhythmsSet = null;
    Object.defineProperty(this, "extraBiorhythmShapes", {enumerable:true, configurable:false, get:function() {
      return extraBiorhythmsSet
    }});
    var iChingBiorhythmsSet = null;
    Object.defineProperty(this, "iChingBiorhythmShapes", {enumerable:true, configurable:false, get:function() {
      return iChingBiorhythmsSet
    }});
    this.setBirthdayOnAll = function(birthday) {
      primaryBiorhythmsSet.setBirthdayOnAll(birthday);
      secondaryBiorhythmsSet.setBirthdayOnAll(birthday);
      extraBiorhythmsSet.setBirthdayOnAll(birthday);
      iChingBiorhythmsSet.setBirthdayOnAll(birthday)
    };
    this.toArray = function() {
      var list = [];
      addRange(primaryBiorhythmsSet.items, list);
      addRange(secondaryBiorhythmsSet.items, list);
      addRange(extraBiorhythmsSet.items, list);
      addRange(iChingBiorhythmsSet.items, list);
      return list
    };
    function addRange(source, destination) {
      for(var i = 0;i < source.length;i++) {
        destination.push(source[i])
      }
    }
    (function initialize() {
      createBiorhythmShapes()
    })();
    function createBiorhythmShapes() {
      primaryBiorhythmsSet = new PrimaryBiorhythmsSet;
      secondaryBiorhythmsSet = new SecondaryBiorhythmsSet;
      secondaryBiorhythmsSet.hideAll();
      extraBiorhythmsSet = new ExtraBiorhythmsSet;
      extraBiorhythmsSet.hideAll();
      iChingBiorhythmsSet = new IChingBiorhythmsSet;
      iChingBiorhythmsSet.hideAll()
    }
  }
})(lu.bioControls.biorhythmModel.PrimaryBiorhythmsSet, lu.bioControls.biorhythmModel.SecondaryBiorhythmsSet, lu.bioControls.biorhythmModel.ExtraBiorhythmsSet, lu.bioControls.biorhythmModel.IChingBiorhythmsSet);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmView = lu.bioControls.biorhythmView || {};
lu.bioControls.biorhythmView.DayLabelPosition = {top:0, aboveMiddle:1, belowMiddle:2, bottom:3};
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmView = lu.bioControls.biorhythmView || {};
lu.bioControls.biorhythmView.WeekDayNamesProvider = function() {
  var weekDayShortNames;
  weekDayShortNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  function getWeekDayName(weekDay) {
    if(typeof weekDay !== "number") {
      return""
    }
    return weekDayShortNames[weekDay]
  }
  return{getWeekDayName:getWeekDayName}
}();
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmView = lu.bioControls.biorhythmView || {};
(function(mouseButton) {
  lu.bioControls.biorhythmView.Scroller = function(configuration) {
    var defaultStepLength = 1;
    var stepLength = 1;
    var isCtrlPressed = false;
    var buttonPressed = mouseButton.none;
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
      if(typeof arg.stepLength !== "number") {
        return defaultStepLength
      }
      return arg.stepLength
    }
    function onMouseDown(evt) {
      var isLeftOrRightButton = evt.which === mouseButton.left || evt.which === mouseButton.right;
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
      var isAlternative = isCtrlPressed || buttonPressed === mouseButton.right;
      raiseOnDrag({steps:steps, isAlternative:isAlternative})
    }
    function onMouseUp(evt) {
      if(isDragging) {
        isDragging = false;
        buttonPressed = mouseButton.none
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
      if(!configuration.element) {
        return
      }
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
  }
})(lu.MouseButton);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmView = lu.bioControls.biorhythmView || {};
lu.bioControls.biorhythmView.painting = lu.bioControls.biorhythmView.painting || {};
(function(Point, dateUtil, linePatternCalculator) {
  lu.bioControls.biorhythmView.painting.BiorhythmCurvesPainter = function() {
    var paintData = null;
    var paintContext = null;
    var paintRectangle = null;
    var margin = 10;
    this.paint = function(data, context, rectangle) {
      paintData = data;
      paintRectangle = rectangle;
      paintContext = context;
      paintBiorhythms()
    };
    function paintBiorhythms() {
      for(var i = 0;i < paintData.biorhythmShapes.length;i++) {
        var biorhythmShape = paintData.biorhythmShapes[i];
        if(!biorhythmShape.isVisible) {
          continue
        }
        var points = calculateBiorhythmPoints(biorhythmShape.biorhythm);
        paintBiorhythm({points:points, color:biorhythmShape.color, lineWidth:biorhythmShape.lineWidth, lineStyle:biorhythmShape.lineStyle})
      }
    }
    function calculateBiorhythmPoints(biorhythm) {
      var xStep = paintRectangle.width / paintData.totalDays;
      var xOffset = xStep / 2;
      var yOffset = margin + (paintRectangle.height - 2 * margin) / 2;
      var amplitude = paintRectangle.height / 2 - 2 * margin;
      var points = [];
      for(var index = 0;index < paintData.totalDays;index++) {
        var x = xOffset + index * xStep;
        var date = dateUtil.addDays(paintData.firstDay, index);
        var y = yOffset - biorhythm.getValue(date) * amplitude;
        points[index] = new Point(x, y)
      }
      return points
    }
    function paintBiorhythm(biorhythmPaintData) {
      var linePattern = linePatternCalculator.createPattern(biorhythmPaintData.lineStyle, biorhythmPaintData.lineWidth);
      setLinePattern(linePattern);
      paintContext.strokeStyle = biorhythmPaintData.color;
      paintContext.lineWidth = biorhythmPaintData.lineWidth;
      paintContext.lineJoin = "round";
      paintContext.beginPath();
      for(var i = 0;i < biorhythmPaintData.points.length;i++) {
        paintContext.lineTo(biorhythmPaintData.points[i].x, biorhythmPaintData.points[i].y)
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
  }
})(lu.Point, lu.DateUtil, lu.LinePatternCalculator);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmView = lu.bioControls.biorhythmView || {};
lu.bioControls.biorhythmView.painting = lu.bioControls.biorhythmView.painting || {};
(function(Point, textUtil, weekDayNamesProvider, DayLabelPosition) {
  lu.bioControls.biorhythmView.painting.DayLabelsPainter = function() {
    var paintData = null;
    var paintContext = null;
    var paintRectangle = null;
    var currentFont = null;
    var textHeight = 12;
    this.paint = function(data, context, rectangle) {
      paintData = data;
      paintRectangle = rectangle;
      paintContext = context;
      calculateTextSize();
      calculateDayLabels()
    };
    function calculateDayLabels() {
      var areDayNumbersVisible = paintData.areDayNumbersVisible;
      var areWeekDaysVisible = paintData.areWeekDaysVisible && !(paintData.areDayNumbersVisible && paintData.weekDaysPosition === paintData.dayNumbersPosition);
      if(!areDayNumbersVisible && !areWeekDaysVisible) {
        return null
      }
      var day = new Date(paintData.firstDay.getTime());
      paintContext.textAlign = "center";
      paintContext.textBaseline = "middle";
      currentFont = null;
      for(var i = 0;i < paintData.totalDays;i++) {
        if(areDayNumbersVisible) {
          paintLabel(calculateDayNumberPaintInfo(i, day))
        }
        if(areWeekDaysVisible) {
          paintLabel(calculateWeekDayPaintInfo(day, i))
        }
        day.setDate(day.getDate() + 1)
      }
    }
    function calculateTextSize() {
      var textSize = textUtil.measureText({text:"0jf", font:paintData.font});
      var textSizeEmphasized = textUtil.measureText({text:"0jf", font:paintData.sundaysFont});
      textHeight = Math.max(textSize[1], textSizeEmphasized[1])
    }
    function calculateDayNumberPaintInfo(i, day) {
      var text = day.getDate().toString();
      var position = calculateDayNumberLocation(i, paintData.dayNumbersPosition);
      var isEmphasized = paintData.areSundaysEmphasized && day.getDay() === 0;
      var paintInfo = {text:text, position:position, isEmphasized:isEmphasized};
      return paintInfo
    }
    function calculateWeekDayPaintInfo(day, i) {
      var text = weekDayNamesProvider.getWeekDayName(day.getDay());
      var position = calculateDayNumberLocation(i, paintData.weekDaysPosition);
      var isEmphasized = paintData.areSundaysEmphasized && day.getDay() === 0;
      var paintInfo = {text:text, position:position, isEmphasized:isEmphasized};
      return paintInfo
    }
    function calculateDayNumberLocation(index, position) {
      var xStep = paintRectangle.width / paintData.totalDays;
      var daysFontHeight = (textHeight + 3) / 2;
      switch(position) {
        case DayLabelPosition.top:
          return new Point(xStep * index + xStep / 2, daysFontHeight);
        default:
        ;
        case DayLabelPosition.aboveMiddle:
          return new Point(xStep * index + xStep / 2, paintRectangle.height / 2 - daysFontHeight);
        case DayLabelPosition.belowMiddle:
          return new Point(xStep * index + xStep / 2, paintRectangle.height / 2 + daysFontHeight);
        case DayLabelPosition.bottom:
          return new Point(xStep * index + xStep / 2, paintRectangle.height - daysFontHeight)
      }
    }
    function paintLabel(label) {
      if(label.isEmphasized) {
        paintContext.fillStyle = paintData.sundaysColor;
        if(currentFont !== paintData.sundaysFont) {
          paintContext.font = paintData.sundaysFont
        }
      }else {
        paintContext.fillStyle = paintData.foreColor;
        if(currentFont !== paintData.font) {
          paintContext.font = paintData.font
        }
      }
      paintContext.fillText(label.text, label.position.x, label.position.y)
    }
  }
})(lu.Point, lu.TextUtil, lu.bioControls.biorhythmView.WeekDayNamesProvider, lu.bioControls.biorhythmView.DayLabelPosition);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmView = lu.bioControls.biorhythmView || {};
lu.bioControls.biorhythmView.painting = lu.bioControls.biorhythmView.painting || {};
(function(Point, Line) {
  lu.bioControls.biorhythmView.painting.GridLinesPainter = function() {
    var paintData = null;
    var paintContext = null;
    var paintRectangle = null;
    this.paint = function(data, context, rectangle) {
      paintData = data;
      paintRectangle = rectangle;
      paintContext = context;
      if(!paintData.isGridVisible) {
        return
      }
      for(var i = 0;i < paintData.totalDays - 1;i++) {
        paintContext.strokeStyle = paintData.gridColor;
        paintContext.lineWidth = 1;
        paintContext.lineJoin = "round";
        setLinePattern([]);
        var line = calculateDaySeparatorLine(i);
        paintLine(line)
      }
      var axis = calculateXAxis();
      paintLine(axis)
    };
    function calculateDaySeparatorLine(dayIndex) {
      var xStep = paintRectangle.width / paintData.totalDays;
      var index = dayIndex + 1;
      var startPoint = new Point(xStep * index, 0);
      var endPoint = new Point(xStep * index, paintRectangle.height);
      return new Line(startPoint, endPoint)
    }
    function calculateXAxis() {
      var startPoint = new Point(0, paintRectangle.height / 2);
      var endPoint = new Point(paintRectangle.width, paintRectangle.height / 2);
      return new Line(startPoint, endPoint)
    }
    function paintLine(line) {
      paintContext.beginPath();
      paintContext.moveTo(line.startPoint.x, line.startPoint.y);
      paintContext.lineTo(line.endPoint.x, line.endPoint.y);
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
  }
})(lu.Point, lu.Line);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmView = lu.bioControls.biorhythmView || {};
lu.bioControls.biorhythmView.painting = lu.bioControls.biorhythmView.painting || {};
(function(Rectangle, dateUtil) {
  lu.bioControls.biorhythmView.painting.TodayMarkerPainter = function() {
    var paintData = null;
    var paintContext = null;
    var paintRectangle = null;
    this.paint = function(data, context, rectangle) {
      paintData = data;
      paintRectangle = rectangle;
      paintContext = context;
      var rectangle = calculateTodayRectangle();
      if(rectangle) {
        paintTodayMarker(rectangle, paintData.todayBackColor)
      }
    };
    function calculateTodayRectangle() {
      var todayIndex = calculateTodayIndex();
      var isTodayVisible = todayIndex >= 0 && todayIndex < paintData.totalDays;
      if(!isTodayVisible) {
        return null
      }
      var xStep = paintRectangle.width / paintData.totalDays;
      var x = todayIndex * xStep;
      var y = 0;
      var width = xStep;
      var height = paintRectangle.height;
      return new Rectangle(x, y, width, height)
    }
    function calculateTodayIndex() {
      var today = dateUtil.getDateComponent(new Date);
      var firstDay = dateUtil.getDateComponent(paintData.firstDay);
      var todayIndexInMiliseconds = today - firstDay;
      return dateUtil.milisecondsToWholeDays(todayIndexInMiliseconds)
    }
    function paintTodayMarker(rectangle, color) {
      paintContext.beginPath();
      paintContext.rect(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
      paintContext.fillStyle = color;
      paintContext.fill()
    }
  }
})(lu.Rectangle, lu.DateUtil);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmView = lu.bioControls.biorhythmView || {};
lu.bioControls.biorhythmView.painting = lu.bioControls.biorhythmView.painting || {};
(function(Rectangle) {
  lu.bioControls.biorhythmView.painting.XDayMarkerPainter = function() {
    var paintData = null;
    var paintContext = null;
    var paintRectangle = null;
    this.paint = function(data, context, rectangle) {
      paintData = data;
      paintRectangle = rectangle;
      paintContext = context;
      var data = calculateXDayMarker();
      if(data) {
        paintXDayMarker(data)
      }
    };
    function calculateXDayMarker() {
      if(!paintData.isXDayVisible) {
        return null
      }
      var xStep = paintRectangle.width / paintData.totalDays;
      var x = xStep * paintData.xDayIndex;
      var y = 0;
      var width = xStep;
      var height = paintRectangle.height;
      return new Rectangle(x, y, width, height)
    }
    function paintXDayMarker(rectangle) {
      setLinePattern([]);
      paintContext.beginPath();
      paintContext.rect(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
      paintContext.strokeStyle = paintData.xDayBorderColor;
      paintContext.lineWidth = paintData.xDayBorderWidth;
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
  }
})(lu.Rectangle);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmView = lu.bioControls.biorhythmView || {};
lu.bioControls.biorhythmView.painting = lu.bioControls.biorhythmView.painting || {};
(function(TodayMarkerPainter, GridLinesPainter, BiorhythmCurvesPainter, DayLabelsPainter, XDayMarkerPainter) {
  lu.bioControls.biorhythmView.painting.Painter = function() {
    var paintData = null;
    var paintContext = null;
    var paintRectangle = null;
    var paintCount = 0;
    var painters = [];
    this.getPaintCount = function() {
      return paintCount
    };
    this.paint = function(data, context, rectangle) {
      paintCount++;
      paintData = data;
      paintRectangle = rectangle;
      paintContext = context;
      paintAll()
    };
    function paintAll() {
      clearCanvas(paintContext);
      for(var i = 0;i < painters.length;i++) {
        runPainter(painters[i])
      }
    }
    function runPainter(painter) {
      if($.isFunction(painter.paint)) {
        painter.paint(paintData, paintContext, paintRectangle)
      }
    }
    function clearCanvas(context) {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, paintRectangle.width, paintRectangle.height)
    }
    (function initialize() {
      painters.push(new TodayMarkerPainter);
      painters.push(new GridLinesPainter);
      painters.push(new BiorhythmCurvesPainter);
      painters.push(new DayLabelsPainter);
      painters.push(new XDayMarkerPainter)
    })()
  }
})(lu.bioControls.biorhythmView.painting.TodayMarkerPainter, lu.bioControls.biorhythmView.painting.GridLinesPainter, lu.bioControls.biorhythmView.painting.BiorhythmCurvesPainter, lu.bioControls.biorhythmView.painting.DayLabelsPainter, lu.bioControls.biorhythmView.painting.XDayMarkerPainter);
(function($, dateUtil, DayLabelPosition, Scroller, BiorhythmsAdapter, Rectangle, Painter) {
  $.widget("lastunicorn.biorhythmView", {options:{width:800, height:200, biorhythms:[], firstDay:dateUtil.addDays(Date.now(), -7), isGridVisible:true, totalDays:30, xDayIndex:7, gridColor:"#d3d3d3", areDayNumbersVisible:true, areWeekDaysVisible:true, dayNumbersPosition:DayLabelPosition.top, weekDaysPosition:DayLabelPosition.bottom, areSundaysEmphasized:true, foreColor:"#b0b0b0", sundaysColor:"#ff0000", font:"12px Arial", sundaysFont:"italic 12px Arial", todayBackColor:"#ffe4b5", isXDayVisible:true, 
  xDayBorderColor:"#000000", xDayBorderWidth:2}, _create:function() {
    this._$canvas = this._createCanvasElement();
    this.element.append(this._$canvas);
    new Scroller({element:this._$canvas[0], onDrag:$.proxy(this._onDrag, this), onDragStart:$.proxy(this._onDragStart, this)});
    this._biorhythms = new BiorhythmsAdapter({biorhythms:this.options.biorhythms, onBiorhithmAdded:$.proxy(this._onBiorhithmAdded, this), onBiorhithmRemoved:$.proxy(this._onBiorhithmRemoved, this)});
    this._paint()
  }, _setOption:function(key, value) {
    this.suspendPaint();
    try {
      if(key === "biorhythms") {
        this._biorhythms.destroy();
        this._super(key, value);
        this._biorhythms = new BiorhythmsAdapter({biorhythms:this.options.biorhythms, onBiorhithmAdded:$.proxy(this._onBiorhithmAdded, this), onBiorhithmRemoved:$.proxy(this._onBiorhithmRemoved, this)})
      }
      if(key === "firstDayChanged") {
        this._super(key, value)
      }
      if(key === "firstDay") {
        this._super(key, value);
        this._trigger("firstDayChanged", this, {value:this.options.firstDay})
      }
      if(key === "isGridVisibleChanged") {
        this._super(key, value)
      }
      if(key === "isGridVisible") {
        this._super(key, value);
        this._trigger("isGridVisibleChanged", this, {value:this.options.isGridVisible})
      }
      if(key === "totalDaysChanged") {
        this._super(key, value)
      }
      if(key === "totalDays") {
        this._super(key, value);
        this._trigger("totalDaysChanged", this, {value:this.options.totalDays})
      }
      if(key === "xDayIndexChanged") {
        this._super(key, value)
      }
      if(key === "xDayIndex") {
        if(this.options.xDayIndex === value || value < 0 || value >= this.options.totalDays) {
          return
        }
        this._super(key, value);
        this._trigger("xDayIndexChanged", this, {value:this.options.xDayIndex})
      }
      if(key === "gridColorChanged") {
        this._super(key, value)
      }
      if(key === "gridColor") {
        this._super(key, value);
        this._trigger("gridColorChanged", this, {value:this.options.gridColor})
      }
      if(key === "areDayNumbersVisibleChanged") {
        this._super(key, value)
      }
      if(key === "areDayNumbersVisible") {
        this._super(key, value);
        this._trigger("areDayNumbersVisibleChanged", this, {value:this.options.areDayNumbersVisible})
      }
      if(key === "areWeekDaysVisibleChanged") {
        this._super(key, value)
      }
      if(key === "areWeekDaysVisible") {
        this._super(key, value);
        this._trigger("areWeekDaysVisibleChanged", this, {value:this.options.areWeekDaysVisible})
      }
      if(key === "dayNumbersPositionChanged") {
        this._super(key, value)
      }
      if(key === "dayNumbersPosition") {
        this._super(key, value);
        this._trigger("dayNumbersPositionChanged", this, {value:this.options.dayNumbersPosition})
      }
      if(key === "weekDaysPositionChanged") {
        this._super(key, value)
      }
      if(key === "weekDaysPosition") {
        this._super(key, value);
        this._trigger("weekDaysPositionChanged", this, {value:this.options.weekDaysPosition})
      }
      if(key === "areSundaysEmphasizedChanged") {
        this._super(key, value)
      }
      if(key === "areSundaysEmphasized") {
        this._super(key, value);
        this._trigger("areSundaysEmphasizedChanged", this, {value:this.options.areSundaysEmphasized})
      }
      if(key === "foreColorChanged") {
        this._super(key, value)
      }
      if(key === "foreColor") {
        this._super(key, value);
        this._trigger("foreColorChanged", this, {value:this.options.foreColor})
      }
      if(key === "sundaysColorChanged") {
        this._super(key, value)
      }
      if(key === "sundaysColor") {
        this._super(key, value);
        this._trigger("sundaysColorChanged", this, {value:this.options.sundaysColor})
      }
      if(key === "fontChanged") {
        this._super(key, value)
      }
      if(key === "font") {
        this._super(key, value);
        this._trigger("fontChanged", this, {value:this.options.font})
      }
      if(key === "sundaysFontChanged") {
        this._super(key, value)
      }
      if(key === "sundaysFont") {
        this._super(key, value);
        this._trigger("sundaysFontChanged", this, {value:this.options.sundaysFont})
      }
      if(key === "todayBackColorChanged") {
        this._super(key, value)
      }
      if(key === "todayBackColor") {
        this._super(key, value);
        this._trigger("todayBackColorChanged", this, {value:this.options.todayBackColor})
      }
      if(key === "isXDayVisibleChanged") {
        this._super(key, value)
      }
      if(key === "isXDayVisible") {
        this._super(key, value);
        this._trigger("isXDayVisibleChanged", this, {value:this.options.isXDayVisible})
      }
      if(key === "xDayBorderColorChanged") {
        this._super(key, value)
      }
      if(key === "xDayBorderColor") {
        this._super(key, value);
        this._trigger("xDayBorderColorChanged", this, {value:this.options.xDayBorderColor})
      }
      if(key === "xDayBorderWidthChanged") {
        this._super(key, value)
      }
      if(key === "xDayBorderWidth") {
        this._super(key, value);
        this._trigger("xDayBorderWidthChanged", this, {value:this.options.xDayBorderWidth})
      }
    }finally {
      this.resumePaint()
    }
  }, destroy:function() {
    this._$element.remove();
    this._biorhythms.destroy();
    $.Widget.prototype.destroy.call(this)
  }, _createCanvasElement:function() {
    var $canvas = $("\x3ccanvas/\x3e");
    $canvas.attr({"tabindex":"1", "width":this.options.width, "height":this.options.height});
    return $canvas
  }, _incrementFirstDay:function(value) {
    var date = new Date(this.options.firstDay.getTime());
    date.setDate(date.getDate() + value);
    this.option("firstDay", date)
  }, getLastDay:function() {
    return dateUtil.addDays(this.options.firstDay, this.options.totalDays - 1)
  }, getXDay:function() {
    return dateUtil.addDays(this.options.firstDay, this.options.xDayIndex)
  }, _onBiorhithmAdded:function(biorhythmShape) {
    this._subscribeToBiorhythmEvents(biorhythmShape);
    this._trigger("biorhythmAdded", this, {value:biorhythmShape});
    this._paint()
  }, _subscribeToBiorhythmEvents:function(biorhythmShape) {
    biorhythmShape.nameChanged.subscribe($.proxy(this._onBiorhithmShapeChanged, this));
    biorhythmShape.biorhythm.birthdayChanged.subscribe($.proxy(this._onBiorhithmShapeChanged, this));
    biorhythmShape.biorhythmChanged.subscribe($.proxy(this._onBiorhithmShapeChanged, this));
    biorhythmShape.colorChanged.subscribe($.proxy(this._onBiorhithmShapeChanged, this));
    biorhythmShape.isVisibleChanged.subscribe($.proxy(this._onBiorhithmShapeChanged, this));
    biorhythmShape.lineWidthChanged.subscribe($.proxy(this._onBiorhithmShapeChanged, this));
    biorhythmShape.lineStyleChanged.subscribe($.proxy(this._onBiorhithmShapeChanged, this))
  }, _onBiorhithmRemoved:function(biorhythmShape) {
    this._unsubscribeFromBiorhythmEvents(biorhythmShape);
    this._trigger("biorhythmRemoved", this, {value:biorhythmShape});
    this._paint()
  }, _unsubscribeFromBiorhythmEvents:function(biorhythmShape) {
    biorhythmShape.nameChanged.unsubscribe($.proxy(this._onBiorhithmShapeChanged, this));
    biorhythmShape.biorhythm.birthdayChanged.unsubscribe($.proxy(this._onBiorhithmShapeChanged, this));
    biorhythmShape.biorhythmChanged.unsubscribe($.proxy(this._onBiorhithmShapeChanged, this));
    biorhythmShape.colorChanged.unsubscribe($.proxy(this._onBiorhithmShapeChanged, this));
    biorhythmShape.isVisibleChanged.unsubscribe($.proxy(this._onBiorhithmShapeChanged, this));
    biorhythmShape.lineWidthChanged.unsubscribe($.proxy(this._onBiorhithmShapeChanged, this));
    biorhythmShape.lineStyleChanged.unsubscribe($.proxy(this._onBiorhithmShapeChanged, this))
  }, _onBiorhithmShapeChanged:function() {
    this._paint()
  }, _paintSuspendCount:0, suspendPaint:function() {
    this._paintSuspendCount++
  }, resumePaint:function() {
    if(this._paintSuspendCount > 0) {
      this._paintSuspendCount--
    }
    if(this._paintSuspendCount == 0) {
      this._paint()
    }
  }, _paint:function() {
    if(this._paintSuspendCount > 0) {
      return
    }
    if(!this._$canvas[0].getContext) {
      return
    }
    var rawPaintData = {biorhythmShapes:this._biorhythms.toArray(), firstDay:this.options.firstDay, totalDays:this.options.totalDays, xDayIndex:this.options.xDayIndex, isXDayVisible:this.options.isXDayVisible, xDayBorderColor:this.options.xDayBorderColor, xDayBorderWidth:this.options.xDayBorderWidth, gridColor:this.options.gridColor, isGridVisible:this.options.isGridVisible, todayBackColor:this.options.todayBackColor, areDayNumbersVisible:this.options.areDayNumbersVisible, areWeekDaysVisible:this.options.areWeekDaysVisible, 
    dayNumbersPosition:this.options.dayNumbersPosition, weekDaysPosition:this.options.weekDaysPosition, areSundaysEmphasized:this.options.areSundaysEmphasized, foreColor:this.options.foreColor, sundaysColor:this.options.sundaysColor, font:this.options.font, sundaysFont:this.options.sundaysFont};
    var canvasElement = this._$canvas[0];
    var context = canvasElement.getContext("2d");
    var rectangle = new Rectangle(0, 0, canvasElement.width, canvasElement.height);
    var painter = new Painter;
    painter.paint(rawPaintData, context, rectangle)
  }, _onDrag:function(evt) {
    if(evt.isAlternative) {
      this.option("xDayIndex", this.options.xDayIndex + evt.steps)
    }else {
      this._incrementFirstDay(-evt.steps)
    }
  }, _onDragStart:function(evt) {
    evt.stepLength = this._$canvas[0].width / this.options.totalDays
  }})
})(jQuery, lu.DateUtil, lu.bioControls.biorhythmView.DayLabelPosition, lu.bioControls.biorhythmView.Scroller, lu.bioControls.biorhythmModel.BiorhythmsAdapter, lu.Rectangle, lu.bioControls.biorhythmView.painting.Painter);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmLegend = lu.bioControls.biorhythmLegend || {};
(function(BiorhythmShape) {
  lu.bioControls.biorhythmLegend.BiorhythmLegendItemView = function() {
    var $element = null;
    Object.defineProperty(this, "$element", {enumerable:true, configurable:false, get:function() {
      return $element
    }});
    var $legendColorTag = null;
    Object.defineProperty(this, "$legendColorTag", {enumerable:true, configurable:false, get:function() {
      return $legendColorTag
    }});
    var $legendLabelTag = null;
    Object.defineProperty(this, "$legendLabelTag", {enumerable:true, configurable:false, get:function() {
      return $legendLabelTag
    }});
    function generate() {
      $element = $("\x3cdiv/\x3e");
      $element.addClass("bio-legend-item");
      generateLegendColorTag();
      generateLegendLabelTag();
      $element.append($legendColorTag);
      $element.append($legendLabelTag)
    }
    function generateLegendColorTag() {
      $legendColorTag = $("\x3cdiv/\x3e");
      $legendColorTag.addClass("color-label")
    }
    function generateLegendLabelTag() {
      $legendLabelTag = $("\x3cdiv/\x3e");
      $legendLabelTag.addClass("bio-legend-label");
      $legendLabelTag.colorpicker({inline:false, altField:$legendColorTag, altProperties:"background-color", buttonColorize:true, colorFormat:"#HEX", showOn:"click alt"})
    }
    (function initialize() {
      generate()
    })()
  }
})(lu.bioControls.biorhythmModel.BiorhythmShape);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmLegend = lu.bioControls.biorhythmLegend || {};
(function(BiorhythmLegendItemView, BiorhythmShape) {
  lu.bioControls.biorhythmLegend.BiorhythmLegendItem = function(biorhythmShape) {
    var view = null;
    Object.defineProperty(this, "element", {enumerable:true, configurable:false, get:getElement});
    function getElement() {
      return view.$element
    }
    Object.defineProperty(this, "biorhythmShape", {enumerable:true, configurable:false, get:getBiorhythmShape});
    function getBiorhythmShape() {
      return biorhythmShape
    }
    function onColorPickerClosed(event, color) {
      biorhythmShape.color = color.formatted
    }
    function onColorPickerOpened(event, color) {
      view.$legendLabelTag.colorpicker("setColor", biorhythmShape.color)
    }
    function onBiorhythmNameChanged(arg) {
      view.$legendLabelTag.html(arg)
    }
    function onBiorhythmColorChanged(arg) {
      view.$legendColorTag.css("background-color", arg)
    }
    function onBiorhythmVisibilityChanged(arg) {
      if(arg) {
        view.$element.show()
      }else {
        view.$element.hide()
      }
    }
    (function initialize() {
      view = new BiorhythmLegendItemView;
      if(!(biorhythmShape instanceof BiorhythmShape)) {
        return
      }
      view.$legendLabelTag.colorpicker("option", "close", onColorPickerClosed);
      view.$legendLabelTag.colorpicker("option", "open", onColorPickerOpened);
      view.$legendColorTag.css("background-color", biorhythmShape.color);
      view.$legendLabelTag.text(biorhythmShape.biorhythm.name);
      var biorhythmName = biorhythmShape.biorhythm.name;
      var title = biorhythmName ? biorhythmName + " Biorhythm" : null;
      view.$legendLabelTag.colorpicker("option", "title", title);
      view.$legendLabelTag.colorpicker("option", "parts", title ? "draggable" : "popup");
      view.$legendLabelTag.colorpicker("option", "color", biorhythmShape.color);
      if(!biorhythmShape.isVisible) {
        view.$element.hide()
      }
      biorhythmShape.nameChanged.subscribe(onBiorhythmNameChanged);
      biorhythmShape.colorChanged.subscribe(onBiorhythmColorChanged);
      biorhythmShape.isVisibleChanged.subscribe(onBiorhythmVisibilityChanged)
    })()
  }
})(lu.bioControls.biorhythmLegend.BiorhythmLegendItemView, lu.bioControls.biorhythmModel.BiorhythmShape);
(function($, BiorhythmsAdapter, BiorhythmLegendItem) {
  $.widget("lastunicorn.biorhythmLegend", {options:{biorhythms:[]}, _create:function() {
    this.element.empty();
    this._items = [];
    this._biorhythms = this._createBiorhythmsAdapter(this.options.biorhythms);
    this._repopulate()
  }, _setOption:function(key, value) {
    if(key === "biorhythms") {
      this._biorhythms.destroy();
      this._super(key, value);
      this._biorhythms = this._createBiorhythmsAdapter(this.options.biorhythms);
      this._repopulate()
    }
  }, destroy:function() {
    this.element.empty();
    this._biorhythms.destroy();
    $.Widget.prototype.destroy.call(this)
  }, _createBiorhythmsAdapter:function(biorhythms) {
    return new BiorhythmsAdapter({biorhythms:biorhythms, onBiorhithmAdded:$.proxy(this._onBiorhithmAdded, this), onBiorhithmRemoved:$.proxy(this._onBiorhithmRemoved, this)})
  }, _repopulate:function() {
    this.element.empty();
    this._items.length = 0;
    var biorhythmsArray = this._biorhythms.toArray();
    for(var i = 0;i < biorhythmsArray.length;i++) {
      this._createNewItem(biorhythmsArray[i])
    }
  }, _onBiorhithmAdded:function(biorhythmShape) {
    this._createNewItem(biorhythmShape)
  }, _onBiorhithmRemoved:function(biorhythmShape) {
    this._removeItem(biorhythmShape)
  }, _createNewItem:function(biorhythm) {
    var biorhythmLegendItem = new BiorhythmLegendItem(biorhythm);
    this._items.push(biorhythmLegendItem);
    var $legendItemTag = biorhythmLegendItem.element;
    this.element.prepend($legendItemTag)
  }, _removeItem:function(biorhythm) {
    for(var i = 0;i < this._items.length;i++) {
      if(this._items[i].biorhythmShape === biorhythm) {
        this._items.splice(i, 1);
        this._items[i].element.remove()
      }
    }
  }})
})(jQuery, lu.bioControls.biorhythmModel.BiorhythmsAdapter, lu.bioControls.biorhythmLegend.BiorhythmLegendItem);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.xDayInfoView = lu.bioControls.xDayInfoView || {};
(function(BiorhythmShape, dateUtil) {
  lu.bioControls.xDayInfoView.XDayInfoItemView = function() {
    var $element = null;
    Object.defineProperty(this, "$element", {enumerable:true, configurable:false, get:getElement});
    function getElement() {
      return $element
    }
    var $colorElement = null;
    Object.defineProperty(this, "$colorElement", {enumerable:true, configurable:false, get:getColorElement});
    function getColorElement() {
      return $colorElement
    }
    var $labelElement = null;
    Object.defineProperty(this, "$labelElement", {enumerable:true, configurable:false, get:getLabelElement});
    function getLabelElement() {
      return $labelElement
    }
    var $valueElement = null;
    Object.defineProperty(this, "$valueElement", {enumerable:true, configurable:false, get:getValueElement});
    function getValueElement() {
      return $valueElement
    }
    function generate() {
      $element = $("\x3cdiv/\x3e");
      $element.addClass("x-day-item");
      generateColorTag();
      generateLabelTag();
      generateValueTag();
      $element.append($colorElement);
      $element.append($labelElement);
      $element.append(" \x3d ");
      $element.append($valueElement)
    }
    function generateColorTag() {
      $colorElement = $("\x3cspan/\x3e").addClass("color-label")
    }
    function generateLabelTag() {
      $labelElement = $("\x3cspan/\x3e")
    }
    function generateValueTag() {
      $valueElement = $("\x3cspan/\x3e")
    }
    (function initialize() {
      generate()
    })()
  }
})(lu.bioControls.biorhythmModel.BiorhythmShape, lu.DateUtil);
window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.xDayInfoView = lu.bioControls.xDayInfoView || {};
(function(XDayInfoItemView, BiorhythmShape, dateUtil) {
  lu.bioControls.xDayInfoView.XDayInfoItem = function(biorhythmShape) {
    var view = null;
    Object.defineProperty(this, "element", {enumerable:true, configurable:false, get:getElement});
    function getElement() {
      return view.$element
    }
    Object.defineProperty(this, "biorhythmShape", {enumerable:true, configurable:false, get:getBiorhythmShape});
    function getBiorhythmShape() {
      return biorhythmShape
    }
    this.update = function(xDay) {
      displayPercentageFor(xDay)
    };
    function displayPercentageFor(xDay) {
      var percentage = calculatePercentageFor(xDay);
      var percentageAsText = formatPercentage(percentage);
      view.$valueElement.text(percentageAsText)
    }
    function displayLabel(text) {
      view.$labelElement.text(text)
    }
    function displayColor(color) {
      view.$colorElement.css("background-color", color)
    }
    function calculatePercentageFor(xDay) {
      var biorhythm = biorhythmShape.biorhythm;
      var milisecondsLived = xDay - biorhythmShape.biorhythm.birthday;
      var daysLived = dateUtil.milisecondsToWholeDays(milisecondsLived);
      var value = biorhythm.getValue(daysLived);
      var percentage = value * 100;
      return Math.round(percentage)
    }
    function formatPercentage(value) {
      if(typeof value !== "number") {
        return"?%"
      }
      return value.toString() + "%"
    }
    function onBiorhythmNameChanged(arg) {
      displayLabel(arg)
    }
    function onBiorhythmColorChanged(arg) {
      displayColor(arg)
    }
    function onBiorhythmVisibilityChanged(arg) {
      if(view.$element) {
        if(arg) {
          view.$element.show()
        }else {
          view.$element.hide()
        }
      }
    }
    (function initialize() {
      view = new XDayInfoItemView;
      if(!(biorhythmShape instanceof BiorhythmShape)) {
        return
      }
      var xDay = biorhythmShape.biorhythm.birthday;
      displayPercentageFor(xDay);
      displayLabel(biorhythmShape.biorhythm.name);
      displayColor(biorhythmShape.color);
      if(!biorhythmShape.isVisible) {
        view.$element.hide()
      }
      biorhythmShape.nameChanged.subscribe(onBiorhythmNameChanged);
      biorhythmShape.colorChanged.subscribe(onBiorhythmColorChanged);
      biorhythmShape.isVisibleChanged.subscribe(onBiorhythmVisibilityChanged)
    })()
  }
})(lu.bioControls.xDayInfoView.XDayInfoItemView, lu.bioControls.biorhythmModel.BiorhythmShape, lu.DateUtil);
(function($, BiorhythmsAdapter, XDayInfoItem) {
  $.widget("lastunicorn.xDayInfoView", {options:{biorhythms:[]}, _create:function() {
    this.element.empty();
    this._items = [];
    this._biorhythms = this._createBiorhythmsAdapter(this.options.biorhythms);
    this._repopulate()
  }, _setOption:function(key, value) {
    if(key === "biorhythms") {
      this._biorhythms.destroy();
      this._super(key, value);
      this._biorhythms = this._createBiorhythmsAdapter(this.options.biorhythms);
      this._repopulate()
    }
  }, destroy:function() {
    this.element.empty();
    this._biorhythms.destroy();
    $.Widget.prototype.destroy.call(this)
  }, update:function(xDay) {
    for(var i = 0;i < this._items.length;i++) {
      this._items[i].update(xDay)
    }
  }, _createBiorhythmsAdapter:function(biorhythms) {
    return new BiorhythmsAdapter({biorhythms:biorhythms, onBiorhithmAdded:$.proxy(this._onBiorhithmAdded, this), onBiorhithmRemoved:$.proxy(this._onBiorhithmRemoved, this)})
  }, _repopulate:function() {
    this.element.empty();
    this._items.length = 0;
    var biorhythmsArray = this._biorhythms.toArray();
    for(var i = 0;i < biorhythmsArray.length;i++) {
      this._createNewItem(biorhythmsArray[i])
    }
  }, _onBiorhithmAdded:function(biorhythmShape) {
    this._createNewItem(biorhythmShape)
  }, _onBiorhithmRemoved:function(biorhythmShape) {
    this._removeItem(biorhythmShape)
  }, _createNewItem:function(biorhythm) {
    var xDayInfoItem = new XDayInfoItem(biorhythm);
    this._items.push(xDayInfoItem);
    this.element.append(xDayInfoItem.element)
  }, _removeItem:function(biorhythm) {
    for(var i = 0;i < this._items.length;i++) {
      if(this._items[i].biorhythmShape === biorhythm) {
        this._items.splice(i, 1);
        this._items[i].element.remove()
      }
    }
  }})
})(jQuery, lu.bioControls.biorhythmModel.BiorhythmsAdapter, lu.bioControls.xDayInfoView.XDayInfoItem);
