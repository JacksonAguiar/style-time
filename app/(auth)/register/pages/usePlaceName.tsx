"use client";

import { Page } from "@/components/FormScreen";
import { CustomComponentProps } from "../page";
import { useState } from "react";
import CompanieService from "@/app/api/services/CompanyService";
import { useSession } from "next-auth/react";
import UserService from "@/app/api/services/UserService";

export default function useStepPlaceName(props: CustomComponentProps) {
  const [companie, setComp] = useState(props.value);
  const { data, update } = useSession();
  const onSubmit = async () => {
    var res = await CompanieService.create(companie);
    const { id } = res;
    if (id) {
      await UserService.update(data?.user?.id ?? "", {
        registerStep: props.step,
        companieId: id,
      });
      update({ companieId: id, registerStep: props.step });
      props.nextFunction();
    }
  };
  return (
    <Page
      Title="Qual o nome do seu negocio?"
      onClickBack={props.previousFunction}
      onSubmit={onSubmit}
      key={"place-name-form"}
      chipEmail={data?.user?.email}
      onChangeMenuHeader={props.onSendReport}
    >
      <input
        className="w-full text-xl outline-transparent font-normal"
        placeholder="Ex: Barbearia Garcia"
        onChange={(el) => setComp(el.target.value)}
      />
    </Page>
  );
}
