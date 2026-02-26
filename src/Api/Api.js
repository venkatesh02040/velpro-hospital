// api.js - Authenticated Axios client for Velpro Hospitals Frontend
// Handles automatic JWT access token refresh, request queuing, and 401 handling
// Ideal for patient portals, doctor dashboards, appointment booking, EMR access, etc.

import axios from 'axios';

// ================================
// CONFIGURATION - Velpro Hospitals
// ================================
const API_BASE_URL = 'http://192.168.0.109:8000/';           // ← CHANGE THIS to your real backend API base URL
const REFRESH_TOKEN_URL = `${API_BASE_URL}token/refresh/`;        // Usually /token/refresh/ or /api/token/refresh/

// Create reusable Axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Optional: prevent hanging requests in hospital network
});

// Global flags & queue for handling concurrent token refreshes
let isRefreshing = false;
let failedQueue = [];

// Helper: Resolve/Reject all queued requests after refresh completes
const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (token) {
      promise.resolve(token);
    } else {
      promise.reject(error);
    }
  });
  failedQueue = [];
};

// Request interceptor: Automatically attach Bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('velpro_access_token'); // ← prefixed for clarity
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle token expiration & refresh
api.interceptors.response.use(
  (response) => response, // Success → just pass through

  async (error) => {
    const originalRequest = error.config;

    // Detect expired/invalid token (401) and prevent infinite retry loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue this request while another refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('velpro_refresh_token');

        if (!refreshToken) {
          throw new Error('No refresh token found - please login again');
        }

        // Attempt to refresh token
        const response = await axios.post(REFRESH_TOKEN_URL, {
          refresh: refreshToken,
        });

        // Safety check: backend sometimes returns HTML (login page) on failure
        if (response.headers['content-type']?.includes('html')) {
          console.error('Received HTML instead of JSON - likely redirected to login');
          localStorage.removeItem('velpro_access_token');
          localStorage.removeItem('velpro_refresh_token');
          window.location.href = '/login'; // or '/patient-login' / '/auth/signin'
          throw new Error('Session expired. Redirecting to login...');
        }

        const newAccessToken = response.data.access;
        localStorage.setItem('velpro_access_token', newAccessToken);

        // Update queued requests with new token
        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Retry the original request
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        console.error('Token refresh failed:', refreshError);

        // Clean up tokens and redirect to login (critical for security in healthcare apps)
        localStorage.removeItem('velpro_access_token');
        localStorage.removeItem('velpro_refresh_token');
        window.location.href = '/login';

        return Promise.reject(refreshError);
      }
    }

    // For all other errors, just reject
    return Promise.reject(error);
  }
);

export default api;