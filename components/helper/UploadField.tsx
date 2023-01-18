import uploadIcon from "../../Assets/upload.svg";
import crossIcon from "../../Assets/cross.svg";
import Image from "next/image";
import { useRef, useState } from "react";
import { GlobalStates } from "@/utils/Context";

const UploadField = () => {
  const [inputImg, setInputImg] = useState<any>("");
  const uploadRef = useRef<HTMLInputElement>(null);
  const { formData, setFormData } = GlobalStates();

  //Upload Method ===========================
  const fileUpload = (e: any) => {
    const files = Array.from(e.target.files);
    const image = files[0];
    setFormData({ ...formData, image });

    files.forEach((each: any) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setInputImg(reader.result);
        }
      };
      reader.readAsDataURL(each);
    });
  };
  return (
    <div
      className={`flex text-[14px] font-[500] leading-[160%]
        text-[#72ADD7] items-center justify-center gap-[10px] border 
        h-[124px] w-[186px] ${
          !inputImg && "border-dashed border-[#84878B] rounded-none"
        } rounded-[10px] cursor-pointer relative `}
      onClick={() => uploadRef.current?.click()}
    >
      {inputImg ? (
        <>
          <div className="flex justify-center items-center overlay text-white font-[600] text-[16px] leading-[24px] rounded-[10px]">
            Change
          </div>
          <div className="relative w-full h-full">
            <Image
              src={inputImg}
              height={100}
              width={100}
              className="object-contain w-full h-full rounded-[10px]"
              alt="inputImg"
            />
            <div
              onClick={(e) => {
                e.stopPropagation();
                setInputImg("");
                setFormData({ ...formData, image: {} });
              }}
              className="absolute top-0 translate-x-[50%] rounded-full translate-y-[-50%] right-0 h-[26px] w-[26px] flex items-center justify-center bg-[#F1F1F1]"
            >
              <Image
                src={crossIcon}
                alt="cross"
                height={12}
                width={12}
                className="z-50"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <Image src={uploadIcon} alt="icon" height={24} width={24} />
          <span>
            Upload <br /> Plane Image
          </span>
        </>
      )}
      <input ref={uploadRef} type="file" hidden onChange={fileUpload} />
    </div>
  );
};

export default UploadField;
