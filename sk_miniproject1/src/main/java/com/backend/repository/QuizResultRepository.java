package com.backend.repository;

import com.backend.entity.QuizResult;
import com.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {

    // 사용자, 점수, 완료 시간을 기준으로 중복 데이터 확인
    boolean existsByUserAndScoreAndCompletedAt(User user, int score, Date completedAt);
}
