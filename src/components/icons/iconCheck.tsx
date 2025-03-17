type iconProps = {
  fillColor: string;
  stroke?: string;
  hoverState: string;
}


export default function iconCheck({
  fillColor,
  stroke,
  hoverState,
}: iconProps) {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" className={hoverState}>
        <path fill={fillColor} stroke={stroke} stroke-width="2" d="M1 4.304L3.696 7l6-6" />
      </svg>
    </>
  )
}
