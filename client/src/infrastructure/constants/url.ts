const VITE_BASE_URL_SERVER = process.env.NEXT_PUBLIC_BASE_URL_SERVER || {};

const VITE_BASE_URL_CLIENT = process.env.NEXT_PUBLIC_BASE_URL_CLIENT || {};

// API URL
export const API_URL = `${VITE_BASE_URL_SERVER}/api/v1` as string;

// DOMAIN
export const DOMAIN_BACKEND = `${VITE_BASE_URL_SERVER}` as string;

export const DOMAIN_FRONTEND = `${VITE_BASE_URL_CLIENT}` as string;

export const URL_OAUTH2_GOOGLE = `${DOMAIN_BACKEND}/oauth2/authorize/google?redirect_uri=` as string;
export const URL_OAUTH2_GITHUB = `${DOMAIN_BACKEND}/oauth2/authorize/github?redirect_uri=` as string;
export const URL_OAUTH2_FACEBOOK = `${DOMAIN_BACKEND}/oauth2/authorize/facebook?redirect_uri=` as string;

export const URL_FRONTEND = `${DOMAIN_FRONTEND}/authentication/redirect`;

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


