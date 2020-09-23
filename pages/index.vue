<template>
<div>
  level:
  <v-btn @click="minus()">-</v-btn>
  {{level}}
  <v-btn @click="plus()">+</v-btn>
  <svg width="800" height="800">
    <board :level="level" exp="50" :problem="problemset[0][0]"></board>
  </svg>
</div>

</template>

<script>

import board from '~/components/board.vue'
export default {
    data(){
	return{
	    level:2,
	    problemset:[
		[
		    [{a:0,b:0,n:0}],	    
		],
		[
		    [],
		],
		[
		    [{a:0,b:1,n:2},
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
			 ],],
			[],
			[]],
	    
	}
    },
    components: {
	board
    },
    methods:{
	minus(){
	    this.level--;
	},
	plus(){
	    this.level++;
	}
    }
}
</script>
