import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import VideoLength from "../shared/videoLength";
import "../components css/videoSuggestionCard.css";

const SuggestionVideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video?.videoId}`}>
      <div className="suggestion-video-card">
        <div className="suggestion-video-thumbnail">
          <img className="thumbnail-image" src={video?.thumbnails[0]?.url} />
          {video?.lengthSeconds && <VideoLength time={video?.lengthSeconds} />}
        </div>
        <div className="suggestion-video-info">
          <span className="video-title">{video?.title}</span>
          <span className="video-author-info">
            {video?.author?.title}
            {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
              <BsFillCheckCircleFill className="video-stats" />
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
    </Link>
  );
};

export default SuggestionVideoCard;
