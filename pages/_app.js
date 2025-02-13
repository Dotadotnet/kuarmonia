// pages/_app.js
import { Provider } from "react-redux";
import { store } from "@/app/store";
import "@/styles/globals.css";
import UserPersist from "@/components/shared/persistent/UserPersist";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
// import AppWithTracking from './AppWithTracking'; // مسیر صحیح را تنظیم کنید

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.hasAttribute('alt') || img.alt.trim() === "") {  // بررسی می‌کند که alt وجود ندارد یا خالی است
        console.warn(`تصویر در ایندکس ${index} فاقد ویژگی "alt" است:`, img);
      }
    });
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
      }
      
      if (chat_button) {
        chat_button.addEventListener('click', () => {
          let chatbox = document.querySelector('div.cc-1no03');
          if (chatbox) {
            if (chatbox.dataset.visible === 'false') {
              let interval = setInterval(() => { function_edite(); }, 500);
              localStorage.setItem('interval_chat_box', String(interval));
            } else {
              let interval = localStorage.getItem('interval_chat_box');
              if (interval) {
                clearInterval(parseInt(interval))
              }
            }
          }
        })

        let chatbox = document.querySelector('div.cc-1no03');
        if (chatbox) {
          if (chatbox.dataset.visible === 'true') {
            let interval = setInterval(() => { function_edite();
            }, 500);
            localStorage.setItem('interval_chat_box', String(interval));
          } else {
            let interval = localStorage.getItem('interval_chat_box');
            if (interval) {
              clearInterval(parseInt(interval))
            }
          }
        }


      }
    }, 3000)




    
  }, []);
  return (
    <Provider store={store}>
      {/* <AppWithTracking> */}
      <UserPersist>
        <Component {...pageProps} />
        <Toaster />
      </UserPersist>
      {/* </AppWithTracking> */}
    </Provider>
  );
}
