// pages/_app.js
import { Provider } from "react-redux";
import { store } from "@/app/store";
import "@/styles/globals.css";
import UserPersist from "@/components/shared/persistent/UserPersist";
import { Toaster } from "react-hot-toast";

import TidioChat from "@/components/shared/TidioChat/TidioChat";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "c8c2280b-ea54-4b4e-99de-1b368306e8e6";
    (function () {
      let d = document;
      let s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
    setTimeout(() => {
      let chat_button = document.querySelector("span.cc-157aw");
      let function_edite = () => {

        let alerts = document.querySelectorAll('div.cc-1no03 a[role~=alert]');
        let links = document.querySelectorAll('div.cc-1no03 a[rel~=nofollow]');
        let input_email = document.querySelector('div.cc-1no03 input[name~=message_field_identity-email]');

        alerts.forEach(alert => {
          alert.remove()
        });
        links.forEach(link => {
          link.remove()
        });
        if (input_email) {
          input_email.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.remove()
        }
        let all_elements = document.querySelectorAll('div.cc-1no03 *');
        all_elements.forEach(element => {
          element.style.cssText += 'font-family:Vazir !important';
        });
        let option_button = document.querySelector('a.cc-8ve5w.cc-gge6o');
        if (option_button) {
          option_button.remove();
        }
        let width_doc = document.body.clientWidth;
        let chat = document.querySelector('a.cc-1m2mf');
        if (width_doc < 768) {
          let margin_right = (width_doc - 54) / 2;
          let style = 'right : ' + String(margin_right) + 'px ' + '!important; bottom : 35px !important'
          if (chat){
            chat.setAttribute("style", style); 
          }

        }else{
          let style = 'right : ' + '50px' +   'px ' + '!important; bottom : 25px !important'
          if (chat){
            chat.setAttribute("style", style); 
          }
        }

      }

      let interval = setInterval(() => {
        function_edite();
      }, 300);
    }, 3000)
  }, []);

  return (
    <Provider store={store}>
      <UserPersist>
        <Component {...pageProps} />
        <Toaster />

      </UserPersist>
    </Provider>
  );
}
