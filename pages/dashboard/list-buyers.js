

import { useSelector } from "react-redux";
import Modal from "@/components/shared/modal/Modal";
import { setRent } from "@/features/rent/rentSlice";
import Panel from "@/layouts/Panel";
import { useGetUsersQuery } from "@/services/admin/adminApi";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { IoMdPricetag } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { useDispatch } from "react-redux";
import Image from 'next/image'

const ListBuyers = () => {
  const admin = useSelector((state) => state?.auth);

  return (
    <Panel>
      {admin?.role === "admin" && <SellerView rents={admin?.rents} />}
      {admin?.role === "admin" && <AdminView />}
    </Panel>
  );
};

function SellerView({ rents }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const buyers = rents?.filter((rent) => rent?.admins?.length > 0);

  const openModal = (admin) => {
    setIsOpen(true);
    setSelectedUser(admin); // Set the selected admin when opening the modal
  };

  return (
    <>
      {buyers?.length === 0 && (
        <p className="h-full w-full flex justify-center items-center">
          Your buyers list is empty!
        </p>
      )}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gird-cols-1 gap-4">
        {buyers?.map(({ admins }) =>
          admins?.map((admin) => (
            <div
              key={admin?._id}
              className="flex flex-col gap-y-4 p-4 rounded border border-primary/20 hover:border-primary"
            >
              <article className="flex flex-col gap-y-0.5 items-center">
                <Image
                  src={admin?.avatar?.url}
                  alt={admin?.avatar?.public_id}
                  height={50}
                  width={50}
                  className="h-[50px] w-[50px] object-cover rounded-secondary"
                />
                <h1 className="text-base">{admin?.name}</h1>
                <p className="text-sm">{admin?.email}</p>
                <p className="text-xs">{admin?.address}</p>
              </article>
              <button
                type="button"
                className="text-sm bg-secondary rounded-secondary border border-primary hover:bg-primary hover:border-secondary hover:text-white transition-colors px-4 py-1 mt-auto"
                onClick={() => openModal(admin)}
              >
                View Rents
              </button>
            </div>
          ))
        )}
      </div>

      {isOpen && selectedUser && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-3/4 w-full"
        >
          <div className="flex flex-col gap-y-4 h-full overflow-y-auto">
            {selectedUser?.purchases?.map(({ rent }) => (
              <article
                key={rent?._id}
                className="flex flex-col gap-y-0.5 cursor-pointer bg-slate-50 p-2.5 rounded"
                onClick={() => {
                  router.push(
                    `/tours/${_id}?tour_title=${title
                      .replace(/[^\w\s]|[\s]+/g, "-")
                      .replace(/-+/g, "-")
                      .toLowerCase()}`
                  );
                  setIsModalOpen(false);
                }}
              >
                <h2 className="!font-normal text-base line-clamp-1">
                  {rent?.title}
                </h2>
                <p className="line-clamp-2 text-sm">{rent?.summary}</p>
                <p className="flex flex-row gap-x-2 mt-1">
                  <span className="text-xs border border-cyan-900 px-2 py-0.5 rounded flex flex-row gap-x-1 items-center">
                    <IoMdPricetag className="w-4 h-4 text-primary" /> $
                    {rent?.price}/night
                  </span>
                  <span className="text-end text-xs text-gray-500 line-clamp-1 border border-teal-900 px-2 rounded flex flex-row gap-x-1 items-center">
                    <MdLocationPin className="w-4 h-4 text-primary" />
                    {rent?.location}
                  </span>
                </p>
              </article>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
}

function AdminView() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Add state to track the selected admin
  const { isLoading, data, error } = useGetUsersQuery();
  const admins = useMemo(() => data?.data || [], [data]);
  const buyers = admins.filter((admin) => admin?.purchases?.length > 0);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message, {
        id: "buyers",
      });
    }

    if (isLoading) {
      toast.loading("Fetching buyers...", {
        id: "buyers",
      });
    }

    if (data) {
      toast.success(data?.message, {
        id: "buyers",
      });
    }
  }, [isLoading, data, error]);

  const openModal = (admin) => {
    setIsOpen(true);
    setSelectedUser(admin); // Set the selected admin when opening the modal
  };

  return (
    <>
      {!isLoading && buyers?.length === 0 && (
        <p className="h-full w-full flex justify-center items-center">
          Your buyers is empty!
        </p>
      )}

      {!isLoading && buyers?.length > 0 && (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          {buyers?.map((admin) => (
            <div
              key={admin?._id}
              className="flex flex-col gap-y-4 p-4 rounded border border-primary/20 hover:border-primary"
            >
              <article className="flex flex-col gap-y-0.5 items-center">
                <Image
                  src={admin?.avatar?.url}
                  alt={admin?.avatar?.public_id}
                  height={50}
                  width={50}
                  className="h-[50px] w-[50px] object-cover rounded-secondary"
                />
                <h1 className="text-base">{admin?.name}</h1>
                <p className="text-sm">{admin?.email}</p>
                <p className="text-xs">{admin?.address}</p>
                <p className="text-xs mt-1 flex flex-row items-center gap-x-1">
                  Total
                  <span
                    className="border border-teal-900 text-teal-900 bg-teal-100/50 px-1.5 py-0 rounded uppercase"
                    style={{ fontSize: "10px" }}
                  >
                    {admin?.rents?.length} rents
                  </span>{" "}
                </p>
              </article>
              <button
                type="button"
                className="text-sm bg-secondary rounded-secondary border border-primary hover:bg-primary hover:border-secondary hover:text-white transition-colors px-4 py-1 mt-auto"
                onClick={() => openModal(admin)}
              >
                View Rents
              </button>
            </div>
          ))}
        </div>
      )}

      {!isLoading && isOpen && selectedUser && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-3/4 w-full"
        >
          <div className="flex flex-col gap-y-4 h-full overflow-y-auto">
            {selectedUser?.purchases?.map(({ rent }) => (
              <article
                key={rent?._id}
                className="flex flex-col gap-y-0.5 cursor-pointer bg-slate-50 p-2.5 rounded"
                onClick={() => {
                  router.push(
                    `/tours/${_id}?tour_title=${title
                      .replace(/[^\w\s]|[\s]+/g, "-")
                      .replace(/-+/g, "-")
                      .toLowerCase()}`
                  );
                  setIsModalOpen(false);
                }}
              >
                <h2 className="!font-normal text-base line-clamp-1">
                  {rent?.title}
                </h2>
                <p className="line-clamp-2 text-sm">{rent?.summary}</p>
                <p className="flex flex-row gap-x-2 mt-1">
                  <span className="text-xs border border-cyan-900 px-2 py-0.5 rounded flex flex-row gap-x-1 items-center">
                    <IoMdPricetag className="w-4 h-4 text-primary" /> $
                    {rent?.price}/night
                  </span>
                  <span className="text-end text-xs text-gray-500 line-clamp-1 border border-teal-900 px-2 rounded flex flex-row gap-x-1 items-center">
                    <MdLocationPin className="w-4 h-4 text-primary" />
                    {rent?.location}
                  </span>
                </p>
              </article>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
}

export default ListBuyers;
