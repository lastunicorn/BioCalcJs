lu.Namespacing.ensureNamespace("lu.bioCalc");
(function Version(bioCalc) {
  Object.defineProperty(bioCalc, "version", {value:"1.4.0", writable:false, enumerable:true, configurable:false})
})(lu.bioCalc);
lu.Namespacing.ensureNamespace("lu.bioCalc");
lu.bioCalc.DateFormatter = function() {
  function toStringTwoDigits(number) {
    if(typeof number !== "number") {
      return"" + number
    }
    return number < 10 ? "0" + number : "" + number
  }
  function formatDate(date) {
    if(!(date instanceof Date)) {
      return""
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var monthString = toStringTwoDigits(month);
    var dayString = toStringTwoDigits(day);
    return year + "-" + monthString + "-" + dayString
  }
  return{formatDate:formatDate}
}();
window.lu = window.lu || {};
lu.bioCalc = lu.bioCalc || {};
lu.bioCalc.configuration = lu.bioCalc.configuration || {};
(function($) {
  lu.bioCalc.configuration.ConfigurationLoader = function() {
    var cookieName = "config";
    this.loadFromCookies = function() {
      $.cookie.json = true;
      var config = $.cookie(cookieName);
      if(config == null) {
        config = createDefaultConfig()
      }else {
        ensureDefaultValues(config)
      }
      return config
    };
    this.saveInCookies = function(config) {
      $.cookie.json = true;
      if(config == null) {
        return
      }
      $.cookie(cookieName, config)
    };
    this.removeFromCookie = function() {
      $.removeCookie(cookieName)
    };
    function createDefaultConfig() {
      var config = {};
      ensureDefaultValues(config);
      return config
    }
    function ensureDefaultValues(c) {
      if($.type(c.birthday) === "string") {
        c.birthday = new Date(c.birthday)
      }
      if($.type(c.birthday) !== "date") {
        c.birthday = getDefaultBirthday()
      }
    }
    function getDefaultBirthday() {
      return new Date(1980, 5, 13)
    }
  }
})(jQuery);
window.lu = window.lu || {};
lu.bioCalc = lu.bioCalc || {};
lu.bioCalc.configuration = lu.bioCalc.configuration || {};
lu.bioCalc.configuration.ConfigurationService = function(ConfigurationLoader) {
  var obj = {};
  var loader = null;
  var config = null;
  Object.defineProperty(obj, "config", {enumerable:true, configurable:false, get:getConfig});
  function getConfig() {
    return config
  }
  this.save = function() {
    loader.saveInCookies(config)
  };
  (function initialize() {
    loader = new ConfigurationLoader;
    config = loader.loadFromCookies()
  })();
  return obj
}(lu.bioCalc.configuration.ConfigurationLoader);
lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage");
lu.bioCalc.mainPage.BioCalcPageData = function(Event) {
  var obj = {};
  var birthday = null;
  var birthdayChangedEvent = new Event;
  obj.birthdayChanged = birthdayChangedEvent.client;
  Object.defineProperty(obj, "birthday", {enumerable:true, configurable:false, get:getBirthday, set:setBirthday});
  function getBirthday() {
    return birthday
  }
  function setBirthday(value) {
    birthday = value;
    birthdayChangedEvent.raise(this, value)
  }
  var xDay = null;
  var xDayChangedEvent = new Event;
  obj.xDayChanged = xDayChangedEvent.client;
  Object.defineProperty(obj, "xDay", {enumerable:true, configurable:false, get:getXDay, set:setXDay});
  function getXDay() {
    return xDay
  }
  function setXDay(value) {
    xDay = value;
    xDayChangedEvent.raise(this, value)
  }
  var biorhythms = null;
  var biorhythmsChangedEvent = new Event;
  obj.biorhythmsChanged = biorhythmsChangedEvent.client;
  Object.defineProperty(obj, "biorhythms", {enumerable:true, configurable:false, get:getBiorhythms, set:setBiorhythms});
  function getBiorhythms() {
    return biorhythms
  }
  function setBiorhythms(value) {
    biorhythms = value;
    biorhythmsChangedEvent.raise(this, value)
  }
  return obj
}(lu.Event);
(function BioCalc($, bioCalcPageData, configurationService, CommonBiorhythmsContainer) {
  (function initialize() {
    var biorhythmShapes = new CommonBiorhythmsContainer;
    biorhythmShapes.setBirthdayOnAll(configurationService.config.birthday);
    bioCalcPageData.biorhythms = biorhythmShapes;
    bioCalcPageData.birthday = configurationService.config.birthday;
    $(function() {
      configureModalDialogs()
    })
  })();
  function configureModalDialogs() {
    $(document.body).on("click", ".ui-widget-overlay", function() {
      $.each($(".ui-dialog"), function() {
        var $dialog = $(this).children(".ui-dialog-content");
        if($dialog.dialog("option", "modal")) {
          $dialog.dialog("close")
        }
      })
    })
  }
})(jQuery, lu.bioCalc.mainPage.BioCalcPageData, lu.bioCalc.configuration.ConfigurationService, lu.bioControls.biorhythmModel.CommonBiorhythmsContainer);
lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage.dialogs");
(function($) {
  lu.bioCalc.mainPage.dialogs.AboutDialogView = function(presenter) {
    var $aboutDialog = null;
    var $aboutDialogTabSet = null;
    var $jQueryVersionLabel = null;
    var $jQueryUIVersionLabel = null;
    var $bioControlsVersionLabel = null;
    var $bioCalcVersionLabel = null;
    this.show = function() {
      $aboutDialog.dialog("open")
    };
    this.close = function() {
      $aboutDialog.dialog("close")
    };
    this.setJQueryVersionText = function(value) {
      $jQueryVersionLabel.html(value)
    };
    this.setJQueryUIVersionText = function(value) {
      $jQueryUIVersionLabel.html(value)
    };
    this.setBioControlsVersionText = function(value) {
      $bioControlsVersionLabel.html(value)
    };
    this.setBioCalcVersionText = function(value) {
      $bioCalcVersionLabel.html(value)
    };
    function onCloseButtonClicked(e) {
      if($.isFunction(presenter.onCloseButtonClicked)) {
        presenter.onCloseButtonClicked(e)
      }
    }
    (function initialize() {
      create$();
      initialize$()
    })();
    function create$() {
      $aboutDialog = $("#aboutDialog");
      $aboutDialogTabSet = $("#aboutDialog .tabs");
      $jQueryVersionLabel = $("#jQueryVersionLabel");
      $jQueryUIVersionLabel = $("#jQueryUIVersionLabel");
      $bioControlsVersionLabel = $("#bioControlsVersionLabel");
      $bioCalcVersionLabel = $(".bio-calc-version")
    }
    function initialize$() {
      $aboutDialog.dialog({modal:true, height:480, width:480, autoOpen:false, buttons:{Close:onCloseButtonClicked}, show:{effect:"puff", duration:300}, hide:{effect:"puff", duration:300}});
      $aboutDialogTabSet.tabs()
    }
  }
})(jQuery);
lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage.dialogs");
lu.bioCalc.mainPage.dialogs.AboutDialog = function($, AboutDialogView, bioControlsVersion, bioCalcVersion) {
  var view = null;
  function show() {
    view.show()
  }
  function onAboutDialogCloseClicked() {
    view.close()
  }
  (function initialize() {
    $(function() {
      var presenter = {onCloseButtonClicked:onAboutDialogCloseClicked};
      view = new AboutDialogView(presenter);
      view.setJQueryVersionText($.fn.jquery);
      view.setJQueryUIVersionText($.ui.version);
      view.setBioControlsVersionText(bioControlsVersion);
      view.setBioCalcVersionText("ver " + bioCalcVersion)
    })
  })();
  return{show:show}
}(jQuery, lu.bioCalc.mainPage.dialogs.AboutDialogView, lu.bioControls.version, lu.bioCalc.version);
lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage.dialogs");
(function($) {
  lu.bioCalc.mainPage.dialogs.HelpDialogView = function(presenter) {
    var $helpDialog = null;
    var $helpDialogTabSet = null;
    this.show = function() {
      $helpDialog.dialog("open")
    };
    this.close = function() {
      $helpDialog.dialog("close")
    };
    function onCloseButtonClicked(e) {
      if($.isFunction(presenter.onCloseButtonClicked)) {
        presenter.onCloseButtonClicked(e)
      }
    }
    (function initialize() {
      create$();
      initialize$()
    })();
    function create$() {
      $helpDialog = $("#helpDialog");
      $helpDialogTabSet = $("#helpDialog .tabs")
    }
    function initialize$() {
      $helpDialog.dialog({modal:true, height:480, width:640, autoOpen:false, buttons:{Close:onCloseButtonClicked}, show:{effect:"puff", duration:300}, hide:{effect:"puff", duration:300}});
      $helpDialogTabSet.tabs()
    }
  }
})(jQuery);
lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage.dialogs");
lu.bioCalc.mainPage.dialogs.HelpDialog = function($, HelpDialogView) {
  var view = null;
  function show() {
    view.show()
  }
  function onHelpDialogCloseClicked() {
    view.close()
  }
  (function initialize() {
    $(function() {
      var presenter = {onCloseButtonClicked:onHelpDialogCloseClicked};
      view = new HelpDialogView(presenter)
    })
  })();
  return{show:show}
}(jQuery, lu.bioCalc.mainPage.dialogs.HelpDialogView);
lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage.dialogs");
(function($) {
  lu.bioCalc.mainPage.dialogs.OptionsDialogView = function(presenter) {
    var $optionsDialog = null;
    var $primaryBiorhythmsCheckbox = null;
    var $secondaryBiorhythmsCheckbox = null;
    var $extraBiorhythmsCheckbox = null;
    var $iChingBiorhythmsCheckbox = null;
    this.show = function() {
      $optionsDialog.dialog("open")
    };
    this.close = function() {
      $optionsDialog.dialog("close")
    };
    this.checkPrimaryBiorhythmsCheckbox = function(value) {
      $primaryBiorhythmsCheckbox.prop("checked", value)
    };
    this.checkSecondaryBiorhythmsCheckbox = function(value) {
      $secondaryBiorhythmsCheckbox.prop("checked", value)
    };
    this.checkExtraBiorhythmsCheckbox = function(value) {
      $extraBiorhythmsCheckbox.prop("checked", value)
    };
    this.checkIChingBiorhythmsCheckbox = function(value) {
      $iChingBiorhythmsCheckbox.prop("checked", value)
    };
    this.isCheckedPrimaryBiorhythmsCheckbox = function() {
      return $primaryBiorhythmsCheckbox.prop("checked")
    };
    this.isCheckedSecondaryBiorhythmsCheckbox = function() {
      return $secondaryBiorhythmsCheckbox.prop("checked")
    };
    this.isCheckedExtraBiorhythmsCheckbox = function() {
      return $extraBiorhythmsCheckbox.prop("checked")
    };
    this.isCheckedIChingBiorhythmsCheckbox = function() {
      return $iChingBiorhythmsCheckbox.prop("checked")
    };
    function onCloseButtonClicked(e) {
      if($.isFunction(presenter.onCloseButtonClicked)) {
        presenter.onCloseButtonClicked(e)
      }
    }
    function onOptionsDialogOpen() {
      if($.isFunction(presenter.onOptionsDialogOpen)) {
        presenter.onOptionsDialogOpen()
      }
    }
    function onPrimaryCheckboxChange(e) {
      if($.isFunction(presenter.onPrimaryCheckboxChange)) {
        presenter.onPrimaryCheckboxChange(e)
      }
    }
    function onSecondaryCheckboxChange(e) {
      if($.isFunction(presenter.onSecondaryCheckboxChange)) {
        presenter.onSecondaryCheckboxChange(e)
      }
    }
    function onExtraCheckboxChange(e) {
      if($.isFunction(presenter.onExtraCheckboxChange)) {
        presenter.onExtraCheckboxChange(e)
      }
    }
    function onIChingCheckboxChange(e) {
      if($.isFunction(presenter.onIChingCheckboxChange)) {
        presenter.onIChingCheckboxChange(e)
      }
    }
    (function initialize() {
      create$();
      initialize$()
    })();
    function create$() {
      $optionsDialog = $("#optionsDialog");
      $primaryBiorhythmsCheckbox = $("#primaryBiorhythmsCheckbox");
      $secondaryBiorhythmsCheckbox = $("#secondaryBiorhythmsCheckbox");
      $extraBiorhythmsCheckbox = $("#extraBiorhythmsCheckbox");
      $iChingBiorhythmsCheckbox = $("#iChingBiorhythmsCheckbox")
    }
    function initialize$() {
      $optionsDialog.dialog({height:360, width:480, autoOpen:false, buttons:{Close:onCloseButtonClicked}, show:{effect:"puff", duration:300}, hide:{effect:"puff", duration:300}, open:onOptionsDialogOpen});
      $primaryBiorhythmsCheckbox.change(onPrimaryCheckboxChange);
      $secondaryBiorhythmsCheckbox.change(onSecondaryCheckboxChange);
      $extraBiorhythmsCheckbox.change(onExtraCheckboxChange);
      $iChingBiorhythmsCheckbox.change(onIChingCheckboxChange)
    }
  }
})(jQuery, lu.bioCalc.mainPage.BioCalcPageData);
lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage.dialogs");
lu.bioCalc.mainPage.dialogs.OptionsDialog = function($, OptionsDialogView, bioCalcPageData) {
  var view = null;
  var biorhythmShapes = null;
  function show() {
    view.show()
  }
  function onOptionsDialogCloseClicked() {
    view.close()
  }
  function onOptionsDialogOpen() {
    var isAnyPrimaryVisible = biorhythmShapes.primaryBiorhythmShapes.isAnyVisible();
    view.checkPrimaryBiorhythmsCheckbox(isAnyPrimaryVisible);
    var isAnySecondaryVisible = biorhythmShapes.secondaryBiorhythmShapes.isAnyVisible();
    view.checkSecondaryBiorhythmsCheckbox(isAnySecondaryVisible);
    var isAnyExtraVisible = biorhythmShapes.extraBiorhythmShapes.isAnyVisible();
    view.checkExtraBiorhythmsCheckbox(isAnyExtraVisible);
    var isAnyIChingVisible = biorhythmShapes.iChingBiorhythmShapes.isAnyVisible();
    view.checkIChingBiorhythmsCheckbox(isAnyIChingVisible)
  }
  function onPrimaryCheckboxChange() {
    var isChecked = view.isCheckedPrimaryBiorhythmsCheckbox();
    biorhythmShapes.primaryBiorhythmShapes.showAll(isChecked)
  }
  function onSecondaryCheckboxChange() {
    var isChecked = view.isCheckedSecondaryBiorhythmsCheckbox();
    biorhythmShapes.secondaryBiorhythmShapes.showAll(isChecked)
  }
  function onExtraCheckboxChange() {
    var isChecked = view.isCheckedExtraBiorhythmsCheckbox();
    biorhythmShapes.extraBiorhythmShapes.showAll(isChecked)
  }
  function onIChingCheckboxChange() {
    var isChecked = view.isCheckedIChingBiorhythmsCheckbox();
    biorhythmShapes.iChingBiorhythmShapes.showAll(isChecked)
  }
  function onExternalBiorhythmsChanged(arg) {
    biorhythmShapes = arg
  }
  (function initialize() {
    $(function() {
      var presenter = {onCloseButtonClicked:onOptionsDialogCloseClicked, onOptionsDialogOpen:onOptionsDialogOpen, onPrimaryCheckboxChange:onPrimaryCheckboxChange, onSecondaryCheckboxChange:onSecondaryCheckboxChange, onExtraCheckboxChange:onExtraCheckboxChange, onIChingCheckboxChange:onIChingCheckboxChange};
      view = new OptionsDialogView(presenter);
      bioCalcPageData.biorhythmsChanged.subscribe(onExternalBiorhythmsChanged);
      biorhythmShapes = bioCalcPageData.biorhythms
    })
  })();
  return{show:show}
}(jQuery, lu.bioCalc.mainPage.dialogs.OptionsDialogView, lu.bioCalc.mainPage.BioCalcPageData);
lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage.pageSections");
(function($) {
  lu.bioCalc.mainPage.pageSections.BirthdaySectionView = function(presenter) {
    var $birthdayTextBox = null;
    var $saveBirthdayButton = null;
    var $resetBirthdayButton = null;
    var $birthdayButtons = null;
    this.enableSaveBirthdayButton = function() {
      $saveBirthdayButton.button("option", "disabled", false)
    };
    this.disableSaveBirthdayButton = function() {
      $saveBirthdayButton.button("option", "disabled", true)
    };
    this.enableResetBirthdayButton = function() {
      $resetBirthdayButton.button("option", "disabled", false)
    };
    this.disableResetBirthdayButton = function() {
      $resetBirthdayButton.button("option", "disabled", true)
    };
    this.setBirthdayText = function(value) {
      $birthdayTextBox.val(value)
    };
    this.getBirthday = function() {
      return $birthdayTextBox.datepicker("getDate")
    };
    function onBirthdayDatePickerSelect() {
      if($.isFunction(presenter.onBirthdayDatePickerSelect)) {
        presenter.onBirthdayDatePickerSelect()
      }
    }
    function onResetBirthdayButtonClick(e) {
      if($.isFunction(presenter.onResetBirthdayButtonClick)) {
        presenter.onResetBirthdayButtonClick(e)
      }
    }
    function onSaveBirthdayButtonClick(e) {
      if($.isFunction(presenter.onSaveBirthdayButtonClick)) {
        presenter.onSaveBirthdayButtonClick(e)
      }
    }
    (function initialize() {
      create$();
      initialize$()
    })();
    function create$() {
      $birthdayTextBox = $("#birthdayTextBox");
      $saveBirthdayButton = $("#saveBirthdayButton");
      $resetBirthdayButton = $("#resetBirthdayButton");
      $birthdayButtons = $("#birthdayButtons")
    }
    function initialize$() {
      $birthdayTextBox.datepicker({changeMonth:true, changeYear:true, dateFormat:"yy-mm-dd", onSelect:onBirthdayDatePickerSelect, showButtonPanel:true});
      $saveBirthdayButton.button({text:false, icons:{primary:"ui-icon-disk"}, disabled:true});
      $saveBirthdayButton.click(onSaveBirthdayButtonClick);
      $resetBirthdayButton.button({text:false, icons:{primary:"ui-icon-close"}, disabled:true});
      $resetBirthdayButton.click(onResetBirthdayButtonClick);
      $birthdayButtons.buttonset()
    }
  }
})(jQuery);
(function BirthdaySection($, BirthdaySectionView, bioCalcPageData, configurationService, dateFormatter) {
  var view = null;
  var suppressBirthdayChanged = false;
  function updateSaveBirthdayButtonVisibility() {
    var config = configurationService.config;
    var birthday = bioCalcPageData.birthday;
    if(birthday != null && config.birthday.getTime() == birthday.getTime()) {
      view.disableSaveBirthdayButton()
    }else {
      view.enableSaveBirthdayButton()
    }
  }
  function updateResetBirthdayButtonVisibility() {
    var config = configurationService.config;
    var birthday = bioCalcPageData.birthday;
    if(birthday.getTime() == config.birthday.getTime()) {
      view.disableResetBirthdayButton()
    }else {
      view.enableResetBirthdayButton()
    }
  }
  function updateBirthdayTextBox() {
    var dateAsString = dateFormatter.formatDate(bioCalcPageData.birthday);
    view.setBirthdayText(dateAsString)
  }
  function publishBirthday() {
    suppressBirthdayChanged = true;
    try {
      bioCalcPageData.birthday = birthday
    }finally {
      suppressBirthdayChanged = false
    }
  }
  function onBirthdayDatePickerSelect() {
    birthday = view.getBirthday();
    updateSaveBirthdayButtonVisibility();
    updateResetBirthdayButtonVisibility();
    publishBirthday()
  }
  function onResetBirthdayButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();
    birthday = configurationService.config.birthday;
    updateBirthdayTextBox();
    updateSaveBirthdayButtonVisibility();
    updateResetBirthdayButtonVisibility();
    publishBirthday()
  }
  function onSaveBirthdayButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();
    configurationService.config.birthday = birthday;
    configurationService.save();
    updateSaveBirthdayButtonVisibility();
    updateResetBirthdayButtonVisibility()
  }
  function onExternalBirthdayChanged(arg) {
    if(suppressBirthdayChanged) {
      return
    }
    updateBirthdayTextBox();
    updateSaveBirthdayButtonVisibility();
    updateResetBirthdayButtonVisibility()
  }
  (function initialize() {
    $(function() {
      var presenter = {onBirthdayDatePickerSelect:onBirthdayDatePickerSelect, onResetBirthdayButtonClick:onResetBirthdayButtonClick, onSaveBirthdayButtonClick:onSaveBirthdayButtonClick};
      view = new BirthdaySectionView(presenter);
      updateBirthdayTextBox();
      updateResetBirthdayButtonVisibility();
      updateSaveBirthdayButtonVisibility();
      bioCalcPageData.birthdayChanged.subscribe(onExternalBirthdayChanged)
    })
  })()
})(jQuery, lu.bioCalc.mainPage.pageSections.BirthdaySectionView, lu.bioCalc.mainPage.BioCalcPageData, lu.bioCalc.configuration.ConfigurationService, lu.bioCalc.DateFormatter);
lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage.pageSections");
(function($) {
  lu.bioCalc.mainPage.pageSections.MainToolbarView = function(presenter) {
    var $mainToolbar = null;
    var $helpButton = null;
    var $aboutButton = null;
    var $optionsButton = null;
    function onHelpButtonClick(e) {
      if($.isFunction(presenter.onHelpButtonClick)) {
        presenter.onHelpButtonClick(e)
      }
    }
    function onAboutButtonClick(e) {
      if($.isFunction(presenter.onAboutButtonClick)) {
        presenter.onAboutButtonClick(e)
      }
    }
    function onOptionsButtonClick(e) {
      if($.isFunction(presenter.onOptionsButtonClick)) {
        presenter.onOptionsButtonClick(e)
      }
    }
    (function initialize() {
      createControls();
      initializeControls()
    })();
    function createControls() {
      $mainToolbar = $("#mainToolbar");
      $helpButton = $("#helpButton");
      $aboutButton = $("#aboutButton");
      $optionsButton = $("#optionsButton")
    }
    function initializeControls() {
      $mainToolbar.buttonset();
      $helpButton.button({icons:{primary:"ui-icon-help"}, text:true});
      $helpButton.click(onHelpButtonClick);
      $aboutButton.button({icons:{primary:"ui-icon-star"}, text:true});
      $aboutButton.click(onAboutButtonClick);
      $optionsButton.button({icons:{primary:"ui-icon-gear"}});
      $optionsButton.click(onOptionsButtonClick)
    }
  }
})(jQuery);
(function MainToolbar($, MainToolbarView, helpDialog, aboutDialog, optionsDialog) {
  var view = null;
  function onHelpButtonClick() {
    helpDialog.show()
  }
  function onAboutButtonClick() {
    aboutDialog.show()
  }
  function onOptionsButtonClick() {
    optionsDialog.show()
  }
  (function initialize() {
    $(function() {
      var presenter = {onHelpButtonClick:onHelpButtonClick, onAboutButtonClick:onAboutButtonClick, onOptionsButtonClick:onOptionsButtonClick};
      view = new MainToolbarView(presenter)
    })
  })()
})(jQuery, lu.bioCalc.mainPage.pageSections.MainToolbarView, lu.bioCalc.mainPage.dialogs.HelpDialog, lu.bioCalc.mainPage.dialogs.AboutDialog, lu.bioCalc.mainPage.dialogs.OptionsDialog);
lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage.pageSections");
(function($) {
  lu.bioCalc.mainPage.pageSections.XDaySectionView = function() {
    var $xDayValueLabel = null;
    var $xDayInfoContainer = null;
    this.setBiorhythms = function(value) {
      $xDayInfoContainer.xDayInfoView("option", "biorhythms", value)
    };
    this.setXDay = function(value) {
      $xDayInfoContainer.xDayInfoView("update", value)
    };
    this.setTitle = function(value) {
      $xDayValueLabel.html(value)
    };
    (function initialize() {
      create$();
      initialize$()
    })();
    function create$() {
      $xDayValueLabel = $("#xDayValueLabel");
      $xDayInfoContainer = $("#xDayInfoContainer")
    }
    function initialize$() {
      $xDayInfoContainer.xDayInfoView()
    }
  }
})(jQuery);
(function XDaySection($, XDaySectionView, bioCalcPageData, dateFormatter) {
  var view = null;
  function onExternalXDayChanged(arg) {
    var title = dateFormatter.formatDate(arg);
    view.setTitle(title);
    view.setXDay(arg)
  }
  function onExternalBiorhythmsChanged(arg) {
    view.setBiorhythms(arg)
  }
  (function initialize() {
    $(function() {
      view = new XDaySectionView;
      view.setBiorhythms(bioCalcPageData.biorhythms);
      bioCalcPageData.xDayChanged.subscribe(onExternalXDayChanged);
      bioCalcPageData.biorhythmsChanged.subscribe(onExternalBiorhythmsChanged)
    })
  })()
})(jQuery, lu.bioCalc.mainPage.pageSections.XDaySectionView, lu.bioCalc.mainPage.BioCalcPageData, lu.bioCalc.DateFormatter);
lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage.pageSections");
(function($) {
  lu.bioCalc.mainPage.pageSections.ChartsSectionView = function() {
    var $biorhythmViewContainer = null;
    Object.defineProperty(this, "$biorhythmViewContainer", {enumerable:true, configurable:false, get:function() {
      return $biorhythmViewContainer
    }});
    var $firstDayTextBox = null;
    Object.defineProperty(this, "$firstDayTextBox", {enumerable:true, configurable:false, get:function() {
      return $firstDayTextBox
    }});
    var $firstDayLabel = null;
    Object.defineProperty(this, "$firstDayLabel", {enumerable:true, configurable:false, get:function() {
      return $firstDayLabel
    }});
    var $lastDayTextBox = null;
    Object.defineProperty(this, "$lastDayTextBox", {enumerable:true, configurable:false, get:function() {
      return $lastDayTextBox
    }});
    var $lastDayLabel = null;
    Object.defineProperty(this, "$lastDayLabel", {enumerable:true, configurable:false, get:function() {
      return $lastDayLabel
    }});
    var $bioLegend = null;
    Object.defineProperty(this, "$bioLegend", {enumerable:true, configurable:false, get:function() {
      return $bioLegend
    }});
    (function initialize() {
      create$();
      initialize$()
    })();
    function create$() {
      $biorhythmViewContainer = $("#biorhythmViewContainer");
      $firstDayLabel = $("#firstDayLabel");
      $firstDayTextBox = $("#firstDayTextBox");
      $lastDayLabel = $("#lastDayLabel");
      $lastDayTextBox = $("#lastDayTextBox");
      $bioLegend = $("#bioLegend")
    }
    function initialize$() {
      $firstDayTextBox.datepicker({changeMonth:true, changeYear:true, dateFormat:"yy-mm-dd", showButtonPanel:true, showAnim:""});
      $lastDayTextBox.datepicker({changeMonth:true, changeYear:true, dateFormat:"yy-mm-dd", showButtonPanel:true, showAnim:""});
      $biorhythmViewContainer.biorhythmView({width:900, height:200});
      $bioLegend.biorhythmLegend()
    }
  }
})(jQuery);
(function ChartsSection($, ChartsSectionView, bioCalcPageData, dateFormatter, dateUtil) {
  var view;
  function publishCurrentXDay() {
    var xDay = view.$biorhythmViewContainer.biorhythmView("getXDay");
    bioCalcPageData.xDay = xDay
  }
  function setFirstDayLabel(date) {
    var firstDayAsText = dateFormatter.formatDate(date);
    view.$firstDayTextBox.val(firstDayAsText);
    view.$firstDayLabel.html("\x3c\x3c " + firstDayAsText)
  }
  function setLastDayLabel(date) {
    var lastDayAsText = dateFormatter.formatDate(date);
    view.$lastDayTextBox.val(lastDayAsText);
    view.$lastDayLabel.html(lastDayAsText + " \x3e\x3e")
  }
  function setFirstDayToCharts(date) {
    view.$biorhythmViewContainer.biorhythmView("option", "firstDay", date)
  }
  function setBiorhythms(biorhythms) {
    view.$biorhythmViewContainer.biorhythmView("option", "biorhythms", biorhythms);
    view.$bioLegend.biorhythmLegend("option", "biorhythms", biorhythms)
  }
  function setBirthday(newBirthday) {
    view.$biorhythmViewContainer.biorhythmView("suspendPaint");
    try {
      var biorhythms = bioCalcPageData.biorhythms;
      biorhythms.setBirthdayOnAll(newBirthday)
    }finally {
      view.$biorhythmViewContainer.biorhythmView("resumePaint")
    }
  }
  function onBiorhythmViewFirstDayChanged() {
    var firstDay = view.$biorhythmViewContainer.biorhythmView("option", "firstDay");
    setFirstDayLabel(firstDay);
    var lastDay = view.$biorhythmViewContainer.biorhythmView("getLastDay");
    setLastDayLabel(lastDay);
    publishCurrentXDay()
  }
  function onFirstDayLabelClick() {
    setTimeout(function() {
      view.$firstDayTextBox.datepicker("show")
    }, 0)
  }
  function onFirstDayDatePickerSelect() {
    var firstDay = $(this).datepicker("getDate");
    setFirstDayToCharts(firstDay)
  }
  function onBeforeFirstDayDatePickerShow(input, inst) {
    var calendar = inst.dpDiv;
    setTimeout(function() {
      calendar.position({my:"left top", at:"left bottom", collision:"none", of:view.$firstDayLabel})
    }, 0)
  }
  function onLastDayLabelClick() {
    setTimeout(function() {
      view.$lastDayTextBox.datepicker("show")
    }, 0)
  }
  function onLastDayDatePickerSelect() {
    var lastDay = $(this).datepicker("getDate");
    var displayedDayCount = view.$biorhythmViewContainer.biorhythmView("option", "totalDays") - 1;
    var firstDay = dateUtil.addDays(lastDay, -displayedDayCount);
    setFirstDayToCharts(firstDay)
  }
  function onBeforeLastDayDatePickerShow(input, inst) {
    var calendar = inst.dpDiv;
    setTimeout(function() {
      calendar.position({my:"right top", at:"right bottom", collision:"none", of:view.$lastDayLabel})
    }, 0)
  }
  function onBiorhythmViewXDayIndexChanged(sender, arg) {
    publishCurrentXDay()
  }
  function onExternalBirthdayChanged(arg) {
    setBirthday(arg);
    publishCurrentXDay()
  }
  function onExternalBiorhythmsChanged(arg) {
    setBiorhythms(arg)
  }
  (function initialize() {
    $(function() {
      view = new ChartsSectionView;
      view.$firstDayLabel.click(onFirstDayLabelClick);
      view.$firstDayTextBox.datepicker("option", "beforeShow", onBeforeFirstDayDatePickerShow);
      view.$firstDayTextBox.datepicker("option", "onSelect", onFirstDayDatePickerSelect);
      view.$lastDayLabel.click(onLastDayLabelClick);
      view.$lastDayTextBox.datepicker("option", "beforeShow", onBeforeLastDayDatePickerShow);
      view.$lastDayTextBox.datepicker("option", "onSelect", onLastDayDatePickerSelect);
      view.$biorhythmViewContainer.biorhythmView("option", "firstDayChanged", onBiorhythmViewFirstDayChanged);
      view.$biorhythmViewContainer.biorhythmView("option", "xDayIndexChanged", onBiorhythmViewXDayIndexChanged);
      view.$biorhythmViewContainer.biorhythmView("suspendPaint");
      try {
        var firstDay = dateUtil.addDays(Date.now(), -7);
        setFirstDayLabel(firstDay);
        setFirstDayToCharts(firstDay);
        setBiorhythms(bioCalcPageData.biorhythms);
        setBirthday(bioCalcPageData.birthday);
        publishCurrentXDay();
        bioCalcPageData.birthdayChanged.subscribe(onExternalBirthdayChanged);
        bioCalcPageData.biorhythmsChanged.subscribe(onExternalBiorhythmsChanged)
      }finally {
        view.$biorhythmViewContainer.biorhythmView("resumePaint")
      }
    })
  })()
})(jQuery, lu.bioCalc.mainPage.pageSections.ChartsSectionView, lu.bioCalc.mainPage.BioCalcPageData, lu.bioCalc.DateFormatter, lu.DateUtil);
