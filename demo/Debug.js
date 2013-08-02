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