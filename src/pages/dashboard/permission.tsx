import { Helmet } from 'react-helmet-async';

import PermissionDeniedView from 'src/__sections/permission/view';

// ----------------------------------------------------------------------

export default function PermissionDeniedPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Permission Denied</title>
      </Helmet>

      <PermissionDeniedView />
    </>
  );
}
