import React from "react";

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  className?: string;
  fill?: boolean;
  weight?: number;
  grade?: number;
  opticalSize?: number;
}

export default function Icon({
  name,
  className = "",
  fill = false,
  weight,
  grade,
  opticalSize,
  style,
  ...props
}: IconProps) {
  const fontVariationSettings = [
    fill ? "'FILL' 1" : "'FILL' 0",
    weight !== undefined ? `'wght' ${weight}` : null,
    grade !== undefined ? `'GRAD' ${grade}` : null,
    opticalSize !== undefined ? `'opsz' ${opticalSize}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  const combinedStyle = {
    fontVariationSettings,
    ...style,
  };

  return (
    <span
      className={`material-symbols-outlined select-none inline-block align-middle ${className}`}
      style={combinedStyle}
      {...props}
    >
      {name}
    </span>
  );
}
