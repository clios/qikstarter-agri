import axios from 'axios'
import { toast } from 'react-toastify'
import urlcat from 'urlcat'
import useSWR from 'swr'

const fetcher = (url) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('q-agri-web-token')}`
      }
    })
    .then((res) => {
      return {
        records: res.data,
        total_count: Number(res.headers['x-total-count'])
      }
    })
    .catch((error) => {
      throw error
    })

export default function getFarmLocations(parameters) {
  const API_URL = process.env.BASE_URL
  const PATH = '/locations/farm'
  const url = urlcat(API_URL, PATH, parameters)

  const { data, error, mutate } = useSWR(url, fetcher, {
    onErrorRetry: (error) => {
      if (error.status === 404) return
      if (error.status === 403) return
      if (error.status === 402) return
      if (error.status === 401) return
    },
    loadingTimeout: 3000,
    onLoadingSlow: () => {
      toast.warning('Slow internet connection')
    },
    refreshInterval: 60000
  })

  return {
    data: data,
    loading: !error && !data,
    error: error,
    mutate: mutate
  }
}
