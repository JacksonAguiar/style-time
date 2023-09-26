import { Page } from "@/components/FormScreen";
import { Checkbox, CheckboxGroup, Radio, RadioGroup } from "@nextui-org/react";
import { ScheduleI } from "../[sc]/steps.component";
export default function step2({
  previousFunction,
  nextFunction,
  onChange,
  values,
  options,
}: {
  previousFunction: any;
  nextFunction: any;
  onChange: any;
  options: any[];
  values: ScheduleI;
}) {
  return (
    <Page
      Title="O que pretende fazer?"
      onClickBack={previousFunction}
      onSubmit={nextFunction}
    >
      <CheckboxGroup
        label="Selecione os serviços"
        onChange={(el) => onChange("services", el as string[])}
        value={values.services}
      >
        {options.map((e, i) => {
          return (
            <Checkbox key={i} value={`${e.name}-${e.duration}`}>
              {e.name}  
            </Checkbox>
          );
        })}
      </CheckboxGroup>
    </Page>
  );
}
