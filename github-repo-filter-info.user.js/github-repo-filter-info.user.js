// ==UserScript==
// @name           GitHub Repo-Filter Info
// @namespace      https://github.com/skratchdot/github-repo-filter-info.user.js
// @description    A user script to display some additional info below the repository filter on a user's main GitHub page.
// @include        https://github.com/*
// ==/UserScript==

var main = function () {
	// Declare a namespace to store functions in
	var SKRATCHDOT = SKRATCHDOT || {};

	// This will store jQuery object for the div we are injecting info into
	SKRATCHDOT.onRepoFilterDiv = null;

	// We want to allow a delay before displaying "filter info"
	// (to accommodate typing in the filter input box)
	SKRATCHDOT.onRepoFilterTimeout = null;

	// The function that will be called on all filter events
	SKRATCHDOT.onRepoFilter = function () {
		// the delay in milliseconds before showing the filter info
		var delay = 100;

		// if this function was called before delay time, wait a little bit longer
		window.clearTimeout(SKRATCHDOT.onRepoFilterTimeout);

		// show filter info (after delay)
		SKRATCHDOT.onRepoFilterTimeout = window.setTimeout(function() {
			var total = 0, forks = 0, forked = 0;
			
			// Calculate counts
			jQuery('ul.repo_list > li:visible').each(function(i) {
				var elem = $(this);
				total++;
				if(elem.hasClass('fork')) {
					forks++;
				}
				forked += parseInt(elem.find('li.forks a').text(), 10);
			});
			
			// Display counts
			SKRATCHDOT.onRepoFilterDiv.html(''
				+ 'Now Showing <b>' + total + '</b> Repos ('
				+ 'Forks: <b>' + forks + '</b>, '
				+ 'Forked: <b>' + forked + '</b>)'
			);

		}, delay);
	};
	
	// onDomReady : setup our page
	jQuery(document).ready(function() {
		// Create our information div
		jQuery('.filter-bar').after(
			jQuery('<div></div>')
				.attr('id', 'skratchdotOnRepoFilterDiv')
				.css('background', 'none repeat scroll 0 0 #FAFAFB')
				.css('border', '1px solid #DDDDDD')
				.css('border-radius', '4px 4px 4px 4px')
				.css('margin-bottom', '10px')
				.css('padding', '10px')
				.css('text-align', 'center')
		);

		// Store a reference to our information div
		SKRATCHDOT.onRepoFilterDiv = jQuery('#skratchdotOnRepoFilterDiv');

		// After every event in filter-bar, call SKRATCHDOT.onRepoFilter();
		jQuery('.filter-bar').find('*').each(function(i) {
			var events = jQuery(this).data('events');
			if(typeof events !== 'undefined') {
				for (var eventList in events) {
					for (var event in eventList) {
						if(event.type === 'click' || event.type === 'keyup') {
							var original = event.handler;
							event.handler = function() {
								var result = original.apply(this, arguments);
								SKRATCHDOT.onRepoFilter();
								return result;
							}
						}
					}
				}
			}
		});

		// Simulate a filter event to "initially populate" the info div
		SKRATCHDOT.onRepoFilter();		
	});
};

// Inject our main script
var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);
