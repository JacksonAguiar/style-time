import { Page } from "@/components/FormScreen";
import { Button } from "@nextui-org/button";
import { FcGoogle } from "react-icons/fc";

export default function useTypeEmail(
  onBackClick: any,
  onSubmit: any,
  onGoogleSingIn: any,
  changeSubmitData: any
) {
  return (
    <div className="flex flex-col justify-between h-full">
      <Page
        Title="Digite seu email"
        onClickBack={onBackClick}
        onSubmit={onSubmit}
        key={"email-login"}
      >
        <input
          className="w-full text-xl outline-transparent font-normal mb-32"
          placeholder="exemplo@exemplo.com"
          name="email"
          onChange={(el) => changeSubmitData({ email: el.target.value })}
        />
      </Page>
      <div className="w-full mt-40">
        <Button
          size="lg"
          fullWidth
          className="bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
          startContent={<FcGoogle />}
          onClick={onGoogleSingIn}
        >
          Continuar com o google
        </Button>
      </div>
    </div>
  );
}