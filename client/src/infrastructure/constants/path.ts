const VITE_BASE_URL_SERVER = process.env.NEXT_PUBLIC_BASE_URL_SERVER || {};

const VITE_BASE_URL_CLIENT = process.env.NEXT_PUBLIC_BASE_URL_CLIENT || {};

export const DOMAIN_BACKEND = `${VITE_BASE_URL_SERVER}` as string;

export const DOMAIN_FRONTEND = `${VITE_BASE_URL_CLIENT}` as string;

export const URL_OAUTH2_GOOGLE = `${DOMAIN_BACKEND}/oauth2/authorize/google?redirect_uri=` as string;
export const URL_OAUTH2_GITHUB = `${DOMAIN_BACKEND}/oauth2/authorize/github?redirect_uri=` as string;
export const URL_OAUTH2_FACEBOOK = `${DOMAIN_BACKEND}/oauth2/authorize/facebook?redirect_uri=` as string;

export const URL_AUTH = `${DOMAIN_FRONTEND}/authentication` as string;
export const URL_ACTOR = `${DOMAIN_FRONTEND}/actor` as string;
export const URL_LEARNER = `${URL_ACTOR}/learner` as string;
export const URL_TEACHER = `${URL_ACTOR}/teacher` as string;

// authentication
export const URL_AUTH_REDIRECT = `${URL_AUTH}/redirect` as string;
export const URL_AUTH_LOGIN = `${URL_AUTH}/login` as string;
export const URL_AUTH_REGISTER = `${URL_AUTH}/register` as string;

// learner
export const URL_LEARNER_CLASS = `${URL_LEARNER}/class` as string;
export const URL_LEARNER_CONFIG = `${URL_LEARNER}/config` as string;

// teacher
export const URL_TEACHER_CLASS = `${URL_TEACHER}/class` as string;
export const URL_TEACHER_CONFIG = `${URL_TEACHER}/config` as string;

// room
export const URL_ROOM = `${DOMAIN_FRONTEND}/room` as string;