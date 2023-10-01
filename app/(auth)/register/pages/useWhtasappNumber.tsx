"use client";
import { CustomComponentProps } from "../page";

import { Page } from "@/components/FormScreen";
import { useState } from "react";
import { useSession } from "next-auth/react";
import UserService from "@/app/api/services/UserService";
export default function useWhatsappNumber(props: CustomComponentProps) {
  const { data, update } = useSession();
  const [phone, setPhone] = useState<string>(props.value);

  const onSubmit = async () => {
    const id = data?.user?.id ?? "";

    await UserService.update(id, {
      phoneNumber: phone,
      registerStep: props.step,
    });
    update({resgisterStep: props.step})
    props.nextFunction();
  };
  return (
    <Page
      Title="Qual é o seu número de whatsapp?"
      onClickBack={props.previousFunction}
      onSubmit={onSubmit}
      chipEmail={data?.user?.email}
      onChangeMenuHeader={props.onSendReport}
    >
      <input
       key={"phone-form"}
        className="w-full text-xl outline-transparent font-normal"
        placeholder="Ex: +55 (11) 99999-9999"
        onChange={(el) => setPhone(el.target.value)}
      />
    </Page>
  );
}
