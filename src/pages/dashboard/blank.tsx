import { Helmet } from 'react-helmet-async';

import BlankView from 'src/__sections/blank/view';

// ----------------------------------------------------------------------

export default function BlankPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Blank</title>
      </Helmet>

      <BlankView />
    </>
  );
}
