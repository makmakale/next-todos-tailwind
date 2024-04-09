import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {setError, setSuccess} from "@/components/Views/Table/store/actions";
import {useTableContext} from "@/components/Views/Table/store/table-context";
import {useState} from "react";
import {get} from "@/lib/utils/data";

const DisableAction = ({row, col, reloadData, onDelete}) => {
  const value = get(row, col.id)
  const [open, setOpen] = useState(false)
  const [, dispatch] = useTableContext()

  const handleConfirm = async () => {
    const {success, error} = await onDelete(row.id)

    if (success && reloadData) {
      dispatch(setSuccess(success))
      reloadData()
    }
    if (error) {
      dispatch(setError(error))
    }
    setOpen(false)
  }

  return (
    <>
      <label className="inline-flex items-center me-5 cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={value}
          onChange={value ? () => setOpen(true) : handleConfirm}
        />
        {!value ? (
          <div
            className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"/>
        ) : (
          <div
            className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"/>
        )}
      </label>

      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will deactivate this user.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="sm:justify-start">
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>

  );
};

export default DisableAction;