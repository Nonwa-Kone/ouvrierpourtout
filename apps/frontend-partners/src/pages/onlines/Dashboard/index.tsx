import { EyeIcon } from 'lucide-react';
import { StatIcon } from '../../../assets/svg/StatIcon';
import Button from '../../../components/atomic/Button';
import TableColumnFilter from '../../../components/layouts/Table/TableColumnFilter';
import { withOnlineLayout } from '../../../hoc/withOnlineLayout';

const columns = [
  {
    header: 'Nom',
    accessorKey: 'name',
  },
  {
    header: 'Valeur',
    accessorKey: 'value',
  },
  {
    header: 'Valeur',
    accessorKey: 'value',
  },
  {
    header: 'Valeur',
    accessorKey: 'value',
  },
  {
    header: 'Valeur',
    accessorKey: 'value',
  },
];

export const Dashboard = withOnlineLayout(() => {
  return (
    <div className='dashboardPage'>
      <div className='dashboardPage-block--insight'>
        <div className='dashboardPage-block--insight-title'>
          <p>Aperçu des rapports</p>
        </div>
        <div className='dashboardPage-block--insight-body'>
          <div className='dashboardPage-block--insight-body-item'>
            <StatIcon />
            <p className='dashboardPage-block--insight-body-item-text'>
              Demandes acceptées
            </p>
            <p className='dashboardPage-block--insight-body-item-value'>10</p>
          </div>
          <div className='dashboardPage-block--insight-body-item'>
            <StatIcon />
            <p className='dashboardPage-block--insight-body-item-text'>
              Demandes refusées
            </p>
            <p className='dashboardPage-block--insight-body-item-value'>10</p>
          </div>
        </div>
      </div>
      <div className='dashboardPage-block--recent-orders'>
        <div className='dashboardPage-block--recent-orders-title'>
          <p className='dashboardPage-block--recent-orders-title-text'>
            Derniers demandes
          </p>
          <Button Icon={<EyeIcon size={16} />} variant='primary' size='small' />
        </div>
        <div
          className='dashboardPage-block--recent-orders-body'
          style={{ width: '100%', height: '100%' }}
        >
          <TableColumnFilter columns={columns} data={[]} />
        </div>
      </div>
    </div>
  );
});
