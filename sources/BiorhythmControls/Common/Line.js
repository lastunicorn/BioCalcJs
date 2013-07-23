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