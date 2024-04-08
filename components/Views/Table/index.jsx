'use client'
import {Table} from "@/components/ui/table";
import * as React from "react";
import {useEffect} from "react";
import useDebounce from "@/lib/hooks/useDebounce";
import PageTitle from "@/components/Views/Table/components/page-title";
import Search from "@/components/Views/Table/components/search";
import {Skeleton} from "@/components/ui/skeleton";
import TableHeader from "@/components/Views/Table/components/table-header";
import {TableProvider, useTableContext} from "@/components/Views/Table/store/table-context";
import {clearMessages, loadData, setSearchValue} from "@/components/Views/Table/store/actions";
import FormMessage from "@/components/ui/form-message";
import TableBody from "@/components/Views/Table/components/table-body";
import TablePagination from "@/components/Views/Table/components/table-pagination";

const Component = ({
  title,
  searchLabel = "Search...",
  columns,
  getData,
  setDefault,
  onDelete
}) => {
  const [state, dispatch] = useTableContext()

  const fetchTableData = () => loadData(getData, state, dispatch)

  const debouncedSearchValue = useDebounce(state.searchValue, 500)
  const handleSearchChange = ({target}) => dispatch(setSearchValue(target.value))

  useEffect(() => {
    if (!getData) return

    fetchTableData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData, state.page, state.rowsPerPage, debouncedSearchValue])

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

      {state.isLoading ? (
        <Skeleton className="h-[300px] rounded-xl"/>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader columns={columns}/>
              <TableBody
                columns={columns}
                loadData={fetchTableData}
                onDelete={onDelete}
                setDefault={setDefault}
              />
            </Table>
          </div>
          <TablePagination/>
        </>
      )}
    </div>
  );
};

const TableWrapper = (props) => {
  return (
    <TableProvider>
      <Component {...props}/>
    </TableProvider>
  )
}

export default TableWrapper;