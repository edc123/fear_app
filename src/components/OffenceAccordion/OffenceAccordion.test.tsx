import { render, fireEvent, screen } from '@testing-library/react'

import { OffenceAccordion } from './OffenceAccordion'
import { mockData } from './mock'
import { Dispatch, SetStateAction } from 'react'

const renderTestOffenceAccordion = (
  selectedPanel: number | null,
  setSelectedPanel: Dispatch<SetStateAction<number | null>>,
) => {
  let { getAllByTestId, rerender } = render(
    <OffenceAccordion
      data={mockData}
      selectedPanel={selectedPanel}
      setSelectedPanel={setSelectedPanel}
      groupBy="Suburb - Incident"
    />,
  )

  return {
    buttons: getAllByTestId('accordion__button'),
    panels: getAllByTestId('accordion__panel'),
    rerender: (
      selectedPanel: number | null,
      setSelectedPanel: Dispatch<SetStateAction<number | null>>,
    ) =>
      rerender(
        <OffenceAccordion
          data={mockData}
          selectedPanel={selectedPanel}
          setSelectedPanel={setSelectedPanel}
          groupBy="Suburb - Incident"
        />,
      ),
  }
}

describe('<OffenceAccordion />', () => {
  window.HTMLElement.prototype.scrollIntoView = function () {}

  it('should render all closed by default', () => {
    let selectedPanel: number | null = null

    const setSelectedPanel = (index: number | null) => (selectedPanel = index)

    let { panels } = renderTestOffenceAccordion(
      selectedPanel,
      setSelectedPanel as Dispatch<SetStateAction<number | null>>,
    )

    expect(panels[0]).not.toBeVisible()
    expect(panels[1]).not.toBeVisible()
  })

  it('should open a closed item when clicked', () => {
    let selectedPanel: number | null = null

    const setSelectedPanel = (index: number | null) => (selectedPanel = index)

    let { panels, buttons, rerender } = renderTestOffenceAccordion(
      selectedPanel,
      setSelectedPanel as Dispatch<SetStateAction<number | null>>,
    )

    expect(panels[0]).not.toBeVisible()
    expect(panels[1]).not.toBeVisible()

    fireEvent.click(buttons[1])

    rerender(
      selectedPanel,
      setSelectedPanel as Dispatch<SetStateAction<number | null>>,
    )

    const rerenderedPanels = screen.getAllByTestId('accordion__panel')

    expect(rerenderedPanels[0]).not.toBeVisible()
    expect(rerenderedPanels[1]).toBeVisible()
  })

  it('should close an open item when clicked', () => {
    let selectedPanel: number | null = null

    const setSelectedPanel = (index: number | null) => (selectedPanel = index)

    let { panels, buttons, rerender } = renderTestOffenceAccordion(
      selectedPanel,
      setSelectedPanel as Dispatch<SetStateAction<number | null>>,
    )

    expect(panels[0]).not.toBeVisible()
    expect(panels[1]).not.toBeVisible()

    fireEvent.click(buttons[1])

    rerender(
      selectedPanel,
      setSelectedPanel as Dispatch<SetStateAction<number | null>>,
    )

    const rerenderedPanels = screen.getAllByTestId('accordion__panel')

    expect(rerenderedPanels[0]).not.toBeVisible()
    expect(rerenderedPanels[1]).toBeVisible()

    fireEvent.click(buttons[1])

    rerender(
      selectedPanel,
      setSelectedPanel as Dispatch<SetStateAction<number | null>>,
    )

    const rerenderedPanels2 = screen.getAllByTestId('accordion__panel')

    expect(rerenderedPanels2[0]).not.toBeVisible()
    expect(rerenderedPanels2[1]).not.toBeVisible()
  })

  it('should close an open item if another different item is clicked', () => {
    let selectedPanel: number | null = null

    const setSelectedPanel = (index: number | null) => (selectedPanel = index)

    let { panels, buttons, rerender } = renderTestOffenceAccordion(
      selectedPanel,
      setSelectedPanel as Dispatch<SetStateAction<number | null>>,
    )

    expect(panels[0]).not.toBeVisible()
    expect(panels[1]).not.toBeVisible()

    fireEvent.click(buttons[1])

    rerender(
      selectedPanel,
      setSelectedPanel as Dispatch<SetStateAction<number | null>>,
    )

    const rerenderedPanels = screen.getAllByTestId('accordion__panel')

    expect(rerenderedPanels[0]).not.toBeVisible()
    expect(rerenderedPanels[1]).toBeVisible()

    fireEvent.click(buttons[0])

    rerender(
      selectedPanel,
      setSelectedPanel as Dispatch<SetStateAction<number | null>>,
    )

    const rerenderedPanels2 = screen.getAllByTestId('accordion__panel')

    expect(rerenderedPanels2[0]).toBeVisible()
    expect(rerenderedPanels2[1]).not.toBeVisible()
  })
})
