'use client'
import {createContext, useContext, useReducer} from 'react'
import tableReducer, {initialValues} from "@/components/Views/Table/store/reducer";

const TableContext = createContext()

export const useTableContext = () => {
  const context = useContext(TableContext)

  if (!context) {
    throw new Error("Component must be rendered as child component of TableContext")
  }

  return context
}

export const TableProvider = ({children}) => {
  const [state, dispatch] = useReducer(tableReducer, initialValues)

  return (
    <TableContext.Provider value={[state, dispatch]}>
      {children}
    </TableContext.Provider>
  )
}