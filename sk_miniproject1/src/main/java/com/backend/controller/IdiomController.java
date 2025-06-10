package com.backend.controller;

import com.backend.entity.Idiom;
import com.backend.repository.IdiomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/idioms")
public class IdiomController {

    @Autowired
    private IdiomRepository idiomRepository;

    // DB에서 랜덤 사자성어 1개 반환
    @GetMapping("/random")
    public Optional<Idiom> getRandomIdiom() {
        long count = idiomRepository.count();
        if (count == 0) {
            // idioms 테이블 비어있으면 Optional.empty()
            return Optional.empty();
        }
        // PK가 1부터 시작한다고 가정했을 때
        int randomIndex = (int)(Math.random() * count);
        return idiomRepository.findById((long) randomIndex + 1);
    }
}
