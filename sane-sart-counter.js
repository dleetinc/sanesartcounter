var WIDGET = (function(WIDGET) {

	WIDGET.rate = '1.85';

	var scripts = document.getElementsByTagName('script');
	var index = scripts.length - 1;
	var myScript = scripts[index];

	if (WIDGET.base_url === undefined) WIDGET.base_url = myScript.src.replace('sane-sart-count.js', '');//https://cdn.rawgit.com/dleetinc/sanesartcounter/bde42060/';
	WIDGET.link = 'http://www.sane-sart.com/';
	
	var base_url = WIDGET.base_url;

	WIDGET.loadCSS = function(url, callback){
	    var link = document.createElement('link');
	        link.type = 'text/css';
	        link.rel = 'stylesheet';
	        link.href = url;

	    document.getElementsByTagName('head')[0].appendChild(link);

	    var img = document.createElement('img');
	        img.onerror = function(){
	            if(callback) callback(link);
	        }
	        img.src = url;
	}

	var theme = WIDGET.theme;
	if (theme === undefined) theme = 'default';
	var reset_css = base_url+'theme/reset.css';
	
	WIDGET.loadCSS(reset_css);

	var link = base_url+'theme/'+theme+'/style.css';	
	WIDGET.loadCSS(link, fix_layout);

	var monthNames = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	];
	var weekday = new Array(7);
	weekday[0]=  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";


	var date = new Date();
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	var weekdayIndex = date.getDay();

	var date_r = weekday[weekdayIndex]+', '+monthNames[monthIndex]+' '+day+', '+year;

	var template = "<div id='sane-sart-counter'>";
	template += "<div class='ss-toggle' id='ss-toggle'><div class='ss-toggle-icon'></div></div>";
	template += "<div id='ss-toggle-box'>";
	template += "<div class='ss-body'>";
	template += "<div class='ss-header ss-date'>";
	template += "<span>"+ date_r +"</span>";
	template += " - <span id='ss-clock'></span>";
	template += "</div>";
	template += "<div class='ss-stat-info'>Every <strong>"+ WIDGET.rate +" minutes</strong>*<br>an American is sexually assaulted.</div>";
	template += "<div class='ss-counter-display' id='ss-counter-display'></div>";
	template += "<div class='ss-counter-text'>Sexual assaults since 1.01."+year+"</div>";
	template += "</div>";

	template += "<div class='ss-footer'>";
	template += "<div class='ss-share' id='ss-share'>Get this counter for your own site.</div>";
	template += "<div class='ss-link'>Sane-Sart Online + Clinical <a class='ss-source-link' href='"+ WIDGET.link +"' target='_blank'>*source</a></div>"
	template += "</div>";
	template += "</div>";

	template += "</div>";

	template += "<div id='sane-sart-modal'>";
	template += "<div class='ss-modal-title'>Get the Sane-Sart counter</div>";
	template += "<div class='ss-modal-close' id='ss-modal-close'>x</div>";
	template += "<div class='ss-modal-body'><p>The counter has two options, inline and drawer. To add this counter to your website, choose your option and copy and paste the following snippets to your page html:</p>";

	template += "<strong>Drawer <small><em>(over page at bottom right)</em></small></strong>";
	template += "<textarea><script src='"+base_url+"sane-sart-counter.js'></script></textarea>";

	template += "<strong>Inline <small><em>(add inside page content)</em></small></strong>";
	template += "<textarea><script>var WIDGET = {'theme': 'inline'};</script>\n<script src='"+base_url+"sane-sart-counter.js'></script></textarea>";

	template += "<br><br><div><a href='http://www.sane-sart.com/rape-clock-instructions/'>Click Here</a> for detailed instructions and illustrated examples of how to use this widget on your own site.</div>"

	template += "</div>";
	template += "</div>"

	
	document.write(template);
	
	var modal = document.getElementById('sane-sart-modal');
	document.getElementById('ss-share').onclick = function() {
		modal.style.zIndex = 999999;
		animate(modal, 'opacity', '0', '1', 400, 'no-px');
	}
	document.getElementById('ss-modal-close').onclick = function() {
		animate(modal, 'opacity', 1, 0, 400, 'no-px', function() {modal.style.zIndex = 0;});
		
	}

	var toggle = document.getElementById('ss-toggle');
	var toggle_box = document.getElementById('ss-toggle-box');
	toggle.onclick = function() {
		if (!toggle_box.getAttribute('data-ini-height')) toggle_box.setAttribute('data-ini-height', toggle_box.clientHeight);
		if (toggle.getAttribute('data-status') == 'collapsed') {
			toggle.setAttribute('data-status', 'expanded');
			if (toggle_to) clearInterval(toggle_to);
			
			animate(toggle_box, 'height', toggle_box.clientHeight, toggle_box.getAttribute('data-ini-height'), 400);
		}
		else {
			toggle.setAttribute('data-status', 'collapsed');
			if (toggle_to) clearInterval(toggle_to);
			animate(toggle_box, 'height', toggle_box.clientHeight, 0, 400);
		}

	}

	var toggle_to;
	function animate(object, property, start_value, end_value, time, mode, callback) {
		if (mode != 'no-px') mode = 'px';
		else mode = '';
		var frame_rate = 0.06; // 60 FPS
		var frame = 0;
		var delta = (end_value - start_value) / time / frame_rate;
		
		toggle_to = setInterval(function() {
			frame++;
			var value = start_value + (delta * frame);
			if (start_value <= end_value) value = Math.min(value, end_value);
			else if (start_value >= end_value) value = Math.max(value, end_value);
			     
			object.style[property] = value + mode;
			if (value == end_value) {
				clearInterval(toggle_to);
				if (callback) callback();
			}
			
		}, 1 / frame_rate);
	}



	var counter_display = document.getElementById('ss-counter-display');
	var count_to;
	WIDGET.count = function() {
		var now = new Date();
		var year = now.getFullYear();

		var then = new Date ('jan,01,'+year+',00:00:2');
		var diff = (now-then); //miliseconds between then and now

		var minutes = diff / 60000;

		var count = Math.round(minutes / WIDGET.rate);
		count = padLeft(count, 6);

		var new_count = document.createElement('div');
		new_count.setAttribute('class', 'ss-count');
		new_count.innerHTML = count;
	
		counter_display.appendChild(new_count);
		fix_layout();
		if (count_to) clearTimeout(count_to);
		count_to = setTimeout(WIDGET.count, parseInt(WIDGET.rate * 60000));
	}
	WIDGET.count();

	startTime();

	WIDGET.sendRequest = function(url,callback,postData) {
	    var req = WIDGET.createXMLHTTPObject();
	    if (!req) return;
	    var method = (postData) ? "POST" : "GET";
	    req.open(method,url,true);
	    req.setRequestHeader('User-Agent','XMLHTTP/1.0');
	    if (postData)
	        req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	    req.onreadystatechange = function () {
	        if (req.readyState != 4) return;
	        if (req.status != 200 && req.status != 304) {
	//          alert('HTTP error ' + req.status);
	            return;
	        }
	        callback(req);
	    }
	    if (req.readyState == 4) return;
	    req.send(postData);
	}

	WIDGET.XMLHttpFactories = [
	    function () {return new XMLHttpRequest()},
	    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
	    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
	    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
	];

	WIDGET.createXMLHTTPObject = function() {
	    var xmlhttp = false;
	    for (var i=0;i<WIDGET.XMLHttpFactories.length;i++) {
	        try {
	            xmlhttp = WIDGET.XMLHttpFactories[i]();
	        }
	        catch (e) {
	            continue;
	        }
	        break;
	    }
	    return xmlhttp;
	}

	function startTime() {
	    var today = new Date();
	    var h = today.getHours();
	    var m = today.getMinutes();
	    var s = today.getSeconds();
	    m = checkTime(m);
	    s = checkTime(s);
	    document.getElementById('ss-clock').innerHTML =
	    h + ":" + m + ":" + s;
	    var t = setTimeout(startTime, 500);
	}
	function checkTime(i) {
	    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	    return i;
	}
	function padLeft(nr, n, str){
	    return Array(n-String(nr).length+1).join(str||'0')+nr;
	}

	
	window.addEventListener('resize.WIDGET', function(){
		//if (WIDGET.theme == 'default') return;
		var widget = document.getElementById('sane-sart-counter');
		var width = widget.offsetWidth - 20;
		var counters = widget.getElementsByClassName('ss-count');
		
		for (var i = 0; i < counters.length; i++) {
			var count = counters[i];
			if (count.getAttribute('data-handled') == 'true') continue;
			var numbers = Array.from(count.innerHTML);
			var counter = "";
			for (var j in numbers) {
				counter+= "<div class='count-number'>"+numbers[j]+"</div>";
			}
			count.innerHTML = counter;
			count.setAttribute('data-handled', 'true');
		}
		document.getElementById('ss-counter-display').style.fontSize = Math.floor(width/6) + 'px';
		/*var margin = width/24;
		width = width - margin;
		
		document.getElementById('ss-counter-display').style.letterSpacing = Math.floor(width/12) + 'px';
		document.getElementById('ss-counter-display').style.paddingLeft = margin + 'px';*/
		

	}, true);
	

	function fix_layout() {
		window.dispatchEvent(new Event('resize.WIDGET'));
	}


}(WIDGET || {}));