package com.backend.controller;

import com.backend.entity.User;
import com.backend.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    // 닉네임 중복확인
    @GetMapping("/check-nickname")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname) {
        boolean exists = (userRepository.findByNickname(nickname) != null);
        return ResponseEntity.ok(exists);
    }

    // 로그인 (없으면 새로 등록)
    @PostMapping("/login")
    public String login(@RequestParam String nickname, HttpSession session) {
        User user = userRepository.findByNickname(nickname);
        if (user == null) {
            user = new User();
            user.setNickname(nickname);
            userRepository.save(user);
            return "새로운 사용자로 등록되었습니다. 닉네임: " + user.getNickname();
        }
        session.setAttribute("user", user);
        return "로그인 성공: " + user.getNickname();
    }
}
