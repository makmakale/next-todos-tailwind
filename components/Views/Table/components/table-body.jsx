import {TableBody as TBody, TableCell, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useTableContext} from "@/components/Views/Table/store/table-context";

const TableBody = ({columns, loadData, onDelete, setDefault}) => {
  const [state] = useTableContext()

  return (
    <TBody>
      {state.rows.length > 0 ? (state.rows.map(row => {
          return (
            <TableRow key={row.id}>
              {columns.map(col => {
                if (col.renderValue) {
                  const Comp = col.renderValue
                  return (
                    <TableCell key={col.id} className={cn(col.align && `text-${col.align}`)}>
                      <Comp
                        row={row}
                        col={col}
                        reloadData={loadData}
                        onDelete={onDelete}
                        setDefault={setDefault}
                      />
                    </TableCell>
                  )
                }

                return (
                  <TableCell key={col.id} className={cn(col.align && `text-${col.align}`)}>
                    {col.link ? (
                      <Button variant="link" asChild>
                        <Link href={`${col.link}/${row.id}`}>
                          {row[col.id]}
                        </Link>
                      </Button>
                    ) : row[col.id]}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })
      ) : (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className={cn("h-24 text-center")}
          >
            No results.
          </TableCell>
        </TableRow>
      )}
    </TBody>
  );
};

export default TableBody;