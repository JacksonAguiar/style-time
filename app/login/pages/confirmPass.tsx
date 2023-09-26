import { Page } from "@/components/FormScreen";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function useConfirmTypePass(
  onBackClick: any,
  onSubmit: any,
  changeSubmitData: any
) {
  const [hide, setHide] = useState(true);
  const changeVisibility = () => setHide((p) => !p);
  return (
    <div  key={"pass_confirm"} className="flex flex-col justify-between h-full">
      <Page
        onClickBack={onBackClick}
        onSubmit={() => {}}
        Title="Confirme sua senha"
        removeFooter
      >
        <div className="mb-0 h-[55px] flex items-center w-full">
          <input
            className="w-full text-xl outline-transparent font-normal"
            placeholder="*********"
            
            type={hide ? "password" : "text"}
            onChange={(el) => changeSubmitData({ cpass: el.target.value })}
          />
          <a onClick={changeVisibility}>
            {hide ? <FiEye size={20} /> : <FiEyeOff size={20} opacity={0.2} />}
          </a>
        </div>
      </Page>
      <Button
        size="lg"
        color="primary"
        fullWidth
        type="submit"
        onClick={onSubmit}
      >
        Entrar
      </Button>
    </div>
  );
}
