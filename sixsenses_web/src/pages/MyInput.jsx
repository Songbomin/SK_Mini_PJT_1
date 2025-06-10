/**
 * 1. 로그인(닉네임 페이지 관련 코드)
 *  - 공백,중복 체크 확인하기
 */
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../TailWindStyle.css';

function MyInput() {
    // 별명(닉네임) 입력 초기 설정
    const [nickname, setNickname] = useState(""); // 사용자 입력 닉네임
    const [users, setUsers] = useState([]); // 전체 사용자 랭킹 데이터
    const [loading, setLoading] = useState(true); // 로딩 상태
    const navigate = useNavigate();

    // input 값 입력시 변경되게 설정
    function onChangeHandler(evt) {
        setNickname(evt.target.value);
    }

    // 전체 사용자 데이터를 백엔드에서 가져오기
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/rankings'); // 전체 랭킹 API 호출
                setUsers(response.data); // 사용자 데이터를 상태에 저장
            } catch (error) {
                console.error('Failed to fetch user rankings:', error);
                alert("전체 랭킹 데이터를 가져오는 중 문제가 발생했습니다.");
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        fetchUsers();
    }, []);

    // 제출했을 때 반응하는 핸들러
    function onSubmitHandler(evt) {
        evt.preventDefault();

        if (nickname.trim().length === 0) {
            alert("닉네임을 입력해주세요");
            return;
        }

        // 1. 닉네임 중복 확인 API 호출
        axios.get(`http://localhost:8080/auth/check-nickname`, { params: { nickname } })
          .then((response) => {
            if (!response.data) {
              // 닉네임 중복 없음 -> 로그인 요청
                    axios.post(`http://localhost:8080/auth/login`, null, { params: { nickname } })
                .then((loginResponse) => {
                  alert(loginResponse.data); // 로그인 성공 메시지 출력
                            navigate('/Qustion', { state: { nickname } }); // 성공 시 다음 페이지로 이동
                })
                .catch((loginError) => {
                  console.error(loginError);
                  alert("로그인 중 문제가 발생했습니다.");
                });
            } else {
              alert("이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.");
            }
          })
          .catch((error) => {
            console.error(error);
            alert("중복 확인 중 문제가 발생했습니다.");
          });
    }

    // 로딩 중일 때 화면 표시
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 overflow-hidden">
  <div className="w-[390px] h-auto bg-white rounded-lg shadow-2xl flex flex-col items-center p-6">
    {/* 헤더 섹션 */}
    <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold">사자성어 퀴즈</h1>
      <p className="text-lg mt-1">당신의 한자 실력을 확인해보세요!</p>
    </div>

    {/* 메인 콘텐츠 */}
    <div className="w-full mt-6">
      {/* 이름 입력 섹션 */}
      <form onSubmit={onSubmitHandler} className="flex flex-col items-center space-y-6">
        <h2 className="text-xl font-semibold text-slate-700">이름(별명)을 입력해주세요</h2>
        <input
          className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg text-center text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          value={nickname}
          placeholder="이름(별명)을 입력해주세요"
          onChange={onChangeHandler}
        />
        <button
          type="submit"
          className="w-3/4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-lg font-semibold py-3 rounded-lg shadow-lg transition-all"
        >
          게임 시작
        </button>
      </form>
    </div>

    {/* 전체 랭킹 섹션 */}
    <div className="w-full mt-10">
      <h2 className="font-bold text-2xl text-center text-slate-700 mb-6">전체 랭킹</h2>
      <div className="px-6 space-y-4">
        {users.slice(0, 5).map((user, index) => (
          <div
            key={user.id}
            className={`flex justify-between items-center py-3 px-4 rounded-lg shadow-md ${
              user.nickname === nickname
                ? 'bg-blue-100 font-semibold'
                : 'bg-gray-100'
            }`}
          >
            <div className="flex items-center">
              <span className="mr-4 text-lg font-bold">{index + 1}.</span>
              <span className="text-lg">{user.nickname}</span>
            </div>
            <span className="text-lg font-bold text-blue-600">{user.score}개</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

    );
}

export default MyInput;
