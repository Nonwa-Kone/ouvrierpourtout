import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getDocumentByOwnerId } from '../../../api/document.api.ts';
import { useOuvrierDataById } from '../../../assets/hook/ouvrier.client.ts';
import { StatIcon } from '../../../assets/svg/StatIcon';
import {
  ContractBlockInfo,
  DocumentBlockInfo,
  PartnerBlockInfo,
  ProfessionBlockInfo,
} from '../../../components/layouts/users/BlockInfo';
import { withOnlineLayout } from '../../../hoc/withOnlineLayout';
import {
  tContract,
  tDocument,
  tPartner,
  tProfession,
} from '../../../types/partners.type';

export const DetailOuvriers = withOnlineLayout(() => {
  const id = useParams<{ id?: string }>().id;

  const { data } = useOuvrierDataById(id as string);

  const { data: documentData } = useQuery({
    queryKey: ['document-partner', id],
    queryFn: async () => {
      const response = await getDocumentByOwnerId(id as string);
      if (response.success) {
        return response.data;
      }
    },
    enabled: !!id,
  });
  console.log(documentData);

  // const {
  //   data: ticketData,
  //   isLoading: isLoadingTicket,
  //   isError: isErrorTicket,
  //   error: errorTicket,
  // } = useQuery({
  //   queryKey: ['tickets'],
  //   queryFn: async () => {
  //     const response = await getTicketById(id as string);
  //     return response;
  //   },
  //   enabled: !!id,
  // });

  return (
    <div className='partnersPage'>
      <div className='partnersPage-block--detail-partners'>
        <div className='partnersPage-block--detail-partners-info'>
          <PartnerBlockInfo partner={data as tPartner} />
          <ProfessionBlockInfo profession={data?.profession as tProfession} />
          <ContractBlockInfo contract={data?.contract as tContract} />
        </div>
        <div className='partnersPage-block--detail-partners-more-info'>
          <div className='partnersPage-block--detail-partners-more-info-insight'>
            <div className='partnersPage-block--detail-partners-more-info-insight-title'>
              <p>Insight</p>
            </div>
            <div className='partnersPage-block--detail-partners-more-info-insight-body'>
              <div className='partnersPage-block--detail-partners-more-info-insight-body-item'>
                {<StatIcon />}
                <div>
                  <p>Nombre de commandes</p>
                  <p>0</p>
                </div>
              </div>
              <div className='partnersPage-block--detail-partners-more-info-insight-body-item'>
                {<StatIcon />}
                <div>
                  <p>Nombre de commandes</p>
                  <p>0</p>
                </div>
              </div>
            </div>
          </div>
          <DocumentBlockInfo documents={documentData as tDocument[]} />
          <div className='partnersPage-block--detail-partners-more-info-demande'>
            <div className='partnersPage-block--detail-partners-more-info-demande-title'>
              <p>Liste des demande effectuées</p>
            </div>
            <div>
              {/* <TableColumnFilter
                columns={columns}
                data={ticketData?.data || []}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
