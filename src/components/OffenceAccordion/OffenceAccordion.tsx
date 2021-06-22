import cx from 'classnames'
import { Dispatch, SetStateAction } from 'react'

import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '../'

import { OffenceRecord } from '../../utils/useOffences/useOffences'

type OffenceAccordionProps = {
  data: Record<string, OffenceRecord[]>
  selectedPanel: number | null
  setSelectedPanel: Dispatch<SetStateAction<number | null>>
  groupBy: keyof OffenceRecord
}

const handleAccordionButtonToggle = (
  isExpanded: boolean,
  i: number,
  key: string,
  setSelectedPanel: Dispatch<SetStateAction<number | null>>,
) => {
  document.querySelector(`[id="button_${key}"]`)?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  })

  setSelectedPanel(isExpanded ? null : i)
}

const OffenceAccordion: React.FC<OffenceAccordionProps> = ({
  data,
  selectedPanel,
  setSelectedPanel,
  groupBy,
}) => {
  return (
    <Accordion>
      {Object.entries(data).map(([key, records], i) => {
        const isExpanded = i === selectedPanel

        return (
          <AccordionItem key={`item_${key}`}>
            <AccordionButton
              key={`button_${key}`}
              groupName={key}
              isExpanded={isExpanded}
              selectedPanel={selectedPanel}
              handleClick={() =>
                handleAccordionButtonToggle(
                  isExpanded,
                  i,
                  key,
                  setSelectedPanel,
                )
              }>
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
  )
}

export { OffenceAccordion }
