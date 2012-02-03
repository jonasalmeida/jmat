console.log('jmat :-)')

jmat = {
	
abs:function(x){ // absolute value
	if (Array.isArray(x)){return x.map(function(xi){return jmat.abs(xi)})}
	else{return Math.abs(x)}
},

array2mat:function(x){ // to handle indexed arrays by converting them into two separate numerically indexed arrays
	var j = 0, y1=[], y2=[];
	for(var i in x){
		y1[j]=i;
		y2[j]=x[i];
		j=j+1;
	}	
	return [y1,y2]	
},

array2str:function(x,sp){ // convert array into a sp separated
	if (!sp){sp='\n'}
	y=x[0];
	for (var i=1;i<x.length;i++){
		y=y+sp+x[i];
	}
	return y
},

arrayfun:function(x,fun){ // apply function to each element of an array
	if (Array.isArray(x)){return x.map(function(xi){return jmat.arrayfun(xi,fun)})}
	else{return fun(x)}
},

bin2dec:function(x){
	var n=x.length;
	return x.split('').map(function(xi,i){return xi*Math.pow(2,n-i-1)}).reduce(function(a,b){return a+b});
},

cat:function(x,y){ // cat will work for matrices and objects
	x=this.stringify(x);
	y=this.stringify(y);
	return this.parse(x.slice(0,x.length-1)+','+y.slice(1,y.length));		
},

catArray:function(A){ // optimized for conCATenation of an array of numerically indexed arrays
	// this function was developed to adress memory issues of dealing with large arrays, not performance
	var Astr='[',Ai='';
	for(var i=0;i<A.length;i++){
		Ai=JSON.stringify(A[i]);
		Astr+=Ai.slice(1,Ai.length-1)+',';
	}
	return JSON.parse(Astr.slice(0,Astr.length-1)+']');
},

cEl:function(x,id){
	x = document.createElement(x);
	if(id){x.id=id}
	return x
},

class:function(x){
	if(!x.constructor){return null}
	else{return x.constructor.name}
},

clone:function(x){ // clone object without functional elements
	return JSON.parse(JSON.stringify(x))
},

clone2:function(x){ // clone object that may have functional elements
	return jmat.parse(jmat.stringify(x))
},

cloneArray:function(A){
	if(Array.isArray(A)){return A.map(function(x){return jmat.cloneArray(x)})}
	else{return A}
},

colormap:function(c){
	if(!c){c='default'}
	switch(c){
		case 'default':
		c=[[0,0,0.5625],[0,0,0.625],[0,0,0.6875],[0,0,0.75],[0,0,0.8125],[0,0,0.875],[0,0,0.9375],[0,0,1],[0,0.0625,1],[0,0.125,1],[0,0.1875,1],[0,0.25,1],[0,0.3125,1],[0,0.375,1],[0,0.4375,1],[0,0.5,1],[0,0.5625,1],[0,0.625,1],[0,0.6875,1],[0,0.75,1],[0,0.8125,1],[0,0.875,1],[0,0.9375,1],[0,1,1],[0.0625,1,0.9375],[0.125,1,0.875],[0.1875,1,0.8125],[0.25,1,0.75],[0.3125,1,0.6875],[0.375,1,0.625],[0.4375,1,0.5625],[0.5,1,0.5],[0.5625,1,0.4375],[0.625,1,0.375],[0.6875,1,0.3125],[0.75,1,0.25],[0.8125,1,0.1875],[0.875,1,0.125],[0.9375,1,0.0625],[1,1,0],[1,0.9375,0],[1,0.875,0],[1,0.8125,0],[1,0.75,0],[1,0.6875,0],[1,0.625,0],[1,0.5625,0],[1,0.5,0],[1,0.4375,0],[1,0.375,0],[1,0.3125,0],[1,0.25,0],[1,0.1875,0],[1,0.125,0],[1,0.0625,0],[1,0,0],[0.9375,0,0],[0.875,0,0],[0.8125,0,0],[0.75,0,0],[0.6875,0,0],[0.625,0,0],[0.5625,0,0],[0.5,0,0]];
	  	break;
	default:
	  c = 'not found';
	}
	return c
},

data2imData:function(data){ // the reverse of im2data, data is a matlabish set of 4 2d matrices, with the r, g, b and alpha values
	var n=data.length, m=data[0].length;
	//var imData = {width:m, height:n, data:[]};
	var imData = document.createElement('canvas').getContext('2d').createImageData(m,n);
	for (var i=0;i<n;i++){ //row
		//data.r[i]=[];data.g[i]=[];data.b[i]=[];data.a[i]=[];
		for (var j=0;j<m;j++){ // column
			ij=(i*m+j)*4;
			imData.data[ij]=data[i][j][0];
			imData.data[ij+1]=data[i][j][1];
			imData.data[ij+2]=data[i][j][2];
			imData.data[ij+3]=data[i][j][3];
		}
	}
	return imData;
},

dec2bin:function(x,n){
	if(!n){n=Math.ceil(this.log(x,2))+1};
	var b='';
	for(i=n-1;i>=0;i=i-1){
		m=Math.pow(2,i);
		if(x>=m){b=b+'1';x=x-m}
		else{b=b+'0'}
	};
	return b
},

disp:function(x){ // by default displays both in the console and in document.body
	console.log(x);
	document.body.innerHTML+='<br><span style="color:blue">'+x+'</span>';
},

dotFun:function(A,B,fun){ // dot matrix function
	4;
},

dimFun:function(){ // first argument is the function, subsequent arguments specify dimensions
	if(arguments.length==0){arguments=[function(){return 0}]}
	var fun=arguments[0];
	if(arguments.length>1){
		if(Array.isArray(arguments[1])){var x = arguments[1]}
		else{var x=[];for(var i=1;i<arguments.length;i++){x[i-1]=arguments[i]}} // note first argument is always fun
		var z=[];
		if(x.length<2){
			for(var i=0;i<x[0];i++){
				z[i]=fun(i); // fun has access to array index
			}
		}
		else {
			var x0=x[0];
			x=x.slice(1);
			for(var i=0;i<x0;i++){
				z[i]=jmat.dimFun(fun,x);
			}
		}
	}
    else {z=fun()}
	return z
},

get:function(key,callback,url){ // get content at url or key
	if (!callback){callback=function(x){console.log(x)}}
	if (!url){url=this.webrwUrl};
	var uid = this.uid();
	if(!this.get.jobs){this.get.jobs=[]}
	this.get.jobs[uid]={'fun':callback};
	var url=url+'?get='+key+'&callback=jmat.get.jobs.'+uid+'.fun';
	var s=document.createElement('script');
	s.id = uid;s.src=url;
	document.body.appendChild(s);
	setTimeout('document.body.removeChild(document.getElementById("'+uid+'"));delete jmat.get.jobs.'+uid+';',10000); // is the waiting still need ? script onload would be another possibility to delete it
	return uid;
},

fieldnames:function(x){
	y=[];i=0;
	for(var f in x){
		y[i]=f;
		i++;
	}
	return y;
},

gId:function(x){ // x is the id of an existing DOM element
	// return null if neither id nor class are found
	// so constructs like !jmat.gId(someID) can be used
	//var y=document.getElementById(x);
	//if(!y){
	//	var z=document.getElementsByClassName(x);
	//	if(z.length>0){return z}
	//	else{return y}
	//}
	//else{return y}
	return document.getElementById(x)
},

im1to255:function(x){// converts {0-1} matrix into an im data matrix
	4
},

imread:function(cv){ // reads image from context into matrix
	// find out what type of input
	if(typeof(cv)=='string'){ // cv is the id of a canvas element
		cv=jmat.gId(cv)
	}
	var ct=cv.getContext('2d'), n=cv.width, m=cv.height;
	var imData=ct.getImageData(0,0,n,m); // pixel values will be stored in imData.data
	return this.imData2data(imData)
},

imwrite:function(cv,im,dx,dy){
	if(!dy){dx=0;dy=0} // default location
	if(typeof(cv)=='string'){cv=jmat.gId(cv)} //cv can also be the id of a canvas element
	if(!im.data){im=jmat.data2imData(im)} // such that im can also be the matrix created by imread
	var ct = cv.getContext('2d');
	ct.putImageData(im,dx,dy);
	return ct;
},

imagesc:function(cv,dt,cm){ // scales values to use full range of values. cv is the canvas, dt the data, and cm the colormap
	if(!cm){cm=jmat.colormap()}
	cm = jmat.transpose(); // to get one vector per channel
},

imData2data:function(imData){ // imData is the data structure returned by canvas.getContext('2d').getImageData(0,0,n,m)
	var m=imData.width, n=imData.height, data=[];
	for (var i=0;i<n;i++){ //row
		data[i]=[];
		for (var j=0;j<m;j++){ // column
			ij=(i*m+j)*4;
			data[i][j]=[imData.data[ij],imData.data[ij+1],imData.data[ij+2],imData.data[ij+3]]
		}
	}
	return data;	
},

imMap:function(im,fun){ // applies function to all pixels of an image and returns the 2D map of fun values
	if(!fun){fun=function(xy){return 0}} // in no fun return a 2D zero matrix
	return im.map(function(x){
		return x.map(function(xy){
			return fun(xy)
		})
	})
},

im2bw:function(im,thr){ // segments 2d matrix into 0's and 1's for values below or above a threshold
	return jmat.imMap(im,function(xy){
		if(xy>=thr){return 1}
		else{return 0}
		}
	)
},

length:function(x){ // js Array.length returns highest index, not always the numerical length
	var n=0
	for(var i in x){n++};
	return n
},

load:function(url,cb,er){ // load script / JSON
	var s = document.createElement('script');
	s.src=url;
	s.id = this.uid();
	if(cb){s.onload=cb}
	if(er){s.onerror=er}
	document.body.appendChild(s);
	setTimeout('document.body.removeChild(document.getElementById("'+s.id+'"));',30000); // is the waiting still needed ?
	return s.id
},

loadFiles:function(files,readAs,callback){
	//<input type="file" id="files" multiple onchange="jmat.loadFiles(this.files,'readAsText')"></input> //<-- example of button for reading text files
	if(!readAs){readAs='readAsDataURL'} // default is to read as dataURL
	for(var i=0;i<files.length;i++){
		this.readFile(files[i],readAs)
	}
	return i
},

readFile:function(f,readAs,callback){
	var that = this;
	if(!callback){callback=function(x){ // DEAFAULT CALLBACK - you may want to write your own
		console.log('---'+x.file.fileName+'---');console.log(x.result); // comment out if you don't want to track reading in the console
		if(!that.work){that.work={}};if(!that.work.files){that.work.files=[]} // results stored in .work.files
		that.work.files[x.file.fileName]={file:x.file,result:x.result}; // array indexed to file name
		}
	}
	var reader = new FileReader();
	reader.onload=(function(theFile){
		return function(ev){
			callback({file:theFile,result:ev.target.result})
		}
	})(f)
	reader[readAs](f);
},

log:function(x,n){
	if (!n){return Math.log(x)}
	else{return Math.log(x)/Math.log(n)}
},

max:function(x){ //return maximum value of array
	return x.reduce(function(a,b){if(a>b){return a}else{return b}})
},

max2:function(x){ // returns maximum value of array and its index, i.e.  [max,i]
	return x.map(function(xi,i){return [xi,i]}).reduce(function(a,b){if(a[0]>b[0]){return a}else{return b}})
},

memb:function(x,dst){ // builds membership function
	if(!dst){
		
	}
	
},

not:function(x){ // negates Boolean value, or an array thereof
	if(Array.isArray(x)){return x.map(function(xi){return jmat.not(xi)})}
	else{return !x}
},

parse:function(x){ // x is a stringified Object
	eval('var res='+x);
	return res;
},

parseUrl:function(url){ // parsing url and its arguments out
	var u = {};u.url=url.match(/[htf]+tp[s]*:\/\/[^?]+/);
	if (u.url.length!==1){throw ('something is wrong with the syntax this url: '+url)}
	else{
		u.url=u.url[0];u.parms={};url.slice(u.url.length+1).split('&').map(function(x){y=x.split('=');u.parms[y[0]]=y[1];return x});
	}
	return u
},

plot:function(ctx,x,y,s,opt){ // plot
if(this.class(ctx)!="CanvasRenderingContext2D"){ // get context then
		switch (this.class(ctx)){
			case "String":
			ctx=jmat.gId(ctx).getContext('2d');
			break;
			case "HTMLCanvasElement":
			// assume it is a canvas element
			ctx=ctx.getContext('2d');
			break;
		}
		
	}
	//default opt
	var opt0={
		MarkerSize:12,
		Color:[0,0,1],
		MarkerEdgeColor:'auto',
		MarkerFaceColor:'none',
		x:x,
		y:y
	}
	if(!opt){opt=opt0};
	opt = jmat.cat(opt0,opt);
	// inherit colors
	if (typeof(opt.MarkerEdgeColor)=='string'){
		if(opt.MarkerEdgeColor=='auto'){opt.MarkerEdgeColor=opt.Color}
		else{opt.MarkerEdgeColor=[0,0,0,0]}
	}
	if (typeof(opt.MarkerFaceColor)=='string'){
		if(opt.MarkerFaceColor=='auto'){opt.MarkerFaceColor=opt.Color}
		else{opt.MarkerFaceColor=[0,0,0,0]} // string is 'none'
	}
	if(opt.Color.length==3){opt.Color}
	var L=opt.MarkerSize;
	switch(s){
		case 'o': // draw a circle
		ctx.beginPath();
		ctx.strokeStyle=jmat.rgba(opt.MarkerEdgeColor);
		ctx.arc(x,y,L/2,0,2*Math.PI,true);
		ctx.closePath();
		ctx.stroke();
		break;
		case 's': // draw a square
		ctx.beginPath();
		ctx.strokeStyle=jmat.rgba(opt.MarkerEdgeColor);
		ctx.strokeRect(x-L/2,y-L/2,L,L);
		ctx.closePath();
		ctx.stroke();
		break;
		case '+': // draw a +
		ctx.beginPath();
		ctx.strokeStyle=jmat.rgba(opt.MarkerEdgeColor);
		ctx.moveTo(x-L/2,y);ctx.lineTo(x+L/2,y);
		ctx.moveTo(x,y-L/2);ctx.lineTo(x,y+L/2);
		ctx.closePath();
		ctx.stroke();
		break;
		case 'x': // draw a x
		ctx.beginPath();
		ctx.strokeStyle=jmat.rgba(opt.MarkerEdgeColor);
		ctx.moveTo(x-L/2,y-L/2);ctx.lineTo(x+L/2,y+L/2);
		ctx.moveTo(x-L/2,y+L/2);ctx.lineTo(x+L/2,y-L/2);
		ctx.closePath();
		ctx.stroke();
		break;
		case '*': // draw a *
		this.plot(ctx,x,y,'+',opt);
		opt.MarkerSize=L*Math.cos(Math.PI/4);
		this.plot(ctx,x,y,'x',opt);
		break;
	}
	// return handle structure
	opt.x=x;
	opt.y=y;
	opt.radius=opt.MarkerSize;
	return opt
},

rand:function(){
	if(arguments.length>0){
		if(Array.isArray(arguments[0])){var x = arguments[0]}
		else{var x=[];for(var i=0;i<arguments.length;i++){x[i]=arguments[i]}}
		var z=[];
		if(x.length<2){
			for(var i=0;i<x[0];i++){
				z[i]=Math.random();
			}
		}
		else {
			var x0=x[0];
			x=x.slice(1);
			for(var i=0;i<x0;i++){
				z[i]=jmat.rand(x);
			}
		}
	}
    else {z=Math.random()}
	return z
},

ranksum:function(x,y){ // this is just a first approximation while something saner emerges for stats
	var s=x.map(function(xi){return y.map(function(yi){return [yi>xi,yi<xi]}).reduce(function(a,b){return [a[0]+b[0],a[1]+b[1]]})}).reduce(function(a,b){return [a[0]+b[0],a[1]+b[1]]});
	return Math.abs(s[0]-s[1])/(x.length*y.length);
},

reval:function(x,fun,callback,url){ 
	if (!Array.isArray(x)){x=[x]} // make sure x is an array
	if (!Array.isArray(fun)){fun=[fun]} // make sure it is an array of functions
	if (!url){url=this.webrwUrl};
	//if (!Array.isArray(fun)){fun=[fun]} // make sure it is an array of functions
	// create webrw jobList
	if (!this.reval.jobs){this.reval.jobs=[]}
	var uid = this.uid();
	this.reval.jobs[uid]={fun:fun,x:x,callback:callback,url:url}
	//match x and fun dimensions
	var n = Math.max(jmat.reval.jobs[uid].x.length,jmat.reval.jobs[uid].fun.length);
	for (var i=jmat.reval.jobs[uid].x.length;i<n;i++){jmat.reval.jobs[uid].x[i]=jmat.reval.jobs[uid].x[i-1]}
	for (var i=jmat.reval.jobs[uid].fun.length;i<n;i++){jmat.reval.jobs[uid].fun[i]=jmat.reval.jobs[uid].fun[i-1]}
	this.set('if(!window.jmatReval){jmatReval=[]};jmatReval["'+uid+'"]={ jobs:'+jmat.stringify(jmat.reval.jobs[uid])+'};',this.parse('function(key){jmat.reval.jobs.'+uid+'.key=key;jmat.revalSet("'+uid+'");}'),undefined,url);
},

revalSet:function(uid){ // set job for remote evaluation, task is the key of the webrw document aggregating individual jobs
	console.log('remote eval of '+uid+' at '+jmat.reval.jobs[uid].url+'/doc/'+jmat.reval.jobs[uid].key);
	console.log(uid);
},

revalGet:function(task){ //
	4;
},

rgba:function(x){ // genertes rgba string HTML Color can understand for a 0 to 1 vector of 3 or 4 elements
	if (x.length==3){x=jmat.cat(x,[1])} // if rgb make rgba by adding opaque alpha
	x=x.map(function(xi){return Math.round(xi*255)});
	return ('rgba('+x.toString()+')');
},

rgb:function(x){ // genertes rgba string HTML Color can understand for a 0 to 1 vector of 3 or 4 elements
	x=x.map(function(xi){return Math.round(xi*255)});
	return ('rgb('+x.slice(0,3).toString()+')');
},

save:function(varValue,varName){//save variable in the localHost, for example, save('NC_007019',seq)
	if(!varName){varName=this.uid()}
	localStorage.setItem(varName,varValue)
	return varName;
},

set:function(val,callback,key,url){ // set key-val pairs in the webrw endpoint, calback will have the key as its argument
	if (!callback){callback=function(x){console.log(x)}};
	if (typeof(val)!='string'){this.stringify(val)};
	if (!url){url=this.webrwUrl}
	if(!this.set.jobs){this.set.jobs=[]}
	var uid = this.uid();
	this.set.jobs[uid]={'fun':callback};
	var s=document.createElement('script');s.id=uid;
	if (!key){s.src=url+'?set='+val+'&callback=jmat.set.jobs.'+uid+'.fun'}
	else{s.src=url+'?set='+val+'&key='+key+'&callback=jmat.set.jobs.'+uid+'.fun'}
	document.body.appendChild(s);
	setTimeout('document.body.removeChild(document.getElementById("'+uid+'"));delete jmat.set.jobs.'+uid+';',10000);
	return uid;
},

sort:function(x){ // [y,I]=sort(x), where y is the sorted array and I contains the indexes
	x=x.map(function(xi,i){return [xi,i]});
	x.sort(function(a,b){return a[0]-b[0]});	
	return this.transpose(x)
},

sum:function(x){return x.reduce(function(a,b){return a+b})},

str2num:function(x){
	return JSON.parse(x);
},

stringify:function(x){ // extends JSON.stringify to work with both values and functions
var y=typeof(x);
switch (y){
	case 'function':
	y=x.toString();
	break;		
	case 'object':
	if (Array.isArray(x)){
		var y='[';
		for(var i=0;i<x.length;i=i+1){
			y=y+this.stringify(x[i])+','
		}
		y=y.slice(0,y.length-1)+']';
	}
	else{
		y='{';
		for(var v in x){
			y=y+v+':'+this.stringify(x[v])+',';
		}
		y=y.slice(0,y.length-1)+'}';
	}
	break;
	case 'string':
	y=JSON.stringify(x);
	break;
	case 'number':
	y=JSON.stringify(x);
	default:
	}
return y;
},

textread:function(url,cb){
	console.log('reading '+url+' ...');
	if(!cb){cb=function(x){console.log(x)}}
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.onload = function () {
	    if (xhr.status === 200) {
			console.log('... done.');
	        cb(xhr.responseText);
	    } else {
	        console.error(xhr.status);
	    }
	};
	xhr.send(null);
	return xhr;
},

transpose:function (x){ // transposes 2D array
	var y=[],n=x.length,m=x[0].length
	for(var j=0;j<m;j++){
		y[j]=[];
		for(var i=0;i<n;i++){
			y[j][i]=x[i][j];
		}
	}
	return y
},

threshold:function(im,thr){ // image segmentation by thresholding, returns binary image matrix
	if(!im.width){var dt=im}
	else{dt=this.imData2data(im)} // in case im is an imageData object 
	if(!thr){thr = jmat.max(jmat.catArray(dt))/2} // default threshold is 1/10 of maximum, write something better later
	return jmat.imMap(dt,function(xy){return (xy>thr)}); // threshold value, thr, is passed to the function through a closure
},

uid:function(prefix){
	if(!prefix){prefix='UID'}
	var uid=prefix+Math.random().toString().slice(2);
	return uid
},

unique:function(x){ // x is an Array
	var u = []; // store unique here
	u[0]=x[0];
	for (var i=1; i<x.length; i++){
		// check if x[i] is new
		if (u.map(function(ui){return ui===x[i]}).reduce(function(a,b){return a+b})==0){
			u[u.length]=x[i];
		}
	}
	return u
},

webrwUrl:'http://sandbox1.mathbiol.org/webrw.php',

}