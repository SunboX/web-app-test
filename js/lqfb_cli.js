/*
 * Copyright 2012, André Fiedler < http://twitter.com/sonnenkiste >
 * licensed under the MIT license.
 *
 * Inspired by HN mobile by Lim Chee Aun < http://github.com/cheeaun/hnmobile > and
 *          by Bombay-Crushed by the SaftigeKumquat team < http://github.com/SaftigeKumquat/Bombay-Crushed >
 */

(function(w, d){
    
    // Define base URL of LQFB backend
    var baseurl = {
        host: 'apitest.liquidfeedback.org',
        port: 25520
    };
    
    var lqfb_api = {};
    
    var typeOf = function(item){
        if (item == null) return 'null';
        if (item.$family != null) return item.$family();
        
        if (item.nodeName){
            if (item.nodeType == 1) return 'element';
            if (item.nodeType == 3) return (/\S/).test(item.nodeValue) ? 'textnode' : 'whitespace';
        } else if (typeof item.length == 'number'){
            if (item.callee) return 'arguments';
            if ('item' in item) return 'collection';
        }
        
        return typeof item;
    };
    
    var toQueryString = function(object, base){
        var value, queryString = [];
        
        for(var key in object){
            value = object[key];
			if(base) key = base + '[' + key + ']';
			var result;
			switch(typeOf(value)){
				case 'object': result = toQueryString(value, key); break;
				case 'array':
					var qs = {}, i, len = value.length;
                    for(i = 0; i < len; i++){
                        qs[i] = value[i];
                    }
					result = toQueryString(qs, key);
				break;
				default: result = key + '=' + encodeURIComponent(value);
			}
			if (value !== null) queryString.push(result);
		}

		return queryString.join('&');
	};
    
    /**
     * Build up the request options for the given path.
     */
    var buildRequestOptions = function(path, args, state) {
        var options = {
            protocol: 'http',
            host    : baseurl.host,
            port    : baseurl.port
        };
        if(path) {
            if(baseurl.path && typeof(baseurl.path) === 'string') {
                // make sure there is a dash in between
                if(path.charAt(0) === '/' || baseurl.path.charAt(baseurl.path.length-1) === '/') {
                    options.path = baseurl.path + path;
                } else {
                    options.path = baseurl.path + '/' + path;
                }
            } else {
                options.path = path;
            }
        }
        
        args = args || {};
        args.nc = +new Date();
        
        if(state && state.session_key()) {
            args.session_key = state.session_key();
        }
        options.path += '?' + toQueryString(args);
        
        return options;
    };
    
    /**
     * Perform a query against the Liquid Feedback API Server.
     *
     * The function will automaticall check for HTTP-Errors, parse the JSON returned by the server and
     * invoke the given handler function.
     *
     * @param path The query to perform as defined in http://dev.liquidfeedback.org/trac/lf/wiki/API.
     * @param handler The function to handle the JSON object returned by the API Server in response to the query.
     * @return The ClientResponseObject given by http(s).request.
     */
    lqfb_api.query = function(path, args, state, success, error) {
        var r = new XMLHttpRequest(), options;
		if (!success) success = function(){};
		if (!error) error = function(){};
		if ('withCredentials' in r){ // CORS
			try {
                options = buildRequestOptions(path, args, state);
				r.open('GET', options.protocol + '://' + options.host + ':' + options.port + options.path, true);
				r.onload = function(){
					try {
						var response = JSON.parse(this.responseText);
                        if(!response.status || response.status !== 'ok') {
                            if(response.status && response.status === 'forbidden') {
                                state.sendToLogin();
                            }
                            console.warn('STATUS: ' + response.status + ' - Error String: "' + response.error + '" - Query was: ' + path + ' ' + JSON.stringify(args));
                        }
                        success(response);
					} catch(e){
						error(e);
					}
				};
				r.onerror = error;
				r.send();
			} catch (e){
				error(e);
			}
		} else {
            args.callback = 'callback' + (+new Date());
            options = buildRequestOptions(path, args, state);
			var s = d.createElement('script');
			w[args.callback] = success;
			s.onerror = error;
			s.src = options.protocol + '://' + options.host + ':' + options.port + options.path;
			d.body.appendChild(s);
		}
    };
    
    w.lqfb_api = lqfb_api;
})(window, document);