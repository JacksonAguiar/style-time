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