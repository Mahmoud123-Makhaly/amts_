import React, { useState } from 'react';
import { Avatar, FileUpload } from '@components';

const ImageUpload = () => {
  const [img, setImg] = useState<string | null>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);
    // setImg(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <FileUpload name="image" onChange={handleChange}>
      {/* <Avatar size="large" img={img} /> */}
      <div></div>
    </FileUpload>
  );
};

export default ImageUpload;
