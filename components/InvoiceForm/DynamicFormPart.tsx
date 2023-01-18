import deleteIcon from "../../Assets/delete.svg";
import Image from "next/image";
import SelectItem from "../helper/SelectionField";
import productData from "../../Assets/fakeProductData.json";
import { GlobalStates } from "@/utils/Context";

const DynamicFormPart = () => {
  const {
    formData: { products },
    formData,
    setFormData,
  } = GlobalStates();
  //methods =====================

  const handleAddFields = () => {
    const values = [...products];
    values.push({ productType: "", product: "", description: "", total: "" });
    setFormData({ ...formData, products: values });
  };
  const handleRemoveFields = (index: any) => {
    const values = [...products];
    if (values.length > 1) {
      values.splice(index, 1);
      setFormData({ ...formData, products: values });
    }
  };

  return (
    <>
      <div className="flex justify-between  border-b px-[31px] border-[#E7ECF3] py-[20px]">
        <div className="flex gap-3">
          <label htmlFor="" className="label mb-[0px] text-[16px] w-[166px]">
            Products Type
          </label>
          <label htmlFor="" className="label mb-[0px] text-[16px] w-[254px]">
            Products
          </label>
          <label htmlFor="" className="label mb-[0px] text-[16px] xl:w-[389px]">
            Description
          </label>
        </div>
        <label htmlFor="" className="label mb-[0px] text-[16px] w-[210px]">
          Total
        </label>
      </div>

      <div className=" border-b border-[#E7ECF3] px-[31px] pb-[20px]">
        {products.map((field: any, index: any) => (
          <div key={index} className="flex justify-between  py-[20px] ">
            <div className="flex gap-3">
              <div className=" w-[166px]">
                <SelectItem
                  title="Product Type"
                  name="productType"
                  index={index}
                  mediumRounded
                  options={productData.productTypes}
                />
              </div>
              <div className=" w-[254px]">
                <SelectItem
                  name="product"
                  mediumRounded
                  title="Products"
                  index={index}
                  options={
                    productData.productTypes.filter(
                      (e: any) => e.name === products[index].productType
                    )[0]?.product
                  }
                />
              </div>
              <div className="xl:w-[389px] mr-3">
                <input
                  type={"text"}
                  placeholder="Description"
                  name="description"
                  className="w-full input rounded-[10px]"
                  onChange={(e: any) => {
                    const values = [...products];
                    values[index].description = e.target.value;
                    setFormData({ ...formData, products: values });
                  }}
                  defaultValue={products[index].description}
                />
              </div>
            </div>
            <div className="flex gap-[14px] items-center">
              <input
                type="text"
                name="total"
                placeholder="Total"
                readOnly
                className="input w-[155px] rounded-[10px]"
                defaultValue={products[index]?.total}
              />
              <div
                className="pink-bg h-[50px] w-[50px] flex items-center justify-center cursor-pointer"
                onClick={() => handleRemoveFields(index)}
              >
                <Image src={deleteIcon} height={25} width={25} alt="delete" />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={handleAddFields}
          className="text-[14px] font-[500] leading-[160%]
        text-[#72ADD7]"
        >
          + Add Product
        </button>
      </div>
    </>
  );
};

export default DynamicFormPart;
