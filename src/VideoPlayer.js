import ReactPlayer from "react-player";
import React, { useState } from "react";

const VideoPlayer = () => {
  const [playIndex, setPlayIndex] = useState(0);

  //url 받아오는거 추가해야됨
  const playList = [
    { index: 1, url: "http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20200821/733655/MOV000256297_700X466.mp4" },
    { index: 2, url: "https://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191016/628088/MOV000250671_700X466.mp4" },
  ];

  const handleNextVideo = (video, playIndex) => {
    if (playIndex === video.length - 1) {
      setPlayIndex(0);
    } else {
      setPlayIndex(playIndex + 1);
    }
  };

  return (
    <div>
      <ReactPlayer
        url={playList[playIndex].url}
        width="33rem"
        height="20rem"
        playing={true} // 자동 재생 on
        muted={true} // 자동 재생 on
        controls={true} // 플레이어 컨트롤 노출 여부
        light={false} // 플레이어 모드
        pip={true} // pip 모드 설정 여부
        onEnded={() => {
          handleNextVideo(playList, playIndex);
        }} // 플레이어 끝났을 때 이벤트
      />
    </div>
  );
};

export default VideoPlayer;
