import React from "react";
import { Input } from "antd";

interface PhoneInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBeforeInput: (e: React.FormEvent<HTMLInputElement> & InputEvent) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, onBeforeInput, onPaste }) => (
  <Input
    type="text"
    value={value}
    onChange={onChange}
    onBeforeInput={onBeforeInput}
    onPaste={onPaste}
  />
);

export default PhoneInput;
