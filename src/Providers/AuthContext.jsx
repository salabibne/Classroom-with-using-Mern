import { createContext, useEffect, useState } from "react";
import app from "../../firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import usePublicApi from "../Hooks/usePublicApi";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const classRoomcontext = createContext(null)
const AuthContext = ({children}) => {
    const [user,setUser] = useState(null);
    const [loader,setLoader] = useState(true)
    const publicApi = usePublicApi();

    // createUser:
    const createUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // signin :

    const login = (email,password) =>{
        setLoader(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    // signOut :
    const logOut = ()=>{
        setLoader(true)
        return signOut(auth)
    }

    // googleSignin :
    const gsign = ()=>{
        setLoader(true)
        return signInWithPopup(auth,provider)
    }
    
    // updateProfile:
    const updateUserProfile =(name,photo)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,photoURL:photo
        })

    }

    // unsubscribe:
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setUser(user)
            if(user){
                const userInfo = {email : user.email};
                publicApi.post("/jwt", userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem("accessToken",res.data.token)
                        setLoader(false)
                    }
                })

            }

            else{
                localStorage.removeItem("accessToken")
                setLoader(false)
            }
            
            console.log(user);
        })
        return ()=>{
            return unsubscribe()
        }
    },[publicApi])
    
    
    
    const contextValue ={

       user,loader,createUser,login,logOut,gsign,updateUserProfile


    }
   
    return (
        <classRoomcontext.Provider value={contextValue}>
           {children} 
        </classRoomcontext.Provider>
    );
};

export default AuthContext;