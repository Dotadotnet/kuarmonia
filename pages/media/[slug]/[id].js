// pages/BlogContent.js

import Main from "@/layouts/Main";
import Head from "next/head";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Image from "next/image";
import CommentsSection from "@/components/shared/comment/CommentsSection";
import VideoCard from "@/components/shared/card/VideoCard";
const MediaDetails = () => {

  const [comments, setComments] = useState("");


  const handleAddComment = (newComment) => {
    setComments((prevComments) => [
      ...prevComments,
      {
        adminName: newComment.name,
        adminAvatar: "/images/default-avatar.jpg",
        text: newComment.comment,
        date: new Date().toISOString()
      }
    ]);
  };


  return (
    <main>
      <Head>
        <title>{media?.title}</title>
      </Head>

      <Main>
        <div className="flex  w-full justify-center pt-28 flex-row h-[calc(100%-56px)] bg-white dark:bg-gray-900">
          <div className="w-full mx-auto px-4 gap-2  flex flex-col lg:flex-row-reverse ">
            <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)]  lg:py-6 overflow-y-auto">
              <div className="rounded-lg w-full h-full lg:overflow-hidden">
                <ReactPlayer
                  url={media?.media?.url}
                  controls
                  width="100%"
                  height="100%"
                  style={{ backgroundColor: "#000" }}
                  playing={true}
                />
              </div>
              <div className="text-black dark:text-white  text-sm md:text-xl m-4 ">
                {media?.title}
              </div>

              <div className="flex justify-between  m-2 flex-row mt-4">
                <div className="flex ">
                  <div className="flex items-start ">
                    <div className="flex  h-11 w-11 rounded-full overflow-hidden">
                      <Image
                        src={media?.authorId?.avatar?.url}
                        alt="avatar"
                        width={50}
                        height={50}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mr-3 ">
                    <div className="text-black dark:text-white text-md  flex items-center">
                      {media?.authorId?.name}
            
                    </div>
                    <div className="text-black/[0.7] dark:text-white/[0.7] text-sm">
                      {new Date(media?.createdAt).toLocaleDateString("fa-IR", {
                        weekday: "long"
                      })}{" "}
                      - {new Date(media?.createdAt).toLocaleDateString("fa-IR")}
                    </div>
                  </div>
                </div>
                <div className="flex  dark:text-white mt-4 md:mt-0">
                  <AiOutlineLike className="w-8 h-8 text-blue-600 k ml-2" />
                  <AiOutlineDislike className="w-8 h-8 text-red-600 ml-2" />
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      stroke-linejoin="round"
                      strokeWidth="1.5"
                      d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="text-black dark:text-white m-2 bg-gray-100 dark:bg-gray-800   text-sm md:text-base my-4 p-4 rounded-lg ">
                {media?.description}
              </div>
              <CommentsSection
                comments={comments}
                isLoading={fetchingMedia}
                onSubmit={handleAddComment}
              />
            </div>

            <div className="flex flex-col flex-start py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px] hide">
              {medias.length === 0 || fetchingMedias
                ? Array.from({ length: 6 }, (_, index) => <></>)
                : medias.map((media, index) => (
                    <VideoCard
                      id={media.id}
                      title={media.title}
                      slug={media.slug}
                      description={media.description}
                      thumbnail={media.thumbnail}
                      isLoading={fetchingMedias}
                      author={media?.authorId?.name}
                      avatar={media?.authorId?.avatar?.url}
                      superAdmin={superAdmin}
                      category={media?.category?.title}
                      createdAt={media?.createdAt}
                    />
                  ))}
            </div>
          </div>
        </div>
      </Main>
    </main>
  );
};

export default MediaDetails;
