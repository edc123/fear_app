import useSWR from 'swr'

import { request } from '../fetch'

export type OffenceRecord = {
  'Offence Level 1 Description'?: string
  'Offence Level 2 Description'?: string
  'Offence Level 3 Description'?: string
  'Offence count'?: string
  'Postcode - Incident'?: string
  'Reported Date'?: string
  'Suburb - Incident'?: string
  _id?: number
}

export type OffencesResponse = {
  result: {
    records: OffenceRecord[]
    // etc...
  }
}

export type OffencesError = {
  result: 'Failed'
}

const OFFENCES_ENDPOINT =
  'https://data.sa.gov.au/data/api/3/action/datastore_search?resource_id=590083cd-be2f-4a6c-871e-0ec4c717717b'

const groupItems = (items: OffenceRecord[], groupBy: keyof OffenceRecord) =>
  items.reduce((acc, item) => {
    const currValue = item[groupBy] ?? 'Not defined'
    const hasKey = acc.hasOwnProperty(currValue)

    if (!hasKey) {
      acc[currValue] = [item]
    } else {
      acc[currValue].push(item)
    }

    return acc
  }, {} as Record<any, OffenceRecord[]>)

const useOffences = ({ groupBy }: { groupBy: keyof OffenceRecord }) => {
  const { data, error } = useSWR<OffencesResponse, OffencesError>(
    OFFENCES_ENDPOINT,
    request,
    {
      revalidateOnFocus: false,
    },
  )

  const records = data?.result?.records ?? []

  const processedData = records.length > 0 ? groupItems(records, groupBy) : {}

  const isError = error?.result === 'Failed'

  const isLoading = !isError && !data

  return {
    data: processedData,
    isLoading,
    isError,
  }
}

export { useOffences, groupItems }
