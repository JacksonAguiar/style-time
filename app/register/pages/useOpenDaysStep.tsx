"use client"

import { daysForLocale } from "@/utils/time";
import { Page } from "@/components/FormScreen";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { CustomComponentProps } from "../page";
import { useState } from "react";

export default function useStepOpenDays(props: CustomComponentProps) {
  const [selected, setSeleceted] = useState<string[]>(props.value);

  const onSubmit = () => {
    console.log(selected);
    props.nextFunction()
  };
  return (
    <Page
      Title="Dias de funcionamento"
      onClickBack={props.previousFunction}
      onSubmit={onSubmit}
    >
      <div>
        <CheckboxGroup
          label="Selecione os dias que o lugar abre"
          onChange={(e) => setSeleceted(e as string[])}
        >
          {daysForLocale("pt-BR").map((day, i) => {
            return (
              <Checkbox size="lg" key={i} value={day} className="capitalize">
                {day}
              </Checkbox>
            );
          })}
        </CheckboxGroup>
      </div>
    </Page>
  );
}
