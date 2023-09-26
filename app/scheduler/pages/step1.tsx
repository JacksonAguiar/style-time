import { Page } from "@/components/FormScreen";
import { ScheduleI } from "../[sc]/steps.component";
export default function step1({
  previousFunction,
  nextFunction,
  onChange,
  values,
}: {
  previousFunction: any;
  nextFunction: any;
  onChange: any;
  values: ScheduleI;
}) {
  return (
    <Page
      Title="Como você se chama?"
      onClickBack={previousFunction}
      onSubmit={nextFunction}
      removeHeader
      key="name-form"
    >
      <input
        onChange={(el) => onChange("name", el.target.value)}
        className="w-full text-xl outline-transparent font-normal"
        placeholder="Ex: Janaina Garcia"
        name="name"
        value={values.name ? values.name : ""}
      />
    </Page>
  );
}
