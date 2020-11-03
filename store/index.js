import firebase from '~/plugins/firebase'
const db = firebase.firestore()
const levelsRef = db.collection('levels')
export const state=()=>({
    levels:null,
    level:null,
    user:null,
    game:null
})

export const mutations={//dateの書き換え
    levelUp(state){
	state.level++
    },
    levelDown(state){
	state.level--
    },
    setUser(state,user){
	state.user={
	    name:user.displayName,
	    email:user.email
	}
    },
    clearUser(state){
	state.user=null
    },
    setLevels(state,levels){
	state.levels=levels
	console.log(levels)
    },
    setLevel(state,level){
	state.level=level
    },
    setGame(state,game){
	if(game){
	    state.game=game
	}else{
	    state.game={level:1,index:0}
	}
    },
}
export const actions={
    login({commit,dispatch}){
	console.log("login action")
	const provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result){
	    const user=result.user
	    console.log(user)
	    commit('setUser',user)
	    dispatch('fetchLevels')
	    dispatch('fetchMyLevel',user)
	    dispatch('fetchMyGame',user)
	})
    },
    logout({commit,dispatch}){
	firebase.auth().signOut().then(function(result){
	    //dispatch('saveMyLevel')
	    commit('clearUser')
	})
    },
    fetchLevels({commit}){
	console.log("fetchLevels")
	levelsRef.onSnapshot(snapshot =>{
	    const levels = []
	    snapshot.forEach((doc) =>{
		levels.push({
		    id:doc.id,
		    level:doc.data().level
		})
	    })
	    commit('setLevels',levels)
	})
    },
    fetchMyLevel({commit},user){
	levelsRef.doc(user.email)
	    .onSnapshot((doc) =>{
		commit('setLevel',doc.data().level)
	    })
    },
    fetchMyGame({commit},user){
	levelsRef.doc(user.email)
	    .onSnapshot((doc) =>{
		commit('setGame',doc.data())
	    })
    },
    saveMyLevel({commit},data){
	//console.log("saveMyLevel",data)
	console.log(levelsRef.doc(data.email))
	levelsRef.doc(data.email).update({level:data.level})
	    .then(function(){
		console.log("saveMyLevel",data)})
	    .catch(function(error){
		console.log(error)
	    })	
    },
     saveMyGame({commit},data){
	//console.log("saveMyLevel",data)
	console.log(levelsRef.doc(data.email))
	levelsRef.doc(data.email).set(data.game)
	    .then(function(){
		console.log("saveMyLevel",data)})
	    .catch(function(error){
		console.log(error)
	    })	
    }  
}
