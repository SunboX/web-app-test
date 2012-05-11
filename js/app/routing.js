/*
 * Copyright 2012, André Fiedler < http://twitter.com/sonnenkiste >
 * licensed under the MIT license.
 *
 * Inspired by HN mobile by Lim Chee Aun < http://github.com/cheeaun/hnmobile > and
 *          by Bombay-Crushed by the SaftigeKumquat team < http://github.com/SaftigeKumquat/Bombay-Crushed >
 */

(function(w, d){
    
    var App = w.App,
        $ = App.$,
        hideAllViews = w.App.hideAllViews,
        flip = App.flip,
        slide = App.slide,
        changeHard = App.changeHard,
        routes = {
            '/': function(){
                var view = $('overview');
                if (!App.currentView){
                    hideAllViews();
                    view.classList.remove('hidden');
                } else if (App.currentView != 'overview'){
                    slide({
                        in: view,
                        out: $(App.currentView),
                        direction: 'ltr'
                    });
                }
                App.currentView = 'overview';
            },
            '/overview': function(){
                var view = $('overview');
                if (!App.currentView){
                    hideAllViews();
                    view.classList.remove('hidden');
                } else if (App.currentView != 'overview'){
                    var fn = App.menuOpen ? changeHard : slide;
                        
                    fn({
                        in: view,
                        out: $(App.currentView),
                        direction: 'ltr'
                    });
                }
                App.currentView = 'overview';
            },
            '/topics': function(){
                var view = $('topics');
                if (!App.currentView){
                    hideAllViews();
                    view.classList.remove('hidden');
                } else if (App.currentView != 'topics'){
                    var fn = App.menuOpen ? changeHard : slide;
                    
                    fn({
                        in: view,
                        out: $(App.currentView),
                        direction: 'ltr'
                    });
                }
                App.currentView = 'topics';
            },
            '/contacts': function(){
                var view = $('contacts');
                if (!App.currentView){
                    hideAllViews();
                    view.classList.remove('hidden');
                } else if (App.currentView != 'contacts'){
                    var fn = App.menuOpen ? changeHard : slide;
                    
                    fn({
                        in: view,
                        out: $(App.currentView),
                        direction: 'ltr'
                    });
                }
                App.currentView = 'contacts';
            },
            '/profile': function(){
                var view = $('profile');
                if (!App.currentView){
                    hideAllViews();
                    view.classList.remove('hidden');
                } else if (App.currentView != 'profile'){
                    var fn = App.menuOpen ? changeHard : slide;
                    
                    fn({
                        in: view,
                        out: $(App.currentView),
                        direction: 'ltr'
                    });
                }
                App.currentView = 'profile';
            },
            '/timeline': function(){
                var view = $('timeline');
                if (!App.currentView){
                    hideAllViews();
                    view.classList.remove('hidden');
                } else if (App.currentView != 'timeline'){
                    var fn = App.menuOpen ? changeHard : slide;
                    
                    fn({
                        in: view,
                        out: $(App.currentView),
                        direction: 'ltr'
                    });
                }
                App.currentView = 'timeline';
            },
            '/about': function(){
                var view = $('about');
                if (!App.currentView){
                    hideAllViews();
                    view.classList.remove('hidden');
                } else if (App.currentView != 'about'){
                    var fn = App.menuOpen ? changeHard : slide;
                    
                    fn({
                        in: view,
                        out: $(App.currentView),
                        direction: 'ltr'
                    });
                }
                App.currentView = 'about';
            }
        };
    
    w.App.routes = routes;
	
	Router(routes).configure({
		on: function(){
			amplify.store('lqfb-togo-hash', location.hash);
		},
		notfound: function(){
			location.hash = '/';
		}
	}).init(amplify.store('lqfb-togo-hash') || '/');
	
})(window, document);