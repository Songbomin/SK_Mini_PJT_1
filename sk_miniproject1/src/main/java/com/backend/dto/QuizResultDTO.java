package com.backend.dto;

public class QuizResultDTO {
    private String nickname;
    private int score;
    private long elapsedTime; // 추가된 필드: 소요 시간

    public QuizResultDTO() {
    }

    public QuizResultDTO(String nickname, int score, long elapsedTime) {
        this.nickname = nickname;
        this.score = score;
        this.elapsedTime = elapsedTime;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public long getElapsedTime() {
        return elapsedTime;
    }

    public void setElapsedTime(long elapsedTime) {
        this.elapsedTime = elapsedTime;
    }
}
