<template>
<g transform="translate(600,90)" @click="levelup" style="cursor:pointer;">
  <rect x="0" y="0" width="250" height="100" rx="50" fill="#DBC6EB" stroke="ABC2E8" stroke-width="10"></rect>
  <text x="25" y="70" fill="#1F3C88" stroke="#1F3C88" font-size="50">next level</text>   
</g>
</template>

<script>
export default{
    props: ['nextLevelUp'],
    methods:{
	levelup(){
	    if(this.nextLevelUp){
		this.$store.commit('levelUp')
		this.$store.dispatch('saveMyGame',
				     {
					 email:this.$store.state.user.email,
					 game:{level:this.$store.state.level,index:0}
				     })
	    }else{
		this.$store.dispatch('saveMyGame',
				     {
					 email:this.$store.state.user.email,
					 game:{level:this.$store.state.game.level,
					       index:this.$store.state.game.index + 1
					      }
				     })
	    }
	}
    }
}
</script>

<style>
  .v-enter{
  opacity: 0;
  font-size: 0;
  },
  .v-enter-to{
  opacity: 1;
  font-size: 50;
  },
  .v-enter-active{
  transition: all 1s;
  }
</style>
