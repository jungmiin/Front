import React, { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import { createWorker } from "tesseract.js";
import VideoPlayer from "./VideoPlayer";
import Input from "./Input";

function MainPage() {
  const [playList, updatePlayList] = useState(0);

  return (
    <>
      <div className="container-fluid text-center mt-5">
        <div className="row m-0 justify-content-center align-middle">
          <Input updatePlayList={updatePlayList} />
          <div
            className="col-md-5 m-2 align-middle"
            style={{
              width: "35rem",
              height: "25rem",
              border: "1px solid #eee",
            }}
          >
            <VideoPlayer list={playList} />
          </div>
          <div className="col-md-1"></div>
        </div>

        <div className="row m-0 justify-content-center align-start text-start"></div>
        <p className="float-start "></p>
      </div>
    </>
  );
}

export default MainPage;
