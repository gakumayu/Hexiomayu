import firebase from 'firebase'
if(! firebase.apps.length){
    firebase.initializeApp(
	{
	    apiKey: "AIzaSyDI0MmPSjAW5IAapliqO505qIs0q2l4Stw",
	    authDomain: "hexiomayu.firebaseapp.com",
	    databaseURL: "https://hexiomayu.firebaseio.com",
	    projectId: "hexiomayu",
	    storageBucket: "hexiomayu.appspot.com",
	    messagingSenderId: "706036191923",
	    appId: "1:706036191923:web:b4eae85c86536256e5d6c6",
	    measurementId: "G-FJZ6JQTMJY" 
	}
    );   
}

export default firebase
