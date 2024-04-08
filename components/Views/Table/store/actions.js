'use client'
import {
  CLEAR_MESSAGES,
  SET_DATA,
  SET_ERROR,
  SET_LOADING,
  SET_PAGE_INDEX,
  SET_PAGE_SIZE,
  SET_SEARCH_VALUE,
  SET_SUCCESS
} from "@/components/Views/Table/store/types";
import {DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE} from "@/lib/constants";

export const toggleLoading = (value) => ({type: SET_LOADING, payload: value})
export const setData = (data) => ({type: SET_DATA, payload: data})
export const setError = (error) => ({type: SET_ERROR, payload: error})
export const setSuccess = (success) => ({type: SET_SUCCESS, payload: success})
export const setSearchValue = (str) => ({type: SET_SEARCH_VALUE, payload: str})
export const clearMessages = () => ({type: CLEAR_MESSAGES})
export const setPageSize = (value) => ({type: SET_PAGE_SIZE, payload: value})
export const setPageIndex = (value) => ({type: SET_PAGE_INDEX, payload: value})

export const loadData = async (getData, state, dispatch) => {
  dispatch(toggleLoading(true))

  try {
    const {success, error} = await getData({
      offset: state.page || DEFAULT_PAGE_INDEX,
      limit: state.rowsPerPage || DEFAULT_PAGE_SIZE,
      title: state.searchValue || ''
    })

    if (success) dispatch(setData(success))
    if (error) dispatch(setError(error))

  } finally {
    dispatch(toggleLoading(false))
  }
}
