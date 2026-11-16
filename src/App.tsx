import { use, useEffect, useState } from 'react'
import type { Cipo } from './type/type'
import "bootstrap/dist/css/bootstrap.min.css"



function App() {

  const [cipok, setCipok] = useState<Cipo[]>([])
  const [marka, setMarka] = useState<string>()
  const [ar, setAr] = useState<number>()
  const [keszleten, setKeszleten] = useState<boolean>()
  const [megjelenes, setMegjelenes] = useState<Date>()


  useEffect(()=>{
    async function AdatokMegjelenitese(){

      try{
        const response = await fetch("http://localhost:3000/cipok")
        const data = await response.json()
        setCipok(data)
      }catch(err){
        console.error(err)
      }
    }
    AdatokMegjelenitese()
  }, [])

  return (
    <>
      <table className='table'>
        <thead>
          <tr><th>Márka</th>
          <th>Ár</th>
          <th>Készleten</th>
          <th>Megjelenés dátuma</th></tr>
        </thead>
        <tbody>

        {
          cipok.map((item)=>(
            <tr key={item.id}>
              <td>{item.marka}</td>
              <td>{item.ar}ft</td>
              <td>{item.keszleten?"Készleten":"Kifogyott"}</td>
              <td>{item.megjelenes.toString()}</td>
            </tr>
          ))
        }
        </tbody>
      </table>

      <form>
        <label htmlFor='marka'>
          <input type="text" value={marka} onChange={(e) => setMarka(e.target.value)} />
        </label>
        <label htmlFor='ar'>
          <input type="number" value={ar} onChange={(e) => setAr(parseInt(e.target.value))} />
        </label>


      </form>
    </>
  )
}

export default App
