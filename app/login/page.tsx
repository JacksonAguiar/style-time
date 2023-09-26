"use client";
import { useContext, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

import UserService from "../services/UserService";
import { useConfirmTypePass, useTypeEmail, useTypePassword } from "./pages";
import { EmailContext, EmailProvider } from "./context";

export default function SignIn() {
  const router = useRouter();

  const { data, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState(0);
  const searchParams = useSearchParams();

  const [submitData, setSubmitData] = useState<{
    email: string;
    password: string;
    cpassword: string;
  }>({ email: "", password: "", cpassword: "" });

  const changeSubmitData = ({
    email,
    pass,
    cpass,
  }: {
    email?: string;
    pass?: string;
    cpass?: string;
  }) => {
    setSubmitData((prev) => ({
      email: email ?? prev.email,
      password: pass ?? prev.password,
      cpassword: cpass ?? prev.cpassword,
    }));
  };

  const next = () => screen < screens.length - 1 && setScreen((p) => ++p);
  const back = () => screen > 0 && setScreen((p) => --p);
  const updateLoading = () => setLoading((prev) => !prev);

  const callbackUrl =
    searchParams.get("callbackUrl") ||
    (data?.user?.registerStep == 0
      ? "/dashboard"
      : "/register?s=" + data?.user?.registerStep);

  const onGoogleSignIn = async () => {
    await signIn("google", { redirect: true, callbackUrl: callbackUrl });
    // if (user?.ok) {
    //   redirectByStatus();
    // }
  };
  const verify = async () => {
    const { email } = submitData;
    if (email === "") {
    } else {
      var res = await UserService.getByEmailOrPhone(submitData.email);
      const { registerStep, completeAuth } = res.data;
      if (registerStep != 0) {
        return await signIn("credentials", {
          email: email,
          password: "default",
          redirect: true,
          callbackUrl: completeAuth
            ? "/register?s=" + registerStep
            : "/login/password?wtk=false",
        });
      }
      return next();
    }
  };

  const onSubmit = async (event: any) => {
    console.log(submitData);
    const { email, password, cpassword } = submitData;

    if (cpassword == "") {
      return next();
    }

    if (cpassword != "" && cpassword != password) {
      return false;
    }

    return await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: callbackUrl,
    });
  };

  const screens = [
    useTypeEmail(() => router.back(), verify, onGoogleSignIn, changeSubmitData),
    useTypePassword(back, false, onSubmit, changeSubmitData),
  ];

  return <div className="h-screen p-6">{screens[screen]}</div>;
}
