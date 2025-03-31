// Define generic response type
export interface ApiResponse<T = any> {
    data: T;
    status: number;
    headers?: Record<string, string>;
}

// Define request options type with common HTTP client options
export interface RequestOptions {
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean>;
    timeout?: number;
    // Add other options you might need
}

// Main HTTP client interface
export interface HttpClient {
    get<T = any>(url: string, options?: RequestOptions): Promise<ApiResponse<T>>;
    post<T = any, D = any>(url: string, data?: D, options?: RequestOptions): Promise<ApiResponse<T>>;
    put<T = any, D = any>(url: string, data?: D, options?: RequestOptions): Promise<ApiResponse<T>>;
    del<T = any>(url: string, options?: RequestOptions): Promise<ApiResponse<T>>;
}