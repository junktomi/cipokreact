import { use, useEffect, useState } from 'react'
import type { Cipo } from './type/type'
import "bootstrap/dist/css/bootstrap.min.css"



function App() {

  const [cipok, setCipok] = useState<Cipo[]>([])
  // const [marka, setMarka] = useState<string>()
  // const [ar, setAr] = useState<number>()
  // const [keszleten, setKeszleten] = useState<boolean>()
  // const [megjelenes, setMegjelenes] = useState<Date>()


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

  async function handleFelvetel(e){
    e.preventDefault()
    const ujCipo = {
      marka: e.target.marka.value,
      ar: e.target.ar.value,
      keszleten: e.target.keszleten.checked,
      megjelenes: e.target.megjelenes.value
    }
    try{
      const response = await fetch("http://localhost:3000/cipok",{
        "method": "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(ujCipo)
      });
      const cipo: Cipo = await response.json()
      setCipok((elozo) => [...elozo, cipo])
      e.target.reset()

    } catch(err){
      console.error(err)
    }
  }

  return (
    <><div style={{margin: 30}}>
      
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
      <h2>Új cipő felvétele</h2>
      <form onSubmit={handleFelvetel}>
        <div className="mb-3">
          <label htmlFor="marka" className="form-label">Márka</label>
          <input type="text" className="form-control" id="marka" name="marka" />
        </div>

        <div className="mb-3">
          <label htmlFor="ar" className="form-label">Ár</label>
          <div className="input-group">
            <input type="number" className="form-control" id="ar" name="ar" min={0} />
            <span className="input-group-text">Ft</span>
          </div>
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="keszleten" name="keszleten" />
          <label htmlFor="keszleten" className="form-check-label">Készleten van?</label>
        </div>

        <div className="mb-3">
          <label htmlFor="megjelenes" className="form-label">Megjelenés dátuma</label>
          <input type="date" className="form-control" id="megjelenes" name="megjelenes" />
        </div>

        <button type="submit" className="btn btn-primary w-100">Felvétel</button>
      </form>
    </div>
    </>
  )
}

export default App
