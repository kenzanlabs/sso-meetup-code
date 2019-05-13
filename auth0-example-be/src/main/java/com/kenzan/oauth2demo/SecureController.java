package com.kenzan.oauth2demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/secure")
public class SecureController {

    @RequestMapping(path="/message", method = RequestMethod.GET)
    public ResponseEntity<String> getMessage() {
        return ResponseEntity.ok("secret message\n");
    }
}