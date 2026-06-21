import { envVariables } from '../config/environment';

export const CookieKey = {
  AccessToken: `${envVariables.APP_NAME}_accessToken`,
  RefreshToken: `${envVariables.APP_NAME}_refreshToken`,
};
