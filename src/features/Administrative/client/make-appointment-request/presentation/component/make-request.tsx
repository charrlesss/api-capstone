import React, { useRef } from "react";
import { BackdropLoading } from "../../../../../shared/presentation/pages/loading.page";
import { SelectCountry } from "./country";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../../../../../hooks/dispatch-selector.hooks";
import { visitorAppointment } from "../slices/visitor-appointment.slices";
import { useInterceptorAxios } from "../../../../../../lib/interceptor-axios";
import { useGetClientDetails } from "../../../../../../hooks/user-details.hooks";
export const MakeRequest = () => {
  const {client} = useGetClientDetails()
  const dispatch = useAppDispatch()
  const {instance ,getAccessToken} = useInterceptorAxios()

  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const contact = useRef<HTMLInputElement>(null);
  const address = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);
  const zipcode = useRef<HTMLInputElement>(null);
  const departureDate = useRef<HTMLInputElement>(null);
  const arrivalDate = useRef<HTMLInputElement>(null);
  const purpose = useRef<HTMLTextAreaElement>(null);
  const country = useRef<HTMLSelectElement>(null);

const token = getAccessToken()
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(token)
    dispatch((visitorAppointment({
      userIdRequest:client._id,
      ACCESS_TOKEN:token,
      interceptor:instance,
      firstName:firstName.current?.value,
      lastName:lastName.current?.value,
      email:email.current?.value,
      contact:contact.current?.value,
      address:address.current?.value,
      city:city.current?.value,
      zipcode:zipcode.current?.value,
      country:country.current?.value,
      arrivalDate:arrivalDate.current?.value,
      departureDate:departureDate.current?.value,
      purpose:purpose.current?.value,
    })))

  };

  return (
    <div className="w-full h-[870px] absolute -top-[30px] bg-opacity-10 backdrop-blur-xl bg-gray-500 ">
      <div className="w-[600px] mt-4 relative h-auto border mx-auto p-5 bg-white">
        <h1 className="font-['Bebas_Neue'] text-3xl mb-4">
          Appointment Request Form for Visitors
        </h1>
        <form className="w-full h-auto  " onSubmit={handleSubmit}>
          <div className="flex flex-col  justify-between gap-x-4">
            <p className="pb-2 text-gray-900 text-md font-medium capitalize">
              Visitor's Name
            </p>
            <div className="flex flex-row  justify-between gap-x-2">
              <div className="mb-3 w-full">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstname"
                  type="text"
                  ref={firstName}
                  required
                />
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="firstname"
                >
                  First Name
                </label>
              </div>
              <div className="mb-3  w-full">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastname"
                  type="text"
                  ref={lastName}
                  required
                />
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="lastname"
                >
                  Last Name
                </label>
              </div>
            </div>
            <div className="block">
              <p className="pb-2 text-gray-900 text-md font-medium capitalize">
                Visitor's Email
              </p>
              <div className="mb-3  w-full">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  ref={email}
                  required
                />
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="email"
                >
                  email: example@gmail.com
                </label>
              </div>
            </div>
            <div className="block">
              <p className="pb-2 text-gray-900 text-md font-medium capitalize">
                Visitor's Contact Number
              </p>
              <div className="mb-3  w-full">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="contact"
                  type="text"
                  ref={contact}
                  required
                />
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="contact"
                ></label>
              </div>
            </div>

            <div className="block">
              <p className="pb-2 text-gray-900 text-md font-medium capitalize">
                Visitor's Address
              </p>
              <div className="mb-3  w-full">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  type="text"
                  ref={address}
                  required
                />
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="address"
                >
                  Street Address
                </label>
                <div className="flex gap-x-2">
                  <div>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="city"
                      type="text"
                      ref={city}
                      required
                    />
                    <label
                      className="block text-gray-700 text-sm font-semibold mb-2"
                      htmlFor="city"
                    >
                      City
                    </label>
                  </div>
                  <div>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="zip-code"
                      type="text"
                      ref={zipcode}
                      required
                    />
                    <label
                      className="block text-gray-700 text-sm font-semibold mb-2"
                      htmlFor="zip-code"
                    >
                      Postal / Zip Code
                    </label>
                  </div>
                  <div>
                    <SelectCountry  country={country}/>
                    <label
                      className="block text-gray-700 text-sm font-semibold mb-2"
                      htmlFor="country"
                    >
                      Country
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="block flex gap-x-2 ">
              <div className="relative w-full">
                <p className="pb-2 text-gray-900 text-md font-medium capitalize">
                  Visitor's Arrival Date
                </p>

                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date"
                  id="arrival-date"
                  ref={arrivalDate}
                  required
                />
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="arrival-date"
                >
                  Date
                </label>
              </div>
              <div className="relative w-full">
                <p className="pb-2 text-gray-900 text-md font-medium capitalize">
                  Visitor's Departure Date
                </p>
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date"
                  id="departure-date"
                  ref={departureDate}
                  required
                />
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="departure-date"
                >
                  Date
                </label>
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                What is the purpose of this visit
              </label>
              <textarea
                ref={purpose}
                id="message"
                rows={4}
                required
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your purpose..."
              />
            </div>
            <div className="w-full h-auto mt-2">
              <Button type="submit" size="small" variant="outlined">
                Submit Request
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
