// ==UserScript==
// @name           GitHub: Repo-Filter Info
// @namespace      https://github.com/skratchdot/github-repo-filter-info.user.js
// @description    A user script to display some additional info below the repository filter on a user's main GitHub page.
// @include        https://github.com/*
// @match          https://github.com/*
// @require        https://gist.github.com/skratchdot/5604120/raw/_init.js
// @require        https://gist.github.com/skratchdot/5604120/raw/d3.ay-pie-chart.js
// @require        https://gist.github.com/skratchdot/5604120/raw/repo-filter-info.js
// @run-at         document-end
// @icon           http://skratchdot.com/favicon.ico
// @downloadURL    https://github.com/skratchdot/github-repo-filter-info.user.js/raw/master/github-repo-filter-info.user.js
// @updateURL      https://github.com/skratchdot/github-repo-filter-info.user.js/raw/master/github-repo-filter-info.user.js
// @version        2.6
// ==/UserScript==
/*global SKRATCHDOT, document */

// This code is only going to run for browsers that don't support
// the @require annotation when executing userscripts.
if ('undefined' === typeof SKRATCHDOT) {
	var addScript = function (src) {
		'use strict';
		var script = document.createElement('script');
		script.src = src;
		document.body.appendChild(script);
		document.body.removeChild(script);
	};

	// Required by: repo-filter-info
	addScript('https://gist.github.com/skratchdot/5604120/raw/repo-filter-info.js');
}