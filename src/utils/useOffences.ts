import useSWR from 'swr'

import { request } from './fetch'

const OFFENCES_ENDPOINT =
  'https://data.sa.gov.au/data/api/3/action/datastore_search?resource_id=590083cd-be2f-4a6c-871e-0ec4c717717b'

type OffenceRecord = {
  'Offence Level 1 Description'?: string
  'Offence Level 2 Description'?: string
  'Offence Level 3 Description'?: string
  'Offence count'?: string
  'Postcode - Incident'?: string
  'Reported Date'?: string
  'Suburb - Incident'?: string
  _id?: number
}

type OffencesResponse = {
  result: {
    records: OffenceRecord[]
    // etc...
  }
}

const useOffences = () => {
  const { data, error } = useSWR<OffencesResponse>(OFFENCES_ENDPOINT, request)

  return {
    data: data?.result?.records ?? {},
    isLoading: !error && !data,
    isError: error,
  }
}

export { useOffences }
