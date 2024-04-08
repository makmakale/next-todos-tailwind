import {format} from "date-fns";

const DateColumn = ({row, col}) => {
  const date = row[col.id]

  if (!date) return null

  return (
    <div>
      {format(new Date(date), "MM/dd/yyyy")}
    </div>
  )
}

export default DateColumn