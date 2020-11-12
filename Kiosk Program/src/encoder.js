function htmlEncode(str){
    return String(str).replace(/[^\w. ]/gi, function(c){
       return '&#'+c.charCodeAt(0)+';';
    });
  }
function jsEscape(str){
    return String(str).replace(/[^\w. ]/gi, function(c){
       return '\\u'+('0000'+c.charCodeAt(0).toString(16)).slice(-4);
    });
}