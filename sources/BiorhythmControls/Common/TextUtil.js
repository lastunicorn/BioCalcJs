var lu = lu || {};

lu.TextUtil = (function() {
    
    function measureText(obj)
    {
        if (!obj) {
            return [0, 0];
        }
        
        var div = document.createElement('div');
        div.innerHTML = obj.text;
        div.style.position = "absolute";
        div.style.top = "-100px";
        div.style.left = "-100px";
        /*div.style.fontFamily = obj.fontFamily;
        div.style.fontSize = obj.fontSize + "pt";*/
        div.style.font = obj.font;
        div.style.fontWeight = obj.isBold ? "bold" : "normal";
        div.style.fontStyle = obj.isItalic ? "italic" : "normal";
        div.style.visibility = "hidden";
            
        document.body.appendChild(div);
        
        var size = [div.offsetWidth, div.offsetHeight];
    
        document.body.removeChild(div);
        
        return size;
    }
    
    return {
        measureText: measureText 
    };
}());