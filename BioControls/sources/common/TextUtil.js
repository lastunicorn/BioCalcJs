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

lu.TextUtil = (function() {

    function measureText(obj) {
        if (!obj) {
            return [ 0, 0 ];
        }

        var div = document.createElement('div');
        div.innerHTML = obj.text;
        div.style.position = "absolute";
        div.style.top = "-100px";
        div.style.left = "-100px";
        /*
         * div.style.fontFamily = obj.fontFamily; div.style.fontSize =
         * obj.fontSize + "pt";
         */
        div.style.font = obj.font;
        div.style.fontWeight = obj.isBold ? "bold" : "normal";
        div.style.fontStyle = obj.isItalic ? "italic" : "normal";
        div.style.visibility = "hidden";

        document.body.appendChild(div);

        var size;
        size = [ div.offsetWidth, div.offsetHeight ];

        document.body.removeChild(div);

        return size;
    }

    return {
        measureText: measureText
    };
}());