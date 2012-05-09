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
                alert('contacts');
            },
            '/profile': function(){
                alert('profile');
            },
            '/timeline': function(){
                alert('timeline');
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