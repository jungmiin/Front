import ReactPlayer from "react-player";
import React, { useEffect, useState } from "react";
import DataHandler from "./DataHandler";

const VideoPlayer = (props) => {
  const [playIndex, setPlayIndex] = useState(0);
  const [playList, updatePlayList] = useState(0);

  //새문장을 입력해서 번역을 시도했을 때 안됨.. 새로고침해야됨

  //DataHandler()에서 주소 리스트 받아옴
  useEffect(() => {
    const getData = async () => {
      const data = await DataHandler(props.data);
      updatePlayList(data);
    };
    getData();
  }, []);

  const handleNextVideo = (playList, playIndex) => {
    if (playIndex === playList.length - 1) {
      setPlayIndex(0);
    } else {
      setPlayIndex(playIndex + 1);
    }
  };

  return (
    <div>
      <ReactPlayer
        url={playList[playIndex]}
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
