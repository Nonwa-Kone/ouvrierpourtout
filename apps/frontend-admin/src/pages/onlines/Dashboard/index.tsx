import { useQuery } from '@tanstack/react-query';
import { getInsight } from '../../../api/insight.api';
import { StatIcon } from '../../../assets/svg/StatIcon';
import SimpleLineChart from '../../../components/atomic/Recharts/SimpleLineChart';
import { withOnlineLayout } from '../../../hoc/withOnlineLayout';

export const Dashboard = withOnlineLayout(() => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['insight'],
    queryFn: async () => await getInsight(),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return `Error: ${error}`;

  return (
    <div className='dashboardPage'>
      <div className='dashboardPage-block--insight'>
        <div className='dashboardPage-block--insight-title'>
          <h3>Aperçu des rapports</h3>
        </div>
        <div className='dashboardPage-block--insight-body'>
          <div className='dashboardPage-block--insight-body-item'>
            <StatIcon />
            <p>Total Clients</p>
            <p>{data?.data.customers}</p>
          </div>
          <div className='dashboardPage-block--insight-body-item'>
            <StatIcon />
            <p>Total Ouvriers</p>
            <p>{data?.data.ouvriers}</p>
          </div>
          <div className='dashboardPage-block--insight-body-item'>
            <StatIcon />
            <p>Total Commandes</p>
            <p>{data?.data.orders}</p>
          </div>
        </div>
      </div>
      <div
        className='dashboardPage-block-statistics'
        style={{ width: '100%', height: '100%' }}
      >
        <div className='dashboardPage-block--statistics-item'>
          <SimpleLineChart />
        </div>
        <div className='w-half'></div>
      </div>
      {/* <div className='dashboardPage-block--recent-orders'>
        <div className='dashboardPage-block--recent-orders-title'>
          <div className='dashboardPage-block--recent-orders-title-text'>
            <h3>Derniers Commandes</h3>
          </div>
          <div className='dashboardPage-block--recent-orders-title-button'>
            <Button label='Voir toutes les commandes' />
          </div>
        </div> */}
      {/* <div className='dashboardPage-block--recent-orders-body'>
          <TableColumnFilter
            data={[]}
            columns={columns}
            pageSizeOptions={[10, 20, 30]}
            initialPageSize={10}
            isLoading={false}
          />
        </div> */}
      {/* </div> */}
      {/* <TableColumnFilter /> */}
    </div>
  );
});
