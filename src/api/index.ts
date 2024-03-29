import axios, { AxiosInstance } from 'axios'

import GuideService from '@/api/guides'
import UserService from '@/api/users'
import PlayerService from '@/api/players'
import DiscordService from '@/api/discord'

import store from '../store'

class ApiDocs {
  baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  public redoc() {
    return this.baseURL + '/api/docs/redoc/'
  }

  public swagger() {
    return this.baseURL + '/api/docs/swagger/'
  }

  public swaggerJson() {
    return this.baseURL + '/api/docs/swagger.json/'
  }
}


export class Api {
  public axios: AxiosInstance
  public baseURL: string = import.meta.env.VITE_API_URL as string || ''
  public guides: GuideService
  public users: UserService
  public players: PlayerService
  public discord: DiscordService
  public docs: ApiDocs

  constructor() {
    // Full config: https://github.com/axios/axios#request-config
    this.axios = axios.create({
      baseURL: this.baseURL + '/api',
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken'
    })

    const token = localStorage.getItem('TOKEN')

    if (token) {
      this.axios.defaults.headers.common['Authorization'] = `Token ${token}`
    }

    // API Routes Services
    this.guides = new GuideService(this)
    this.users = new UserService(this)
    this.players = new PlayerService(this)
    this.discord = new DiscordService(this)

    // API Docs Routes
    this.docs = new ApiDocs(this.baseURL)

    this.setupMiddleware()
  }

  public async static(path: string) {
    /**
     * Access backend static files
     */
    return this.axios.get(`${this.baseURL}/static/${path}`)
  }

  private setupMiddleware(): void {
    /**
     * Setup API Middlewares
     */
    this.axios.interceptors.request.use((response: any) => {
      if (!response.url.includes('static')) {
        // Add '/' to end of API url
        if (response.url[response.url.length - 1] !== '/') {
          response.url += '/'
        }
      }
      return response
    })
    this.axios.interceptors.request.use(response => response, error => Promise.reject(error))
    this.axios.interceptors.response.use(response => response, error => Promise.reject(error))
  }
}

export default new Api()
