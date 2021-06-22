import { useState } from 'react'
import cx from 'classnames'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Filter,
  Header,
  Status,
} from './components'
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

          <Accordion>
            {Object.entries(data).map(([key, records], i) => {
              const isExpanded = i === selectedPanel

              return (
                <AccordionItem key={`item_${key}`}>
                  <AccordionButton
                    key={`button_${key}`}
                    groupName={key}
                    isExpanded={isExpanded}
                    handleClick={() => {
                      if (isExpanded) {
                        setSelectedPanel(null)
                      } else {
                        setSelectedPanel(i)
                      }
                    }}>
                    {key} <span aria-hidden="true">({records.length})</span>
                    <span className="visually-hidden">
                      , number of records: {records.length}
                    </span>
                  </AccordionButton>

                  {isExpanded && (
                    <AccordionPanel key={`panel_${key}`} groupName={key}>
                      <ul className="offences__wrapper">
                        {records?.map((record, i) => (
                          <li
                            className={cx('offence', {
                              'offence--last': i === records?.length - 1,
                            })}
                            key={record?._id}>
                            <h4 className="offence__level-3">
                              {record?.['Offence Level 3 Description']}
                            </h4>

                            <div className="offence__level-1">
                              {record?.['Offence Level 1 Description']}
                            </div>

                            {groupBy === 'Suburb - Incident' && (
                              <div className="offence__level-2">
                                {record?.['Offence Level 2 Description']}
                              </div>
                            )}

                            {groupBy === 'Offence Level 2 Description' && (
                              <div className="offence__suburb">
                                {record?.['Suburb - Incident']}
                              </div>
                            )}

                            <div className="offence__date">
                              {record?.['Reported Date']}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </AccordionPanel>
                  )}
                </AccordionItem>
              )
            })}
          </Accordion>
        </>
      )}
    </div>
  )
}

export { App }
