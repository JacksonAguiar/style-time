import { Footer, Header } from "@/components/FormScreen";
import { CustomComponentProps } from "../page";

export default function welcomeStep({
  previousFunction,
  nextFunction,
}: CustomComponentProps) {
  return (
    <>
      <div>
        <Header onClick={previousFunction} />
        <div>
          <h1 className="font-extrabold text-[3.75rem] mb-3">
            Seja bem vindo(a) a nova forma de agendar e gerenciar seu espaço!
          </h1>
        </div>
      </div>
      <Footer onClick={nextFunction} buttonText="Continuar" />
    </>
  );
}
