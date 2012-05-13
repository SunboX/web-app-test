/*
 * Copyright 2012, André Fiedler < http://twitter.com/sonnenkiste >
 * licensed under the MIT license.
 *
 * Inspired by HN mobile by Lim Chee Aun < http://github.com/cheeaun/hnmobile > and
 *          by Bombay-Crushed by the SaftigeKumquat team < http://github.com/SaftigeKumquat/Bombay-Crushed >
 */

(function(w, d){
    
    var ua = navigator.userAgent.toLowerCase(),
        platform = navigator.platform.toLowerCase(),
    	UA = ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, 'unknown', 0],
    	mode = UA[1] == 'ie' && d.documentMode;
    
    w.Device = {
    
    	extend: Function.prototype.extend,
    
    	name: (UA[1] == 'version') ? UA[3] : UA[1],
    
    	version: mode || parseFloat((UA[1] == 'opera' && UA[4]) ? UA[4] : UA[2]),
    
    	platform: {
    		name: ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0]
    	}
    
    };
    
    w.Device[w.Device.name] = true;
    w.Device[w.Device.name + parseInt(w.Device.version, 10)] = true;
    w.Device.platform[w.Device.platform.name] = true;
    
})(window, document);