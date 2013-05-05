User Script : GitHub Repo-Filter Info
=====================================

### Description ###

This is a user script to display some additional info below
the repository filter on a user's main GitHub page.  It will
show the current number of visible repositories, as well as the
number of watchers and forks for all the visible repos. It will
also display a language breakdown for the visible repositories.


### Installation ###

1. Make sure you have user scripts enabled in your browser (these instructions refer to the latest versions of the browsers):  
    * ***CHROME 21+***:
      1. Download the user script.
      2. Open **chrome://chrome/extensions/**.
      3. Drag and drop the user script file on the page you opened in step 2.
    * ***CHROME 20 (and below)***: User scripts are enabled by default. Continue to STEP 2.
    * ***FIREFOX***: Install [GreaseMonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/), then continue to STEP 2.
    * ***IE***: Install [Trixie](http://www.bhelpuri.net/Trixie/). Continue to STEP 2.
    * ***OPERA***: Follow instructions located on Opera's site: [User JS](http://www.opera.com/docs/userjs/). Continue to STEP 2.
    * &#x20;<del>***SAFARI***: Install [SIMBL](http://www.culater.net/software/SIMBL/SIMBL.php). Install [GreaseKit](http://8-p.info/greasekit/). Continue to STEP 2.</del>
    * ***SAFARI***: Install [NinjaKit](http://d.hatena.ne.jp/os0x/20100612/1276330696). Continue to STEP 2. (see [Issue #2](https://github.com/skratchdot/github-code-search.user.js/issues/2))
2. Install the "GitHub Repo-Filter Info" user script by clicking here: [github-repo-filter-info.user.js](https://github.com/skratchdot/github-repo-filter-info.user.js/raw/master/github-repo-filter-info.user.js).  

### Screenshots ###

#### Before installing the user script: ####

![Before Installation](https://github.com/skratchdot/github-repo-filter-info.user.js/raw/master/images/before.png)  

#### After installing the user script: ####

**Language breakdown is hidden:**  
![After Installation - Account exists](https://github.com/skratchdot/github-repo-filter-info.user.js/raw/master/images/after1.png)  

**Language breakdown is shown:**  
![After Installation - Account doesn't exist](https://github.com/skratchdot/github-repo-filter-info.user.js/raw/master/images/after2.png)  


### Credits ###

Pie Chart is being drawn with the help of:

- [d3](http://d3js.org/)
- [d3.ay-pie-chart.js](https://github.com/gajus/pie-chart)

