import React from 'react';
import { useNavigate } from "react-router-dom";
const FlashScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 overflow-hidden">
      <div className="w-[390px] h-[874px] bg-white rounded-lg shadow-xl flex flex-col justify-center items-center">
        {/* 헤더 섹션 */}
        <div className="bg-white text-white py-8 px-4 text-center">
          <h1 className="text-3xl font-bold text-black mb-2">사자 성어 퀴즈</h1>
          <p className="text-gray-400">당신의 한자 실력을 테스트해보세요!</p>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="p-6">
          {/* 특징 섹션 */}
          <div className="space-y-6 mb-8">
            <div className="flex items-center space-x-4 bg-blue-50 p-4 rounded-lg">
              <div className="w-8 h-8 text-blue-500 flex-shrink-0">📚</div>
              <div>
                <h3 className="font-semibold text-slate-800">
                  10개의 한자성어
                </h3>
                <p className="text-sm text-slate-600">
                  다양한 한자성어를 학습할 수 있습니다
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-yellow-50 p-4 rounded-lg">
              <div className="w-8 h-8 text-yellow-500 flex-shrink-0">🏆</div>
              <div>
                <h3 className="font-semibold text-slate-800">순위 시스템</h3>
                <p className="text-sm text-slate-600">
                  다른 사용자들과 점수를 비교해보세요
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-green-50 p-4 rounded-lg">
              <div className="w-8 h-8 text-green-500 flex-shrink-0">🧠</div>
              <div>
                <h3 className="font-semibold text-slate-800">지식 향상</h3>
                <p className="text-sm text-slate-600">
                  한자 실력을 재미있게 향상시킬 수 있습니다
                </p>
              </div>
            </div>
          </div>

          {/* 시작 버튼 */}
          <div className="mt-8">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate("/input")}
            >
              퀴즈 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashScreen;