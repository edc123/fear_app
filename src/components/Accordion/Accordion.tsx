import { Blip } from '../'

import './Accordion.scss'

type AccordionButtonProps = {
  groupName: string
  isExpanded: boolean
  handleClick: () => void
}

type AccordionPanelProps = {
  groupName: string
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
}) => {
  return (
    <h3>
      <button
        className="accordion__button"
        type="button"
        onClick={handleClick}
        aria-expanded={isExpanded}
        aria-controls={`panel_${groupName}`}
        id={`button_${groupName}`}>
        {isExpanded && <Blip />}
        <div>{children}</div>
      </button>
    </h3>
  )
}

const AccordionPanel: React.FC<AccordionPanelProps> = ({
  children,
  groupName,
}) => (
  <div
    className="accordion__panel"
    id={`panel_${groupName}`}
    role="region"
    aria-labelledby={`button_${groupName}`}>
    {children}
  </div>
)

const Accordion: React.FC<AccordionProps> = ({ children }) => (
  <div className="accordion">{children}</div>
)

export { Accordion, AccordionItem, AccordionButton, AccordionPanel }
