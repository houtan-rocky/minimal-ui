import { Helmet } from 'react-helmet-async';

import MemberHomeView from 'src/sections/member/home/view/home.view';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Home</title>
      </Helmet>

      <MemberHomeView />
    </>
  );
}
