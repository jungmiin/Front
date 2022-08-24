import ReactPlayer from "react-player";
import React, { useState } from "react";

const VideoPlayer = (props) => {
  const [playIndex, setPlayIndex] = useState(0);
  const [allPlayed, setAllPlayed] = useState(false);

  //console.log(props.list);
  const handleNextVideo = (playList, playIndex) => {
    if (playIndex === playList.length - 1) {
      setPlayIndex(0);
      setAllPlayed(true);
    } else {
      setPlayIndex(playIndex + 1);
    }
  };

  return (
    <div className="py-4">
      <ReactPlayer
        url={props.list[playIndex]}
        width="33rem"
        height="20rem"
        playing={allPlayed ? false : true} // 자동 재생 on
        muted={true} // 자동 재생 on
        controls={true} // 플레이어 컨트롤 노출 여부
        light={false} // 플레이어 모드
        pip={true} // pip 모드 설정 여부
        onEnded={() => {
          setAllPlayed(false);
          handleNextVideo(props.list, playIndex);
        }} // 플레이어 끝났을 때 이벤트
      />
    </div>
  );
};

export default VideoPlayer;
