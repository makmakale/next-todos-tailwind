import {
  CLEAR_MESSAGES,
  SET_DATA,
  SET_ERROR,
  SET_LOADING,
  SET_SEARCH_VALUE,
  SET_SUCCESS
} from "@/components/Views/Table/store/types";

export const initialValues = {
  isLoading: false,
  rows: [],
  total: 0,
  error: '',
  success: '',
  searchValue: '',
  page: 0,
  rowsPerPage: 10
}

function tableReducer(state, action) {
  const {type, payload} = action

  switch (type) {
    case SET_LOADING:
      return {...state, isLoading: payload}

    case SET_DATA:
      return {...state, rows: payload.rows, total: payload.count}

    case SET_ERROR:
      return {...state, error: payload, success: ''}

    case SET_SUCCESS:
      return {...state, success: payload, error: ''}

    case SET_SEARCH_VALUE:
      return {...state, searchValue: payload}

    case CLEAR_MESSAGES:
      return {...state, success: '', error: ''}

    default:
      return state
  }
}

export default tableReducer