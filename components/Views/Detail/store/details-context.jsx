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
    const fetchDetails = async () => {
      dispatch(toggleLoading(true))

      try {
        const {data, error} = await getData()
        if (data) {
          dispatch(setDetails(data))
        }
        if (error) {
          dispatch(setError(error))
        }
      } catch (err) {
        console.error(err.message)
      } finally {
        dispatch(toggleLoading(false))
      }
    }
    if (getData) {
      fetchDetails()
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