import React, { useState } from 'react';
import { Book } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReviewNote = () => {
  const location = useLocation();
  const incorrects = location.state?.incorrect;
  console.log('현재 incorrect 값:', incorrects);

  return (
        <div>
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Book className="w-8 h-8 text-indigo-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">오답 노트</h1>
          </div>
          <p className="text-gray-600">나만의 사자성어 학습 기록</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6">
            {incorrects.map(incorrect => (
              <div key={incorrect.word} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100">
                <div className="p-6">
                  {/* 사자성어 헤더 */}
                  <div className="mb-4">
                    <div className="flex items-baseline space-x-2">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {incorrect.word}
                      </h2>
                      <span className="text-lg text-gray-600 font-medium">
                        {incorrect.hanja}
                      </span>
                    </div>
                    <div className="h-0.5 w-20 bg-indigo-600 mt-2"></div>
                  </div>

                  {/* 의미 */}
                  <div className="group">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">의미</h3>
                    <p className="text-gray-800 leading-relaxed">
                      {incorrect.meaning}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
  );
};

export default ReviewNote;