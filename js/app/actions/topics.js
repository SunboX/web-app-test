
 /*
    var overview_list = $('overview_list');
 
    var overviewScroll = d.querySelector('#overview .scroll'),
		areasScrollSection = overviewScroll.querySelector('section'),
		markupOverview = function(data, i){
			var html = '';
			var a = d.createElement('a');
			data.result.forEach(function(item){
				item.i = i++;
				html += tmpl('overview-list-item', item);
			});
			return html;
		},
		loadOverview = function(data){
			overview_list.innerHTML = markupOverview(data);
		},
		loadingOverview = false,
		reloadOverview = function(opts){
			if (loadingOverview) return;
			if (!opts) opts = {};
			var news = amplify.store('lqfb-overview');
			if (news){
				var delay = opts.delay;
				if (delay){
					loadingOverview = true;
					overview_list.innerHTML = '';
					overviewScroll.classList.add('loading');
					setTimeout(function(){
						loadingOverview = false;
						overviewScroll.classList.remove('loading');
						loadOverview(news);
					}, delay);
				} else {
					loadOverview(news);
				}
			} else {
				loadingOverview = true;
				overview_list.innerHTML = '';
				overviewScroll.classList.add('loading');
				lqfb_api.areas(function(data){
					loadingOverview = false;
					overviewScroll.classList.remove('loading');
					if (!data || data.error){
						errors.serverError();
						return;
					}
					amplify.store('lqfb-overview', data, {
						expires: 1000*60*5 // 5 minutes
					});
					loadOverview(data);
				}, function(e){
					loadingOverview = false;
					errors.connectionError(e);
				});
			}
		};
	
	reloadOverview();
    
	// Auto-reload news for some specific situations...
	w.addEventListener('pageshow', function(){
		setTimeout(function(){
			if (w.App.currentView == 'overview' && area_list.innerHTML && !amplify.store('lqfb-overview')){
				reloadOverview();
			}
		}, 1);
	}, false);

*/