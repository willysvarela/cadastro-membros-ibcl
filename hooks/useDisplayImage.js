import { useState } from "react";

const useDisplayImage = () => {
  const [result, setResult] = useState("");

  function uploader(e) {
    if (!e.target.files[0]) {
      return { result: null, uploader: null };
    }
    const imageFile = e.target.files[0];

    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setResult(e.target.result);
    });

    reader.readAsDataURL(imageFile);
  }

  return { result, uploader };
};

export default useDisplayImage;
