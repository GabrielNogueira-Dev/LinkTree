import { ReactNode, useState, useEffect } from "react";
import { auth } from "../components/services/firebaseconnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface PrivateProps{
    children: ReactNode;
}

export function Private({children}:PrivateProps): any{
const [loading,setLoading] = useState(true) ;
const [signed,setSigned] = useState(false) ;


    useEffect(()=>{

const unsub = onAuthStateChanged(auth,(user)=>{
if(user){
    const userData = {
        uid: user?.uid,
        email: user?.email
    }

localStorage.setItem("@reactlinks", JSON.stringify(userData));
setLoading(false);
setSigned(true);

}else{
    setLoading(false);
    setSigned(false);
}
})
//nao ficar procurando sempre,assim ele cancela(retorna o fim) do changed
return ()=>{
unsub();
}

    },[])
    
if(loading){
    return <div>Carregando..</div>
}

if(!signed){
  return  <Navigate to="/login"/>
    
}

    return children;
}