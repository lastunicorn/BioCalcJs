var lu = lu || {};

/*

HTML:

--------------------------------------------------------------------------------
<div id="debug" />
--------------------------------------------------------------------------------


CSS:

--------------------------------------------------------------------------------
#debug {
    white-space: nowrap;
    font: 12px Courier New;
}

.indent-container {
    padding-left: 20px;
}
--------------------------------------------------------------------------------

*/

lu.Debug = (function () {
	function write(text) {
		var obj = getStringOrJQuery(text);
		var $item = null;

		if (typeof obj === "string") {
		    $item = $("<div/>").text(obj);
		}

		if (obj instanceof jQuery) {
		    $item = obj;
		}

		if ($item !== null) {
		    $("#debug").append($item);
		}
	}

	function getStringOrJQuery(obj) {
		if (obj === undefined) {
		    obj = "< undefined >";
		}

		if (obj === null) {
		    obj = "< null >";
		}

		if (typeof obj === "string") {
		    return obj;
		}

		if (obj instanceof jQuery) {
		    return obj;
		}

		if ($.isFunction(obj.toString)) {
		    return obj.toString();
		}

		return "< cannot stringify >";
	}

	function writeAncestors(obj, description) {
		var $container = toDisplay(obj, description);
		write($container);
	}

	function toDisplay(obj, description) {
		var $container = $("<div/>");

		if (obj === undefined || obj === null) {
		    return $container;
		}

		if (description === undefined) {
		    description = "object";
		}

		var $title = $("<div/>")
		    .text("" + description + ": " + ownPropertiesToString(obj));
		$container.append($title);

		var $indentContainer = $("<div/>")
		    .addClass("indent-container");
		$container.append($indentContainer);

		var i = 1;
		do {
		    obj = Object.getPrototypeOf(obj);
		    if (obj !== null) {
		        var $ancestorItem = $("<div/>")
		            .text("ancestor " + i + ": " + ownPropertiesToString(obj));
		        $indentContainer.append($ancestorItem);
		    }
		    i++;
		} while (i < 10 && obj);

		return $container;
	}

	function ownPropertiesToString(obj) {
		if (obj === undefined) {
		    return "< undefined >";
		}

		if (obj === null) {
		    return "< null >";
		}

		return "{ " + Object.getOwnPropertyNames(obj).join('; ') + " }";
	}

	function writeEval(description, fn) {

		var result;

		if (typeof description === "function") {
		    fn = description;
		    description = fn.name;
		}

		if (typeof fn === "function") {
		    if (description === undefined) {
		        description = fn.name;
		    }

		    result = fn();
		}

		if (fn === undefined) {
		    if (typeof description === "string") {
		        result = eval(jsCode);
		    } else {
		        description = "" + description;
		        result = "< cannot evaluate >";
		    }
		}

		write(description + " -> " + result);
	}

	function writeEmptyLine() {
		write($("<div/>").html("&nbsp;"));
	}
	
	return {
		write: write,
		writeAncestors: writeAncestors,
		writeEval: writeEval,
		writeEmptyLine: writeEmptyLine
	};
}());
