import { Social } from "../../components/social"

import { FaFacebook,FaInstagram,FaLinkedin } from "react-icons/fa"

export function Home() {

  return (
    
      <div className="flex flex-col w-full py-4 items-center justify-center">   
          <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">GabrielNogueira.Dev</h1>
     <span className="text-gray-50 mb-5 mt-3">Veja meus Links 👇</span>

     <main className="flex flex-col w-11/12 max-w-xl text-center">
      <section className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
        <a>
         <p className="text-base md:text-lg ">
          Canal do youtube
         </p>
        </a>

      </section>
        <footer className="flex justify-center gap-3 my-4">
          <Social url="https://github.com/GabrielNogueira-Dev">
              <FaFacebook size={35} color="#FFF"/>
          </Social>
           <Social url="https://www.linkedin.com/in/gabriel-nogueira-2944b5335?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BEKL8y86pTdeXKj%2B7CvISSw%3D%3D">
              <FaLinkedin size={35} color="#FFF"/>
          </Social>
          <Social url="https://www.instagram.com/gabrielnogueira.dev/">
              <FaInstagram size={35} color="#FFF"/>
          </Social>
         
        </footer>
     </main>
      </div>

  )
}


