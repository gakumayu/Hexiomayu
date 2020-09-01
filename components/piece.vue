<template>
<g :transform="translate" @mousedown="mouseDown($event)"
   @mouseup="mouseUp($event)"
   @mousemove="mouseMove($event)">
  <polygon :points="points" fill="yellow" stroke="yellow" stroke-width="10" fill-opacity="0.8"></polygon>
  <text :x="-exp/4" :y="exp/4" :font-size="exp" stroke="white" fill="white">{{n}}</text>
</g>
</template>

<script>
export default{
    props:['a','b','n','exp',],
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
	mouseDown(e){
	    this.isMouseDown = true;
	    console.log("drag started");
	    this.prevX = e.offsetX;//動く前
	    this.prevY = e.offsetY; 
	    console.log(e.offsetX + "," + e.offsetY);
	},
	mouseUp(e){
	    this.isMouseDown = false;//マウスの押し下げが終わった
	    console.log(e.offsetX + "," + e.offsetY);
	},
	mouseMove(e){
	    if(this.isMouseDown){
		this.x = e.offsetX - this.prevX;//e.offsetは動いた後の場所
		this.y = e.offsetY - this.prevY;
		this.prevX = e.offsetX;
		this.prevY = e.offsetY;
		console.log(e.offsetX + "," + e.offsetY);
	    }
	}
	//	start(e){
//	    this.isMouseDown = true;
//	    console.log("drag started");
//	    console.log([e.offsetX,e.offsetY]);
//	    this.prevX = e.offsetX;//動く前
// 	    this.prevY = e.offsetY;   
//	},
//	move(e){
//	    if(this.isMouseDown){//マウスが押し下げている時だけ動く
//		let deltaX = e.offsetX - this.prevX;//e.offsetは動いた後の場所
//		let deltaY = e.offsetY - this.prevY;
//		this.x += deltaX;
//		this.y += deltaY;
//		this.prevX = e.offsetX;
//		this.prevY = e.offsetY;
//	    }
//	},
//	finish(e){//始末
//	    this.isMouseDown = false;//マウスの押し下げが終わった
//	},
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
	    return "translate(" + (2*this.b*Math.sqrt(3)/2*this.exp+400+this.x) + "," + (2*(this.a*this.exp + this.b*0.5*this.exp)+400+this.y) + ")"
	},
    }
}
</script>
