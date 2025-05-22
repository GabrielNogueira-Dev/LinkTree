import { FormEvent, useEffect, useState } from "react"
import { Header } from "../../components/header"
import { Input } from "../../components/input"

import { FiTrash } from "react-icons/fi"
//BANCO DE DADOS
import { db } from "../../components/services/firebaseconnection"
import { addDoc,collection, onSnapshot,
  query,orderBy,doc,deleteDoc
 } from "firebase/firestore"

interface LinkProps{
  id:string;
  name:string;
  url:string;
  bg:string;
  color:string
}

export function Admin() {
const [nameInput,setNameInput] = useState("")
const [urlInput,setUrlInput]= useState("")
const [textColorInput,setTextColorInput] =useState("#f1f1f1")
const [backgroundcolorInput,setbackgroundcolorInput] =useState("#121212")

const [links,setLinks] = useState<LinkProps[]>([])

useEffect(()=>{
const linksRef = collection(db,"links");
/*query faz busca*//*orderby faz ordenação dos links na ordem asc*/
const queryRef = query(linksRef,orderBy("created","asc"))

const unsub = onSnapshot(queryRef,(snapshot)=> {
let lista = [] as LinkProps[];

snapshot.forEach((doc)=>{
  lista.push({
    id:doc.id,
    name:doc.data().name,
    url:doc.data().url,
    bg:doc.data().bg,
  color:doc.data().color
  })
})
setLinks(lista);


})
return ()=>{
  unsub();
}
},[])

async function handleRegister(e:FormEvent){
e.preventDefault();

if(nameInput === '' || urlInput ===''){
  alert('Preencha todos os campos')
  return
}
/*AWAIT OU USA PROMISE COM .THEN*/addDoc(collection(db,"links"),{
  name:nameInput,
  url:urlInput,
  bg:backgroundcolorInput,
  color:textColorInput,
  created: new Date()
})
.then(()=>{
setNameInput("")
setUrlInput("")
console.log("certo")
})
.catch((error)=>{
console.log(error,"ERROR ao cadastrar")
})
}

async function handleDeleteLink(id:string){
const docRef = doc(db,"links",id)
await deleteDoc(docRef);
}

  return (
     <div className="flex items-center flex-col min-h-screen pb-7 px-2">
     <Header/>
        
<form  onSubmit={handleRegister}
className="flex flex-col mt-8 mb-3 w-full">
  <label className="text-white font-medium mt-2 mb-2"> Name of the Link </label>
    <Input value={nameInput}
    onChange={((e)=>setNameInput(e.target.value))}
    placeholder="Digite o nome do Link"
    />

    <label className="text-white font-medium mt-2 mb-2"> Name of the Link </label>
    <Input type="url
    " value={urlInput}
    onChange={((e)=>setUrlInput(e.target.value))}
    placeholder="Digite sua Url"
    />
    <section className="flex my-4 gap-5">
      <div className="flex gap-2">
        <label className="text-white font-medium mt-2 mb-2">Cor do Link</label>
      <input type="color"
      value={textColorInput}
      onChange={((e)=>setTextColorInput(e.target.value))}
      />
      </div>

        <div className="flex gap-2">
        <label className="text-white font-medium mt-2 mb-2">Fundo do Link</label>
      <input type="color"
      value={backgroundcolorInput}
      onChange={((e)=>setbackgroundcolorInput(e.target.value))}
      />
      </div>
    </section>

  {nameInput !== ''&& (
     <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
      <label className="text-white font-medium mt-2 mb-2">Veja</label>
      <article style={{marginBottom:8,marginTop:8, backgroundColor:backgroundcolorInput}}
       className="w-11/12 max-w-lg flex flex-col items-center justify-between rounded px-1 py-3">
        <p style={{color:textColorInput}}>{nameInput}</p>
      </article>
    </div>
  )}

<button type="submit"
className="mb-7 bg-blue-600 h-9 rounded-md  text-white font-medium gap-4 flex justify-center items-center">
  Cadastrar
</button>

</form>

<h2 className="font-bold text-white mb-3 text-1xl border-4 rounded-md p-2 bg-[rgba(70,65,65,0.48)]">
  Meus Links salvos 👇
</h2>

{links.map((link)=>(
  <article key={link.id}
 className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
 style={{backgroundColor:link.bg, color:"white"}}
 >
<p>{link.name}</p>
<div>
  <button onClick={()=>handleDeleteLink(link.id)}
  className="border border-dashed py-1 px-1 rounded bg-neutral-700" 
  >
  <FiTrash size={18} color="white"/>
</button>
</div>
</article>
))}

      </div>

  )
}

export default Admin
