"use client";

import { Page } from "@/components/FormScreen";
import { CustomComponentProps } from "../page";
import { useState } from "react";
import CompanieService from "@/app/api/services/CompanyService";
import { useSession } from "next-auth/react";
import UserService from "@/app/api/services/UserService";

export default function UseStepAddressPlace(props: CustomComponentProps) {
  const [address, setAddress] = useState(props.value);
  const { data, update } = useSession();

  const onSubmit = async () => {
    const { companieId, id } = data?.user ?? {};
    var res = await CompanieService.update(companieId ?? "", {
      address: address,
    });

    if (res) {
      props.nextFunction();
    }
  };
  return (
    <Page
      Title="Qual o endereço?"
      onClickBack={props.previousFunction}
      onSubmit={onSubmit}
      key={"place-address-form"}
      // chipEmail={data?.user?.email ?? ""}
      // onChangeMenuHeader={props.onSendReport}
      // skip={!props.edit}
    >
      <p>Rua, número, Bairro, cidade/Estado</p>
      <input
        className="w-full text-xl outline-transparent font-normal"
        placeholder="Ex: Rua andorra, 64, Morumbi, São Paulo/SP"
        onChange={(el) => setAddress(el.target.value)}
      />
    </Page>
  );
}
