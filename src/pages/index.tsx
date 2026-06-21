import * as React from 'react';
import { useRouter } from 'next/router';
import { tokenManager } from 'src/utils/tokens/tokensManager';
import { APP_ROUTES } from 'src/utils/constants';

export default function IndexPage() {
  const router = useRouter();
  const isAuthenticated = tokenManager.isAuthenticated();

  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace(APP_ROUTES.HOME).then();
    } else {
      router.replace(APP_ROUTES.INTRODUCTION).then();
    }
  }, [isAuthenticated]);

  return null;
}
