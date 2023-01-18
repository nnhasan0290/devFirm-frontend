
import Invoice from "@/components/InvoiceForm/InvoiceForm";
import ContextProvider from "@/utils/Context";
import { Inter } from "@next/font/google";

export default function Home() {
  return (
    <ContextProvider>
      <Invoice/>
    </ContextProvider>
  );
}
