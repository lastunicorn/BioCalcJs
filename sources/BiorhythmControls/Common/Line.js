var lu = lu || {};

lu.Line = function (startPoint, endPoint) {
    this.getStartPoint = function () {
        return startPoint;
    };
    
    this.getEndPoint = function () {
        return endPoint;
    };
	
	this.toString = function() {
		return startPoint.toString() + " - " + endPoint.toString();
	}
};

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
	}
};