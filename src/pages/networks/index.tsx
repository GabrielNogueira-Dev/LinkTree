import { FormEvent, useEffect, useState } from "react"
import { Header } from "../../components/header"
import { Input } from "../../components/input"

import { db } from "../../components/services/firebaseconnection"
import { setDoc,getDoc, doc } from "firebase/firestore"

export function Networks() {
const [git,setGit] = useState("")
const [instagram,setInstagram] = useState("")
const [linkedin,setLinkedin] = useState("")

useEffect(()=>{
  function loadLinks(){
    const docRef = doc(db,"social","link")
    getDoc(docRef)
    .then((snapshot)=>{
if(snapshot.data() !== undefined){
  setGit(snapshot.data()?.GitHub)
  setInstagram(snapshot.data()?.Instagram)
  setLinkedin(snapshot.data()?.Linkedin)
  
}
    })
  }
  loadLinks()
},[])

function handleRegister(e:FormEvent){
e.preventDefault();

setDoc(doc(db,"social","link"),{
  GitHub:git,
  Instagram:instagram,
  Linkedin:linkedin
})
.then(()=>{
  console.log("sucesso ao cadastrar")
})
.catch((error)=>{
  console.log("error ao cadastrar",error)
})
}

  return (
      <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header/>

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas Redes Sociais </h1>
      
      <form onSubmit={handleRegister}
      className="flex flex-col max-w-xl w-full">
<label className="text-white font-medium mt-2 mb-2">Link do GitHub</label>
<Input type="url"
placeholder="Digite a Url do GitHub"
value={git}
onChange={((e)=> setGit(e.target.value))}
/>

<label className="text-white font-medium mt-2 mb-2">Link do Instagram</label>
<Input type="url"
placeholder="Digite a Url do Instagram"
value={instagram}
onChange={((e)=> setInstagram(e.target.value))}
/>

<label className="text-white font-medium mt-2 mb-2">Link do Linkedin</label>
<Input type="url"
placeholder="Digite a Url do Linkedin"
value={linkedin}
onChange={((e)=> setLinkedin(e.target.value))}
/>

<button type="submit"
className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex-mb-7 font-medium cursor-pointer"
>
  Salvar Links
</button>

      </form>
      </div>

  )
}

export default Networks
