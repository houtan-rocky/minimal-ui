import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks/index.hook';

import { TourEditView } from 'src/__sections/tour/view';

// ----------------------------------------------------------------------

export default function TourEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Tour Edit</title>
      </Helmet>

      <TourEditView id={`${id}`} />
    </>
  );
}
