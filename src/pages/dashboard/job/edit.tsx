import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks/index.hook';

import { JobEditView } from 'src/__sections/job/view';

// ----------------------------------------------------------------------

export default function JobEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Dashboard: Job Edit</title>
      </Helmet>

      <JobEditView id={`${id}`} />
    </>
  );
}
