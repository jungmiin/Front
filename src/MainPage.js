import React, { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import { createWorker } from "tesseract.js";
import VideoPlayer from "./VideoPlayer";
import DataHandler from "./DataHandler";
const buttonStyle = {
  width: "7rem",
  height: "3rem",
  fontWeight: "700",
  fontSize: "20px",
  backgroundColor: "#21DC6D",
  border: "none",
  color: "#ffffff",
};

function MainPage() {
  const [textValue, setTextValue] = useState("");
  const [listenActivating, setListenActivating] = useState(false);
  const [playList, updatePlayList] = useState(0);
  let inputRef;
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      setTextValue(result);
    },
  });

  const [ocr, setOcr] = useState("");
  const [image, setImage] = useState(false);

  const worker = createWorker({
    logger: (m) => {
      console.log(m);
    },
  });
  const convertImageToText = async () => {
    if (!image) return;
    await worker.load();
    await worker.loadLanguage("kor");
    await worker.initialize("kor");
    const {
      data: { text },
    } = await worker.recognize(image);
    setOcr(text);
  };

  useEffect(() => {
    console.log("ocr입니다", ocr);
  }, [ocr]);

  useEffect(() => {
    convertImageToText();
  }, [image]);

  // 사진 업로드
  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
      setImage(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
  };

  // 사진 삭제
  const deleteImage = () => {
    URL.revokeObjectURL(image);
    setImage(false);
  };

  // 음석인식 활성화 & 비활성화 기능
  useEffect(() => {
    if (listenActivating) listen();
    else stop();
  }, [listenActivating]);

  //번역하기 버튼 누를시
  const onButtonClick = () => {
    //DataHandler()에서 주소 리스트 받아옴
    const getData = async () => {
      const data = await DataHandler(ocr ? ocr.replaceAll(" ", "").replaceAll("_", " ") : textValue);
      updatePlayList(data);
    };
    getData();
  };

  return (
    <>
      <div className="container-fluid text-center mt-5">
        <div className="row m-0 justify-content-center align-middle">
          <input
            type="file"
            accept="image/*"
            onChange={saveImage}
            // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
            // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
            onClick={(e) => (e.target.value = null)}
            ref={(refParam) => (inputRef = refParam)}
            style={{ display: "none" }}
          />
          <div className="col-md-1"></div>

          <div
            className="col-md-5 m-2 p-0"
            style={{
              width: "35rem",
              border: "1px solid #ddd",
            }}
          >
            <div>
              <div className="p-4">
                {image ? (
                  <div className="text-center ">
                    <img src={image} style={{ width: "30rem", height: "20rem" }} alt="UploadedImage" />
                    <button type="button" class="btn-close" aria-label="Close" onClick={deleteImage}></button>
                  </div>
                ) : (
                  <textarea
                    className="myText"
                    placeholder="번역할 내용을 입력하세요."
                    style={{
                      resize: "none",
                      width: "30rem",
                      height: "20rem",
                      fontSize: "30px",
                    }}
                    value={textValue}
                    onChange={(e) => {
                      setTextValue(e.target.value);
                    }}
                  ></textarea>
                )}

                <div className="row" style={{ color: "#6bacce" }}>
                  {listenActivating ? "음성인식 중 입니다." : <br></br>}
                </div>
              </div>

              <div className="" style={{ borderTop: "1px solid #ddd" }}>
                <svg
                  className="p-1 m-2 float-start myHover"
                  xmlns="http://www.w3.org/2000/svg"
                  width="2rem"
                  height="2rem"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  opacity="0.5"
                  onClick={() => {
                    setListenActivating(!listenActivating);
                  }}
                >
                  <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49a68.14 68.14 0 0 0-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 74.663 74.663 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199V2.5zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0zm-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233c.18.01.359.022.537.036 2.568.189 5.093.744 7.463 1.993V3.85zm-9 6.215v-4.13a95.09 95.09 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A60.49 60.49 0 0 1 4 10.065zm-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68.019 68.019 0 0 0-1.722-.082z" />
                </svg>
                <svg
                  className="p-1 m-2 float-start myHover"
                  xmlns="http://www.w3.org/2000/svg"
                  width="2rem"
                  height="2rem"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  opacity="0.5"
                  onClick={() => inputRef.click()}
                >
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                </svg>
                {/* <p>{image.image_file.name}</p> */}

                <button className="p-2 float-end" style={buttonStyle} onClick={onButtonClick}>
                  번역하기
                </button>
              </div>
            </div>
          </div>

          <div
            className="col-md-5 m-2"
            style={{
              width: "35rem",
              height: "25rem",
              border: "1px solid #ddd",
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
