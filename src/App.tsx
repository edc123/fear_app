import { useEffect } from 'react'
import './App.scss'

import { Accordion } from './components'
import { useOffences } from './utils'

const App = () => {
  const { data } = useOffences()

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

  return (
    <div className="app">
      <header className="header">Fēar</header>
      <Accordion />
    </div>
  )
}

export { App }
