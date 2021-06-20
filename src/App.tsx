import { useEffect } from 'react'

import { Accordion, Header } from './components'
import { useOffences } from './utils'

const App = () => {
  const { data } = useOffences()

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

  return (
    <>
      <Header />
      <Accordion />
    </>
  )
}

export { App }
