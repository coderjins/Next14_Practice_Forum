"use client";

import React, { useState, useEffect } from "react";
import styles from "./ThreadList.module.scss";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function ThreadList() {
  const router = useRouter();
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    fetch("http://10.58.52.70:8000/threadlist", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setThreads(data.data));
  }, []);

  const timeAgo = (dateString) => {
    const diffInSeconds = Math.floor(
      (new Date() - new Date(dateString)) / 1000
    );
    const timeInterval = [
      [604800, "주"],
      [86400, "일"],
      [3600, "시간"],
      [60, "분"],
      [1, "초"],
    ].find(([seconds]) => diffInSeconds >= seconds);

    return `${Math.floor(diffInSeconds / timeInterval[0])}${
      timeInterval[1]
    } 전`;
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className={styles.postList}>
      <div className={styles.container}>
        <div className={styles.threadList}>
          {threads.map((thread) => (
            <div className={styles.post} key={thread.threadId}>
              <div className={styles.writerDesktop}>
                <div className={styles.name}>
                  <div className={styles.profileThumb}>
                    <img className={styles.pic} alt="a" src={"./mac1.jpg"} />
                    <div className={styles.profilePicLine}></div>
                  </div>
                  <span className={styles.userName}>{thread.nickname}</span>
                </div>
                <div className={styles.function}>
                  <span className={styles.dateTime}>
                    {timeAgo(thread.createdAt)}
                  </span>
                </div>
              </div>
              <span className={styles.threadContent}>{thread.content}</span>
              <div className={styles.actionAndInfo}>
                <div className={styles.commentInfo}>
                  <span className={styles.commentCount}>
                    댓글 {thread.commentCount}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className={styles.action}>
            <Button onClick={handleLoginClick} className="smallLoginButton">
              로그인
            </Button>

            <Button className="smallButton">글쓰기</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
