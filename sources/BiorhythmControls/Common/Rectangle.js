var lu = lu || {};

lu.Rectangle = function (left, top, width, height) {
    this.getLeft = function () {
        return left;
    };
    
    this.getTop = function () {
        return top;
    };
    
    this.getWidth = function () {
        return width;
    };
    
    this.getHeight = function () {
        return height;
    };
	
	this.toString = function() {
		return "[" + left.toString() + ", " + top.toString() + "] w=" + width.toString() + "; h=" + height.toString();
	};
};