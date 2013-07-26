var lu = lu || {};

lu.Point = function (x, y) {
	this.getX = function getX() {
		return x;
	};
	
	this.getY = function getY() {
		return y;
	};
	
	this.toString = function() {
		return "[" + x + "; " + y + "]";
	};
};