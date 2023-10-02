"use client";

import PlansService from "@/app/api/services/PlansService";
import { PlanI } from "@/types";
import { Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Pricing() {
  const [plans, setPlans] = useState<PlanI[]>([]);
  const [annual, setAnnual] = useState<boolean>(true);

  useEffect(() => {
    PlansService.getAll("BR").then((res) => {
      setPlans(res.data);
    });
    return;
  }, []);

  const getValue = (value: number, discount: number) =>
    annual ? (value * (1 - discount)) / 12 : value / 12;

  return (
    <section className="xl:mx-auto xl:container py-20 2xl:px-0 px-6">
      <div className="lg:flex items-center justify-between">
        <div className="lg:w-1/2 w-full">
          {/* <p className="text-base leading-4 text-gray-600">Choose your plan</p> */}
          <h1
            role="heading"
            className="md:text-5xl text-3xl font-bold leading-10 mt-3 text-gray-800"
          >
            Planos flexíveis para atender às suas necessidades
          </h1>
          <p
            role="contentinfo"
            className="text-base leading-5 mt-5 text-gray-600"
          >
            Escolha entre nossa variedade de planos adaptados especificamente
            para barbeiros e salões. Quer você seja um autônomo ou mesmo um
            salão ou barbearia que oferece uma variedade completa de serviços,
            temos um plano perfeito para atender às suas necessidades
          </p>
          <div className="w-56 mt-6">
            <Tabs
              color="primary"
              size="lg"
              radius="full"
              onSelectionChange={(k) => setAnnual(k == "a")}
              defaultSelectedKey={"a"}
            >
              <Tab key="m" title="Monthly" />
              <Tab key="a" title="Annually" />
            </Tabs>
          </div>
        </div>
        <div
          className="xl:w-1/2 lg:w-7/12 relative w-full lg:mt-0 mt-12 md:px-8"
          role="list"
        >
          {/* <div
            role="listitem"
            className="bg-white cursor-pointer shadow rounded-lg p-8 relative"
            data-aos="fade-right"
          >
            <div className="md:flex items-center justify-between">
              <h2 className="text-2xl font-semibold leading-6 text-gray-800">
                Starter
              </h2>
              <p className="text-2xl font-semibold md:mt-0 mt-4 leading-6 text-gray-800">
                FREE
              </p>
            </div>
            <p className="md:w-80 text-base leading-6 mt-4 text-gray-600">
              Full access to all features and no credit card required
            </p>
          </div> */}

          {plans.map((p, i) => {
            return (
              <div
                key={i}
                role="listitem"
                className="bg-white cursor-pointer shadow rounded-lg mt-3 flex relative"
                data-aos="fade-right"
              >
                {i == 1 && (
                  <div className="w-2.5  h-auto bg-blue-600 rounded-tl-md rounded-bl-md" />
                )}
                <div className="w-full p-8">
                  <div className="md:flex items-center justify-between">
                    <h2 className="text-2xl font-semibold leading-6 text-gray-800">
                      {p.name}
                    </h2>
                    <p className="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800">
                      R$ {getValue(p.annualValue, p.annualDiscount).toFixed(2)}
                      <span className="font-normal text-base">/mo</span>
                    </p>
                  </div>
                  <p className="md:w-80 text-base leading-6 mt-4 text-gray-600">
                    Até {p.maxAppointments} por mês e todos os recursos listados
                    acima
                    {i == 2 && <b> + Canal dedicado para suportes </b>}
                  </p>
                </div>
              </div>
            );
          })}
          {/* <div
            role="listitem"
            className="bg-white cursor-pointer shadow rounded-lg p-8 relative mt-7"
            data-aos="fade-right"
          >
            <div className="md:flex items-center justify-between">
              <h2 className="text-2xl font-semibold leading-6 text-gray-800">
                Team
              </h2>
              <p className="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800">
                $18<span className="font-normal text-base">/mo</span>
              </p>
            </div>
            <p className="md:w-80 text-base leading-6 mt-4 text-gray-600">
              Unlimited products features and dedicated support channels
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
}
