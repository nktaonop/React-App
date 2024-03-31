import axios from 'axios'

const httpClient = axios.create()

let baseUrl: string = 'http://localhost:3001'

httpClient.interceptors.request.use((config) => {
  config.baseURL = baseUrl
  return config
})

export { httpClient }
