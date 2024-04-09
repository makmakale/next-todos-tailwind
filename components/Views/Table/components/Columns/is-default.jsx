import {Star} from "lucide-react";
import {Button} from "@/components/ui/button";
import {setError, setSuccess} from "@/components/Views/Table/store/actions";
import {useTableContext} from "@/components/Views/Table/store/table-context";
import {get} from "@/lib/utils/data";

export const IsDefault = ({row, col, reloadData, setDefault}) => {
  const [, dispatch] = useTableContext()

  const handleClick = async () => {
    const {success, error} = await setDefault(row.id)
    if (success && reloadData) {
      dispatch(setSuccess(success))
      reloadData()
    }
    if (error) {
      dispatch(setError(error))
    }
  }

  return (
    <div className="capitalize flex justify-center">
      <Button variant="ghost" onClick={handleClick}>
        {get(row, col.id) ? <Star className="fill-black dark:fill-white"/> : <Star/>}
      </Button>
    </div>
  )
}