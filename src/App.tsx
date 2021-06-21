import { useState } from 'react'

import { Accordion, Header } from './components'
import { useOffences } from './utils'

import { OffenceRecord } from './utils/useOffences/useOffences'

const App = () => {
  const [groupBy, setGroupBy] =
    useState<keyof OffenceRecord>('Suburb - Incident')

  const { data, isLoading, isError } = useOffences({ groupBy })

  return (
    <div className="app">
      <Header />

      {isLoading && <p>Loading...</p>}
      {isError && <p>There was an error.</p>}
    </div>
  )
}

export { App }
