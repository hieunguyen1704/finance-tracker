export const config = {
  apiUrl: import.meta.env.VITE_API_URL as string,
};

// Validate required environment variables
const requiredEnvVars = ['VITE_API_URL'];
for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}