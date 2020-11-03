<template>
<g :transform="translate">
    <polygon :points="points" fill="gray" stroke="black" stroke-width="10" fill-opacity="0.8"></polygon>
  </g>
</template>

<script>
export default{
    props:['a','b','n','exp'],
    computed:{
	points(){
	    let pts = ''
	    for (let i = 0; i<6; i++){
		pts += ' ' + (Math.cos(2*Math.PI/6*i)*this.exp)  + ',' + (Math.sin(2*Math.PI/6*i)*this.exp)
	    }
	    return pts
	},
	translate(){
	    return "translate(" + (2*this.b*Math.sqrt(3)/2*this.exp+400) + "," + (2*(this.a*this.exp + this.b*0.5*this.exp)+400) + ")"
	}
    }
}
</script>
