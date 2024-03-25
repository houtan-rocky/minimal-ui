import { Helmet } from 'react-helmet-async';

import { OrderListView } from 'src/__sections/order/view';

// ----------------------------------------------------------------------

export default function OrderListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Order List</title>
      </Helmet>

      <OrderListView />
    </>
  );
}
