'use client'
import DetailsView from "@/components/Views/Detail";
import {useDetailsContext} from "@/components/Views/Detail/store/details-context";
import Fields from "@/components/pages/statuses/Fields";
import DetailsWrapper from "@/components/Views/Detail/components/DetailsWrapper";

function Component({config}) {
  const [{data}] = useDetailsContext()

  const initialValues = {
    title: data?.title || '',
    description: data?.description || '',
    addTask: data?.addTask || false,
    isDefault: data?.isDefault || false,
  }

  return (
    <DetailsView
      config={config}
      formTitle={data?.title}
      initialValues={initialValues}
    >
      <Fields/>
    </DetailsView>
  );
}

export default DetailsWrapper(Component)