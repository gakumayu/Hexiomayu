<template>
<g>
<polygon :points="points" fill="gray"></polygon>
<cell v-for="p in coords" :a="p.a" :b="p.b" exp="50"></cell>
<piece v-for="(p,i) in conf" :a="p.a" :b="p.b" :n="p.n" :index="i"
       :r="neighbors()" exp="50" @puton="puton"></piece>
</g>
</template>

<script>
import cell from '~/components/slot.vue'
import piece from '~/components/piece.vue'
export default{
    props: ['level','exp'],
    data(){
	return {
	    coords:[],
	    conf:[{a:0,b:1,n:2},
		  {a:1,b:0,n:2},//
		  {a:-1,b:1,n:2},//
		  {a:1,b:-1,n:2},
		  {a:-1,b:0,n:2},
		  {a:0,b:-1,n:2},
		  {a:-2,b:0,n:2},
		  {a:-2,b:2,n:2},
		  {a:0,b:2,n:2},//
		  {a:2,b:0,n:2},
		  {a:2,b:-2,n:2},
		  {a:0,b:-2,n:2},
		 ],
	}
    },
    mounted(){
	let L=this.level;
	for(let a=-L;a<=L;a++){
	    for(let b=-L;b<=L;b++){
		if(a+b>=-L && a+b<=L){
		    this.coords.push({a:a,b:b});
		}
	    }
	}
    },
    computed:{
    },
    methods:{
	neighbors(){
	    let isNeighbor=function(x,y){
		if(x.a-y.a==1 && x.b-y.b==0){
		    return true;
		}
		if(x.a-y.a==-1 && x.b-y.b==0){
		    return true;
		}
		if(x.a-y.a==0 && x.b-y.b==1){
		    return true;
		}
		if(x.a-y.a==0 && x.b-y.b==-1){
		    return true;
		}
		if(x.a-y.a==1 && x.b-y.b==-1){
		    return true;
		}
		if(x.a-y.a==-1 && x.b-y.b==1){
		    return true;
		}
		return false;
	    }
	    let numNeighbor=[];
	    for(let p of this.conf){
		let num = 0;
		
		for(let q of this.conf){
		    if(isNeighbor(p,q)){
			num++;
		    }
		}
		numNeighbor.push(num)
	    }
	    //console.log(numNeighbor);
	    return numNeighbor;
	    
	},
	puton(e){
	    console.log("puton"+" "+e.a+","+e.b+","+e.index);
	    this.conf.splice(e.index,1,{a:this.conf[e.index].a+e.a, b:this.conf[e.index].b+e.b, n:this.conf[e.index].n})
	    //splice(追加・削除する位置,削除する要素数,追加する要素),削除された要素が配列型式で返される			
	    //console.log(e);
	}
    },
    computed:{
	points(){
	    let pts=""
	    for(let i=0;i<6;i++){
		pts +=" "+(400+Math.cos(Math.PI/6+Math.PI/3*i)*(2*this.level+2)*this.exp)+","+
		    (400+Math.sin(Math.PI/6+Math.PI/3*i)*(2*this.level+2)*this.exp)//連結
		
	    }
	    return pts;
	}
    },
    components: {
	cell,
	piece
  }
}
</script>
