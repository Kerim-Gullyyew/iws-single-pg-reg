import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface SuccessProps {}

const Success: React.FC<SuccessProps> = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mobile, email, amount } = location.state || {
    mobile: "",
    email: "",
    amount: 0,
  };
  useEffect(() => {
    if (mobile === "" || email === "" || amount === 0) {
      navigate("/");
    }
  }, [mobile, email, amount]);
  return (
    <React.Fragment>
      {mobile !== "" && email !== "" && amount !== "" && (
        <div className="fixed inset-0 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-[700px] w-[700px] min-w-[300px]">
            <div className="flex flex-col items-center mb-4">
              <h2 className="text-2xl font-bold text-green-500 mb-2">
                Payment successful!
              </h2>
              <div className="text-green-500">
                {/* Checkmark icon */}
                <svg
                  className="w-16 h-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <div className="text-sm">
              <div className="flex justify-between py-3">
                <span>Payment type</span>
                <span>Card</span>
              </div>
              <div className="flex justify-between py-3">
                <span>Mobile</span>
                <span>{mobile}</span>
              </div>
              <div className="flex justify-between py-3">
                <span>Email</span>
                <span>{email}</span>
              </div>
              <div className="flex justify-between py-3">
                <span>Amount paid</span>
                <span>£{amount}</span>
              </div>
              <div className="py-3 flex justify-center items-center">
                <div
                  onClick={() => navigate("/")}
                  className=" text-lg bg-blue text-white py-2 shadow-lg cursor-pointer tracking-wider px-6 rounded-full text-center">
                  Submit Form Again ?
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Success;
