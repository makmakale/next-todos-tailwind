import FormField from "@/components/Formik/FormField";
import {getProjectSelectOptions} from "@/lib/actions/projects";
import SelectField from "@/components/Formik/SelectField";
import EditorField from "@/components/Formik/editor-field";
import {getStatusSelectOptions} from "@/lib/actions/statuses";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {getUserSelectOptions} from "@/lib/actions/users";
import {getTypeSelectOptions} from "@/lib/actions/types";
import {getPrioritySelectOptions} from "@/lib/actions/priorities";
import UserWithAvatarField from "@/components/Formik/UserWithAvatarField";

export default function Fields({user}) {
  return (
    <div className="flex space-x-4">
      <div className="w-full flex flex-col">
        <div className="flex space-x-2">
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
            className={"max-w-[180px]"}
            component={SelectField}/>
        </div>

        <FormField
          name="description"
          label="Description"
          className="w-full flex-grow"
          component={EditorField}
        />
      </div>

      <div className="w-full max-w-[350px]">
        <FormField
          name="statusId"
          label="Status"
          getOptions={getStatusSelectOptions}
          required
          component={SelectField}/>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>

          <CardContent>
            <FormField
              name="userId"
              label="Assignee"
              getOptions={getUserSelectOptions}
              component={SelectField}/>

            <FormField
              name="typeId"
              label="Type"
              getOptions={getTypeSelectOptions}
              required
              component={SelectField}/>

            <FormField
              name="priorityId"
              label="Priority"
              getOptions={getPrioritySelectOptions}
              component={SelectField}/>

            <FormField
              name="createdBy"
              user={user}
              component={UserWithAvatarField}/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}