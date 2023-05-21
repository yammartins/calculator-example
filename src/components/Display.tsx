import classNames from "classnames";

interface DisplayProps {
  label: string;
}

export function Display({ label }: DisplayProps) {
  const styled = {
    display: classNames(
      'flex-1 flex p-5 rounded-sm justify-center bg-black/60 items-end'
    ),
    displayValue: classNames(
      'text-6xl text-white'
    )
  } 

  return (
    <div className={styled.display}>
       <span className={styled.displayValue}>{label}</span>
    </div>
  )
}