"use client";
import { CustomComponentProps } from "../page";

import { Page } from "@/components/FormScreen";
import { useState } from "react";
import { useSession } from "next-auth/react";
import UserService from "@/app/services/UserService";
export default function useStepName(props: CustomComponentProps) {
  const { data, update } = useSession();
  const [name, setName] = useState<string>(props.value);

  const onSubmit = async () => {
    const id = data?.user?.id ?? "";

    var res = await UserService.update(id, {
      name: name,
      registerStep: props.step,
    });
    if (res) {
      props.nextFunction();
      update({resgisterStep: props.step})
    }
  };
  return (
    <Page
      Title="Qual é o seu nome?"
      onClickBack={props.previousFunction}
      onSubmit={onSubmit}
      chipEmail={data?.user?.email}
      key={"name-form"}
    >
      <input
        className="w-full text-xl outline-transparent font-normal"
        placeholder="Ex: Janaina Garcia"
        onChange={(el) => setName(el.target.value)}
      />
    </Page>
  );
}
