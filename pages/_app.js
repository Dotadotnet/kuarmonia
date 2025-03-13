// pages/_app.js
import { Provider } from "react-redux";
import { store } from "@/app/store";
import "@/styles/globals.css";
import UserPersist from "@/components/shared/persistent/UserPersist";
import AdminPersist from "@/components/shared/persistent/AdminPersist";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "@/utils/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AdminPersist>
        <UserPersist Admin>

          <ThemeProvider>
        <ToastContainer position="top-center" autoClose={3000} />
            <Component {...pageProps} />
          </ThemeProvider>
          <Toaster />
        </UserPersist>
      </AdminPersist>
    </Provider>
  );
}
