

import Table from "@/components/shared/loading/Table";
import Modal from "@/components/shared/modal/Modal";
import Panel from "@/layouts/Panel";
import {
  useGetCartQuery,
  useRemoveFromFavoritesMutation,
} from "@/services/cart/cartApi";
import {
  useDeleteFromFavoriteMutation,
  useGetFavoritesQuery,
} from "@/services/favorite/favoriteApi";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsFillCartXFill } from "react-icons/bs";
import { TbEyeShare } from "react-icons/tb";
import { useSelector } from "react-redux";
import Image from 'next/image'

const ViewFavorites = () => {
  const admin = useSelector((state) => state?.auth);

  return (
    <Panel>
      {admin?.role === "admin" && <UserRows favorites={admin?.favorite} />}
      {admin?.role === "admin" && <AdminRows />}
    </Panel>
  );
};

function UserRows({ favorites }) {
  return (
    <>
      {favorites?.rents?.length === 0 ? (
        <p className="h-full w-full flex justify-center items-center">
          Your cart is empty!
        </p>
      ) : (
        <section className="h-full w-full">
          <table className="w-full text-sm text-left text-gray-500 z-10">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Gallery
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="text-xs whitespace-nowrap">Price ($)</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Members
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="text-xs whitespace-nowrap">Start Date</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="text-xs whitespace-nowrap">End Date</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Owner
                </th>
                <th scope="col" className="px-6 py-3">
                  Purchases
                </th>
                <th scope="col" className="px-6 py-3">
                  Reviews
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {favorites?.rents?.map((rent) => (
                <tr
                  key={rent?._id}
                  className="bg-white hover:bg-secondary/50 transition-colors"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="flex -space-x-4">
                      {rent?.gallery?.map((gallery) => (
                        <Image
                          key={gallery?._id}
                          src={gallery?.url}
                          alt={gallery?.public_id}
                          height={30}
                          width={30}
                          className="h-[30px] w-[30px] rounded-secondary border border-primary object-cover"
                        />
                      ))}
                    </span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="text-sm block w-56 truncate">
                      {rent?.title}
                    </span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="text-sm">{rent?.price}</span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="text-sm">{rent?.members}</span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="text-sm">
                      {new Date(rent?.duration?.startDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="text-sm">
                      {new Date(rent?.duration?.endDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="text-sm capitalize">{rent?.type}</span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="text-sm">{rent?.owner?.name}</span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className={"text-sm"}>{rent?.admins?.length}</span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className={"text-sm"}>{rent?.reviews?.length}</span>
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <RemoveFromFavorites rentId={rent?._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}

function AdminRows() {
  const { isLoading, data, error } = useGetFavoritesQuery();
  const favorites = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Fetching favorites...", { id: "fetch-favorites" });
    }

    if (error) {
      toast.error(error?.data?.message, { id: "fetch-favorites" });
    }

    if (data) {
      toast.success(data?.message, { id: "fetch-favorites" });
    }
  }, [isLoading, data, error]);

  return (
    <>
      {!isLoading && favorites?.length === 0 && (
        <p className="h-full w-full flex justify-center items-center">
          No-one add any item to favorite list!
        </p>
      )}

      {isLoading ? (
        <>
          {[1, 2, 3].map((i) => (
            <Table key={i} repeat={15} />
          ))}
        </>
      ) : (
        !(favorites?.length === 0) && (
          <section className="h-full w-full">
            <table className="w-full text-sm text-left text-gray-500 z-10">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Avatar
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Gallery
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="text-xs whitespace-nowrap">Price ($)</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Members
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="text-xs whitespace-nowrap">
                      Start Date
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="text-xs whitespace-nowrap">End Date</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Owner
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Purchases
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Reviews
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {favorites?.map(({ admin, rents, _id }) =>
                  rents?.map((rent) => (
                    <tr
                      key={_id}
                      className="bg-white hover:bg-secondary/50 transition-colors"
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="flex -space-x-4">
                          <Image
                            src={admin?.avatar?.url}
                            alt={admin?.avatar?.public_id}
                            height={30}
                            width={30}
                            className="h-[30px] w-[30px] rounded-secondary border border-primary object-cover"
                          />
                        </span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="text-sm">{admin?.name}</span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="text-sm">{admin?.role}</span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="text-sm">{admin?.status}</span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="flex -space-x-4">
                          {rent?.gallery?.map((gallery) => (
                            <Image
                              key={gallery?._id}
                              src={gallery?.url}
                              alt={gallery?.public_id}
                              height={30}
                              width={30}
                              className="h-[30px] w-[30px] rounded-secondary border border-primary object-cover"
                            />
                          ))}
                        </span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="text-sm block w-56 truncate">
                          {rent?.title}
                        </span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="text-sm">{rent?.price}</span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="text-sm">{rent?.members}</span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="text-sm">
                          {new Date(
                            rent?.duration?.startDate
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="text-sm">
                          {new Date(rent?.duration?.endDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="text-sm capitalize">{rent?.type}</span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className="text-sm">{rent?.owner?.name}</span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className={"text-sm"}>{rent?.admins?.length}</span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <span className={"text-sm"}>
                          {rent?.reviews?.length}
                        </span>
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <RemoveFromFavorites rentId={rent?._id} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        )
      )}
    </>
  );
}

function RemoveFromFavorites({ rentId }) {
  const [
    removeFromFavorites,
    {
      isLoading: removeFromFavoritesLoading,
      data: removeFromFavoritesData,
      error: removeFromFavoritesError,
    },
  ] = useDeleteFromFavoriteMutation();

  useEffect(() => {
    if (removeFromFavoritesLoading) {
      toast.loading("Removing from favorites...", {
        id: "remove-from-favorites",
      });
    }

    if (removeFromFavoritesData) {
      toast.success(removeFromFavoritesData?.message, {
        id: "remove-from-favorites",
      });
    }

    if (removeFromFavoritesError?.data) {
      toast.error(removeFromFavoritesError?.data?.message, {
        id: "remove-from-favorites",
      });
    }
  }, [
    removeFromFavoritesLoading,
    removeFromFavoritesData,
    removeFromFavoritesError,
  ]);

  return (
    <button
      type="button"
      className="p-1.5 rounded-secondary bg-red-500 !text-white"
      onClick={() => removeFromFavorites(rentId)}
    >
      <BsFillCartXFill className="w-4 h-4" />
    </button>
  );
}

export default ViewFavorites;
