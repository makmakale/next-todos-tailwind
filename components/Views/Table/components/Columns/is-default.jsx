import {Star} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {setSuccess} from "@/components/Views/Table/store/actions";
import {useTableContext} from "@/components/Views/Table/store/table-context";

export const IsDefault = ({row, col, reloadData, setDefault}) => {
  const {toast} = useToast()
  const [, dispatch] = useTableContext()

  const handleClick = async () => {
    const {success, error} = await setDefault(row.id)
    if (success && reloadData) {
      dispatch(setSuccess(success))
      reloadData()
    }
    if (error) {
      toast({
        variant: "destructive",
        title: error,
      })
    }
  }

  return (
    <div className="capitalize flex justify-center">
      <Button variant="ghost" onClick={handleClick}>
        {row[col.id] ? <Star className="fill-black dark:fill-white"/> : <Star/>}
      </Button>
    </div>
  )
}