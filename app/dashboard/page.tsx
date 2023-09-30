import HomePage from "./pages/home";
import AppointmentPage from "./pages/appointments";
import ProfilePage from "./pages/profile";
import CustomNavigationBarComponent from "./steps.component";
import CompanyService from "@/app/api/services/CompanyService";
import CompanyDataResponse from "./interface.response";

export default async function Dashboard() {
  let pages: any = {};
  await CompanyService.getById()
    .then((response) => {
      const company: CompanyDataResponse = response.data;
      console.log(company.Appointments);
      const dayOfWeek = new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
      }).format(new Date());
      
      const sch = (company.Schedules ?? []).filter((e) =>
        e.days.includes(dayOfWeek)
      )[0];

      if (response.status == 200)
        pages = {
          home: (
            <HomePage
              schedule={sch}
              placeName={company.name}
              appointments={company.Appointments.filter(
                (e) => e.status == "confirmed"
              )}
            />
          ),
          appointments: (
            <AppointmentPage
              appointments={(company.Appointments ?? []).filter(
                (e) => e.status == "waiting"
              )}
              // appointments={[]}
            />
          ),
          profile: (
            <ProfilePage
              placeName={company.name}
              plan={company.User}
              sharedCode={company.shareCode}
              schedules={company.Schedules}
              services={company.Services}
            />
          ),
        };
    })
    .catch((err) => {
      console.log(err);
    });

  return <CustomNavigationBarComponent defaultKey="home" pages={pages} />;
}
