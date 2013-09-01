// BioCalc
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
    var widget = null;
    var $canvas = null;
    var painter = null;
    var paintSuspendCount = 0;

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
            widget = this;
            $canvas = createCanvasElement();
            this.element.append($canvas);

            new lu.bioControls.biorhythmView.Scroller({
                element: $canvas[0],
                onDragStart: onDragStart,
                onDrag: onDrag
            });

            painter = new lu.bioControls.biorhythmView.painting.BiorhythmViewPainter();

            subscribeToBiorhythmsEvents(this.options.biorhythms);

            paint();
        },

        _setOption: function(key, value) {
            suspendPaint();
            try {
                if (key === "biorhythms") {
                    unsubscribeFromBiorhythmsEvents(this.options.birhythms);

                    this._super(key, value);

                    subscribeToBiorhythmsEvents(this.options.birhythms);
                }

                if (key === "firstDay") {
                    this._super(key, value);

                    this._trigger("firstDayChanged", null, {
                        value: this.options.firstDay
                    });
                }

                if (key === "isGridVisible") {
                    this._super(key, value);

                    this._trigger("isGridVisibleChanged", null, {
                        value: this.options.isGridVisible
                    });
                }

                if (key === "totalDays") {
                    this._super(key, value);

                    this._trigger("totalDaysChanged", null, {
                        value: this.options.totalDays
                    });
                }

                if (key === "xDayIndex") {
                    this._super(key, value);

                    this._trigger("xDayIndexChanged", null, {
                        value: this.options.xDayIndex
                    });
                }

                if (key === "gridColor") {
                    this._super(key, value);

                    this._trigger("gridColorChanged", null, {
                        value: this.options.gridColor
                    });
                }

                if (key === "areDayNumbersVisible") {
                    this._super(key, value);

                    this._trigger("areDayNumbersVisibleChanged", null, {
                        value: this.options.areDayNumbersVisible
                    });
                }

                if (key === "areWeekDaysVisible") {
                    this._super(key, value);

                    this._trigger("areWeekDaysVisibleChanged", null, {
                        value: this.options.areWeekDaysVisible
                    });
                }

                if (key === "dayNumbersPosition") {
                    this._super(key, value);

                    this._trigger("dayNumbersPositionChanged", null, {
                        value: this.options.dayNumbersPosition
                    });
                }

                if (key === "weekDaysPosition") {
                    this._super(key, value);

                    this._trigger("weekDaysPositionChanged", null, {
                        value: this.options.weekDaysPosition
                    });
                }

                if (key === "areSundaysEmphasized") {
                    this._super(key, value);

                    this._trigger("areSundaysEmphasizedChanged", null, {
                        value: this.options.areSundaysEmphasized
                    });
                }

                if (key === "foreColor") {
                    this._super(key, value);

                    this._trigger("foreColorChanged", null, {
                        value: this.options.foreColor
                    });
                }

                if (key === "sundaysColor") {
                    this._super(key, value);

                    this._trigger("sundaysColorChanged", null, {
                        value: this.options.sundaysColor
                    });
                }

                if (key === "font") {
                    this._super(key, value);

                    this._trigger("fontChanged", null, {
                        value: this.options.font
                    });
                }

                if (key === "sundaysFont") {
                    this._super(key, value);

                    this._trigger("sundaysFontChanged", null, {
                        value: this.options.sundaysFont
                    });
                }

                if (key === "todayBackColor") {
                    this._super(key, value);

                    this._trigger("todayBackColorChanged", null, {
                        value: this.options.todayBackColor
                    });
                }

                if (key === "isXDayVisible") {
                    this._super(key, value);

                    this._trigger("isXDayVisibleChanged", null, {
                        value: this.options.isXDayVisible
                    });
                }

                if (key === "xDayBorderColor") {
                    this._super(key, value);

                    this._trigger("xDayBorderColorChanged", null, {
                        value: this.options.xDayBorderColor
                    });
                }

                if (key === "xDayBorderWidth") {
                    this._super(key, value);

                    this._trigger("xDayBorderWidthChanged", null, {
                        value: this.options.xDayBorderWidth
                    });
                }
            }
            finally {
                resumePaint();
            }
        },

        suspendPaint: suspendPaint,
        resumePaint: resumePaint
    });

    function createCanvasElement() {
        var $canvas = $("<canvas/>");
        $canvas.attr({
            "tabindex": "1",
            "width": widget.options.width,
            "height": widget.options.height
        });

        return $canvas;
    }

    function unsubscribeFromBiorhythmsEvents(biorhythms) {
        if (biorhythms && biorhythms.itemAdded && biorhythms.itemAdded.unsubscribe) {
            biorhythms.itemAdded.unsubscribe(onBiorhithmAdded);
        }

        if (biorhythms && biorhythms.itemRemoved && biorhythms.itemRemoved.unsubscribe) {
            biorhythms.itemRemoved.unsubscribe(onBiorhithmRemoved);
        }

        var biorhythmsArray = getBiorhythmsArray(biorhythms);
        for ( var i = 0; i < biorhythmsArray.length; i++) {
            unsubscribeFromBiorhythmEvents(biorhythmsArray[i]);
        }
    }

    function subscribeToBiorhythmsEvents(biorhythms) {
        if (biorhythms && biorhythms.itemAdded && biorhythms.itemAdded.subscribe) {
            biorhythms.itemAdded.subscribe(onBiorhithmAdded);
        }

        if (biorhythms && biorhythms.itemRemoved && biorhythms.itemRemoved.subscribe) {
            biorhythms.itemRemoved.subscribe(onBiorhithmRemoved);
        }

        var biorhythmsArray = getBiorhythmsArray(biorhythms);
        for ( var i = 0; i < biorhythmsArray.length; i++) {
            subscribeToBiorhythmEvents(biorhythmsArray[i]);
        }
    }

    function subscribeToBiorhythmEvents(biorhythmShape) {
        biorhythmShape.nameChanged.subscribe(onBiorhithmShapeChanged);
        biorhythmShape.birthdayChanged.subscribe(onBiorhithmShapeChanged);
        biorhythmShape.biorhythmChanged.subscribe(onBiorhithmShapeChanged);
        biorhythmShape.colorChanged.subscribe(onBiorhithmShapeChanged);
        biorhythmShape.isVisibleChanged.subscribe(onBiorhithmShapeChanged);
        biorhythmShape.lineWidthChanged.subscribe(onBiorhithmShapeChanged);
        biorhythmShape.lineStyleChanged.subscribe(onBiorhithmShapeChanged);

    }

    function onBiorhithmAdded(biorhythmShape) {
        subscribeToBiorhythmEvents(biorhythmShape);
        biorhythmAddedEvent.raise(obj, biorhythmShape);

        paint();
    }

    function unsubscribeFromBiorhythmEvents(biorhythmShape) {
        biorhythmShape.nameChanged.unsubscribe(onBiorhithmShapeChanged);
        biorhythmShape.birthdayChanged.unsubscribe(onBiorhithmShapeChanged);
        biorhythmShape.biorhythmChanged.unsubscribe(onBiorhithmShapeChanged);
        biorhythmShape.colorChanged.unsubscribe(onBiorhithmShapeChanged);
        biorhythmShape.isVisibleChanged.unsubscribe(onBiorhithmShapeChanged);
        biorhythmShape.lineWidthChanged.unsubscribe(onBiorhithmShapeChanged);
        biorhythmShape.lineStyleChanged.unsubscribe(onBiorhithmShapeChanged);
    }

    function onBiorhithmRemoved(biorhythmShape) {
        subscribeToBiorhythmEvents(biorhythmShape);
        biorhythmRemovedEvent.raise(obj, biorhythmShape);

        paint();
    }

    function onBiorhithmShapeChanged() {
        paint();
    }

    function getBiorhythmsArray(biorhythms) {
        if (biorhythms instanceof Array) {
            return biorhythms;
        } else {
            if ($.isFunction(biorhythms.toArray)) {
                return biorhythms.toArray();
            }
        }

        return [];
    }

    function suspendPaint() {
        paintSuspendCount++;
    }

    function resumePaint() {
        if (paintSuspendCount > 0) {
            paintSuspendCount--;
        }

        if (paintSuspendCount == 0) {
            paint();
        }
    }

    function paint() {
        if (paintSuspendCount > 0) {
            return;
        }

        if (!$canvas[0].getContext) {
            return;
        }

        var rawPaintData = {
            biorhythmShapes: getBiorhythmsArray(widget.options.biorhythms),
            firstDay: widget.options.firstDay,
            totalDays: widget.options.totalDays,
            xDayIndex: widget.options.xDayIndex,
            isXDayVisible: widget.options.isXDayVisible,
            xDayBorderColor: widget.options.xDayBorderColor,
            xDayBorderWidth: widget.options.xDayBorderWidth,
            gridColor: widget.options.gridColor,
            isGridVisible: widget.options.isGridVisible,
            todayBackColor: widget.options.todayBackColor,

            areDayNumbersVisible: widget.options.areDayNumbersVisible,
            areWeekDaysVisible: widget.options.areWeekDaysVisible,
            dayNumbersPosition: widget.options.dayNumbersPosition,
            weekDaysPosition: widget.options.weekDaysPosition,
            areSundaysEmphasized: widget.options.areSundaysEmphasized,

            foreColor: widget.options.foreColor,
            sundaysColor: widget.options.sundaysColor,
            font: widget.options.font,
            sundaysFont: widget.options.sundaysFont
        };

        var context = $canvas[0].getContext('2d');
        var rectangle = new lu.Rectangle(0, 0, $canvas[0].width, $canvas[0].height);

        painter.paint(rawPaintData, context, rectangle);
    }

    function incrementFirstDay(value) {
        var date = new Date(widget.options.firstDay.getTime());
        date.setDate(date.getDate() + value);
        widget.option("firstDay", date);
    }

    function onDrag(evt) {
        if (evt.isAlternative) {
            widget.option("xDayIndex", widget.options.xDayIndex + evt.steps);
        } else {
            incrementFirstDay(-evt.steps);
        }
    }

    function onDragStart(evt) {
        evt.stepLength = $canvas[0].width / widget.options.totalDays;
    }
}(jQuery));