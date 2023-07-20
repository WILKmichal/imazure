import { useState } from "react";

type CheckboxProps = {
  label: string;
  isChecked: boolean;
  labelColor: string;
  onCheckedChange: (label: string) => void;
};

const Checkbox = ({
  label,
  isChecked,
  onCheckedChange,
  labelColor,
}: CheckboxProps) => {
  const [checked, setChecked] = useState(isChecked);

  const handleCheckedChange = () => {
    const newChecked:boolean = !checked;
    setChecked(newChecked);
    onCheckedChange(label);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        onClick={handleCheckedChange}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "15px",
          height: "15px",
          borderRadius: "3px",
          border: " solid #32a1ce",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            width: "7px",
            height: "7px",
            backgroundColor: checked ? "#32a1ce" : "white",
          }}
        ></div>
      </div>
      <span style={{ marginLeft: "5px", color: labelColor }}>{label}</span>
    </div>
  );
};

export default Checkbox;
