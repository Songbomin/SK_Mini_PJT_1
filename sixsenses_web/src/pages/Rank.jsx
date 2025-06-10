import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import Review from "./ReviewNote";

function getIncorrect(incorrect) {
  return incorrect.map((incor,idx) => {
      const {word,meaning} = incor
      return (
          <tr key={idx} className="even:bg-gray-50">
              <th className="border border-gray-300" >{word}</th>
              <th className="border border-gray-300">{meaning}</th>
          </tr>
      );
  });
}

const Rank = () => {
  const [isToggled, setIsToggled] = useState(false); // 토글 상태
  const [users, setUsers] = useState([]); // 전체 사용자 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [currentRank, setCurrentRank] = useState(0); // 현재 사용자 등수
  const [isOpen, setIsOpen] = useState(false); // 모달창


  const location = useLocation();
  const navigate = useNavigate();
  const nickname = location.state?.nickname; // 현재 사용자 닉네임
  const correctAnswers = location.state?.correctAnswers;

  // 사용자 데이터와 본인 등수 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 전체 사용자 데이터 가져오기
        const usersResponse = await axios.get('http://localhost:8080/api/users/rankings');

        // score로 1차 정렬, id로 2차 정렬하였습니다.
        const sortedUsers = [...usersResponse.data].sort((a, b) => {
          if (b.score === a.score) {
            return a.id - b.id; // id 오름차순
          }
          return b.score - a.score; // score 내림차순
        });

        setUsers(sortedUsers)
        // 본인 등수 가져오기
        const rankResponse = await axios.get(`http://localhost:8080/api/users/rank?nickname=${nickname}`);
        setCurrentRank(rankResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nickname]);

  // 본인 등수를 기준으로 위/아래 두 개씩 사용자 가져오기
  const getSurroundingUsers = () => {
    // 정렬된 데이터에서 findIndex로 index 위치 찾기
    let currentUserIdx = users.findIndex( function(item){ return item.nickname === nickname})
    if (!currentUserIdx) return []; // 본인 등수가 없을 경우 빈 배열 반환

    const start = Math.max(0, currentUserIdx - 2); // 배열 인덱스는 0부터 시작하므로 -2
    const end = Math.min(users.length, currentUserIdx + 3); // 본인 등수 +3
    // +1을 하게 되면 본인만 포함 , +2를 하게 되면 본인+1, +3을 해야 -2~+2 데이터를 가져온다
    return users.slice(start, end);
  };

  // 토글 상태에 따라 표시할 사용자 목록 결정
  const displayUsers = isToggled ? getSurroundingUsers() : users;

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    overlay : {
      backgroundColor:'rgba(0,0,0,0.5)',
    },
    content : {
      width :"384px",
      height :"500px",
      margin:"auto",
      borderRadius:"4px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      padding:'20px',
    }
  };

  
  if (loading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <div className="w-96 h-[844px] bg-white rounded-lg shadow-lg relative">
        {/* 토글 스위치 */}
        <div className="absolute top-4 right-4 flex items-center">
          <span className="text-sm mr-2">내 등수 기준 보기</span>
          <div
            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              isToggled ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={() => setIsToggled(!isToggled)}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                isToggled ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>

        <div className="flex flex-col h-full p-4">
          {/* 본인 정보 */}
          <div className="pt-16 pb-6">
            <h1 className="text-center text-xl mb-2">
              {nickname}님 총 {correctAnswers}개 맞췄습니다.
            </h1>
            <h2 className="text-center text-lg">
              전체{" "}
              {currentRank > 0 ? currentRank : "등수를 계산할 수 없습니다."}
              등입니다
            </h2>
          </div>

          {/* 사용자 랭킹 리스트 */}
          <div className="flex-1 overflow-y-auto">
            {/* slice를 추가함으로써 TOP10 가져오기 */}
            {displayUsers.slice(0,10).map((user, index) => (
              <div key={user.id} className="flex justify-between py-3 border-b">
                <div className="flex">
                  <span className="mr-2">
                    {isToggled
                      ? users.findIndex((u) => u.id === user.id) + 1 // 실제 등수 표시
                      : index + 1}
                    .
                  </span>
                  <span
                    className={user.nickname === nickname ? "font-bold" : ""}
                  >
                    {user.nickname}
                  </span>
                </div>
                <span>{user.score}개</span>
              </div>
            ))}
          </div>

          {/* 재도전 버튼 */}
          <div className="py-6">
            <div className="flex gap-4">
              <button
                className="flex-1 bg-yellow-300 py-3 rounded-md hover:bg-yellow-400 transition-colors"
                onClick={() => navigate('/Qustion', { state: { nickname } })}
              >
                재도전
              </button>
            
              <button 
              className="flex-1 bg-yellow-300 py-3 rounded-md hover:bg-yellow-400 transition-colors"
              onClick={openModal}>오답노트</button>
              <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
                <div className="flex flex-col h-full">
                <Review/>
                <div className="mt-auto">
                <button
                  onClick={closeModal}
                  className="w-full bg-yellow-300 py-3 rounded-md hover:bg-yellow-400 transition-colors mt-4 mb-4">
                  닫기
                </button>
                </div>
                </div>
              </Modal>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rank;
