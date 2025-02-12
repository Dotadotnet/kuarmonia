

import Panel from "@/layouts/Panel";

const ListPosts = () => {
 
  return (
    <>
      <Panel>
        <section className="h-full w-full">
          <table className="w-full text-sm text-left text-gray-500 z-10">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  پروفایل
                </th>
                <th scope="col" className="px-6 py-3">
                  نام 
                </th>
                <th scope="col" className="px-6 py-3">
                  ایمیل
                </th>
                <th scope="col" className="px-6 py-3">
                  موبایل
                </th>
                <th scope="col" className="px-6 py-3">
                  سفارشات
                </th>
                <th scope="col" className="px-6 py-3">
                  نقش
                </th>
                <th scope="col" className="px-6 py-3">
                  وضعیعت
                </th>
                <th scope="col" className="px-6 py-3">
                  عملکرد
                </th>
              </tr>
            </thead>
            <tbody>
             
                  <>
                    <tr className="bg-white hover:bg-secondary/50 transition-colors">
                      <td
                        scope="row"
                      >
                       
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                   
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                  
                      </td>
                    </tr>
                  </>
                
              
            </tbody>
          </table>
        </section>
      </Panel>

      
    </>
  );
};

export default ListPosts;
