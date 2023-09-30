"use client";

import { Input } from "@nextui-org/input";
import { Page } from "@/components/FormScreen";

import { CustomComponentProps } from "../page";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import UserService from "@/app/api/services/UserService";

export default function useStepPaymentMethod(props: CustomComponentProps) {
  const { data, update } = useSession();
  const styles = {
    label: "font-normal text-base",
    input: ["font-medium"],
    inputWrapper: ["h-12"],
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = async () => {
    const id = data?.user?.id ?? "";

    await UserService.update(id, {
      // name: name,
      registerStep: props.step,
    });
    update({resgisterStep: props.step})
    props.nextFunction();
  };

  return (
    <Page
      Title="Cartão de crédito"
      onClickBack={props.previousFunction}
      onSubmit={onSubmit}
      chipEmail={data?.user?.email}
    >
      <div className="flex flex-col gap-5">
        <Input
          type="number"
          classNames={styles}
          label="Número do cartão de crédito"
          labelPlacement={"outside"}
          placeholder="Ex.: 5444 4444 4444 4221"
          radius="sm"
          isRequired
          {...register("card_number")}
        />
        <div className="flex justify-between md:flex-nowrap gap-4 ">
          <Input
            type="number"
            classNames={styles}
            label="Validade"
            labelPlacement={"outside"}
            placeholder="Ex.: 09/30"
            radius="sm"
            isRequired
            {...register("card_exp")}
          />
          <Input
            type="number"
            classNames={styles}
            label="CVV"
            labelPlacement={"outside"}
            placeholder="Ex.: 000"
            radius="sm"
            isRequired
            {...register("card_code")}
          />
        </div>
        <Input
          type="text"
          classNames={styles}
          isRequired
          label="Nome impresso no cartão"
          labelPlacement={"outside"}
          placeholder="Ex.:RAFAEL CABRAL"
          radius="sm"
          {...register("card_name")}
        />
        <Input
          type="number"
          classNames={styles}
          label="CPF"
          labelPlacement={"outside"}
          placeholder="Ex.:RAFAEL CABRAL"
          radius="sm"
          isRequired
          {...register("document")}
        />
      </div>
    </Page>
  );
}
