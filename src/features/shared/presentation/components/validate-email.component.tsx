import React, { useState, useEffect } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/dispatch-selector.hooks";
import { selectverifyUserEmail } from "../slices/verify-email.slices";
import { Button } from "@mui/material";
import { verifyUserEmailWithCode } from "../slices/verify-email-with-code";
import { useTimer } from "../../../../hooks/useTimer";
import { removeAccountNotVerified } from "../slices/remove-acc-not-verified";

export const ValidateEmail = () => {
  const { timeLeft, timeStop } = useTimer();
  const [otp, setOtp] = useState("");
  const dispatch = useAppDispatch();

  const getVerifyUserEmail: any = useAppSelector(selectverifyUserEmail);
  const handleChange = (otp: any) => {
    setOtp(otp);
  };

  const handleClick = () => {
    if (otp.length <= 4) {
      return;
    }
    dispatch(
      verifyUserEmailWithCode({
        code: otp,
        email: getVerifyUserEmail?.data.email,
      })
    );
  };

  useEffect(() => {
    if (timeStop) {
      dispatch(
        removeAccountNotVerified({ email: getVerifyUserEmail?.data.email })
      );
    }
  }, [timeStop, dispatch, getVerifyUserEmail]);
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="w-[40px] h-[40px] flex items-center justify-center absolute right-[10px] top-[10px] border rounded-full">
              <p>{timeLeft}</p>
            </div>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    width="600.619px"
                    height="600.619px"
                    viewBox="0 0 600.619 600.619"
                  >
                    <g>
                      <g>
                        <path
                          d="M541.979,5.706H58.64c-32.059,0-58.14,26.082-58.14,58.14V424.84c0,31.556,25.271,57.32,56.636,58.121l0.139,53.936
			c0.021,8.118,1.679,15.971,4.928,23.34c3.092,7.013,7.483,13.259,13.048,18.562c10.903,10.391,25.18,16.114,40.198,16.114
			c10.843,0,21.471-3.056,30.737-8.835L311.471,482.98h230.508c32.059,0,58.141-26.081,58.141-58.14V63.846
			C600.117,31.788,574.037,5.706,541.979,5.706z M557.277,424.84c0,8.449-6.85,15.3-15.299,15.3H303.586
			c-2.863,0-5.668,0.803-8.097,2.318L123.512,549.729c-2.582,1.61-5.357,2.343-8.063,2.343c-7.958,0-15.311-6.335-15.334-15.285
			l-0.208-81.386c-0.021-8.435-6.866-15.261-15.3-15.261H58.64c-8.45,0-15.3-6.851-15.3-15.301V63.846c0-8.45,6.851-15.3,15.3-15.3
			h483.338c8.449,0,15.301,6.85,15.301,15.3V424.84H557.277L557.277,424.84z"
                        />
                        <path
                          d="M115.449,595.413c-15.147,0-29.545-5.771-40.542-16.252c-5.614-5.351-10.042-11.649-13.161-18.723
			c-3.277-7.434-4.95-15.354-4.97-23.541l-0.137-53.451c-15.138-0.51-29.304-6.771-39.939-17.663C5.93,454.755,0,440.214,0,424.84
			V63.846c0-32.334,26.306-58.64,58.64-58.64h483.338c32.333,0,58.639,26.306,58.641,58.64v360.995
			c0,32.334-26.306,58.64-58.641,58.64H311.614L146.45,586.502C137.104,592.332,126.384,595.413,115.449,595.413z M58.64,6.206
			C26.857,6.206,1,32.063,1,63.846V424.84c0,15.111,5.829,29.404,16.414,40.244c10.566,10.821,24.677,16.993,39.735,17.377
			l0.486,0.013l0.14,54.422c0.021,8.048,1.664,15.833,4.885,23.139c3.066,6.953,7.418,13.145,12.936,18.402
			c10.811,10.303,24.964,15.977,39.853,15.977c10.748,0,21.285-3.029,30.472-8.759L311.327,482.48h230.651
			c31.783,0,57.641-25.857,57.641-57.64V63.846c-0.002-31.783-25.859-57.64-57.641-57.64H58.64z M115.449,552.572
			c-8.708,0-15.812-7.081-15.834-15.784l-0.208-81.386c-0.021-8.14-6.66-14.762-14.8-14.762H58.64c-8.712,0-15.8-7.088-15.8-15.801
			V63.846c0-8.712,7.088-15.8,15.8-15.8h483.338c8.713,0,15.801,7.088,15.801,15.8V424.84c-0.002,8.712-7.09,15.8-15.801,15.8
			H303.586c-2.772,0-5.481,0.775-7.833,2.242L123.777,550.153C121.24,551.736,118.36,552.572,115.449,552.572z M58.64,49.046
			c-8.161,0-14.8,6.639-14.8,14.8V424.84c0,8.161,6.64,14.801,14.8,14.801h25.966c8.69,0,15.778,7.069,15.8,15.76l0.208,81.386
			c0.021,8.153,6.676,14.786,14.834,14.786c2.724,0,5.42-0.784,7.798-2.267l171.977-107.271c2.51-1.566,5.402-2.395,8.362-2.395
			h238.393c8.16,0,14.799-6.639,14.799-14.8l0.002-360.994c0-8.161-6.64-14.8-14.801-14.8H58.64z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Email Verification
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 flex">
                      We've sent a verification code to your email -{" "}
                      {getVerifyUserEmail?.data.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <MuiOtpInput
                  value={otp}
                  onChange={handleChange}
                  length={5}
                  TextFieldsProps={{ size: "medium", placeholder: "-" }}
                />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleClick}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
