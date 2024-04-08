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

export const initialValues = {
  isLoading: false,
  rows: [],
  total: 0,
  error: '',
  success: '',
  searchValue: '',
  page: DEFAULT_PAGE_INDEX,
  rowsPerPage: DEFAULT_PAGE_SIZE
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

    case SET_PAGE_SIZE:
      return {...state, rowsPerPage: payload}

    case SET_PAGE_INDEX:
      return {...state, page: payload}

    default:
      return state
  }
}

export default tableReducer