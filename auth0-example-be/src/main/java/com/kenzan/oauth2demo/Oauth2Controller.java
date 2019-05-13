package com.kenzan.oauth2demo;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import javax.naming.AuthenticationException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.AuthenticationController;
import com.auth0.IdentityVerificationException;
import com.auth0.Tokens;
import com.auth0.jwt.JWT;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Oauth2Controller {

    private static final Logger LOGGER = LoggerFactory.getLogger(Oauth2Controller.class);

    @Autowired
    private AuthenticationController controller;

    @Value(value = "${com.auth0.domain}")
    private String domain;


    @RequestMapping("/login")
    public ResponseEntity<Void> login(HttpServletRequest req) throws URISyntaxException {
        String redirectUri = req.getScheme() + "://" + req.getServerName();
        if ((req.getScheme().equals("http") && req.getServerPort() != 80) || (req.getScheme().equals("https") && req.getServerPort() != 443)) {
            redirectUri += ":" + req.getServerPort();
        }
        redirectUri += "/callback";
        String authorizeUrl = controller.buildAuthorizeUrl(req, redirectUri)
                .withAudience(String.format("https://%s/userinfo", domain))
                .build();
        return ResponseEntity.status(302).location(new URI(authorizeUrl)).body(null);
    }

    @RequestMapping(value = "/callback", method = RequestMethod.GET)
    public ResponseEntity<String> getCallback(final HttpServletRequest req, final HttpServletResponse res,
    @RequestParam(name="error_description", required = false) String errorDescription) throws ServletException, IOException, URISyntaxException {
        try {
            Tokens tokens = controller.handle(req);
            TokenAuthentication tokenAuth = new TokenAuthentication(JWT.decode(tokens.getIdToken()));
            LOGGER.info("ID token [{}]", tokens.getIdToken());
            LOGGER.info("Access token [{}]", tokens.getAccessToken());
            LOGGER.info("Refresh token [{}]", tokens.getRefreshToken());
            SecurityContextHolder.getContext().setAuthentication(tokenAuth);
            return ResponseEntity.status(302).location(new URI("/secure/message")).build();
        } catch (IdentityVerificationException e) {
            e.printStackTrace();
            SecurityContextHolder.clearContext();
            return ResponseEntity.status(500).body("this failed: " + errorDescription + "\n");
        }
    }
}