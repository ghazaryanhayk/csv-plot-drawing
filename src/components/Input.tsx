import { ChangeEvent, useId } from "react";
import debounce from "lodash.debounce";

type InputProps = {
  value: number;
  onValueChange(value: number): void;
  label?: string;
  placeholder?: string;
  min?: number;
};

export const Input = ({
  value,
  onValueChange,
  label,
  placeholder,
  min = 0,
}: InputProps) => {
  const id = useId();

  const onValueChangeDebounced = debounce(onValueChange, 200);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChangeDebounced(Number(e.target.value));
  };

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        type="number"
        id={id}
        min={min}
        placeholder={placeholder}
        defaultValue={value}
        onChange={handleValueChange}
      />
    </div>
  );
};
