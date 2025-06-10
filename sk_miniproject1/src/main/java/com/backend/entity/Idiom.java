package com.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "idioms")
public class Idiom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String word; // 사자성어 (한글)

    @Column(nullable = false, length = 100)
    private String hanja; // 사자성어 (한자)

    @Column(nullable = false, columnDefinition = "TEXT")
    private String meaning; // 뜻

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getHanja() {
        return hanja;
    }

    public void setHanja(String hanja) {
        this.hanja = hanja;
    }

    public String getMeaning() {
        return meaning;
    }

    public void setMeaning(String meaning) {
        this.meaning = meaning;
    }
}
