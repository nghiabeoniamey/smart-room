const VITE_BASE_URL_SERVER = process.env.NEXT_PUBLIC_BASE_URL_SERVER || {};

const VITE_BASE_URL_CLIENT = process.env.NEXT_PUBLIC_BASE_URL_CLIENT || {};

// API URL
export const API_URL = `${VITE_BASE_URL_SERVER}/api/v1` as string;

// COMMON API
export const PREFIX_API_COMMON = `${API_URL}/common` as string;

// AUTH API
export const PREFIX_API_AUTH = `${API_URL}/auth` as string;
export const PREFIX_API_LOGIN = PREFIX_API_AUTH + `/login` as string;
export const PREFIX_API_LOGOUT = PREFIX_API_AUTH + `/logout` as string;
export const PREFIX_API_REGISTER = PREFIX_API_AUTH + `/register` as string;
export const PREFIX_API_FORGOT_PASSWORD = PREFIX_API_AUTH + `/forgot-password` as string;
export const PREFIX_API_REFRESH = PREFIX_API_AUTH + `/refresh` as string;


// ADMIN API
export const PREFIX_API_ADMIN_FEATURE = `${API_URL}/admin/feature` as string;

// TEACHER API
export const PREFIX_API_TEACHER_FEATURE = `${API_URL}/teacher/feature` as string;

// STUDENT API
export const PREFIX_API_STUDENT_FEATURE = `${API_URL}/student/feature` as string;


