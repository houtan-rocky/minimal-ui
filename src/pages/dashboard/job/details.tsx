import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks/index.hook';

import { JobDetailsView } from 'src/__sections/job/view';

// ----------------------------------------------------------------------

export default function JobDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Job Details</title>
      </Helmet>

      <JobDetailsView id={`${id}`} />
    </>
  );
}
