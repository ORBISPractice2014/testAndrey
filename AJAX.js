function CreateAsyncRequest(method, path, args, Handler, timeout){
	var request = new XMLHttpRequest();
				
	request.onload = function(){
		if (request.status == 200){
			Handler(request.responseText);
		}
		
		else {
			alert("Status: "+request.status+". Server: "+request.statusText);
		}
	}
	
	if (timeout){
		request.timeout = timeout;
	}
	
	method = method.toLowerCase();
	switch(method){
		case "get":
			path += "?" + args;
			args = "";
			request.open(method, path, true);
			break;
		case "post":
			request.open(method, path, true);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
			break;
		default:
			path += "?" + args;
			args = "";
			request.open(method, path, true);
			break;
	}
	
	request.send(args);
	return request;
}

function  MaintainContinousConnection(method, path, ArgsGenerator, Handler, timeout){
	var request = null;
	var func = function(){
		if (!request || request.readyState == 4){
			request = CreateAsyncRequest(method, path, ArgsGenerator(), Handler, timeout);
		}
	}
	setInterval(func, timeout);
}

function ParseHttpResponse(response){
	var leftSide = /^[^=&]+/;
	var rightSide = /[^=&]+$/;
	var responseArray = response.split('&');
	var hash = new Object();
	for (var i in responseArray){
		var key = responseArray[i].match(leftSide);
		var value = responseArray[i].match(rightSide);
		//alert(key+' '+value);
		hash[key] = value;
	}
	return hash;
}
