/*
 * Copyright 2012, André Fiedler < http://twitter.com/sonnenkiste >
 * licensed under the MIT license.
 *
 * Inspired by HN mobile by Lim Chee Aun < http://github.com/cheeaun/hnmobile > and
 *          by Bombay-Crushed by the SaftigeKumquat team < http://github.com/SaftigeKumquat/Bombay-Crushed >
 */

(function(w, d){
    
    var $ = App.$, html = '';
    
    lqfb_api.query('/info', {}, null, function(res) {
		html += 'Server: ' + lqfb_api.baseurl.host + ':' + lqfb_api.baseurl.port + '<br/>';
		html += 'Core Version: ' + res.core_version + '<br/>';
		html += 'API Version:  ' + res.api_version;
        
        $('server-info').innerHTML = html;
	});
    
})(window, document);