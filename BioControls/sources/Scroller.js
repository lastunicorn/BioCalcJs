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

var lu = lu || {};
lu.bioControls = lu.bioControls || {};

/**
 * Implements the functionality of horizontal scrolling for an html element.
 * 
 * @param configuration.element
 *            The element on which to implement scrolling mechanism.
 * 
 * @param configuration.onDragStart
 *            Method called when the user clicks the element. The method
 *            receives an object as parameter and the caller has to fill the
 *            e.stepLength value with the width in pixels of a step for the
 *            scrolling.
 * 
 * @param configuration.onDrag
 *            Method called when the user drags the mouse left or right the
 *            number of pixels specified when the drag process was started.
 */
lu.bioControls.Scroller = function(configuration) {

    var defaultStepLength = 1;
    var stepLength = 1;
    var ctrlPressed = false;
    var buttonPressed = lu.MouseButton.none;
    var currentDayIndex = 0;

    function raiseOnDragStart(arg) {
        if (typeof configuration.onDragStart === "function") {
            configuration.onDragStart(arg);
        }
    }

    function raiseOnDrag(arg) {
        if (typeof configuration.onDrag === "function") {
            configuration.onDrag(arg);
        }
    }

    function calculateStepLength() {
        var arg = {};
        raiseOnDragStart(arg);

        if (typeof (arg.stepLength) === "number") {
            return arg.stepLength;
        } else {
            return defaultStepLength;
        }
    }

    function onMouseDown(evt) {

        var isLeftOrRightButton = evt.which === lu.MouseButton.left || evt.which === lu.MouseButton.right;
        if (!isLeftOrRightButton) {
            return;
        }

        /*
         * if (!view.Focused) view.Focus();
         */

        var rect = configuration.element.getBoundingClientRect();
        var clickX = evt.clientX - rect.left;

        stepLength = calculateStepLength();
        currentDayIndex = Math.floor(clickX / stepLength);
        buttonPressed = evt.which;
    }

    function onMouseMove(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        var isLeftOrRightButton = buttonPressed === lu.MouseButton.left || buttonPressed === lu.MouseButton.right;
        if (!isLeftOrRightButton) {
            return;
        }

        var rect = configuration.element.getBoundingClientRect();
        var clickX = evt.clientX - rect.left;

        var index = Math.floor(clickX / stepLength);
        var steps = index - currentDayIndex;

        if (steps == 0) {
            return;
        }

        currentDayIndex = index;

        var isAlternative = ctrlPressed || buttonPressed === lu.MouseButton.right;

        raiseOnDrag({
            steps: steps,
            isAlternative: isAlternative
        });
    }

    function onMouseUp(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        var isLeftOrRightButton = evt.which === lu.MouseButton.left || evt.which === lu.MouseButton.right;
        if (isLeftOrRightButton) {
            buttonPressed = lu.MouseButton.none;
        }
    }

    function onWheel(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        var delta = evt.detail ? evt.detail : evt.wheelDelta / (-120);

        raiseOnDrag({
            steps: delta,
            isAlternative: false
        });
    }

    function onKeyDown(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (evt.keyCode === 17) {
            ctrlPressed = true;
        }
    }

    function onKeyUp(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (evt.keyCode === 17) {
            ctrlPressed = false;
        }
    }

    function onContextMenu(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }

    function onSelectStart(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        // FF doesn't recognize mousewheel as of FF3.x
        var mouseWheelEventName = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";

        configuration.element.addEventListener('mousedown', onMouseDown, false);
        document.addEventListener('mousemove', onMouseMove, false);
        document.addEventListener('mouseup', onMouseUp, false);

        configuration.element.addEventListener(mouseWheelEventName, onWheel, false);

        configuration.element.addEventListener('keydown', onKeyDown, false);
        configuration.element.addEventListener('keyup', onKeyUp, false);

        configuration.element.addEventListener('contextmenu', onContextMenu, false);
        configuration.element.addEventListener('selectstart', onSelectStart, false);
    }());
};