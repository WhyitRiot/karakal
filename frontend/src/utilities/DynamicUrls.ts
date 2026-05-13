// 1. Dynamic WebSocket URL Configuration
const isSecure = window.location.protocol === 'https:';
const wsProtocol = isSecure ? 'wss://' : 'ws://';

export const URL = `${wsProtocol}${window.location.host}/karakal`;

// 2. Dynamic REST API Client Configuration
// Since Spring Boot serves the frontend, the API is on the exact same host
export const baseURL = window.location.origin;
