"use client";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { FiArrowUp } from "react-icons/fi";
import { useRouter } from "next/navigation";
// import Home from "./page.component";

export default function Start() {
  const router = useRouter();

  return (
    <div className="p-6 h-full w-full flex flex-col justify-between">
      <Image
        src="/icon.svg"
        alt="STYLE TIME"
        width={300}
        height={200}
        quality={100}
        priority
      />

      <div>Carousel with marketing texts</div>
      <div>
        <Button fullWidth size="lg" className="mb-8" onClick={()=> router.push("/login")}>
          Entrar
        </Button>
        {/* <div>
          <FiArrowUp />
          <p>Fazer Agendamento</p>
        </div> */}
      </div>
    </div>
  );
}
