import axios from 'axios'
import { navigate } from '@reach/router'
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

export default function getAccount(should_fetch, swr_options) {
  const url = process.env.BASE_URL + '/account'

  const { data, error } = useSWR(should_fetch ? url : null, fetcher, {
    onError: (error) => {
      if (error?.response?.status === 404) navigate('/your-account/information', { replace: true })
    },
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
    error: error
  }
}
