const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export default {
  meEndpoint: `${baseUrl}/users/current`,
  loginEndpoint: `${baseUrl}/users/login`,
  registerEndpoint: `${baseUrl}/users/register`,
  storageTokenKeyName: 'accessToken',
  storageUserKeyName: 'userData',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
