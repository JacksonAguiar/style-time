import { Page } from "@/components/FormScreen";
import { ScheduleI } from "../[sc]/steps.component";
export default function step4({
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
      Title="Me fala seu número de telefone"
      onClickBack={previousFunction}
      onSubmit={nextFunction}
      submitTextButton="Continuar"
      withoutIcon
      key="phone-form"
    >
      <input
        className="w-full text-xl outline-transparent font-normal"
        placeholder="Ex: (84) 99216-3105"
        name="phone"
        onChange={(el) => onChange("phoneNumber", el.target.value)}
      />
    </Page>
  );
}
