import { InputHTMLAttributes } from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{

}
//criado para nao ficar sempre escrevendo o estilo dos inputs de todas aas paginas
export function Input(props:InputProps){
    return(
        <input className="text-center border-0 h-9 rounded-md outline-none px-2 mb-3  bg-white"
        {...props} // Isto faz com o que no login ou onde esteja importado  o Input ele adicione placeholder e outras propriedades que quiser com o spread operator
         />
    )
}