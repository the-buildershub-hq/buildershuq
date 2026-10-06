import React from "react";
import {
  IconArrowUpRight,
  IconArrowLeft,
  IconX,
  IconMenu2,
  IconCirclePlay,
  IconSearch,
  IconChartLine,
  IconPencil,
  IconCode,
  IconTestPipe,
  IconRocket,
  IconMail,
  IconCalendar,
  type Icon as TablerIcon,
} from "@tabler/icons-react";

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  className?: string;
  strokeWidth?: number;
  weight?: number;
  fill?: boolean;
  size?: number | string;
}

const ICON_MAP: Record<string, TablerIcon> = {
  arrow_outward: IconArrowUpRight,
  arrow_back: IconArrowLeft,
  close: IconX,
  menu: IconMenu2,
  play_circle: IconCirclePlay,
  search: IconSearch,
  insights: IconChartLine,
  draw: IconPencil,
  code: IconCode,
  flaky: IconTestPipe,
  rocket_launch: IconRocket,
  mail: IconMail,
  calendar_today: IconCalendar,
  calendar: IconCalendar,
  email: IconMail,
  rocket: IconRocket,
};

export default function Icon({
  name,
  className = "",
  strokeWidth,
  weight,
  size,
  ...props
}: IconProps) {
  const Component = ICON_MAP[name];

  if (!Component) {
    return null;
  }

  const stroke = strokeWidth ?? (weight && weight >= 600 ? 2.25 : 2);

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 leading-none select-none ${className}`}
      {...props}
    >
      <Component
        size={size ?? "1em"}
        stroke={stroke}
        className="w-full h-full"
      />
    </span>
  );
}

