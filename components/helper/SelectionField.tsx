import useIsIntersecting from "@/utils/IsInterSecting";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import searchIcon from "../../Assets/search.svg";
import chevronIcon from "../../Assets/chevron.svg";
import { GlobalStates } from "@/utils/Context";

const SelectItem = ({ name, options, title, index, mediumRounded }: any) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [bottom, setBottom] = useState<any>(0);
  const [left, setLeft] = useState<any>(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [top, setTop] = useState<any>(0);
  const [width, setWidth] = useState<any>(0);
  const isInterSecting = useIsIntersecting(selectRef);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<any>("");

  //context ----------------
  const {
    formData,
    formData: { products },
    setFormData,
  } = GlobalStates();

  //move dropdown on top when bottom is off screen
  const styles = isInterSecting
    ? {
        transform: `translate(${left}px, ${bottom}px)`,
        width: width,
      }
    : {
        transform: `translate(${left}px, ${top}px)`,
        width: width,
      };

  //when selection value changed
  const handleChange = (val: any) => {
    if (index !== undefined) {
      const values = [...products];
      //clearing product field when product is changed
      if (name === "productType") {
        values[index].product = "";
        values[index].total = "";
      }
      //setting total value when product is changed
      if (name === "product") {
        values[index].total = options.filter(
          (e: any) => e.name === val
        )[0].total;
      }
      values[index][name] = val;
      setFormData({ ...formData, products: values });
    } else {
      const values = { ...formData };
      values[name] = val;
      setFormData(values);
    }
    setSelected(val);
  };

  //close dropdown when clicked off component
  useEffect(() => {
    document.addEventListener("click", (e: any) => {
      if (selectRef && !selectRef?.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    });
  }, [selectRef]);

  //dropdown css values
  useEffect(() => {
    if (selectRef.current) {
      setBottom(selectRef.current.offsetTop + 56);
      setLeft(selectRef.current.getBoundingClientRect().left);
      setWidth(selectRef.current.getBoundingClientRect().width);
      setTop(selectRef.current.offsetTop - 240);
    }
  }, [showDropdown]);

  useEffect(() => {
    setData(
      options?.filter((option: any) =>
        option.name.trim().toLowerCase().includes(query.trim().toLowerCase())
      )
    );
  }, [query, options]);
  return (
    <>
      <div className="" ref={selectRef}>
        <div
          className="flex relative flex-col"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <input
            type="text"
            className={`w-full cursor-pointer input ${
              mediumRounded && "rounded-[10px]"
            } ${showDropdown && "border-blue-500"}`}
            readOnly
            placeholder={title}
            defaultValue={
              index !== undefined ? products[index][name] : formData[name]
            }
          />
          <Image
            src={chevronIcon}
            className={`absolute right-3 bi bi-chevron-down translate-y-[-50%] transition-all duration-300  top-[50%] ${
              showDropdown ? "rotate-0" : "rotate-[-180deg]"
            }`}
            alt="chev"
            height={12}
            width={12}
          />
        </div>
        {showDropdown && (
          <div
            className={`flex bg-white min-w-[295px] absolute top-0 z-10 my-2 left-0 flex-col items-start rounded-md border px-[20px] border-[#DCDCDC]`}
            style={styles}
          >
            <div className="relative w-full">
              <input
                onInput={(e: any) => setQuery(e.target.value)}
                placeholder="Search"
                type="search"
                className="w-full pl-[50px] pr-5 text-[#3B3E44] outline-none h-[55px] my-[10px] border border-[#DCDCDC] bg-white rounded-[30px]"
              />
              <Image
                src={searchIcon}
                alt="search"
                width={24}
                height={24}
                className="absolute left-3  translate-y-[-50%] transition-all duration-300  top-[50%]"
              />
            </div>
            <ul className="overflow-auto w-full h-[150px]">
              {data?.map((option: any, i: any) => (
                <li
                  onClick={(e: any) => {
                    handleChange(e.target.getAttribute("value"));
                  }}
                  key={i}
                  className={`px-2 rounded-md transition-all duration-300 cursor-pointer py-[8px] my-[2px] hover:bg-gray-300 ${
                    selected === option.name && "bg-gray-300"
                  }`}
                  value={option.name}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectItem;
