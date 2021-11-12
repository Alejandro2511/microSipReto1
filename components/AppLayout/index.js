import{colors, fonts} from '../../styles/theme'




export default function AppLayout ({children}) {
    return (
    <>
     <main>
      {children}
     </main>
      
      <style jsx global>{`
        html,
        body{
          background-image:
          radial-gradient(${colors.primary}33 1px, transparent 1px),
          radial-gradient(${colors.primary}33 1px, transparent 1px);
          background-position: 0, 0, 25px 25px;
          background-size: 50px 50px;

            padding: 0; 
            margin: 0;
            font-family: ${fonts.base}
         
        }
        h1{text-align: center;
        
        
        }
        *{
            box-sizing: border-box;
        }
         
      `}
      </style>



          

    </>
    )
}