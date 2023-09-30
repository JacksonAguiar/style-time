import { redirect } from "next/navigation";

import CompanieService from "../../api/services/CompanyService";
import UseSteps from "./steps.component";

export interface ComponentProps {
  nextFunction: VoidFunction;
  previousFunction: VoidFunction;
}

const getData = async (sc: string) => {
  if (!sc) {
    return redirect("/");
  }
  const place = await CompanieService.getBySharedCode(sc);
  if (!place) {
    return redirect("/place-not-found");
  }
  return place.data;
};

export default async function Appointment({
  params: { sc },
}: {
  params: { sc: string };
}) {
  const data = await getData(sc);
 

  return <UseSteps placeName={data.name} id={data.id} services={data.Services} schedules={data.Schedules} />;
}
