package com.ural.tech.controllers;

import com.ural.tech.schemas.AllPointResponse;
import com.ural.tech.schemas.ConfigResponse;
import com.ural.tech.utils.EndPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
@RequiredArgsConstructor
public class MainFrontController {

    @RequestMapping({"/"})
    public String loadUI() {

        return "forward:/index.html";
    }

}
