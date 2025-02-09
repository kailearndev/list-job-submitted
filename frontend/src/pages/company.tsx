import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CompanyView } from 'src/sections/company/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Company - ${CONFIG.appName}`}</title>
      </Helmet>

      <CompanyView />
    </>
  );
}
