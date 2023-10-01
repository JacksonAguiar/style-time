import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface PlanI {
  id: string;
  name: string;
  maxAppointments: number;
  country: string;
  initials: string;
  annualValue: number;
  annualDiscount: number;
}

export interface IServices {
  id: string;
  name: string;
  duration: number;
  companieId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISchedules {
  id: string;
  days: string[]; // Assuming 'days' is an array of strings
  companieId: string;
  start: string;
  end: string;
  createdAt: Date;
  updatedAt: Date;
}
