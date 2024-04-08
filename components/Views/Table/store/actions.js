'use client'
import {
  CLEAR_MESSAGES,
  SET_DATA,
  SET_ERROR,
  SET_LOADING,
  SET_SEARCH_VALUE,
  SET_SUCCESS
} from "@/components/Views/Table/store/types";

export const toggleLoading = (value) => ({type: SET_LOADING, payload: value})
export const setData = (data) => ({type: SET_DATA, payload: data})
export const setError = (error) => ({type: SET_ERROR, payload: error})
export const setSuccess = (success) => ({type: SET_SUCCESS, payload: success})
export const setSearchValue = (str) => ({type: SET_SEARCH_VALUE, payload: str})
export const clearMessages = () => ({type: CLEAR_MESSAGES})

export const loadData = async (getData, state, dispatch) => {
  dispatch(toggleLoading(true))

  try {
    const {success, error} = await getData({
      offset: state.page,
      limit: state.rowsPerPage,
      title: state.searchValue
    })

    if (success) dispatch(setData(success))
    if (error) dispatch(setError(error))

  } finally {
    dispatch(toggleLoading(false))
  }
}
