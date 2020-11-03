<template>
<g>
  <polygon :points="points" fill="gray"></polygon>
  <cell v-for="p in coords()" :a="p.a" :b="p.b" exp="50"></cell>
  <piece v-for="(p,i) in conf" :a="p.a" :b="p.b" :n="p.n" :index="i"
       :r="neighbors()" exp="50" @puton="puton"></piece>
  <text x="180" y="350" v-if="complete()" stroke="silver" fill="#A6F6F1" font-size="60">YOU ARE GENIUS</text>
  <nextlevelbutton v-if="complete()" :nextLevelUp="nextLevelUp"></nextlevelbutton>
  <text x="100" y="100" stroke="black">{{level}}</text>  
</g>
</template>

<script>
import cell from '~/components/cell.vue'
import piece from '~/components/piece.vue'
import nextlevelbutton from '~/components/nextlevelbutton.vue'
import {mapState} from 'vuex'
export default{
    props: ['exp','problem','nextLevelUp'],
    data(){
	return {
	    cleaed:false,
	    conf:null
	}
    },
    mounted(){//初期化の時だけ
	this.conf=this.problem
	//console.log("Mounted")
	//console.log(this.problem)
	console.log(this.levels)
    },
    watch:{
	game(){
	    this.conf=this.problem
	}
    },
    methods:{
	coords: function(){
	    let grid=[];
	    let L=this.game.level;
	    for(let a=-L;a<=L;a++){
		for(let b=-L;b<=L;b++){
		    if(a+b>=-L && a+b<=L){
			grid.push({a:a,b:b});
		    }
		}
	    }
	    //console.log(grid);
	    return grid;
	},
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
	    if(this.conf==null){
		return null
	    }
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
	complete(){
	    if(this.neighbors()==null){
		return false
	    }
	    for(let i in this.neighbors()){
		if(this.neighbors()[i] != this.conf[i].n){
		    console.log(this.conf[i])
		    return false
		}
	    }
	    return true
	},
	puton(e){
	    //console.log("puton"+" "+e.a+","+e.b+","+e.index);
	    this.conf.splice(e.index,1,{a:this.conf[e.index].a+e.a, b:this.conf[e.index].b+e.b, n:this.conf[e.index].n})
	    //splice(追加・削除する位置,削除する要素数,追加する要素),削除された要素が配列型式で返される			
	    //console.log(e);
	    if(this.complete()){
		//console.log("seccess")
	    }
	}
    },
    computed:{
	...mapState({
	    level:'level',
	    levels:'levels',
	    game:'game'
	}),
	points(){
	    let pts=""
	    for(let i=0;i<6;i++){
		pts +=" "+(400+Math.cos(Math.PI/6+Math.PI/3*i)*(2*this.game.level+2)*this.exp)+","+
		    (500+Math.sin(Math.PI/6+Math.PI/3*i)*(2*this.game.level+2)*this.exp)//連結
		
	    }
	    return pts;
	}
    },
    components: {
	cell,
	piece,
	nextlevelbutton
  }
}
</script>
