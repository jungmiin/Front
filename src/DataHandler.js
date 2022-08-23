const DataHandler = async (data) => {
  const server = "http://ec2-13-125-216-245.ap-northeast-2.compute.amazonaws.com:8000/video/?sentence=";
  //문장 공백 처리
  const sentence = data.replaceAll(" ", "%20");

  console.log(server + sentence);
  const result = await fetch(server + sentence);
  const list = await result.json();
  return list;
};

export default DataHandler;
