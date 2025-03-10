// pages/_app.js
import { Provider } from "react-redux";
import { store } from "@/app/store";
import "@/styles/globals.css";
import UserPersist from "@/components/shared/persistent/UserPersist";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "@/utils/ThemeContext";

import TidioChat from "@/components/shared/TidioChat/TidioChat";

export default function App({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <UserPersist>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
        <Toaster />
      </UserPersist>
    </Provider>
  );
}
