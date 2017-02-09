package com.globant.corp.gtools.webUI.controller;

import java.security.Principal;
import java.util.Collections;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ramiro.acoglanis
 */

@RestController
public class SecurityController {
    
    @RequestMapping("/auth")
    public Principal user(Principal user) {
      return user;
    }
    
    @RequestMapping("/token")
    public Map<String,String> token(HttpSession session) {
        return Collections.singletonMap("token", session.getId());
    }
    
    
}
