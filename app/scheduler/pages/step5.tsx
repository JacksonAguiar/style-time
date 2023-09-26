import { Page } from "@/components/FormScreen";
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiAward,
  FiPhone,
} from "react-icons/fi";
import { ScheduleI } from "../[sc]/steps.component";

export default function step5({
  previousFunction,
  nextFunction,
  onChange,
  values,
}: {
  previousFunction: any;
  nextFunction: any;
  onChange: any;
  values: ScheduleI;
}) {
  const date = new Date(values.hours ? values.hours[0] : "");
  const date2 = new Date(values.hours ? values.hours[1] : "");

  var day2 = "";
  var day = "";
  var services = "";
  const generateAll = () => {
    if (values.phoneNumber) {
      var mon = new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "long",
      }).format(date);
      var mon2 = new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "long",
      }).format(date2);

      day = mon;
      day2 = mon2;
      var ns = values.services?.map((e) => e.split("-")[0]) ?? [];
      services = ns.join(", ") ?? "";
    }
  };
  generateAll();

  return (
    <Page
      Title="Confirme seu agendamento"
      onClickBack={previousFunction}
      onSubmit={nextFunction}
      submitTextButton="Agendar"
      withoutIcon
    >
      <br />
      <ul className="[&>*]:flex [&>*]:items-center [&>*]:text-xl [&>*]:mb-4 [&>*]:font-normal">
        <li className="">
          <FiCalendar size={24} />
          <span className="ml-4">
            {day == day2 ? (
              day
            ) : (
              <>
                <i className="text-foreground-300">(1)</i> {day} ou
                <i className="text-foreground-300">(2)</i> {day2}
              </>
            )}
          </span>
        </li>
        <li>
          <FiClock size={24} />
          <span className="ml-4">
            <i className="text-foreground-300">(1)</i> {date.getHours()} horas
            ou <i className="text-foreground-300">(2)</i> {date2.getHours()}{" "}
            horas
          </span>
        </li>
        <li>
          <FiAward size={24} />
          <span className="ml-4">{services}</span>
        </li>
        <li>
          <FiPhone size={24} />
          <span className="ml-4">{values.phoneNumber}</span>
        </li>
        <li>
          <FiMapPin size={26} />
          <span className="ml-4">Cellos cabelereiros - Rua das drogas, mp</span>
        </li>
      </ul>
    </Page>
  );
}
