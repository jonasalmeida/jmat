// testing - can we read objects defined here within the frame
UAB23={
	start:function(){
		console.log('hello from 23andme.js :-)');
		// fill div id "wrapper"
		var ttam2 = TTAM2('09568fd79aa7911dad7727a024936f8d');
        ttam2.snpTable('wrapper', 'rs2476601', {
            	AA: 'Moderately higher odds of developing hypothyroidism.',
            	AG: 'Slightly higher odds of developing hypothyroidism.',
            	GG: 'Typical odds of developing hypothyroidism.',
            	order: 'AA,AG,GG'
        	},
			{
            	width: 450
        	}
		);
		// playground
		/*
		var ttam2 = TTAM2('09568fd79aa7911dad7727a024936f8d');
        ttam2.snpTable('wrapper2', 'rs2476601', {
            	AA: 'Moderately higher odds of developing hypothyroidism.',
            	AG: 'Slightly higher odds of developing hypothyroidism.',
            	GG: 'Typical odds of developing hypothyroidism.',
            	order: 'AA,AG,GG'
        	},
			{
            	width: 450
        	}
		);
		*/
		
	},
	
	uid:function(prefix){
		if(!prefix){prefix='UID'}
		var uid=prefix+Math.random().toString().slice(2);
		return uid
	},
	
	load:function(url,cb,er){ // load script / JSON
		var s = document.createElement('script');
		s.src=url;
		s.id = this.uid();
		if(!!cb){s.onload=cb}
		if(!!er){s.onerror=er}
		document.body.appendChild(s);
		setTimeout('document.body.removeChild(document.getElementById("'+s.id+'"));',3000); // is the waiting still needed ?
		return s.id
	},
	
	getSNP:function(snp){
		jQuery.get
	}
}

