import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";

import VideoLength from "../shared/videoLength";
import "../components css/videoCard.css";

const VideoCard = ({ video }) => {
  const fontDetail = {
    fontSize: "16px",
    fontWeight: "bold",
  };
  return (
    <Link to={`/video/${video?.videoId}`}>
      <div className="flex flex-col mb-8">
        <div className="video-thumbnail">
          <img
            className="thumbnail-image"
            src={video?.thumbnails[0]?.url}
            alt=""
            style={{ paddingLeft: "20px", borderRadius: "5px" }}
          />
          {video?.lengthSeconds && <VideoLength time={video?.lengthSeconds} />}
        </div>
        <div className="flex text-white mt-3">
          <div className="video-author-info">
            <div className="author-avatar">
              <img
                className="avatar-image"
                src={video?.author?.avatar[0]?.url}
                alt=""
              />
            </div>
          </div>
          <div className="author-details">
            <span className="video-title" style={fontDetail}>
              {video?.title}
            </span>
            <span className="author-name">
              {video?.author?.title}
              {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                <BsFillCheckCircleFill className="verified-icon" />
              )}
            </span>
            <div className="video-stats">
              <span>{`${abbreviateNumber(video?.stats?.views, 2)} views`}</span>
              <span className="video-dot">.</span>
              <span className="video-published-time">
                {video?.publishedTimeText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
