import FormField from "@/components/Formik/FormField";
import {getProjectSelectOptions} from "@/lib/actions/projects";
import {getStatusSelectOptions} from "@/lib/actions/statuses";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {getUserSelectOptions} from "@/lib/actions/users";
import {getTypeSelectOptions} from "@/lib/actions/types";
import {getPrioritySelectOptions} from "@/lib/actions/priorities";
import dynamic from "next/dynamic";

const dynamicEditorField = dynamic(() => import('@/components/Formik/fields/EditorField'))
const dynamicSelectField = dynamic(() => import('@/components/Formik/fields/SelectField'))
const dynamicUserWithAvatarField = dynamic(() => import('@/components/Formik/fields/UserWithAvatarField'))

export default function Fields({user}) {
  return (
    <div className="flex lg:space-x-4 flex-wrap lg:flex-nowrap">
      <div className="w-full flex flex-col">
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <FormField
            name="title"
            label="Title"
            className="w-full"
            required
          />
          <FormField
            name="projectId"
            label="Project"
            getOptions={getProjectSelectOptions}
            required
            className={"lg:max-w-[180px]"}
            component={dynamicSelectField}/>
        </div>

        <FormField
          name="description"
          label="Description"
          className="w-full flex-grow"
          component={dynamicEditorField}
        />
      </div>

      <div className="w-full lg:max-w-[350px]">
        <FormField
          name="statusId"
          label="Status"
          getOptions={getStatusSelectOptions}
          required
          component={dynamicSelectField}/>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>

          <CardContent>
            <FormField
              name="userId"
              label="Assignee"
              getOptions={getUserSelectOptions}
              component={dynamicSelectField}/>

            <FormField
              name="typeId"
              label="Type"
              getOptions={getTypeSelectOptions}
              required
              component={dynamicSelectField}/>

            <FormField
              name="priorityId"
              label="Priority"
              getOptions={getPrioritySelectOptions}
              component={dynamicSelectField}/>

            <FormField
              name="createdBy"
              user={user}
              component={dynamicUserWithAvatarField}/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}