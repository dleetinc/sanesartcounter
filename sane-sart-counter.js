var WIDGET = (function(WIDGET) {

	WIDGET.rate = '1.85';
	WIDGET.base_url = 'https://cdn.rawgit.com/dleetinc/sanesartcounter/1.0.5/';
	WIDGET.link = 'http://www.sane-sart.com/rape-clock/';

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


	var base_url = WIDGET.base_url;


	var css = document.createElement('link');
	css.href=base_url+'theme/default/style.css';
	css.rel='stylesheet';
	css.type = 'text/css';

	document.getElementsByTagName('head')[0].appendChild(css);

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
	template += "<div class='ss-share' id='ss-share'>Get this clock for your own site.</div>";
	template += "<div class='ss-link'>Sane-Sart Online + Clinical <a class='ss-source-link' href='"+ WIDGET.link +"' target='_blank'>*source</a></div>"
	template += "</div>";
	template += "</div>";

	template += "</div>";

	template += "<div id='sane-sart-modal'>";
	template += "<div class='ss-modal-title'>Get the SANE-SART Rape Clock</div>";
	template += "<div class='ss-modal-close' id='ss-modal-close'>x</div>";
	template += "<div class='ss-modal-body'><p>To add this clock to your website, just copy and paste the following tag to your pages:</p><textarea><script src='"+base_url+"sane-sart-counter.js'></script></textarea></div>";
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
			console.log(toggle_box.clientHeight);

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
		if (count_to) clearTimeout(count_to);
		count_to = setTimeout(WIDGET.count, parseInt(WIDGET.rate * 60000));
	}
	WIDGET.count();

	startTime();

}(WIDGET || {}));