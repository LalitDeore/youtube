import React from "react";
import { Link } from "react-router-dom";
import { abbreviateNumber } from "js-abbreviation-number";
import { BsFillCheckCircleFill } from "react-icons/bs";

import VideoLength from "../shared/videoLength";

import "../components css/searchResultVideoCard.css";

const SearchResultVideoCard = ({ video }) => {
  const fontDetail = {
    fontSize: "20px",
    fontWeight: "bold",
    paddingBottom: "2px",
  };

  return (
    <Link to={`/video/${video?.videoId}`}>
      <div className="video-card">
        <div className="video-thumbnail ">
          <img
            className="thumbnail-image"
            src={video?.thumbnails[0]?.url}
            alt=""
          />
          {video?.lengthSeconds && <VideoLength time={video?.lengthSeconds} />}
        </div>
        <div className="video-info ">
          <span className="video-title" style={fontDetail}>
            {video?.title}
          </span>
          <span className="video-description">{video?.descriptionSnippet}</span>
          <div className="video-author-info ">
            <div className="author-avatar ">
              <div className="author ">
                <img
                  className=" avatar-image"
                  src={video?.author?.avatar[0]?.url}
                  alt="Video Thumbnail"
                />
              </div>
            </div>
            <div className="author-details">
              <span className="author-name">
                {video?.author?.title}
                {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="verified-icon" />
                )}
              </span>
              <div className="video-stats ">
                <span>{`${abbreviateNumber(
                  video?.stats?.views,
                  2
                )} views`}</span>
                <span className="video-dot ">.</span>
                <span className=" video-published-time ">
                  {video?.publishedTimeText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultVideoCard;
