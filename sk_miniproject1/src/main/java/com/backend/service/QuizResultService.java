package com.backend.service;

import com.backend.dto.QuizResultDTO;
import com.backend.entity.QuizResult;
import com.backend.repository.QuizResultRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizResultService {

    private final QuizResultRepository quizResultRepository;

    // 생성자 주입
    public QuizResultService(QuizResultRepository quizResultRepository) {
        this.quizResultRepository = quizResultRepository;
    }

    public List<QuizResultDTO> getRankedUsers() {
        List<QuizResult> results = quizResultRepository.findAll();

        return results.stream()
                .collect(Collectors.groupingBy(
                        QuizResult::getUser,
                        Collectors.summingInt(QuizResult::getScore)
                ))
                .entrySet()
                .stream()
                .map(entry -> {
                    long totalTime = results.stream()
                            .filter(result -> result.getUser().equals(entry.getKey()))
                            .mapToLong(result -> Duration.between(
                                    result.getCreatedAt().toInstant(),
                                    result.getCompletedAt().toInstant()
                            ).toSeconds())
                            .sum();

                    return new QuizResultDTO(
                            entry.getKey().getNickname(),
                            entry.getValue(),
                            totalTime
                    );
                })
                .sorted(Comparator
                        .comparingInt(QuizResultDTO::getScore).reversed()
                        .thenComparingLong(QuizResultDTO::getElapsedTime))
                .collect(Collectors.toList());
    }
}
