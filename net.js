console.log('net.js loaded')

Net = function(){
    var d = (new Date).toJSON()
    this.id=d+'_Net_'+Math.random().toString().slice(2)
    this.type=this.constructor.name
    this.log=[{created:d}]
    this.nodes={}
    this.edges={}
}

net=new Net

Node = function(p,nt){ // note second input argument is the net, or nets, this is being registered to
    if(!nt){nt=[net]}
    var d = (new Date).toJSON()
    this.id=d+'_Node_'+Math.random().toString().slice(2)
    this.type=this.constructor.name
    if(!p){p={}}
    this.properties=p
    this.log=[{created:d}]
    this.EDGESto=[]
    this.EDGESfrom=[]
    this.edge=function(edg){
        this.EDGESto.push(edg)
        edg.lastParent=this
        return edg
    }
    for(var i=0;i<nt.length;i++){
        nt[i].nodes[this.id]=this
    }    
}

Edge = function(p,nt){
    if(!nt){nt=[net]}
    var d = (new Date).toJSON()
    this.id=d+'_Edge_'+Math.random().toString().slice(2)
    this.type=this.constructor.name
    if(!p){p={}}
    this.properties=p
    this.log=[{created:d}]
    this.FROM=[]
    this.TO=[]
    this.to=function(nd){
        this.TO.push(nd)
        this.FROM.push(this.lastParent)
        nd.EDGESfrom.push(this)      
        return nd
    }
    for(var i=0;i<nt.length;i++){
        nt[i].edges[this.id]=this
    }
}

///*

// define 2 nodes and 1 edge
y = new Node({name:'node y'})
x = new Node({name:'node x'})
f = new Edge({name:'edge f'})
//link them
x.edge(f).to(y)
//*/