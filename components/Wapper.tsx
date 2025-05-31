import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";

type WrapperProps = {
  children: React.ReactNode;
};

export default function Wapper({ children }: WrapperProps) {
  return (
    <div>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <div className="mt-8 mb-10 px-5 md:px-[10%]">{children}</div>
    </div>
  );
}
