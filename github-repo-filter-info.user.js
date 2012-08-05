// ==UserScript==
// @name           GitHub Repo-Filter Info
// @namespace      https://github.com/skratchdot/github-repo-filter-info.user.js
// @description    A user script to display some additional info below the repository filter on a user's main GitHub page.
// @include        https://github.com/*
// @match          https://github.com/*
// @run-at         document-end
// @icon           http://skratchdot.com/favicon.ico
// @downloadURL    https://github.com/skratchdot/github-repo-filter-info.user.js/raw/master/github-repo-filter-info.user.js
// @updateURL      https://github.com/skratchdot/github-repo-filter-info.user.js/raw/master/github-repo-filter-info.user.js
// @version        1.7
// ==/UserScript==
/*global jQuery */
/*jslint browser: true, unparam: true, plusplus: true */

var main = function () {
	'use strict';

	// Declare a namespace to store functions in
	var SKRATCHDOT = window.SKRATCHDOT || {};

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
		SKRATCHDOT.onRepoFilterTimeout = window.setTimeout(function () {
			var i = 0, total = 0, forks = 0, watchers = 0,
				languageHash = {}, languageArray = [], languageName = '', language = {};

			// Calculate counts
			jQuery('ul.repo_list > li:visible').each(function (i) {
				var elem = jQuery(this),
					languageName = '',
					forkCount = parseInt(elem.find('li.forks a').text().replace(',', ''), 10),
					watcherCount = parseInt(elem.find('li.stargazers a, li.watchers a').text().replace(',', ''), 10);
				total = total + 1;
				forks += forkCount;
				watchers += watcherCount;
				languageName = elem.find('li:first').not('.forks, .stargazers, .watchers').text();
				if (languageName === '') {
					languageName = 'Unknown';
				}
				if (!languageHash.hasOwnProperty(languageName)) {
					languageHash[languageName] = {
						name : languageName,
						count : 0,
						forks : 0,
						watchers : 0
					};
				}
				languageHash[languageName].count = languageHash[languageName].count + 1;
				languageHash[languageName].forks = languageHash[languageName].forks + forkCount;
				languageHash[languageName].watchers = languageHash[languageName].watchers + watcherCount;
			});

			// Display counts
			SKRATCHDOT.onRepoFilterDiv.find('.left').html('Now Showing <b>' + total + '</b> Repos');
			SKRATCHDOT.onRepoFilterDiv.find('.skratchdot-count-forks').text(forks);
			SKRATCHDOT.onRepoFilterDiv.find('.skratchdot-count-watchers').text(watchers);
			SKRATCHDOT.onRepoFilterDiv.find('table tbody').empty();

			// Convert to array
			for (languageName in languageHash) {
				if (languageHash.hasOwnProperty(languageName)) {
					languageArray.push(languageHash[languageName]);
				}
			}

			// Sort Array
			languageArray.sort(function (a, b) {
				return b.count - a.count || a.name > b.name;
			});

			// Show languages
			for (i = 0; i < languageArray.length; i++) {
				language = languageArray[i];
				SKRATCHDOT.onRepoFilterDiv.find('table tbody').append('<tr>' +
					'<td align="right" style="padding-right:10px">' + language.name + '</td>' +
					'<td align="center" style="padding-right:10px">' +
					((language.count / total) * 100).toFixed(1) + ' %' +
					'</td>' +
					'<td align="center" style="padding-right:10px">' + language.count + '</td>' +
					'<td align="center" style="padding-right:10px">' + language.watchers + '</td>' +
					'<td align="center" style="padding-right:10px">' + language.forks + '</td>' +
					'</tr>');
			}

		}, delay);
	};

	// onDomReady : setup our page
	jQuery(document).ready(function () {
		// Create our information div
		jQuery('div.js-repo-filter .filter-bar').after(
			jQuery('<div></div>')
				.attr('id', 'skratchdotOnRepoFilterDiv')
				.css('background', 'none repeat scroll 0 0 #FAFAFB')
				.css('border', '1px solid #DDDDDD')
				.css('border-radius', '4px 4px 4px 4px')
				.css('margin-bottom', '10px')
				.css('padding', '10px')
				.css('text-align', 'center')
				.append('<div class="left" />')
				.append('<div class="right">' +
					'<a class="skratchdot-languages" href="javascript:void(0)" style="font-size:.8em;padding:5px;">show languages</a>' +
					'<span class="mini-icon mini-icon-watchers"></span>' +
					'<span class="skratchdot-count-watchers" style="padding:0px 5px;"></span>' +
					'<span class="mini-icon mini-icon-fork"></span>' +
					'<span class="skratchdot-count-forks" style="padding:0px 5px;"></span>' +
					'</div>')
				.append('<div style="clear:both;float:right;">' +
					'<table style="display:none"><thead><tr>' +
					'<th style="padding-right:10px">Language</th>' +
					'<th style="padding-right:10px">Usage</th>' +
					'<th style="padding-right:10px">Repos</th>' +
					'<th style="padding-right:10px">Watchers</th>' +
					'<th style="padding-right:10px">Forks</th>' +
					'</tr></thead><tbody></tbody></table>' +
					'</div>')
				.append('<div class="clear" />')
		);

		// Store a reference to our information div
		SKRATCHDOT.onRepoFilterDiv = jQuery('#skratchdotOnRepoFilterDiv');

		// Attach a click event to show/hide language usage
		SKRATCHDOT.onRepoFilterDiv.click(function (e) {
			e.preventDefault();
			if (SKRATCHDOT.onRepoFilterDiv.find('table:visible').length > 0) {
				SKRATCHDOT.onRepoFilterDiv.find('.skratchdot-languages').text('show languages');
				SKRATCHDOT.onRepoFilterDiv.find('table').hide();
			} else {
				SKRATCHDOT.onRepoFilterDiv.find('.skratchdot-languages').text('hide languages');
				SKRATCHDOT.onRepoFilterDiv.find('table').show();
			}
		});

		// After every event in filter-bar, call SKRATCHDOT.onRepoFilter();
		jQuery('.filter-bar').find('*').each(function (i) {
			// NOTE: this is undocumented. Should move to $.Event().
			// $.data('events') was removed in jQuery 1.8
			// see: http://blog.jquery.com/2011/11/08/building-a-slimmer-jquery/
			// see: https://github.com/jquery/jquery/commit/24e416dca36df4b182a612dba37f8b6cdaa25916
			var events = jQuery._data(this, 'events');
			if (typeof events !== 'undefined') {
				jQuery.each(events, function (j, eventList) {
					jQuery.each(eventList, function (k, event) {
						if (event.type === 'click' || event.type === 'keyup') {
							var original = event.handler;
							event.handler = function () {
								var result = original.apply(this, arguments);
								SKRATCHDOT.onRepoFilter();
								return result;
							};
						}
					});
				});
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