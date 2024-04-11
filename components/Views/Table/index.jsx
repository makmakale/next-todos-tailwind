'use client';
import { Table } from '@/components/ui/table';
import { useEffect } from 'react';
import useDebounce from '@/lib/hooks/useDebounce';
import PageTitle from '@/components/Views/Table/components/page-title';
import Search from '@/components/Views/Table/components/search';
import TableHeader from '@/components/Views/Table/components/table-header';
import { TableProvider, useTableContext } from '@/components/Views/Table/store/table-context';
import { clearMessages, loadData, setSearchValue } from '@/components/Views/Table/store/actions';
import FormMessage from '@/components/ui/form-message';
import TablePagination from '@/components/Views/Table/components/table-pagination';
import dynamic from 'next/dynamic';
import TableBodyLoader from '@/components/Views/Table/components/table-body-loader';

const DynamicTableBody = dynamic(() =>
    import('@/components/Views/Table/components/table-body'),
  {
    loading: TableBodyLoader,
  },
);

const Component = ({
  title,
  searchLabel,
  columns,
  getData,
  setDefault,
  onDelete,
}) => {
  const [state, dispatch] = useTableContext();

  const fetchTableData = () => loadData(getData, state, dispatch);

  const debouncedSearchValue = useDebounce(state.searchValue, 500);
  const handleSearchChange = ({target}) => dispatch(setSearchValue(target.value));

  useEffect(() => {
    if (!getData) return;

    fetchTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData, state.page, state.rowsPerPage, debouncedSearchValue]);

  return (
    <div className={'w-full h-full p-10'}>
      <PageTitle title={title}/>

      <FormMessage
        variant={state.success ? 'success' : 'error'}
        message={state.success || state.error}
        onClose={() => dispatch(clearMessages())}
      />

      <Search
        placeholder={searchLabel}
        value={state.searchValue}
        onChange={handleSearchChange}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader columns={columns}/>
          <DynamicTableBody
            columns={columns}
            loadData={fetchTableData}
            onDelete={onDelete}
            setDefault={setDefault}
          />
        </Table>
      </div>

      <TablePagination/>
    </div>
  );
};

const TableWrapper = (props) => {
  return (
    <TableProvider>
      <Component {...props}/>
    </TableProvider>
  );
};

export default TableWrapper;