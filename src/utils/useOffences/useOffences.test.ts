import { groupItems } from './useOffences'

import { mock, mock2, mockResult, mockResult2 } from './useOffences.mock'

describe('groupItems', () => {
  it('should return items grouped by the unique values of a specified key', () => {
    const result = groupItems(mock, 'Suburb - Incident')
    expect(result).toMatchObject(mockResult)
  })

  it('should return items under "Not Defined" if these items did not have a defined value on the specified key', () => {
    const result = groupItems(mock2, 'Suburb - Incident')
    expect(result).toMatchObject(mockResult2)
  })
})
