import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./assets/index.css";
import { store } from "./config/store";
import { AboutPages } from "./features/shared/presentation/pages/about.pages";
import { ContactPages } from "./features/shared/presentation/pages/contact.pages";
import { LoadingPage } from "./features/shared/presentation/pages/loading.page";
import { AdministrativeProtectedRoutesComponent } from "./features/shared/presentation/components/protected-routes/Administrative/administrative-protected-routes-component";
import { AdministrativeProtectedAdminRoutesComponent } from "./features/shared/presentation/components/protected-routes/Administrative/administrative-protected-admin-routes-component";
import {
  Admin,
  AdministrativeAppoinmentsAcceptedPage,
  AdministrativeAppoinmentsPendingPage,
  AdministrativeAppoinmentsRejectedPage,
  AdministrativeEmployeeCreatePage,
  AdministrativeEmployeeDeletePage,
  AdministrativeEmployeeUpdatePage,
  AdministrativeFacilitiesCreatePage,
  AdministrativeFacilitiesDeletePage,
  AdministrativeFacilitiesUpdatePage,
  AdministrativeVisitorCreatePage,
  AdministrativeVisitorDeletePage,
  AdministrativeVisitorUpdatePage,
} from "./features/Administrative/admin/presentation/pages";
import { ClientDashboardPage } from "./features/Administrative/client/dashboard/presentation/pages";
import { FalitiesPage } from "./features/Administrative/client/facilities/presentation/pages/falities.page";
import { ScheduleYourVisitPages } from "./features/Administrative/client/make-appointment-request/presentation/pages";
import { Profile } from "./features/Administrative/client/profile/presentation/pages";
import { FacilityPages } from "./features/Administrative/client/facilities/presentation/pages/facility.pages";
import { AdministrativeDashboardPage } from "./features/Administrative/admin/presentation/pages/administrative-dashboard.page";
import { AdministrativeProfilePage } from "./features/Administrative/admin/presentation/pages/administrative-profile.page";
import { AdministrativeVisitorPage } from "./features/Administrative/admin/presentation/pages/administrative-visitor.page";
import { AdministrativeEmployeePage } from "./features/Administrative/admin/presentation/pages/administrative-employee.page";
import { AdministrativeAppoinmentsPage } from "./features/Administrative/admin/presentation/pages/administrative-appoinments.page";
import { AdministrativeLegalPage } from "./features/Administrative/admin/presentation/pages/administrative-legal.page";
import { AdministrativeFacilitiesPage } from "./features/Administrative/admin/presentation/pages/administrative-facilities.page";
import { AdministrativeDocumentPage } from "./features/Administrative/admin/presentation/pages/administrative-document.page";
import { SignupPages } from "./features/shared/presentation/pages";
import { SigninPages } from "./features/shared/presentation/pages";
import { ForgotPasswordPages } from "./features/shared/presentation/pages";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.REACT_APP_DOMAIN_URL}>
      <Routes>
        <Route element={<LoadingPage />}>
          <Route path={process.env.REACT_APP_DOMAIN_URL} element={<App />} />

          <Route
            path={process.env.REACT_APP_DOMAIN_URL + "/forgot-password"}
            element={<ForgotPasswordPages />}
          />

          <Route
            path={process.env.REACT_APP_DOMAIN_URL + "/signup"}
            element={<SignupPages />}
          />

          <Route
            path={process.env.REACT_APP_DOMAIN_URL + "/signin"}
            element={<SigninPages />}
          />

          <Route
            path={process.env.REACT_APP_DOMAIN_URL + "/features"}
            element={<AboutPages />}
          />
          <Route
            path={process.env.REACT_APP_DOMAIN_URL + "/contact"}
            element={<ContactPages />}
          />

          <Route
            path={process.env.REACT_APP_DOMAIN_URL + "/admin"}
            element={<Admin />}
          />
          <Route
            path={process.env.REACT_APP_DOMAIN_URL + "administrative"}
            element={<AdministrativeProtectedAdminRoutesComponent />}
          >
            <Route index element={<AdministrativeDashboardPage />} />
            <Route path="profile" element={<AdministrativeProfilePage />} />
            <Route
              path="appointments"
              element={<AdministrativeAppoinmentsPage />}
            >
              <Route
                path="pending"
                element={<AdministrativeAppoinmentsPendingPage />}
              />
              <Route
                path="rejected"
                element={<AdministrativeAppoinmentsRejectedPage />}
              />
              <Route
                path="accepted"
                element={<AdministrativeAppoinmentsAcceptedPage />}
              />
            </Route>
            <Route path="visitors" element={<AdministrativeVisitorPage />}>
              <Route
                path="create"
                element={<AdministrativeVisitorCreatePage />}
              />
              <Route
                path="update"
                element={<AdministrativeVisitorUpdatePage />}
              />
              <Route
                path="delete"
                element={<AdministrativeVisitorDeletePage />}
              />
            </Route>
            <Route path="employee" element={<AdministrativeEmployeePage />}>
              <Route
                path="create"
                element={<AdministrativeEmployeeCreatePage />}
              />
              <Route
                path="update"
                element={<AdministrativeEmployeeUpdatePage />}
              />
              <Route
                path="delete"
                element={<AdministrativeEmployeeDeletePage />}
              />
            </Route>
            <Route path="facilities" element={<AdministrativeFacilitiesPage />}>
              <Route
                path="create"
                element={<AdministrativeFacilitiesCreatePage />}
              />
              <Route
                path="update"
                element={<AdministrativeFacilitiesUpdatePage />}
              />
              <Route
                path="delete"
                element={<AdministrativeFacilitiesDeletePage />}
              />
            </Route>
            <Route path="documents" element={<AdministrativeDocumentPage />} />
            <Route path="legal" element={<AdministrativeLegalPage />} />
          </Route>

          <Route
            path={process.env.REACT_APP_DOMAIN_URL + "dashboard"}
            element={<AdministrativeProtectedRoutesComponent />}
          >
            <Route index element={<ClientDashboardPage />} />
            <Route path="facilities" element={<FalitiesPage />}>
              <Route path=":facility" element={<FacilityPages />} />
            </Route>
            <Route
              path="make-appointment-request"
              element={<ScheduleYourVisitPages />}
            />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
