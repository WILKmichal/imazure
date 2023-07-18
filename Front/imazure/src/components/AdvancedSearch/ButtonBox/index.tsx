import { useEffect, useState } from "react";

type ButtonBoxProps = {
  label: string;
  isChecked: boolean;
  labelColor: string;
  index?: number;
  onCheckedChange: (label: string) => void;
};

const ButtonBox = ({
  label,
  isChecked,
  onCheckedChange,
  index = 0,
  labelColor,
}: ButtonBoxProps) => {
  const [checked, setChecked] = useState(isChecked);

  const handleCheckedChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onCheckedChange(label);
  };
  
  return (
    <div
      onClick={handleCheckedChange}
      className="tag tag-hover"
      key={index}
      style={{
        backgroundColor: checked ? "#94ffa3" : "#e2e2e2",
      }}
    >
      <span style={{ color: checked ? "rgb(52, 72, 197)" : labelColor }}>
        {label}
      </span>
    </div>
  );
};

export default ButtonBox;
