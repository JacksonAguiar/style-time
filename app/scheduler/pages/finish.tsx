import Image from "next/image";
import { FiX } from "react-icons/fi";

export default function finish(onClose: () => void, placeName: string) {
  return (
    <div className="p-2 flex flex-col justify-between h-full">
      {/* <FiX onClick={onClose} className="ml-auto" size={22} /> */}

      <div className="mt-6">
        <h1 className="font-bold text-5xl mb-unit-2xl ">
          Agendamento realizado com sucesso!
        </h1>

        <p className="text-xl font-medium">
          Você receberá uma mensagem de confirmação pelo whatssap assim que o
          <b> {placeName}</b> confirmar o agendamento.
        </p>
      </div>

      <Image
        src="/icon.svg"
        alt="STYLE TIME"
        width={50}
        height={100}
        quality={100}
        priority
      />
    </div>
  );
}
