import {
  ChevronsLeftIcon,
  ChevronsRightIcon,
  CircleX,
  EyeIcon,
  FilterIcon,
  RefreshCw,
} from 'lucide-react';
import React, { ChangeEventHandler } from 'react';
// import { buildURI } from 'react-csv';
// import { buildURI } from 'react-csv';
import Skeleton from 'react-loading-skeleton';
// import { colors } from '../../../assets/constants/colors';
import { ChevronLeftIcon } from '../../../assets/svg/ChevronRightIcon';
import EmptyRepository from '../../../assets/svg/EmptyTable.svg';
import { ExportIcon } from '../../../assets/svg/ExportIcon';
import { PlusIcon } from '../../../assets/svg/PlusIcon';
import { SearchLg } from '../../../assets/svg/SearchLg';
import {
  ChevronRightIcon,
  PenIcon,
  TrashIcon,
} from '../../../assets/svg/UserOnlineIcons';

interface iTable {
  rowHeight?: number;
  selectEnabled?: boolean;
  allDataSelected?: boolean;
  isCommissionTable?: boolean;
  onDataSelected?: () => void;
  isError?: boolean;
  loading?: boolean;
  columns?: { label: string; flex?: number; hideOnMobile?: boolean }[];
  data?: { onSelect?: () => void; content: React.ReactNode[] }[];
  style?: React.CSSProperties;
}

export const TableBadge = ({
  label,
  color,
  bg,
}: {
  label: string;
  color: string;
  bg: string;
}) => {
  return (
    <div
      style={{
        backgroundColor: bg,
        color: color,
      }}
      className='tableLayout--badge'
    >
      <span style={{ fontSize: '0.775rem' }}>{label}</span>
    </div>
  );
};

export const TableProfils: React.FC<{
  photo?: string;
  name?: string;
  email?: string;
  isCheckoutMember?: boolean;
}> = ({ photo, name, email, isCheckoutMember }) => {
  return (
    <div
      style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}
    >
      {/* {photo && photo?.fileUrl?.length > 0 && (
        <img
          src={photo?.fileUrl}
          alt='profile'
          style={{
            width: '1.7rem',
            height: '1.7rem',
            borderRadius: '50%',
          }}
        />
      )}
      {(!photo || photo?.fileUrl?.length === 0) && (
      <Avatar fullname={name} size={50} />
    )} */}
      {/* <Avatar fullname={String(name)} size={50} /> */}

      <div style={{ marginLeft: '0.4rem' }}>
        <div
          style={{ fontSize: '0.775rem', color: '#333843', fontWeight: '700' }}
        >
          {isCheckoutMember ? '' : name}
        </div>
        <div
          style={{
            fontSize: '0.600rem',
            color: '#8896AA',
            fontWeight: '400',
            marginTop: '0.2rem',
          }}
        >
          {email}
        </div>
      </div>
    </div>
  );
};

export const TableActions: React.FC<{
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onCheck?: () => void;
  checked?: boolean;
}> = ({ onView, onEdit, onDelete, onCheck, checked }) => {
  return (
    <>
      {onView && (
        <Button label='' variant='secondary' Icon={EyeIcon} onClick={onView} />
      )}
      {onEdit && (
        <Button label='' Icon={PenIcon} onClick={onEdit} variant='neutral' />
      )}
      {onDelete && (
        <Button
          label=''
          Icon={TrashIcon}
          onClick={onDelete}
          modeStyles={{
            color: colors.danger[500],
            backgroundColor: colors.danger[100],
            borderColor: colors.danger[100],
          }}
        />
      )}
      {onCheck && (
        <Switch handleChange={onCheck} checked={checked as boolean} />
      )}
    </>
  );
};

export const TableHeader = ({
  addBtn = { label: 'Ajouter', onClick: () => {} },
  filterBtn = { label: 'Filtre', onClick: () => {} },
  resetBtn = { label: 'Réinitialiser', onClick: () => {} },
  seeMoreBtn = { label: 'Voir plus', onClick: () => {} },
  exportBtn = { label: 'Export', onClick: () => {}, btnName: '' },
  handleRefresh,
  handleSearch,
  showDropdownBtn = {
    label: 'Exporter',
    active: false,
    data: [{ name: '', value: '' }],
  },
  showBtns = {
    refresh: false,
    export: false,
    filter: false,
    reset: false,
    add: false,
    mode: false,
    seeMore: false,
  },
  handleModeChange,
  checked = false,
  format,
  setFormat,
}: {
  addBtn?: { label: string; onClick: () => void };
  filterBtn?: { label: string; onClick: () => void };
  resetBtn?: { label: string; onClick: () => void };
  seeMoreBtn?: { label: string; onClick: () => void };
  exportBtn?: { label?: string; onClick: () => void; btnName?: string };
  searchTerm?: string;
  handleRefresh?: () => void;
  handleSearch?: (e: React.ChangeEventHandler<HTMLInputElement>) => void;
  showDropdownBtn?: {
    label?: string;
    active: boolean;
    data: { name: string; value: string }[];
  };
  showBtns?: {
    refresh?: boolean;
    export?: boolean;
    filter?: boolean;
    reset?: boolean;
    add?: boolean;
    mode?: boolean;
    seeMore?: boolean;
  };
  handleModeChange?: (value: boolean) => void;
  checked?: boolean;
  data?: any[] | null;
  columns?: any[] | null;
  format?: { name: string; value: string };
  setFormat?: (value: { name: string; value: string }) => void;
}) => {
  // const [format, setFormat] = React.useState<{ name: string; value: string }>(
  //   showDropdownBtn.data[0]
  // );

  return (
    <div className={'online-left-right-toolbar'}>
      <div className='online-left-right-toolbar-left'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconedInput
            type='search'
            icon={<SearchLg width={'1.2rem'} height={'1.2rem'} />}
            placeholder='Rechercher...'
            style={{
              width: '16rem',
              backgroundColor: '#fff',
              borderColor: '#f0f2f4',
            }}
            onChange={(e: ChangeEventHandler<HTMLInputElement>) =>
              handleSearch?.(e.target.value)
            }
            styleInput={{ backgroundColor: '#fff' }}
          />
          {showBtns.filter && (
            <Button
              label={filterBtn?.label}
              onClick={filterBtn?.onClick}
              Icon={FilterIcon}
              modeStyles={{
                color: colors.dark[500],
                backgroundColor: colors.dark[200],
                borderColor: colors.dark[200],
              }}
            />
          )}
          {showBtns.reset && (
            <Button
              label={resetBtn?.label}
              id='resetBtn'
              Icon={CircleX}
              onClick={resetBtn?.onClick}
              modeStyles={{
                color: colors.dark['500'],
                backgroundColor: 'white',
                borderColor: colors.light['400'],
                borderWidth: 0.5,
              }}
            />
          )}
        </div>
      </div>
      <div className='online-left-right-toolbar-right'>
        {showBtns.mode && (
          <div
            className='flex-row-center'
            style={{ gap: '0.5rem', marginRight: '1rem' }}
          >
            <p style={{ fontSize: '0.775rem', fontWeight: 700 }}>
              {checked ? 'production' : 'Sandbox'}
            </p>
            <Switch
              handleChange={(value) => handleModeChange?.(value)}
              checked={checked}
            />
          </div>
        )}
        {showBtns.refresh && (
          <Button
            Icon={RefreshCw}
            label='Rafraichir'
            onClick={handleRefresh}
            modeStyles={{
              color: colors.dark[500],
              backgroundColor: colors.dark[200],
              borderColor: colors.dark[200],
            }}
          />
        )}
        {showBtns.export && (
          <>
            {showDropdownBtn.active ? (
              <div className='tableLayout--dropdown'>
                <Dropdown
                  handleSelect={setFormat}
                  selected={{
                    name: format?.name as string,
                    value: format?.value as string,
                  }}
                  // label={showDropdownBtn.label}
                  Icon={ExportIcon}
                  options={showDropdownBtn.data}
                  label={showDropdownBtn.label}
                />
              </div>
            ) : (
              <Button
                Icon={ExportIcon}
                label={showDropdownBtn.label}
                modeStyles={{
                  color: colors.primary[500],
                  backgroundColor: colors.primary[100],
                  borderColor: colors.primary[100],
                }}
              />
            )}
          </>
        )}
        {showBtns.add && (
          <Button
            label={addBtn?.label}
            onClick={addBtn?.onClick}
            variant='warning'
            Icon={PlusIcon}
          />
        )}
        {showBtns.seeMore && (
          <Button
            label={seeMoreBtn?.label}
            onClick={seeMoreBtn?.onClick}
            variant='warning'
            Icon={EyeIcon}
          />
        )}
      </div>
    </div>
  );
};

const WIDTH = 100;
const HEIGHT = 10;
export const TableFooter = ({
  filtersData,
  handleNextPage,
  handlePrevPage,
  handlePaginateTo,
  isLoading,
}: {
  filtersData: {
    count: number;
    currentPage: number;
    totalPages: number;
    nextPage: number;
    prevPage: number;
  };
  isLoading?: boolean;
  handleNextPage?: () => void;
  handlePrevPage?: () => void;
  handlePaginateTo?: (page: number) => void;
}) => {
  return (
    <div className='tableLayout--footer'>
      {isLoading ? (
        <Skeleton width={WIDTH} height={HEIGHT} count={1} />
      ) : (
        <div>
          <span style={{ color: '#8896AA', fontSize: 12 }}>
            Affichage de {filtersData?.currentPage} - {filtersData?.totalPages}{' '}
            sur {filtersData?.count}
          </span>
        </div>
      )}
      {isLoading ? (
        <Skeleton width={WIDTH} height={HEIGHT} count={1} />
      ) : (
        // <>
        <div
          className='tableLayout--footer-pagination'
          style={{
            visibility: filtersData?.totalPages > 1 ? 'visible' : 'hidden',
          }}
        >
          <Button
            onClick={handlePrevPage}
            label={<ChevronLeftIcon />}
            Icon={ChevronLeftIcon}
            width={30}
            height={30}
            modeStyles={{
              color: colors.primary[500],
              backgroundColor: colors.primary[100],
              borderColor: colors.primary[100],
              borderWidth: 4,
            }}
          />
          {Array.from({ length: filtersData?.totalPages }, (_, i) => i + 1).map(
            (number, index) => (
              <Button
                label={String(number)}
                onClick={() => handlePaginateTo(number)}
                key={index}
                width={30}
                height={30}
                margin='0 .2rem'
                modeStyles={{
                  color:
                    filtersData?.currentPage === number
                      ? 'white'
                      : colors.primary[500],
                  backgroundColor:
                    filtersData?.currentPage === number
                      ? colors.primary[500]
                      : colors.primary[100],
                  borderColor:
                    filtersData?.currentPage === number
                      ? colors.primary[500]
                      : colors.primary[100],
                  borderWidth: 0,
                }}
              />
            )
          )}
          <Button
            onClick={handleNextPage}
            label={<ChevronRightIcon />}
            width={30}
            height={30}
            Icon={ChevronRightIcon}
            modeStyles={{
              color: colors.primary[500],
              backgroundColor: colors.primary[100],
              borderColor: colors.primary[100],
              borderWidth: 4,
            }}
          />
        </div>
        // </>
      )}
    </div>
  );
};

export const Table = ({
  selectEnabled = false,
  allDataSelected,
  onDataSelected,
  rowHeight = 60,
  columns,
  data,
  style,
  loading = true,
  isError = false,
}: iTable) => {
  return (
    <div className='tableLayout' style={style}>
      <div
        className='tableLayout--row tableLayout--header'
        style={{ backgroundColor: '#f0f2f4' }}
      >
        {selectEnabled && (
          <div
            className='tableLayout--cell'
            style={{ flex: 0.5, justifyContent: 'center' }}
          >
            <Checkbox
              label=''
              active={allDataSelected as boolean}
              onCheck={() => onDataSelected?.()}
            />
          </div>
        )}
        {columns?.map((column, index) => (
          <div
            className={`tableLayout--cell ${
              column.hideOnMobile ? 'hide-on-mobile' : ''
            }`}
            style={{
              flex: column?.flex || 1,
              paddingLeft: index === 0 ? '1rem' : '0',
            }}
            key={index}
          >
            {column?.label}
          </div>
        ))}
      </div>
      {!loading &&
        data?.map((item, dataIndex) => (
          <div
            key={dataIndex}
            className='tableLayout--row'
            style={{ borderTop: '1px solid #f0f1f3', height: rowHeight }}
          >
            {selectEnabled && (
              // <></>
              <div
                className='tableLayout--cell'
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                }}
              >
                {item?.content[0]}
                {/* <Checkbox label='' active={false} onCheck={() => {}} /> */}
              </div>
            )}
            {item?.content?.map((content, index) => {
              const flex = columns?.[index]?.flex;
              return (
                <>
                  {/* {selectEnabled ? (
                    <div
                      className='tableLayout--cell'
                      style={{
                        flex: flex || 1,
                        paddingLeft: index === 0 ? '1rem' : '0',
                        visibility: index !== 0 ? 'visible' : 'hidden',
                      }}
                    >
                      {content}
                    </div>
                  ) : ( */}
                  <div
                    className={`tableLayout--cell ${
                      columns?.[index]?.hideOnMobile ? 'hide-on-mobile' : ''
                    }`}
                    style={{
                      flex: flex || 1,
                      paddingLeft: index === 0 ? '1rem' : '0',
                    }}
                  >
                    {content}
                  </div>
                  {/* )} */}
                </>
              );
            })}
          </div>
        ))}
      {loading && (
        <div className='tableLayout--infosBox'>
          <p>Chargement des données...</p>
        </div>
      )}

      {!loading && (data?.length === 0 || !data) && (
        <div
          className='tableLayout--infosBox'
          style={{ marginRight: 1 + 'em' }}
        >
          {/* <EmptyTable /> */}
          <img
            src={EmptyRepository}
            alt='Logo de dossier vide'
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        </div>
        // <div className='tableLayout--infosBox'>Aucune donnée</div>
      )}
      {!loading && isError && (
        <div className='tableLayout--infosBox'>Une erreur s'est produite</div>
      )}
    </div>
  );
};

// import { Select } from '../../atoms/fields/Select';
import { colors } from '../../../assets/constant/colors copy';
import { Button } from '../../atomic/buttons/Button';
import { Checkbox } from '../../atomic/buttons/Checkbox';
import { Switch } from '../../atomic/buttons/Switch';
import { IconedInput } from '../../atomic/fields/IconedInput';
import { Select } from '../../atomic/fields/Select';
// import { Select } from '../fields/Select';

interface CustomBasicPaginatorProps {
  totalRecords: number;
  initialPage?: number;
  resetPage?: boolean;
  initialRowsPerPage?: number;
  rowsPerPageOptions?: number[];
  onPageChange: (page: number, rowsPerPage: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  className?: string;
  isLoading?: boolean;
}

const CustomBasicPaginator: React.FC<CustomBasicPaginatorProps> = ({
  totalRecords,
  initialPage = 1,
  initialRowsPerPage = 10,
  rowsPerPageOptions = [10, 20, 30],
  onPageChange,
  onRowsPerPageChange,
  className = '',
  resetPage = false,
  isLoading = false,
}) => {
  const [currentPage, setCurrentPage] = React.useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const [visiblePages, setVisiblePages] = React.useState([]);

  //Select rows per page options
  const rowsPerPageOptionsList = rowsPerPageOptions.map((item) => ({
    name: item.toString(),
    value: item.toString(),
  }));

  React.useEffect(() => {
    resetPage && setCurrentPage(1);
  }, [resetPage]);

  React.useEffect(() => {
    updateVisiblePages(currentPage);
  }, [currentPage, totalPages]);

  React.useEffect(() => {
    onPageChange(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  const updateVisiblePages = (page: number) => {
    let startPage = Math.max(page - 2, 1);
    const endPage = Math.min(startPage + 4, totalPages);

    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1);
    }

    setVisiblePages(
      Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (value: string) => {
    const newRowsPerPage = Number(value);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
    onRowsPerPageChange?.(newRowsPerPage);
  };

  const renderPageNumbers = () => {
    return visiblePages.map((page) => (
      <Button
        key={page}
        label={String(page)}
        onClick={() => handlePageChange(page)}
        margin='0 .2rem'
        modeStyles={{
          color: page === currentPage ? 'white' : colors.primary['500'],
          backgroundColor:
            page === currentPage
              ? colors.primary['500']
              : colors.primary['100'],
          borderColor:
            page === currentPage
              ? colors.primary['500']
              : colors.primary['100'],
          borderWidth: 0,
        }}
      />
    ));
  };

  return (
    <div
      className={`${className} flex-row-start-between w-full`}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {isLoading ? (
        <Skeleton width={200} height={30} count={1} />
      ) : (
        <div
          className='flex-row-center-between'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span style={{ color: '#8896AA', fontSize: 13 }}>
            Affichage de {(currentPage - 1) * rowsPerPage + 1} -{' '}
            {Math.min(currentPage * rowsPerPage, totalRecords)} sur{' '}
            {totalRecords} donnée(s)
          </span>
          {/* //TODO Select rows per page */}
          <Select
            hidden={true}
            styleSelect={{ width: '10%' }}
            label=''
            name='rowsPerPageSelect'
            placeholder='5'
            onChange={(e: any) => handleRowsPerPageChange(e.target.value)}
            defaultValue={rowsPerPage.toString()}
            options={rowsPerPageOptionsList}
            value={rowsPerPage.toString()}
            variant='quarter'
          />
        </div>
      )}
      <div
        className='tableLayout--footer-pagination'
        style={{
          visibility: totalRecords === 0 ? 'hidden' : 'visible',
        }}
      >
        {isLoading ? (
          <Skeleton width={50} height={30} count={1} />
        ) : (
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
            label=''
            Icon={ChevronsLeftIcon}
            sizeIcon={20}
            modeStyles={{
              color: currentPage === 1 ? 'white' : colors.primary['500'],
              backgroundColor:
                currentPage === 1
                  ? colors.primary['500']
                  : colors.primary['100'],
              borderColor:
                currentPage === 1
                  ? colors.primary['500']
                  : colors.primary['100'],
              borderWidth: 0,
            }}
            opacity={currentPage === 1 ? 0.4 : 1}
            hidden={totalRecords === 0}
          />
        )}
        {isLoading ? (
          <Skeleton width={50} height={30} count={1} />
        ) : (
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            label=''
            disabled={currentPage === 1}
            opacity={currentPage === 1 ? 0.4 : 1}
            Icon={ChevronLeftIcon}
            sizeIcon={20}
            modeStyles={{
              color: colors.primary['500'],
              backgroundColor: colors.primary['100'],
              borderColor: colors.primary['100'],
              borderWidth: 4,
            }}
            hidden={totalRecords === 0}
          />
        )}
        {isLoading ? (
          <Skeleton width={50} height={30} count={1} />
        ) : (
          <>
            {renderPageNumbers()}
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              label=''
              disabled={currentPage === totalPages}
              opacity={currentPage === totalPages ? 0.4 : 1}
              Icon={ChevronRightIcon}
              sizeIcon={20}
              modeStyles={{
                color: colors.primary['500'],
                backgroundColor: colors.primary['100'],
                borderColor: colors.primary['100'],
                borderWidth: 4,
              }}
              hidden={totalRecords === 0}
            />
          </>
        )}
        {isLoading ? (
          <Skeleton width={50} height={30} count={1} />
        ) : (
          <Button
            onClick={() => handlePageChange?.(totalPages as number)}
            label=''
            disabled={currentPage === totalPages}
            opacity={currentPage === totalPages ? 0.4 : 1}
            Icon={ChevronsRightIcon}
            sizeIcon={20}
            modeStyles={{
              color:
                currentPage === totalPages ? 'white' : colors.primary['500'],
              backgroundColor:
                currentPage === totalPages
                  ? colors.primary['500']
                  : colors.primary['100'],
              borderColor:
                currentPage === totalPages
                  ? colors.primary['500']
                  : colors.primary['100'],
              borderWidth: 0,
            }}
            hidden={totalRecords === 0}
          />
        )}
      </div>
    </div>
  );
};

export default CustomBasicPaginator;
