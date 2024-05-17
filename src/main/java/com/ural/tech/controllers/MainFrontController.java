package com.ural.tech.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
@RequiredArgsConstructor
public class MainFrontController {

    @RequestMapping({"/","/petition","/contact"})
    public String loadUI() {
        System.out.println("loadUI");
        return "forward:/index.html";
    }

}
