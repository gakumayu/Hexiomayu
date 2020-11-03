<template>
<g @mousedown="mouseDown($event)"
   @mousemove="mouseMove($event)"
   @mouseup="mouseUp($event)"
   :transform="translate">
  <polygon :points="points" :fill="color()" :stroke="color()" stroke-width="10" fill-opacity="0.8"></polygon>
  <text :x="-exp/4" :y="exp/4" :font-size="exp" stroke="pink" fill="#FF348E">{{n}}</text>
</g>
</template>

<script>
export default{
    props:['a','b','n','exp','index','r'],//templateのなかで呼び出すときに使う変数
    data(){
	return {
	    x:0, 
	    y:0, 
	    prevX:0,
	    prevY:0,
	    isMouseDown: false,
	}
    },
    methods:{
	color(){
	    //console.log("color")
	    //console.log(this.r[this.index]);
	    if(1*this.r[this.index] > 1*this.n){
		return "red";
	    }
	    if(1*this.r[this.index] == 1*this.n){
		return "yellow";
	    }
	    if(1*this.r[this.index] < 1*this.n){
		return "green";
	    }
	},
	mouseDown(e){
	    this.isMouseDown = true;
	    //console.log("drag started");
	    this.prevX = e.offsetX;//動く前
	    this.prevY = e.offsetY; 
	    //console.log(e.offsetX + "," + e.offsetY);
	},
	mouseUp(e){
	    this.isMouseDown = false;//マウスの押し下げが終わった
	    console.log(e.offsetX + "," + e.offsetY);
	    let a=Math.round((-1/Math.sqrt(3)*this.x+this.y)/(2*this.exp));
	    let b=Math.round((2/Math.sqrt(3)*this.x)/(2*this.exp));
	    let aarray=[a,b];
	    //console.log(aarray);
	    this.x=0;
	    this.y=0;
	    this.$emit('puton',{a:a, b:b, index:this.index});
	},
	mouseMove(e){
	    if(this.isMouseDown){
		let deltaX = e.offsetX - this.prevX;//e.offsetは動いた後の場所
		let deltaY = e.offsetY - this.prevY;
		this.x += deltaX;
		this.y += deltaY;
		this.prevX = e.offsetX;
		this.prevY = e.offsetY;
		//console.log(e.offsetX + "," + e.offsetY);
	    }
	},
    },
    mounted(){
	//console.log("color",this.index)
	//console.log(this.r);
	
    },
    computed:{
	points(){
	    let pts = ''
	    for (let i = 0; i<6; i++){
		pts += ' ' + (Math.cos(2*Math.PI/6*i)*this.exp)  + ',' + (Math.sin(2*Math.PI/6*i)*this.exp)
	    }
	    return pts
	},
	translate(){
	    return "translate(" + (2*this.b*Math.sqrt(3)/2*this.exp+400+this.x) + "," + (2*(this.a*this.exp + this.b*0.5*this.exp)+500+this.y) + ")"
	},
    }
}
</script>
