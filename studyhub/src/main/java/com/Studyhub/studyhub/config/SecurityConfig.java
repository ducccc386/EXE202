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
import java.util.List;

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
                        // 1. Cho phép truy cập công khai
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/").permitAll() // Fix lỗi 403 khi vào trang chủ
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/tutors/homepage/**").permitAll()
                        .requestMatchers("/api/requests/homepage/**").permitAll()
                        .requestMatchers("/ws/**").permitAll()
                        .requestMatchers("/api/conversations/**").permitAll()
                        .requestMatchers("/api/messages/**").permitAll()

                        // 2. Phân quyền Authority
                        .requestMatchers("/api/applications/apply").hasAuthority("ROLE_TUTOR")
                        .requestMatchers("/api/tutor/applications/**").hasAuthority("ROLE_TUTOR")
                        .requestMatchers("/api/tutors/manage/**").hasAuthority("ROLE_TUTOR")
                        .requestMatchers("/api/applications/parent/**").hasAuthority("ROLE_PARENT")
                        .requestMatchers("/api/applications/*/status").hasAuthority("ROLE_PARENT")
                        .requestMatchers("/api/requests/create").hasAuthority("ROLE_PARENT")

                        // 3. API cần xác thực
                        .requestMatchers("/api/applications/request/**").authenticated()

                        // 4. Mọi request còn lại yêu cầu đăng nhập
                        .anyRequest().authenticated())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        // Cập nhật domain Vercel của bạn tại đây
        config.setAllowedOrigins(Arrays.asList(
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "https://exe-202.vercel.app" // Domain Vercel của bạn
        ));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Cache-Control"));
        config.setExposedHeaders(Arrays.asList("Authorization"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}