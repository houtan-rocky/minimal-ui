import { Helmet } from 'react-helmet-async';

import { OverviewFileView } from 'src/__sections/overview/file/view';

// ----------------------------------------------------------------------

export default function OverviewFilePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: File</title>
      </Helmet>

      <OverviewFileView />
    </>
  );
}
