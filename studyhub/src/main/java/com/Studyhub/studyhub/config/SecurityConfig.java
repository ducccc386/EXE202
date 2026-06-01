package com.Studyhub.studyhub.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // 1. Cho phép tất cả các đường dẫn GET vào tutor mà KHÔNG CẦN TOKEN
                        .requestMatchers(HttpMethod.GET, "/api/tutors/**").permitAll()

                        // 2. Các đường dẫn công khai khác
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/", "/api/auth/**", "/ws/**", "/api/conversations/**", "/api/messages/**")
                        .permitAll()
                        .requestMatchers("/api/tutors/homepage/**", "/api/requests/homepage/**").permitAll()

                        // 3. Phân quyền Authority (Các rule khắt khe)
                        .requestMatchers("/api/applications/apply", "/api/tutor/applications/**",
                                "/api/tutors/manage/**")
                        .hasAuthority("ROLE_TUTOR")
                        .requestMatchers("/api/applications/parent/**", "/api/applications/*/status",
                                "/api/requests/create")
                        .hasAuthority("ROLE_PARENT")
                        .requestMatchers("/api/applications/request/**").authenticated()

                        // 4. Mọi thứ khác bắt buộc phải có Token
                        .anyRequest().authenticated())
                // 5. Thêm cấu hình này để nếu có lỗi, server sẽ in thẳng ra log
                .exceptionHandling(ex -> ex.accessDeniedHandler((req, res, e) -> {
                    System.err.println("!!! SPRING SECURITY CHẶN TẠI: " + req.getRequestURI());
                    res.sendError(403, "Access Denied");
                }))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("*")); // Cho phép mọi header để tránh lỗi CORS
        config.setExposedHeaders(Arrays.asList("Authorization"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}