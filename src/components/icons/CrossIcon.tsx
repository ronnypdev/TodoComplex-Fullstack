type IconProps = {
  fillColor: string;
  stroke?: string;
  hoverState: string;
  toggleOnClick: (event: React.MouseEvent<SVGSVGElement>) => void;
};

export default function CrossIcon({
  fillColor,
  stroke,
  hoverState,
  toggleOnClick,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18px"
      height="18px"
      className={hoverState}
      onClick={toggleOnClick}>
      <path
        fill={fillColor}
        fillRule="evenodd"
        stroke={stroke}
        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
      />
    </svg>
  );
}
