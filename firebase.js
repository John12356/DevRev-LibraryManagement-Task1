import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
    import {FacebookAuthProvider,GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
    import { getDatabase, get,ref ,set}from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js"
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const loginPage=document.querySelector('.login-page');
    const loginBtn=document.getElementById('login-btn');

    const firebaseConfig = {
      apiKey: "AIzaSyDbiQAno68SOWCeSgJ9CnfVv8zvtfnvLCE",
      authDomain: "library-system-98905.firebaseapp.com",
      projectId: "library-system-98905",
      storageBucket: "library-system-98905.appspot.com",
      messagingSenderId: "574793548866",
      appId: "1:574793548866:web:b00c84833c41937d7f59db",
      measurementId: "G-19TBN9GRHK"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database= getDatabase(app);
    const auth = getAuth(app);
    const provider=new GoogleAuthProvider(app);
    const provider2=new FacebookAuthProvider(app);
    console.log(app);

    //----- New Registration code start	  
	  document.getElementById("register").addEventListener("click", function() {
		  var email =  document.getElementById("email").value;
		  var password = document.getElementById("password").value;
		  //For new registration
		  createUserWithEmailAndPassword(auth, email, password)
		  .then((userCredential) => {
		    // Signed in 
		    const user = userCredential.user;
           
        loginPage.classList.toggle('show-login-page');
		    alert("Registration successfully!!");
        loginBtn.innerText="Sign Out";

		    // ...
		  })
		  .catch((error) => {
		    const errorCode = error.code;
		    const errorMessage = error.message;
		    // ..
		    console.log(errorMessage);
		    alert(error);
		  });		  		  
	  });
	
	  //----- Login code start	  
	  document.getElementById("login").addEventListener("click", function() {
        
		  var email =  document.getElementById("login_email").value;
		  var password = document.getElementById("login_password").value;

		  signInWithEmailAndPassword(auth, email, password)
		  .then((userCredential) => {
		    // Signed in 
		    const user = userCredential.user;
		    console.log(user);
		    alert(user.email+" Login successfully!!!")
        loginPage.classList.toggle('show-login-page');
        
        loginBtn.innerText="Sign Out";
		  })
		  .catch((error) => {
		    const errorCode = error.code;
		    const errorMessage = error.message;
		    console.log(errorMessage);
		    alert(errorMessage);
		  });		  		  
	  });
      //-------Google auth login-------//
      document.getElementById("googleBtnIn").addEventListener('click',(e)=>{
        signInWithPopup(auth,provider)
        .then((result)=>{
            const credential= GoogleAuthProvider.credentialFromResult(result);
            const token=credential.accessToken;

            const user=result.user;
            alert(user.displayName);
  
            loginPage.classList.toggle('show-login-page');
            
            loginBtn.innerText="Sign Out";
        }).catch((error)=>{
            const errorCode = error.code;
		    const errorMessage = error.message;

            const email=error.email;

            const credential= GoogleAuthProvider.credentialFromResult(error);;
        });
      });

            //-------Google auth signup-------//
        document.getElementById("googleBtnUp").addEventListener('click',(e)=>{
        signInWithPopup(auth,provider)
        .then((result)=>{
            const credential= GoogleAuthProvider.credentialFromResult(result);
            const token=credential.accessToken;

            const user=result.user;
            alert(user.displayName);
  
            loginPage.classList.toggle('show-login-page');
            
            loginBtn.innerText="Sign Out";
        }).catch((error)=>{
            const errorCode = error.code;
		    const errorMessage = error.message;

            const email=error.email;

            const credential= GoogleAuthProvider.credentialFromResult(error);;
        });
      });

      //----- Logout code start	  
	//   document.getElementById("logout").addEventListener("click", function() {
	// 	  signOut(auth).then(() => {
	// 		  // Sign-out successful.
	// 		  console.log('Sign-out successful.');
	// 		  alert('Sign-out successful.');
	// 		  document.getElementById('logout').style.display = 'none';
	// 		}).catch((error) => {
	// 		  // An error happened.
	// 		  console.log('An error happened.');
	// 		});		  		  
	//   });
	  //----- End
