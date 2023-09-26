"use client";

import { Page } from "@/components/FormScreen";
import { CustomComponentProps } from "../page";
import { useState } from "react";
import CompanieService from "@/app/services/CompanieService";
import { useSession } from "next-auth/react";
import UserService from "@/app/services/UserService";

export default function useStepAddressPlace(props: CustomComponentProps) {
  const [address, setAddress] = useState(props.value);
  const { data, update } = useSession();
  const onSubmit = async () => {
    const { companieId, id } = data?.user ?? {};
    var res = await CompanieService.update(companieId ?? "", {
      address: address,
    });

    if (res) {
      await UserService.update(id?? "", {
        registerStep: props.step,
      });
      update({ registerStep: props.step });
      props.nextFunction();
    }
  };
  return (
    <Page
      Title="Qual o endereço?"
      onClickBack={props.previousFunction}
      onSubmit={onSubmit}
      key={"place-name-form"}
    >
      <p>Rua, número, Bairro, cidade/Estado</p>
      <input
        className="w-full text-xl outline-transparent font-normal"
        placeholder="Ex: Rua andorra, 80, Butantã, São Paulo/SP"
        onChange={(el) => setAddress(el.target.value)}
      />
    </Page>
  );
}
