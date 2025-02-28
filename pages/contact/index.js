import Container from "@/components/shared/container/Container";
import Main from "@/layouts/Main";
import Image from "next/image";
import { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import { motion } from "framer-motion"; // اضافه کردن framer-motion

const locations = [
  {
    country: "ترکیه",
    address: "Gaziosmanpaşa kazım Özalp mahallesi kuleli Sokak no14/15",
    mapUrl:
      "https://maps.google.com/maps?q=Gaziosmanpa%C5%9Fa%20kaz%C4%B1m%20%C3%96zalp%20mahallesi%20kuleli%20Sokak%20no14/15&output=embed",
    image: "https://storage.kuarmonia.com/api/v1/download-shared-object/aHR0cHM6Ly9zMy1jb25zb2xlLmt1YXJtb25pYS5jb20vY29udGFjdC9hbmthcmEud2VicD9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUc4MEpVUDVQN0Q5TDNFMDk1UjFUJTJGMjAyNTAyMjglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjI4VDE2MTkwNVomWC1BbXotRXhwaXJlcz00MzIwMCZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSkhPREJLVlZBMVVEZEVPVXd6UlRBNU5WSXhWQ0lzSW1WNGNDSTZNVGMwTURnd01UTTJNU3dpY0dGeVpXNTBJam9pV0hScldYWnZhWEJMZEc4ME5USTFjeUo5LlJ3Tm1ocVFTbVl3bWw4WTFDZEo3bC1jcUl5Rk1NWDcteVA2QWlTejIxc0k0N1Q4UEZ4VVBuR2VwTlRwNTV6djdRWHZLMzVTUl96UTFTWE0zT0VCQjl3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9NzAyN2ZiM2NjZTg1NjY3ZmE3MDU4Mjc3MmYxNThmNTUyYzM3NTRjMmI2Y2YwYzRmYmZiZGMwYzY5OGIwZjRmNg",
  },
  {
    country: "کانادا",
    address: "65 Lillian St, ON, Toronto",
    mapUrl:
      "https://maps.google.com/maps?q=65%20Lillian%20st,ON.Toronto&output=embed",
    image: "https://storage.kuarmonia.com/api/v1/download-shared-object/aHR0cHM6Ly9zMy1jb25zb2xlLmt1YXJtb25pYS5jb20vY29udGFjdC90b3JlbnRvLndlYnA_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1HODBKVVA1UDdEOUwzRTA5NVIxVCUyRjIwMjUwMjI4JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDIyOFQxNjE5MzNaJlgtQW16LUV4cGlyZXM9NDMyMDAmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUpIT0RCS1ZWQTFVRGRFT1V3elJUQTVOVkl4VkNJc0ltVjRjQ0k2TVRjME1EZ3dNVE0yTVN3aWNHRnlaVzUwSWpvaVdIUnJXWFp2YVhCTGRHODBOVEkxY3lKOS5Sd05taHFRU21Zd21sOFkxQ2RKN2wtY3FJeUZNTVg3LXlQNkFpU3oyMXNJNDdUOFBGeFVQbkdlcE5UcDU1enY3UVh2SzM1U1JfelExU1hNM09FQkI5dyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmdmVyc2lvbklkPW51bGwmWC1BbXotU2lnbmF0dXJlPTVjZDQ4Yzg4ZjE0MzU3MDM3ODcxMzg5YjUwNjI4MjRjMzA4NGU4YTdlZTRhMzg0YTI1MjgwNmVlNTgxNzg5YTA",
  },
  {
    country: "ایران",
    address: "تهران، خیابان پاستور",
    mapUrl:
      "https://maps.google.com/maps?q=%D8%AA%D9%87%D8%B1%D8%A7%D9%86%20%D8%AE%DB%8C%D8%A7%D8%A8%D8%A7%D9%86%20%D9%BE%D8%A7%D8%B3%D8%AA%D9%88%D8%B1&output=embed",
    image: "https://storage.kuarmonia.com/api/v1/download-shared-object/aHR0cHM6Ly9zMy1jb25zb2xlLmt1YXJtb25pYS5jb20vY29udGFjdC90ZWhyYW4ud2VicD9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUc4MEpVUDVQN0Q5TDNFMDk1UjFUJTJGMjAyNTAyMjglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjI4VDE2MTkxN1omWC1BbXotRXhwaXJlcz00MzIwMCZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSkhPREJLVlZBMVVEZEVPVXd6UlRBNU5WSXhWQ0lzSW1WNGNDSTZNVGMwTURnd01UTTJNU3dpY0dGeVpXNTBJam9pV0hScldYWnZhWEJMZEc4ME5USTFjeUo5LlJ3Tm1ocVFTbVl3bWw4WTFDZEo3bC1jcUl5Rk1NWDcteVA2QWlTejIxc0k0N1Q4UEZ4VVBuR2VwTlRwNTV6djdRWHZLMzVTUl96UTFTWE0zT0VCQjl3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9ZmVjOWJlMjFmNWUyZjliZDdkYjgyOWIwOTY1ODM3NGEwYjc1MDM5OWI2MjY1NTU3YmVhYWQ4MWNiOGY5NWE5NQ",
  },
];

export default function Contact() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <Main>
      <Container>
        <ContactForm/>
        <section className="py-24 text-right">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-8 gap-32"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  className="h-96 relative flex flex-col items-center border p-4 rounded-lg shadow-md"
                  whileInView={{ opacity: 1, y: 0 }} // وقتی وارد viewport می‌شود
                  initial={{ opacity: 0, y: 50 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <motion.img
                    src={location.image}
                    alt={location.country}
                    className="w-full h-48 object-cover rounded-t-lg"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <h3 className="mt-4 text-xl font-semibold text-center">
                    {location.country}
                  </h3>
                  <p className="mt-2 text-center">{location.address}</p>
                  <motion.iframe
                    src={location.mapUrl}
                    width="100%"
                    height="300"
                    frameBorder="0"
                    className="mt-4 rounded-lg"
                    allowFullScreen
                    whileInView={{ opacity: 1 }} // وقتی وارد viewport می‌شود
                    initial={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Container>
    </Main>
  );
}
