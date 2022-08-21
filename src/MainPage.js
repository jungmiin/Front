import React from "react";

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
  return (
    <div className="container-fluid text-center mt-5">
      <div className="row m-0 justify-content-center align-middle">
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
              <textarea
                className="myText"
                placeholder="번역할 내용을 입력하세요."
                style={{
                  resize: "none",
                  width: "30rem",
                  height: "20rem",
                  fontSize: "30px",
                }}
              ></textarea>
            </div>
            <div className="text-end" style={{ borderTop: "1px solid #ddd" }}>
              <button className="p-2" style={buttonStyle}>
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
          Column
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
}

export default MainPage;
