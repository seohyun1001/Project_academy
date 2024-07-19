package org.zerock.project_academy;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Log4j2
@RequiredArgsConstructor
public class MainController {
    @GetMapping("/")
    @CrossOrigin(origins = "http://localhost:3000")
    public String index() {
        return "/member/login";
    }
}
