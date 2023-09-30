"use client"

import { FiMinus, FiPlus } from "react-icons/fi";

import { Page } from "@/components/FormScreen";
import { Button } from "@nextui-org/button";
import React from "react";
import { useForm } from "react-hook-form";
import { CustomComponentProps } from "../page";

export default function useStepSameTime(props: CustomComponentProps) {
  const [count, setCount] = React.useState(1);

  const onSubmit = () => {
    console.log(count);
    props.nextFunction();
  };
  return (
    <Page
      Title="Agendamentos no mesmo horário:"
      onClickBack={props.previousFunction}
      onSubmit={onSubmit}
    >
      <div className="flex justify-center">
        <Button
          onClick={() => setCount((prev) => (prev != 1 ? prev - 1 : prev))}
          isIconOnly
          startContent={<FiMinus />}
        ></Button>
        <input
          type="text"
          readOnly
          value={count}
          className="w-12 text-center"
        />
        <Button
          onClick={() => setCount((prev) => prev + 1)}
          isIconOnly
          startContent={<FiPlus />}
        ></Button>
      </div>
    </Page>
  );
}
