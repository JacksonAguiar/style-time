"use client";

import { FiPlus, FiX } from "react-icons/fi";
import { Page } from "@/components/FormScreen";
import React, { useEffect } from "react";
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { CustomComponentProps } from "../page";
import UserService from "@/app/api/services/UserService";
import { useSession } from "next-auth/react";
import CompanieService from "@/app/api/services/CompanyService";

export default function useStepServices(props: CustomComponentProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data, update } = useSession();

  const initial = { name: "", duration: 0 };

  const [services, setServices] = React.useState<
    { name: string; duration: number }[]
  >([]);

  const [service, setService] = React.useState<{
    name: string;
    duration: number;
  }>(initial);

  useEffect(() => {
    if (props.edit)
      CompanieService.services(data?.user?.companieId ?? "").then((data) => {
        if (data) setServices(data);
      });

    return () => console.log("Cleanup..");
  }, [props.edit, data?.user?.companieId]);

  const handleDelete = (serv: any) => {
    setServices(services.filter((s) => s.name !== serv.name));
  };

  const handleRemove = (serv: any) => {
    if (props.edit) {
      CompanieService.deleteService(serv.id).then((data) => {
        if (data) handleDelete(serv);
      });
    } else {
      handleDelete(serv);
    }
  };

  const handleAdd = (close: any) => {
    var success = true;
    if (service.name != "" && service.duration != 0) {
      if (props.edit) {
        CompanieService.addOneService(
          data?.user?.companieId ?? "",
          service.name,
          service.duration
        ).then((data) => {
          if (!data) success = false;
        });
      }
      if (success) {
        setServices((prev) => [...prev, service]);
        setService(initial);
        close();
      }
    }
  };

  const onSubmit = async () => {
    const { id, companieId } = data?.user ?? {};
    var res = await CompanieService.addServices(companieId, services);
    if (res) {
      await UserService.update(id ?? "", { registerStep: props.step });
      update({ resgisterStep: props.step });
      props.nextFunction();
    }
  };

  const styles = {
    label: "font-normal text-base",
    input: ["font-medium"],
    inputWrapper: ["h-12"],
  };
  return (
    <Page
      Title="Quais serviços você oferece?"
      onClickBack={props.previousFunction}
      onSubmit={onSubmit}
      chipEmail={data?.user?.email}
      onChangeMenuHeader={props.onSendReport}
      removeFooter={props.edit}
    >
      <div className="mb-5 flex flex-wrap gap-3">
        {services.length == 0 && (
          <span className="flex self-center justify-center text-foreground-400">
            Nenhum serviço adicionado.
          </span>
        )}
        {services.map((e, i) => {
          return (
            <Chip
              key={i}
              onClose={() => handleRemove(e)}
              variant="flat"
              size="lg"
              className="text-lg"
            >
              {e.name} - <b>{e.duration}min</b>
            </Chip>
          );
        })}
      </div>
      <Button
        color="primary"
        className="flex m-auto"
        startContent={<FiPlus />}
        onClick={onOpen}
      >
        Adicionar
      </Button>

      <Modal
        hideCloseButton
        isOpen={isOpen}
        placement={"bottom"}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Novo serviço
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  classNames={styles}
                  label="Nome do serviço"
                  labelPlacement={"outside"}
                  placeholder="Ex.: Corte social"
                  onChange={(el) =>
                    setService({
                      name: el.target.value,
                      duration: service.duration,
                    })
                  }
                  radius="sm"
                  isRequired
                />
                <Input
                  type="number"
                  classNames={styles}
                  label="Tempo(minutos)"
                  onChange={(el) =>
                    setService({
                      name: service.name,
                      duration: Number(el.target.value),
                    })
                  }
                  labelPlacement={"outside"}
                  placeholder="Ex.: 60 min"
                  radius="sm"
                  isRequired
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="success" onPress={() => handleAdd(onClose)}>
                  Adicionar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Page>
  );
}
