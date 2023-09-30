interface Schedule {
    id: string;
    days: string[];
    companieId: string;
    start: string;
    end: string;
    createdAt: string;
    updatedAt: string;
  }
  
  interface Plan {
    name: string;
    annualValue: number;
  }
  
  interface User {
    createdAt: string;
    Plan: Plan;
  }
  
  export interface AppointmentI {
    id: string;
    name: string;
    phoneNumber: string;
    date: string;
    services: string[];
    hours: string[];
    confirmedHour: string | null;
    status: string;
    companieId: string;
    createdAt: string;
    updatedAt: string;

   }
  
  export default interface CompanyDataResponse {
    id: string;
    name: string;
    type: string;
    shareCode: string;
    address: string;
    amountAtTime: number;
    createdAt: string;
    updatedAt: string;
    Services: any[]; // You can define an interface for Services if needed
    Schedules: Schedule[];
    User: User[];
    Appointments: AppointmentI[];
  }
  