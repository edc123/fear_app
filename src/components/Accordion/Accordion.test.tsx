import { render, screen } from '@testing-library/react'

import { Accordion } from './Accordion'
import { mockData } from './mock'

describe('<Accordion />', () => {
  it('should render', () => {
    // const { container } = render(
    //   <Accordion id={AccordionFixture.id} items={AccordionFixture.items} />,
    // )
    // const accordion = screen.getByTestId(/data-testid-Accordion/i)
    // expect(accordion).toBeInTheDocument()
    // expect(container).toMatchSnapshot()
  })

  it('should return `null` if the length of the `items` prop is 0', () => {
    // render(<Accordion items={[]} />)
    // const accordion = screen.queryByTestId(/data-testid-Accordion/i)
    // expect(accordion).not.toBeInTheDocument()
  })
})
