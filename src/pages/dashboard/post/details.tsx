import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks/index.hook';

import { PostDetailsView } from 'src/__sections/blog/view';

// ----------------------------------------------------------------------

export default function PostDetailsPage() {
  const params = useParams();

  const { title } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Post Details</title>
      </Helmet>

      <PostDetailsView title={`${title}`} />
    </>
  );
}
