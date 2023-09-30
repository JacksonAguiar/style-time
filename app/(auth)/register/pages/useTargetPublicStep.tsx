"use client"

import { CustomComponentProps } from "../page";
import { Page } from "@/components/FormScreen";
import { Radio, RadioGroup } from "@nextui-org/react";
import { useForm } from "react-hook-form";

export default function useStepTargetPublic(props: CustomComponentProps) {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => {

    props.nextFunction();
  };
  return (
    <Page
      Title="Atende qual público?"
      onClickBack={props.previousFunction}
      onSubmit={onSubmit}
    >
      <RadioGroup {...register("public")}>
        <Radio value="men" description="Publico masculino">
          Homens
        </Radio>
        <Radio value="women" description="Publico Feminino">
          Mulheres
        </Radio>
        <Radio value="both" description="Publico masculino e feminino">
          Ambos
        </Radio>
      </RadioGroup>
    </Page>
  );
}
