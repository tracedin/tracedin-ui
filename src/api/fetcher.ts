import axios, { AxiosError, AxiosResponse } from 'axios'

interface ApiResponse<T> {
  responseCode: string
  result: T
}

const fetcher = axios.create({
  baseURL: import.meta.env.VITE_TRACEDIN_API,
  headers: {
    'Content-Type': 'application/json'
  }
})

const handleApiError = (error: AxiosError) => {
  alert('API 호출 도중 에러가 발생하였습니다.')
  console.error('Response error:', error)
  return Promise.reject(error)
}

const handleApiResponse = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  const { data } = response

  if (data.responseCode !== 'SUCCESS') {
    throw new Error()
  }

  return data.result
}
fetcher.interceptors.response.use(handleApiResponse, handleApiError)

export default fetcher
