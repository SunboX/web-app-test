/*
 * Copyright 2012, André Fiedler < http://twitter.com/sonnenkiste >
 * licensed under the MIT license.
 *
 * Inspired by HN mobile by Lim Chee Aun < http://github.com/cheeaun/hnmobile > and
 *          by Bombay-Crushed by the SaftigeKumquat team < http://github.com/SaftigeKumquat/Bombay-Crushed >
 */

(function(w, d){
    
    w.State = State.create();
    
    var body = d.body,
        $ = App.$,
        overlay = $('overlay'),
        loginWindow = $('login-window'),
		hideAllViews = function(){
    		var views = d.querySelectorAll('.view');
			for (var i=0, l=views.length; i<l; i++){
				views[i].classList.add('hidden');
			}
		},
		flip = function(opts){
    		var inEl = opts.in,
				outEl = opts.out,
				inClass = inEl.classList,
				outClass = outEl.classList,
				direction = opts.direction,
				fn = opts.fn,
				flipWise = {
					clockwise: ['flip-out-to-left', 'flip-in-from-left'],
					anticlockwise: ['flip-out-to-right', 'flip-in-from-right']
				},
				wise = flipWise[direction],
				reset = function(){
					inEl.removeEventListener('webkitAnimationEnd', reset, false);
					body.classList.remove('viewport-flip');
					outClass.add('hidden');
					inClass.remove('flip');
					outClass.remove('flip');
					outClass.remove(wise[0]);
					inClass.remove(wise[1]);
					if (fn) fn.apply();
				};
			body.classList.add('viewport-flip');
			inClass.remove('hidden');
			outClass.add('flip');
			inClass.add('flip');
			inEl.addEventListener('webkitAnimationEnd', reset, false);
			outClass.add(wise[0]);
			inClass.add(wise[1]);
		},
    	slide = function(opts){
    		var inEl = opts.in,
				outEl = opts.out,
				inClass = inEl.classList,
				outClass = outEl.classList,
				direction = opts.direction,
				fn = opts.fn,
				slideWise = {
					rtl: ['slide-out-to-left', 'slide-in-from-right'],
					ltr: ['slide-out-to-right', 'slide-in-from-left']
				}
				wise = slideWise[direction],
				reset = function(){
					inEl.removeEventListener('webkitAnimationEnd', reset, false);
					outClass.add('hidden');
					outClass.remove('sliding');
					inClass.remove('sliding');
					outClass.remove(wise[0]);
					inClass.remove(wise[1]);
					inHeader.classList.remove('transparent');
					outHeader.classList.remove('transparent');
					if (fn) fn.apply();
				};
			var inHeader = inEl.querySelector('header'),
				outHeader = outEl.querySelector('header');
			inClass.remove('hidden');
			outClass.add('sliding');
			inClass.add('sliding');
			inEl.addEventListener('webkitAnimationEnd', reset, false);
			inHeader.classList.add('transparent');
			outHeader.classList.add('transparent');
			outClass.add(wise[0]);
			inClass.add(wise[1]);
		},
    	changeHard = function(opts){
    		var inEl = opts.in,
				outEl = opts.out,
				inClass = inEl.classList,
				outClass = outEl.classList,
				fn = opts.fn;
			inClass.remove('hidden');
			outClass.add('hidden');
			if (fn) fn.apply();
		},
        showOverlay = function(){
            overlay.classList.remove('hidden');
        },
        hideOverlay = function(){
            overlay.classList.add('hidden');
        },
        showLoginWindow = function(){
            showOverlay();
            loginWindow.classList.remove('hidden');
        },
        hideLoginWindow = function(){
            hideOverlay();
            loginWindow.classList.add('hidden');
        };
    
    w.Navigation = {
		hideAllViews: hideAllViews,
		flip: flip,
    	slide: slide,
    	changeHard: changeHard,
        showOverlay: showOverlay,
        hideOverlay: hideOverlay,
        showLoginWindow: showLoginWindow,
        hideLoginWindow: hideLoginWindow,
        menuOpen: false
    };
	
	w.addEventListener('pagehide', function(){
		amplify.store('lqfb-togo-hash', location.hash);
		var views = d.querySelectorAll('.view'),
			hackerScrollTops = {};
		for (var i=0, l=views.length; i<l; i++){
			var view = views[i],
				viewID = view.id,
				scrollSection = view.querySelector('.scroll section');
			hackerScrollTops[viewID] = scrollSection.scrollTop || 0;
		}
		amplify.store('lqfb-togo-scrolltops', hackerScrollTops);
	}, false);
	w.addEventListener('pageshow', function(){
		var hash = amplify.store('lqfb-togo-hash'),
			lqfbScrollTops = amplify.store('lqfb-togo-scrolltops');
		setTimeout(function(){
			if (hash) location.hash = hash;
			for (var id in lqfbScrollTops){
				$(id).querySelector('.scroll section').scrollTop = lqfbScrollTops[id];
			}
		}, 1);
	}, false);
	
})(window, document);