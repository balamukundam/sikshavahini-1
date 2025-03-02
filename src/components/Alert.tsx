import { ReactNode } from "react";

interface Props {
  text: string;
  color: string;
}

const Alert = ({ text, color }: Props) => {
  return (
    <div className={"alert alert-" + color + " alert-dismissible no-print"}>
      {text}
    </div>
  );
};

export default Alert;
