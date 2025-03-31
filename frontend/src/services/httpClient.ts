import axios, { AxiosInstance, AxiosResponse } from 'axios';

class HttpClient {
    private static instance: HttpClient;
    private axios: AxiosInstance;

    private constructor() {
        this.axios = axios.create({
            baseURL: '/api', // Change this to your API base URL
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request interceptor
        this.axios.interceptors.request.use(
            (config) => {
                console.log('Request:', {
                    method: config.method,
                    url: config.url,
                    data: config.data,
                    headers: config.headers,
                });
                return config;
            },
            (error) => {
                console.error('Request Error:', error);
                return Promise.reject(error);
            }
        );
    }

    public static getInstance(): HttpClient {
        if (!HttpClient.instance) {
            HttpClient.instance = new HttpClient();
        }
        return HttpClient.instance;
    }

    public async get<T>(url: string): Promise<AxiosResponse<T>> {
        return this.axios.get<T>(url);
    }

    public async post<T>(url: string, data: unknown): Promise<AxiosResponse<T>> {
        return this.axios.post<T>(url, data);
    }

    public async put<T>(url: string, data: unknown): Promise<AxiosResponse<T>> {
        return this.axios.put<T>(url, data);
    }

    public async del<T>(url: string): Promise<AxiosResponse<T>> {
        return this.axios.delete<T>(url);
    }
}

export const httpClient = HttpClient.getInstance();