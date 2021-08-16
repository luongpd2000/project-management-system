package com.projectmanager.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projectmanager.entity.User;
import com.projectmanager.service.UserService;
import com.projectmanager.service.service_impl.UserServiceImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final ApplicationContext ctx;

    public AuthenticationFilter(AuthenticationManager authenticationManager, ApplicationContext ctx) {
        this.authenticationManager = authenticationManager;
        this.ctx = ctx;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        try {
            User user = new ObjectMapper().readValue(request.getInputStream(), User.class);
//            UserLogin user = new ObjectMapper().readValue(request.getInputStream(), UserLogin.class);

            System.out.println(user.getUsername() + " " + user.getPassword() + " attemptAuthentication");
            UserService userService = ctx.getBean(UserService.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(),
                            user.getPassword(), userService.loadUserByUsername(user.getUsername()).getAuthorities()));
        }
        catch(IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        UserService userService = ctx.getBean(UserService.class);
        String username = ((org.springframework.security.core.userdetails.User) authResult.getPrincipal()).getUsername();
        System.out.println(username);
        String claim = userService.loadUserByUsername(username).getAuthorities().toString();
        System.out.println(claim);
        String token = Jwts.builder().setSubject(username).claim("role",claim)
                        .setExpiration(new Date(System.currentTimeMillis() + 24*60*60*1000))
                        .signWith(SignatureAlgorithm.HS512, SecurityConstants.TOKEN_SECRET)
                        .compact();


        Optional<User> user = userService.findByUsername(username);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"" + SecurityConstants.HEADER_STRING + "\":\""
                + SecurityConstants.TOKEN_PREFIX + token + "\","
                + "\"username\":\"" + username + "\","
                + "\"id\":" + String.valueOf(user.get().getId() + ",")
                +"\"admin\": " + user.get().getAdmin()
                + "}");
    }


}
