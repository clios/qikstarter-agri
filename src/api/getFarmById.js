import axios from 'axios'
import { toast } from 'react-toastify'
import useSWR from 'swr'

const fetcher = (url) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('q-agri-web-token')}`
      }
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error
    })

export default function getFarmById(farm_id, swr_options) {
  const url = process.env.BASE_URL + `/farms/${farm_id}`

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
    ...swr_options
  })

  return {
    data: data,
    loading: !error && !data,
    error: error,
    mutate: mutate
  }
}
