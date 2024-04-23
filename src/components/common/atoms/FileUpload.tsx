import React, { ReactNode, useState } from 'react';
import { Label } from 'reactstrap';

interface FileUploadProps {
  name: string;
  children: ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  className?: string;
}
const FileUpload = (props: FileUploadProps) => {
  const { children, name, className, id, onChange } = props;

  return (
    <Label htmlFor={id ?? name} className={className}>
      {children}
      <input type="file" className="d-none" name={name} id={id ?? name} onChange={onChange} />
    </Label>
  );
};

export default FileUpload;
