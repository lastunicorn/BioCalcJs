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

var lu = lu || {};

lu.Debug = (function() {
	var debug = null;

	function write(text) {
		if (!debug) {
			return;
		}

		if (debug.innerHTML == "") {
			debug.innerHTML = text;
		} else {
			debug.innerHTML = debug.innerHTML + "<br\>" + text;
		}
	}

	function onDocumentReady() {
		debug = document.getElementById("debug");
	}

	window.addEventListener('load', onDocumentReady, false);

	return {
		write : write
	};
}());