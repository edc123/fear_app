import cx from 'classnames'

import { Blip } from '../'

import './Accordion.scss'

type AccordionButtonProps = {
  groupName: string
  isExpanded: boolean
  handleClick: () => void
  selectedPanel: number | null
}

type AccordionPanelProps = {
  groupName: string
  isExpanded: boolean
}

type AccordionProps = {
  children?: any
}

const AccordionItem: React.FC = ({ children }) => (
  <div className="accordion__item">{children}</div>
)

const AccordionButton: React.FC<AccordionButtonProps> = ({
  children,
  groupName,
  isExpanded,
  handleClick,
  selectedPanel,
}) => {
  const shouldBeDimmed = selectedPanel && !isExpanded

  return (
    <h3>
      <button
        className={cx('accordion__button', {
          'accordion__button--dimmed': shouldBeDimmed,
        })}
        type="button"
        onClick={handleClick}
        aria-expanded={isExpanded}
        aria-controls={`panel_${groupName}`}
        id={`button_${groupName}`}
        data-testid="accordion__button">
        {isExpanded && <Blip />}
        <div>{children}</div>
      </button>
    </h3>
  )
}

const AccordionPanel: React.FC<AccordionPanelProps> = ({
  children,
  groupName,
  isExpanded,
}) => (
  <div
    className="accordion__panel"
    id={`panel_${groupName}`}
    role="region"
    aria-labelledby={`button_${groupName}`}
    data-testid="accordion__panel"
    aria-hidden={!isExpanded}
    hidden={!isExpanded}>
    {children}
  </div>
)

const Accordion: React.FC<AccordionProps> = ({ children }) => (
  <div className="accordion" data-testid="accordion">
    {children}
  </div>
)

export { Accordion, AccordionItem, AccordionButton, AccordionPanel }
