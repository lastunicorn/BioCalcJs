// ------------------------------------------------------------------------
// 
// ------------------------------------------------------------------------

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

function writeEval(jsCode, description) {
    var result = eval(jsCode);
    
    if(description === undefined) {
        description = jsCode;
    }
    
    write(description + " -> " + result);
}

// ------------------------------------------------------------------------
// 
// ------------------------------------------------------------------------

(function () {
    write("===========================================");
    write("Array function");
    write("===========================================");
    writeAncestors(Array.prototype, "Array.prototype");
    write("-------------------------------------------");
    writeEval("Array.prototype.constructor === Array");
    writeEval("Object.getPrototypeOf(Array) === Function.prototype");

    write("-------------------------------------------");
    var array1 = new Array();
    write("var array1 = new Array();");
    writeAncestors(array1, "array1");
    write("Object.getPrototypeOf(array1) === Array.prototype -> " + (Object.getPrototypeOf(array1) === Array.prototype));

    write("-------------------------------------------");
    var array2 = [];
    write("var array2 = [];");
    writeAncestors(array2, "array2");
    write("Object.getPrototypeOf(array2) === Array.prototype -> " + (Object.getPrototypeOf(array2) === Array.prototype));
}());
