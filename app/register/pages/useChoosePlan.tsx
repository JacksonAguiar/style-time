import { FiCreditCard } from "react-icons/fi";
import { FaBarcode } from "react-icons/fa";
import { Suspense, use, useEffect, useState } from "react";
import { Page } from "@/components/FormScreen";

import star from "public/star.svg";

import Image from "next/image";
import { CustomComponentProps } from "../page";
import { RadioGroup, VisuallyHidden, cn, useRadio } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import UserService from "@/app/services/UserService";
import { useSession } from "next-auth/react";
import PlansService from "@/app/services/PlansService";
import { PlanI } from "@/types";

// async function getData() {
//   const res = await fetch("https://api.example.com/...");
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   // Recommendation: handle errors
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function useStepPlans(props: CustomComponentProps) {
  const { data, update } = useSession();
  const [plans, setPlans] = useState<PlanI[]>([]);
  const getPlans = async () => await PlansService.getAll("BR");

  useEffect(() => {
    getPlans().then((e) => {
      var p = (e.data as PlanI[]).sort((a, b) => a.annualValue - b.annualValue);
      setPlans(p);
      setPlan(p[1].id);
    });
    return () => {};
  }, []);

  const [payMethod, setPayMethod] = useState("");
  const [plan, setPlan] = useState<string>(props.value);

  const onSubmit = async () => {
    const id = data?.user?.id ?? "";

    var res = await UserService.update(id, {
      planId: plan,
      method: payMethod,
      registerStep: props.step,
    });
    if (res) {
      update({ resgisterStep: props.step });
      props.nextFunction();
    }
  };

  return (
    <Suspense fallback="carregando...">
      <Page
        Title="Escolha seu plano"
        onClickBack={props.previousFunction}
        onSubmit={onSubmit}
        chipEmail={data?.user?.email}
      >
        {plans.length != 0 && (
          <RadioGroup
            color="secondary"
            defaultValue={plans[1].id}
            className="w-full mt-2"
            onChange={(el) => setPlan(el.target.value)}
          >
            {plans.map((p, i) => {
              return (
                <CustomRadio
                  key={i}
                  description={p.maxAppointments}
                  cost={"R$ " + (p.annualValue / 12).toFixed(2)}
                  value={p.id}
                  methodvalue={payMethod}
                  onChangeMethod={(value: string) => {
                    setPayMethod(value);
                  }}
                >
                  {p.name}
                </CustomRadio>
              );
            })}
          </RadioGroup>
        )}
      </Page>
    </Suspense>
  );
}

const CustomRadio = (props: any) => {
  const {
    Component,
    children,
    isSelected,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);
  let methodCss =
    "w-[49%] flex items-center cursor-pointer border-2 border-default rounded-md px-4 py-2 tap-highlight-transparent";
  return (
    <>
      <Component
        {...getBaseProps()}
        className={cn(
          "w-full group flex items-center flex-row relative tap-highlight-transparent",
          "max-h-[500px] cursor-pointer border-2 border-default rounded-md gap-1 px-2.5 py-5",
          "data-[selected=true]:border-[#9A2CE1]"
        )}
      >
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <span {...getWrapperProps()}>
          <span {...getControlProps()} />
        </span>
        <div {...getLabelWrapperProps()}>
          {children && (
            <span {...getLabelProps()} className="font-bold uppercase">
              {children}
            </span>
          )}
          {description && (
            <span className="text-small text-foreground-400">
              Até {description} agendamentos por mês
            </span>
          )}
        </div>
        <span className="font-bold text-sm ml-auto">{props.cost}</span>
        {isSelected && (
          <Image
            className="absolute top-[-1px] right-[-1px]"
            src={star}
            alt=""
          />
        )}
      </Component>

      {isSelected && (
        <>
          <div className="flex justify-between mb-2">
            <div
              className={`${methodCss} ${
                props.methodvalue == "bill"
                  ? " bg-[#9A2CE1] text-white border-none"
                  : ""
              }`}
              onClick={() => props.onChangeMethod("bill")}
            >
              <FaBarcode className="mr-2" />
              Boleto
            </div>
            <div
              className={`${methodCss} ${
                props.methodvalue == "credit"
                  ? " bg-[#9A2CE1] text-white border-none"
                  : ""
              }`}
              onClick={() => props.onChangeMethod("credit")}
            >
              <FiCreditCard className="mr-2" />
              Crédito
            </div>
          </div>
        </>
      )}
    </>
  );
};
