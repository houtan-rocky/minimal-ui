import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';

import { fCurrency } from 'src/utils/format-number.util';

import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';

// ----------------------------------------------------------------------

type RowProps = {
  id: string;
  price: number;
  status: string;
  category: string;
  invoiceNumber: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  tableLabels: any;
}

export default function HomeNewInvoice({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <AppNewInvoiceRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}

// ----------------------------------------------------------------------

type AppNewInvoiceRowProps = {
  row: RowProps;
};

function AppNewInvoiceRow({ row }: AppNewInvoiceRowProps) {
  // const handleDownload = () => {
  //   popover.onClose()
  //   console.info('DOWNLOAD', row.id)
  // }

  // const handlePrint = () => {
  //   popover.onClose()
  //   console.info('PRINT', row.id)
  // }

  // const handleShare = () => {
  //   popover.onClose()
  //   console.info('SHARE', row.id)
  // }

  // const handleDelete = () => {
  //   popover.onClose()
  //   console.info('DELETE', row.id)
  // }

  return (
    <TableRow>
      <TableCell>{row.invoiceNumber}</TableCell>

      <TableCell>{row.category}</TableCell>

      <TableCell>{fCurrency(row.price)}</TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (row.status === 'progress' && 'warning') ||
            (row.status === 'out of date' && 'error') ||
            'success'
          }
        >
          {row.status}
        </Label>
      </TableCell>
    </TableRow>
  );
}
