package com.backend.controller;

import com.backend.dto.QuizResultDTO;
import com.backend.entity.User;
import com.backend.entity.QuizResult;
import com.backend.repository.UserRepository;
import com.backend.repository.QuizResultRepository;
import com.backend.service.QuizResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizResultController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuizResultRepository quizResultRepository;

    @Autowired
    private QuizResultService quizResultService;

    @PostMapping("/saveResult")
    public String saveQuizResult(@RequestBody QuizResultDTO quizResultDTO) {
        User user = userRepository.findByNickname(quizResultDTO.getNickname());
        if (user != null) {
            // 중복 문제 방지: 동일 사용자에 대해 동일 결과가 있는지 확인
            boolean isDuplicate = quizResultRepository.existsByUserAndScoreAndCompletedAt(
                    user, quizResultDTO.getScore(), new Date());

            if (isDuplicate) {
                return "중복된 결과입니다. 저장하지 않았습니다.";
            }

            QuizResult quizResult = new QuizResult();
            quizResult.setUser(user);
            quizResult.setScore(quizResultDTO.getScore());
            quizResult.setCreatedAt(new Date());
            quizResult.setCompletedAt(new Date());
            quizResultRepository.save(quizResult);

            return "데이터를 성공적으로 저장했습니다.";
        } else {
            return "데이터를 저장하지 못했습니다.";
        }
    }

    @GetMapping("/ranking")
    public ResponseEntity<List<QuizResultDTO>> getRankings() {
        List<QuizResultDTO> rankings = quizResultService.getRankedUsers();
        return ResponseEntity.ok(rankings);
    }
}
