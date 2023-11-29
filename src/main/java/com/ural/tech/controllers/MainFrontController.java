package com.ural.tech.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
@RequiredArgsConstructor
public class MainFrontController {

    @RequestMapping({"/"})
    public String loadUI() {
        System.out.println("loadUI");
        return "forward:/index.html";
    }
//    @RequestMapping({"/auth"})
//    public String loadLoginForm() {
//        System.out.println("loadLoginForm");
//        return "forward:/login.html";
//    }
}
