import { GlobalStates } from "@/utils/Context";
import DynamicFormPart from "./DynamicFormPart";
import SelectItem from "../helper/SelectionField";
import UploadField from "../helper/UploadField";
import { submitInvoiceForm } from "@/services/invoiceService";

const Invoice = () => {
  const {
    formData,
    setFormData,
    formData: { products },
  } = GlobalStates();

  //submit method ------------
  const handleSubmit = (e: any) => {
    e.preventDefault();
    submitInvoiceForm(formData).then((res) => console.log(res));
  };

  //counting subtotal
  const subtotal = products.reduce(
    (total: any, each: any) => total + Number(each.total),
    0
  );

  const tax = 500;

  return (
    <form onSubmit={handleSubmit} className="container mx-auto">
      <div className="my-[30px]">
        <h2 className="font-[600] text-[26px] leading-[39px] text-[#3B3E44]">
          Invoice
        </h2>
        <p>Invoices / New Invoice</p>
      </div>
      {/* top form area =========================== */}
      <div className="bg-white rounded-[10px] py-[43px] px-[31px] mb-[40px]">
        <div className="flex justify-between">
          <div className="flex gap-[22px]">
            <div className="flex flex-col gap-[30px]">
              <div className="xl:w-[596px]">
                <label htmlFor="" className="label">
                  Select
                </label>
                <SelectItem
                  title="Select Clients"
                  name="client"
                  options={[
                    { name: "Tinfoilhat" },
                    { name: "Nesoftma" },
                    { name: "Awesomeat" },
                    { name: "Maxina" },
                    { name: "Kim Chi" },
                  ]}
                />
              </div>
              <div className="w-[254px]">
                <label htmlFor="" className="label">
                  Trip
                </label>
                <SelectItem
                  name="trip"
                  title="Select Trip"
                  options={[
                    { name: "13833" },
                    { name: "38344" },
                    { name: "3844584" },
                    { name: "383944" },
                    { name: "283848" },
                  ]}
                />
              </div>
            </div>
            <div>
              <label htmlFor="" className="label">
                Invoice Date
              </label>
              <input
                name="date"
                onChange={(e: any) => {
                  const date = e.target.value;
                  setFormData({ ...formData, date });
                }}
                type="date"
                defaultValue={formData.date}
                className="input w-[300px]"
              />
            </div>
          </div>
          <div>
            <label htmlFor="" className="label">
              Plane Image
            </label>
            <UploadField />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[10px] ">
        <DynamicFormPart />
        <div className=" flex justify-end flex-col items-end  border-b px-[31px] border-[#E7ECF3] py-[20px]">
          <p className="flex gap-[50px] ">
            <span className="w-[100px] font-[600] text-[18px] leading-[27px] text-[#3B3E44] text-right">
              Subtotal :
            </span>{" "}
            <span className="w-[100px]">{subtotal}</span>
          </p>
          <p className="flex gap-[50px] ">
            <span className="w-[100px] font-[600] text-[18px] leading-[27px] text-[#3B3E44] text-right">
              TVA :
            </span>{" "}
            <span className="w-[100px]">{subtotal ? tax : 0}</span>
          </p>
        </div>
        <div className=" flex justify-between items-end  border-b px-[31px] border-[#E7ECF3] py-[20px]">
          <div className="">
            <input
              type="submit"
              value="Save"
              className="input w-[141px] cursor-pointer font-[600] text-[18px] leading-[27px] mr-[30px] bg-blue-500 hover:bg-blue-700 transition-all duraion-300 text-white"
            />
            <button className="input w-[141px] ">Cancel</button>
          </div>
          <p className="flex gap-[50px] ">
            <span
              className="w-[100px] text-[14px] font-[500] leading-[160%]
        text-[#72ADD7] text-right"
            >
              Total:
            </span>{" "}
            <span className="w-[100px] ">{subtotal ? subtotal + tax : 0}</span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Invoice;
