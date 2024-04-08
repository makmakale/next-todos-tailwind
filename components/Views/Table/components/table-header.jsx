import {TableHead, TableHeader as THead, TableRow} from "@/components/ui/table";

const TableHeader = ({columns}) => {
  return (
    <THead>
      <TableRow>
        {columns.map(col => (
          <TableHead key={col.id} className={col.className}>
            {col.title}
          </TableHead>
        ))}
      </TableRow>
    </THead>
  );
};

export default TableHeader;