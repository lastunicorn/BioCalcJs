// BioControls
// Copyright (C) 2013 Last Unicorn
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

(function($) {
    $.widget("lastunicorn.biorhythmView", {
        options: {
            width: 800,
            height: 200,
            biorhythms: [],
            firstDay: lu.DateUtil.addDays(Date.now(), -7),
            isGridVisible: true,
            totalDays: 30,
            xDayIndex: 7,
            gridColor: "#d3d3d3", // LightGray
            areDayNumbersVisible: true,
            areWeekDaysVisible: true,
            dayNumbersPosition: lu.DayLabelPosition.top,
            weekDaysPosition: lu.DayLabelPosition.bottom,
            areSundaysEmphasized: true,
            foreColor: "#b0b0b0",
            sundaysColor: "#ff0000", // Red
            font: "12px Arial",
            sundaysFont: "italic 12px Arial",
            todayBackColor: "#ffe4b5", // Moccasin
            isXDayVisible: true,
            xDayBorderColor: "#000000", // Black
            xDayBorderWidth: 2
        },

        _create: function() {
            this._$canvas = this._createCanvasElement();
            this.element.append(this._$canvas);

            new lu.bioControls.biorhythmView.Scroller({
                element: this._$canvas[0],
                onDrag: $.proxy(this._onDrag, this),
                onDragStart: $.proxy(this._onDragStart, this)
            });

            this._painter = new lu.bioControls.biorhythmView.painting.Painter();

            this._biorhythms = new lu.bioControls.BiorhythmsAdapter({
                biorhythms: this.options.biorhythms,
                onBiorhithmAdded: $.proxy(this._onBiorhithmAdded, this),
                onBiorhithmRemoved: $.proxy(this._onBiorhithmRemoved, this)
            });

            this._paint();
        },

        _setOption: function(key, value) {
            this.suspendPaint();
            try {
                if (key === "biorhythms") {
                    this._biorhythms.clear();

                    this._super(key, value);

                    this._biorhythms = new lu.bioControls.BiorhythmsAdapter({
                        biorhythms: this.options.biorhythms,
                        onBiorhithmAdded: $.proxy(this._onBiorhithmAdded, this),
                        onBiorhithmRemoved: $.proxy(this._onBiorhithmRemoved, this)
                    });
                }

                if (key === "firstDay") {
                    this._super(key, value);

                    this._trigger("firstDayChanged", this, {
                        value: this.options.firstDay
                    });
                }

                if (key === "isGridVisible") {
                    this._super(key, value);

                    this._trigger("isGridVisibleChanged", this, {
                        value: this.options.isGridVisible
                    });
                }

                if (key === "totalDays") {
                    this._super(key, value);

                    this._trigger("totalDaysChanged", this, {
                        value: this.options.totalDays
                    });
                }

                if (key === "xDayIndex") {
                    if (this.options.xDayIndex === value || value < 0 || value >= this.options.totalDays)
                        return;

                    this._super(key, value);

                    this._trigger("xDayIndexChanged", this, {
                        value: this.options.xDayIndex
                    });
                }

                if (key === "gridColor") {
                    this._super(key, value);

                    this._trigger("gridColorChanged", this, {
                        value: this.options.gridColor
                    });
                }

                if (key === "areDayNumbersVisible") {
                    this._super(key, value);

                    this._trigger("areDayNumbersVisibleChanged", this, {
                        value: this.options.areDayNumbersVisible
                    });
                }

                if (key === "areWeekDaysVisible") {
                    this._super(key, value);

                    this._trigger("areWeekDaysVisibleChanged", this, {
                        value: this.options.areWeekDaysVisible
                    });
                }

                if (key === "dayNumbersPosition") {
                    this._super(key, value);

                    this._trigger("dayNumbersPositionChanged", this, {
                        value: this.options.dayNumbersPosition
                    });
                }

                if (key === "weekDaysPosition") {
                    this._super(key, value);

                    this._trigger("weekDaysPositionChanged", this, {
                        value: this.options.weekDaysPosition
                    });
                }

                if (key === "areSundaysEmphasized") {
                    this._super(key, value);

                    this._trigger("areSundaysEmphasizedChanged", this, {
                        value: this.options.areSundaysEmphasized
                    });
                }

                if (key === "foreColor") {
                    this._super(key, value);

                    this._trigger("foreColorChanged", this, {
                        value: this.options.foreColor
                    });
                }

                if (key === "sundaysColor") {
                    this._super(key, value);

                    this._trigger("sundaysColorChanged", this, {
                        value: this.options.sundaysColor
                    });
                }

                if (key === "font") {
                    this._super(key, value);

                    this._trigger("fontChanged", this, {
                        value: this.options.font
                    });
                }

                if (key === "sundaysFont") {
                    this._super(key, value);

                    this._trigger("sundaysFontChanged", this, {
                        value: this.options.sundaysFont
                    });
                }

                if (key === "todayBackColor") {
                    this._super(key, value);

                    this._trigger("todayBackColorChanged", this, {
                        value: this.options.todayBackColor
                    });
                }

                if (key === "isXDayVisible") {
                    this._super(key, value);

                    this._trigger("isXDayVisibleChanged", this, {
                        value: this.options.isXDayVisible
                    });
                }

                if (key === "xDayBorderColor") {
                    this._super(key, value);

                    this._trigger("xDayBorderColorChanged", this, {
                        value: this.options.xDayBorderColor
                    });
                }

                if (key === "xDayBorderWidth") {
                    this._super(key, value);

                    this._trigger("xDayBorderWidthChanged", this, {
                        value: this.options.xDayBorderWidth
                    });
                }
            }
            finally {
                this.resumePaint();
            }
        },

        // --------------------------------------------------------------------------
        // Html element
        // --------------------------------------------------------------------------

        _createCanvasElement: function() {
            var $canvas = $("<canvas/>");
            $canvas.attr({
                "tabindex": "1",
                "width": this.options.width,
                "height": this.options.height
            });

            return $canvas;
        },

        // --------------------------------------------------------------------------
        // FirstDay
        // --------------------------------------------------------------------------

        _incrementFirstDay: function(value) {
            var date = new Date(this.options.firstDay.getTime());
            date.setDate(date.getDate() + value);
            this.option("firstDay", date);
        },

        // --------------------------------------------------------------------------
        // LastDay
        // --------------------------------------------------------------------------

        getLastDay: function() {
            return lu.DateUtil.addDays(this.options.firstDay, this.options.totalDays - 1);
        },

        // --------------------------------------------------------------------------
        // XDay
        // --------------------------------------------------------------------------

        getXDay: function() {
            return lu.DateUtil.addDays(this.options.firstDay, this.options.xDayIndex);
        },

        // --------------------------------------------------------------------------
        // Biorhythms
        // --------------------------------------------------------------------------

        _onBiorhithmAdded: function(biorhythmShape) {
            this._subscribeToBiorhythmEvents(biorhythmShape);

            this._trigger("biorhythmAdded", this, {
                value: biorhythmShape
            });

            this._paint();
        },

        _subscribeToBiorhythmEvents: function(biorhythmShape) {
            biorhythmShape.nameChanged.subscribe($.proxy(this._onBiorhithmShapeChanged, this));
            biorhythmShape.birthdayChanged.subscribe($.proxy(this._onBiorhithmShapeChanged, this));
            biorhythmShape.biorhythmChanged.subscribe($.proxy(this._onBiorhithmShapeChanged, this));
            biorhythmShape.colorChanged.subscribe($.proxy(this._onBiorhithmShapeChanged, this));
            biorhythmShape.isVisibleChanged.subscribe($.proxy(this._onBiorhithmShapeChanged, this));
            biorhythmShape.lineWidthChanged.subscribe($.proxy(this._onBiorhithmShapeChanged, this));
            biorhythmShape.lineStyleChanged.subscribe($.proxy(this._onBiorhithmShapeChanged, this));
        },

        _onBiorhithmRemoved: function(biorhythmShape) {
            this._subscribeToBiorhythmEvents(biorhythmShape);

            this._trigger("biorhythmRemoved", this, {
                value: biorhythmShape
            });

            this._paint();
        },

        _unsubscribeFromBiorhythmEvents: function(biorhythmShape) {
            biorhythmShape.nameChanged.unsubscribe($.proxy(this._onBiorhithmShapeChanged, this));
            biorhythmShape.birthdayChanged.unsubscribe($.proxy(this._onBiorhithmShapeChanged, this));
            biorhythmShape.biorhythmChanged.unsubscribe($.proxy(this._onBiorhithmShapeChanged, this));
            biorhythmShape.colorChanged.unsubscribe($.proxy(this._onBiorhithmShapeChanged, this));
            biorhythmShape.isVisibleChanged.unsubscribe($.proxy(this._onBiorhithmShapeChanged, this));
            biorhythmShape.lineWidthChanged.unsubscribe($.proxy(this._onBiorhithmShapeChanged, this));
            biorhythmShape.lineStyleChanged.unsubscribe($.proxy(this._onBiorhithmShapeChanged, this));
        },

        _onBiorhithmShapeChanged: function() {
            this._paint();
        },

        // --------------------------------------------------------------------------
        // Paint
        // --------------------------------------------------------------------------

        _paintSuspendCount: 0,

        suspendPaint: function() {
            this._paintSuspendCount++;
        },

        resumePaint: function() {
            if (this._paintSuspendCount > 0) {
                this._paintSuspendCount--;
            }

            if (this._paintSuspendCount == 0) {
                this._paint();
            }
        },

        _paint: function() {
            if (this._paintSuspendCount > 0) {
                return;
            }

            if (!this._$canvas[0].getContext) {
                return;
            }

            var rawPaintData = {
                biorhythmShapes: this._biorhythms.toArray(),
                firstDay: this.options.firstDay,
                totalDays: this.options.totalDays,
                xDayIndex: this.options.xDayIndex,
                isXDayVisible: this.options.isXDayVisible,
                xDayBorderColor: this.options.xDayBorderColor,
                xDayBorderWidth: this.options.xDayBorderWidth,
                gridColor: this.options.gridColor,
                isGridVisible: this.options.isGridVisible,
                todayBackColor: this.options.todayBackColor,

                areDayNumbersVisible: this.options.areDayNumbersVisible,
                areWeekDaysVisible: this.options.areWeekDaysVisible,
                dayNumbersPosition: this.options.dayNumbersPosition,
                weekDaysPosition: this.options.weekDaysPosition,
                areSundaysEmphasized: this.options.areSundaysEmphasized,

                foreColor: this.options.foreColor,
                sundaysColor: this.options.sundaysColor,
                font: this.options.font,
                sundaysFont: this.options.sundaysFont
            };

            var canvasElement = this._$canvas[0];
            var context = canvasElement.getContext('2d');
            var rectangle = new lu.Rectangle(0, 0, canvasElement.width, canvasElement.height);

            this._painter.paint(rawPaintData, context, rectangle);
        },

        // --------------------------------------------------------------------------
        // Drag/Scroll
        // --------------------------------------------------------------------------

        _onDrag: function(evt) {
            if (evt.isAlternative) {
                this.option("xDayIndex", this.options.xDayIndex + evt.steps);
            } else {
                this._incrementFirstDay(-evt.steps);
            }
        },

        _onDragStart: function(evt) {
            evt.stepLength = this._$canvas[0].width / this.options.totalDays;
        }
    });
}(jQuery));