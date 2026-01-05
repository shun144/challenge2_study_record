import React, { useState, useEffect } from "react";
import { getAllRecords } from "./utils/supabaseFuntion";

const StudyRecord = () => {
  const [records, setRecords] = useState([]);
  const [studyTitle, setStudyTitle] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllRecords();
        if (res.status === 200) {
          console.log(res.data);
        }
      } catch (err) {
        console.log(`%c ${err}`, "color:red");
      }
    })();
  }, []);

  const handleChangeText = (event) => {
    const val = event.target.value;
    setStudyTitle(val);
  };

  const handleChangeTime = (event) => {
    const val = parseInt(event.target.value);
    if (Number.isNaN(val)) setError("入力されていない項目があります");

    setStudyTime(val);
  };

  const addRecord = () => {
    if (studyTitle === "" || Number.isNaN(studyTime) || studyTime === "") {
      setError("入力されていない項目があります");
      return;
    }

    if (studyTime <= 0) {
      setError("学習時間は1時間以上を指定してください");
      return;
    }

    setError("");

    const newRecord = {
      title: studyTitle,
      time: studyTime,
    };

    setRecords((prev) => [...prev, newRecord]);
    setStudyTitle("");
    setStudyTime(0);
  };

  const totalTime = records.reduce((acc, cur) => {
    return acc + parseInt(cur.time);
  }, 0);

  return (
    <>
      <h1>学習記録一覧</h1>
      <div>
        <label htmlFor="study-content">学習内容</label>
        <input
          name="study-content"
          type="text"
          value={studyTitle}
          onChange={handleChangeText}
        />
      </div>
      <div>
        <label htmlFor="study-time">学習時間</label>
        <input
          type="number"
          min={0}
          name="study-time"
          value={studyTime}
          onChange={handleChangeTime}
        />
      </div>
      <div>{`入力されている学習内容：${studyTitle}`}</div>
      <div>{`入力されている時間：${studyTime}時間`}</div>
      <ul className="record-list">
        {records.map(({ title, time }) => (
          <li key={title}>{`${title} ${time}時間`}</li>
        ))}
      </ul>
      <button onClick={addRecord}>登録</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>{`合計時間：${totalTime} / 1000(h)`}</p>
    </>
  );
};

export default StudyRecord;
