/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RequestInit } from 'next/dist/server/web/spec-extension/request';

type HttpConfig = {
  headers?: RequestInit['headers'];
  params?: Record<string, any>;
  next?: RequestInit['next'];
  cacheOptions?: RequestInit['cache'];
};

type ApiConfig = {
  baseURL?: string;
  url: string;
  method?: string;
  body?: RequestInit['body'];
  mode?: RequestInit['mode'];
} & HttpConfig;

type ApiInstanceOptions = {
  baseURL?: string;
  headers?: RequestInit['headers'];
};

interface ApiInterceptor {
  request?: (config: ApiConfig) => ApiConfig | Promise<ApiConfig>;
  response?: (response: Response) => Response | Promise<Response>;
  error?: (error: any) => any;
}

interface IApiInstance {
  setInterceptors(interceptors: ApiInterceptor): void;
  request<T>(config: ApiConfig): Promise<T>;
  get<T>(url: string, config?: HttpConfig): Promise<T>;
  post<T>(url: string, body: any, config?: HttpConfig): Promise<T>;
  put<T>(url: string, body: any, config?: HttpConfig): Promise<T>;
  patch<T>(url: string, body: any, config?: HttpConfig): Promise<T>;
  delete<T>(url: string, body: any, config?: HttpConfig): Promise<T>;
}

class ApiInstance implements IApiInstance {
  private baseURL: string;
  private defaultHeaders: RequestInit['headers'];
  private interceptors: ApiInterceptor = {};

  constructor(options: ApiInstanceOptions = {}) {
    this.baseURL = options.baseURL || '';
    this.defaultHeaders = options.headers || {};
  }

  setInterceptors(interceptors: ApiInterceptor): void {
    this.interceptors = interceptors;
  }

  private buildURL(url: string, params?: Record<string, any>): string {
    if (!params) return url;

    const queryString = Object.entries(params)
      .map(([key, value]) => {
        let resValue = encodeURIComponent(value);
        if (Array.isArray(value)) resValue = value.map(v => encodeURIComponent(v)).join(',');
        return `${encodeURIComponent(key)}=${encodeURIComponent(resValue)}`;
      })
      .join('&');

    return url.includes('?') ? `${url}&${queryString}` : `${url}?${queryString}`;
  }

  private async handleInterceptors(config: ApiConfig): Promise<ApiConfig> {
    if (this.interceptors.request) {
      return await this.interceptors.request(config);
    }
    return config;
  }

  private async handleResponse(response: Response): Promise<Response> {
    if (this.interceptors.response) {
      return await this.interceptors.response(response);
    }
    return response;
  }

  private async handleError(error: any): Promise<any> {
    if (this.interceptors.error) {
      return await this.interceptors.error(error);
    }
    throw error;
  }

  async request<T>(config: ApiConfig): Promise<T> {
    try {
      const finalConfig = await this.handleInterceptors(config);

      const url = this.baseURL ? `${this.baseURL}${finalConfig.url}` : finalConfig.url;
      const finalURL = this.buildURL(url, finalConfig.params);
      const isFormData = finalConfig.body instanceof FormData;

      const response = await fetch(finalURL, {
        method: finalConfig.method || 'GET',
        headers: {
          'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
          ...this.defaultHeaders,
          ...finalConfig.headers,
        },
        body: isFormData ? finalConfig.body : JSON.stringify(finalConfig.body),
        next: finalConfig.next,
        cache: finalConfig.cacheOptions,
      });

      const finalResponse = await this.handleResponse(response);
      if (!finalResponse.ok) {
        const errorBody = await finalResponse.text();
        throw new Error(errorBody || finalResponse.statusText);
      }

      return finalResponse.json() as Promise<T>;
    } catch (error) {
      return await this.handleError(error);
    }
  }

  get<T>(url: string, config: HttpConfig = {}): Promise<T> {
    return this.request<T>({
      ...config,
      url,
      method: 'GET',
    });
  }

  post<T>(url: string, body: any, config: HttpConfig = {}): Promise<T> {
    return this.request({
      ...config,
      url,
      method: 'POST',
      body,
    });
  }

  put<T>(url: string, body: any, config: HttpConfig = {}): Promise<T> {
    return this.request({
      ...config,
      url,
      method: 'PUT',
      body,
    });
  }

  patch<T>(url: string, body: any, config: HttpConfig = {}): Promise<T> {
    return this.request({
      ...config,
      url,
      method: 'PATCH',
      body,
    });
  }

  delete<T>(url: string, body: any, config: HttpConfig = {}): Promise<T> {
    return this.request({
      ...config,
      url,
      method: 'DELETE',
      body,
    });
  }
}

const defaultInstance = new ApiInstance();

const http = {
  get: (url: string, config?: HttpConfig): Promise<Response> => defaultInstance.get(url, config),
  post: (url: string, body: any, config?: HttpConfig): Promise<Response> => defaultInstance.post(url, body, config),
  put: (url: string, body: any, config?: HttpConfig): Promise<Response> => defaultInstance.put(url, body, config),
  patch: (url: string, body: any, config?: HttpConfig): Promise<Response> => defaultInstance.patch(url, body, config),
  delete: (url: string, body: any, config?: HttpConfig): Promise<Response> => defaultInstance.delete(url, body, config),
  request: (config: ApiConfig): Promise<Response> => defaultInstance.request(config),
  create: (options: ApiInstanceOptions = {}): IApiInstance => new ApiInstance(options),
};

export default http;
