import { Button, Chip, Divider, useDisclosure } from "@nextui-org/react";

import { RiScissorsLine } from "react-icons/ri";
import { BsQrCodeScan } from "react-icons/bs";
import { PiSignOut } from "react-icons/pi";
import { MdOutlineReportProblem, MdAccessTime } from "react-icons/md";
import ReportModal from "../components/ReportModal";
import ServicesModal from "../components/ServicesModal";
import ScheduleModal from "../components/ScheduleModal";
import QrcodeModal from "../components/QrcodeModal";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
  const modalServices = useDisclosure();
  const modalShedules = useDisclosure();
  const modalQrcode = useDisclosure();
  const modalReport = useDisclosure();
  
  return (
    <div className="h-full flex flex-col">
      <div>
        <header className="h-52">
          <div className="bg-black w-full h-3/6" />
          <div className="flex flex-col justify-center items-center text-center absolute top-12 left-0 right-0">
            <div className="flex items-center justify-center bg-black text-white font-bold text-4xl rounded-2xl border-8 border-white w-[100px] h-[100px]">
              BB
            </div>
            <h2 className="text-2xl font-bold">Baillan Barbearia</h2>
            <span>Rua das drogas, 34</span>
            {/* <Link className="text-[#00C2FF] font-medium text-base">
              @Baillan.barber
            </Link> */}
          </div>
        </header>
      </div>
      <div className="">
        <div className="p-6">
          <CardPlan
            name="start"
            amount="50"
            period="anual"
            startDate="24/09/2023"
            value="249,00"
          />
        </div>
        <ul className="mt-6">
          <li
            onClick={modalQrcode.onOpen}
            className="flex items-center text-xl font-semibold px-7 text-green-500 active:opacity-50 transition-opacity"
          >
            <BsQrCodeScan className="mr-6" />
            <span className="">Ver Qrcode</span>
          </li>
          <li
            onClick={modalServices.onOpen}
            className="flex items-center text-xl mt-5 px-7 active:opacity-50 transition-opacity"
          >
            <RiScissorsLine className="mr-6" />
            <span></span>
            Seus serviços
          </li>
          <li
            onClick={modalShedules.onOpen}
            className="flex items-center text-xl mt-5 px-7 active:opacity-50 transition-opacity"
          >
            <MdAccessTime className="mr-6" />
            Horários
          </li>
          <li
            onClick={modalReport.onOpen}
            className="flex items-center text-xl mt-5 px-7 active:opacity-50 transition-opacity"
          >
            <MdOutlineReportProblem className="mr-6" />
            <span>Reportar um problema</span>
          </li>
          <Divider className="mt-16" />
          <li onClick={()=> signOut()} className="flex items-center text-xl mt-5 justify-center opacity-40 font-bold active:opacity-50 transition-opacity">
            <PiSignOut className="mr-3" size={22} />
            <span>Sair</span>
          </li>
        </ul>
      </div>
      <ReportModal
        isOpen={modalReport.isOpen}
        onOpenChange={modalReport.onOpenChange}
        onSubmit={(close) => close()}
      />
      <ServicesModal
        isOpen={modalServices.isOpen}
        onOpenChange={modalServices.onOpenChange}
        onSubmit={(close) => close()}
      />
      <ScheduleModal
        isOpen={modalShedules.isOpen}
        onOpenChange={modalShedules.onOpenChange}
        onSubmit={(close) => close()}
      />
      <QrcodeModal
        isOpen={modalQrcode.isOpen}
        onOpenChange={modalQrcode.onOpenChange}
        onSubmit={(close) => close()}
      />
    </div>
  );
}

const CardPlan = ({
  name,
  amount,
  value,
  startDate,
  period,
}: {
  name: string;
  amount: string;
  value: string;
  startDate: string;
  period: string;
}) => {
  return (
    <div className="flex flex-col justify-between p-4 bg-gradient-to-r from-[#9400D3] to-[#4B0082] rounded-2xl h-[122px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="font-bold text-xl uppercase text-white">{name}</h1>
          <span className="text-sm text-white font-medium opacity-50">
            Até {amount} agendamentos
          </span>
        </div>
        <Button
          className="bg-white text-[#4B0082] font-medium"
          radius="sm"
          variant="flat"
          size="sm"
        >
          Alterar
        </Button>
      </div>
      <div className="flex items-center gap-1 justify-between">
        <Chip className="text-white" size="sm" variant="flat">
          {value}/{period}
        </Chip>
        <span className="text-xs font-normal text-white opacity-50">
          Inicio: {startDate}
        </span>
      </div>
    </div>
  );
};