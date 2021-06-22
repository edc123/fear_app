import { useState } from 'react'

import { OffenceAccordion, Filter, Header, Status } from './components'
import { useOffences } from './utils'

import { OffenceRecord } from './utils/useOffences/useOffences'

const App = () => {
  const [groupBy, setGroupBy] =
    useState<keyof OffenceRecord>('Suburb - Incident')

  const [selectedPanel, setSelectedPanel] = useState<number | null>(null)

  const { data, isLoading, isError } = useOffences({ groupBy })

  const handleFilterToggle = () => {
    setSelectedPanel(null)
    setGroupBy(
      groupBy === 'Suburb - Incident'
        ? 'Offence Level 2 Description'
        : 'Suburb - Incident',
    )
  }

  return (
    <div className="app">
      <Header />

      <Status>
        {isLoading && <p>Loading...</p>}
        {isError && <p>There was an error.</p>}
      </Status>

      {!isLoading && !isError && Object.keys(data).length > 0 && (
        <>
          <Filter handleClick={handleFilterToggle}>{groupBy}</Filter>

          <OffenceAccordion
            data={data}
            selectedPanel={selectedPanel}
            setSelectedPanel={setSelectedPanel}
            groupBy={groupBy}
          />
        </>
      )}
    </div>
  )
}

export { App }
