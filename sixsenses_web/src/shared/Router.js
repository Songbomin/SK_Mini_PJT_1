import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyInput from "../pages/MyInput";
import Question from '../pages/Question';
import Rank from '../pages/Rank';
import FlashScreen from "../pages/FlashScreen";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FlashScreen />} /> //로딩페이지
                <Route path="/input" element={<MyInput />} /> // 닉네임
                <Route path="/Qustion" element={<Question />} /> // 문제를 푸는곳
                <Route path="/Rank" element={<Rank />} /> // 랭킹 페이지
            </Routes>
        </BrowserRouter>
    );
};

export default Router;