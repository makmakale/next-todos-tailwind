'use client';
import {createContext, useContext, useEffect, useReducer} from 'react';
import detailsReducer, {initialValues} from '@/components/Views/Detail/store/reducer';
import {setDetails, setError, toggleLoading} from "@/components/Views/Detail/store/actions";
import PageTitle from "@/components/Views/Table/components/page-title";

const DetailsContext = createContext();

export const useDetailsContext = () => {
  const context = useContext(DetailsContext);

  if (!context) {
    throw new Error('Component must be rendered as child component of DetailsContext');
  }

  return context;
};

export const DetailsProvider = ({pageTitle, getData, submitAction, children}) => {
  const [state, dispatch] = useReducer(detailsReducer, {...initialValues, submitAction});

  useEffect(() => {
    if (getData) {
      dispatch(toggleLoading(true))
      getData().then(({data, error}) => {
        if (data) {
          dispatch(setDetails(data))
        }
        if (error) {
          dispatch(setError(error))
        }
      }).finally(() => dispatch(toggleLoading(false)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DetailsContext.Provider value={[state, dispatch]}>
      <div className={'w-full h-full p-10'}>
        <PageTitle title={pageTitle}/>
        {children}
      </div>
    </DetailsContext.Provider>
  );
};