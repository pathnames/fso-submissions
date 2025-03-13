import { useState, useEffect } from 'react'
import axios from 'axios'
import Display from './components/Display'

const App = () => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])  

  const searchChange = event => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setData(response.data)  
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <div>
      find countries <input value={search} onChange={searchChange}/> 
      <Display filter={search} data={data}/>
    </div>
  )
}

export default App
