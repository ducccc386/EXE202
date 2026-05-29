package com.Studyhub.studyhub.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {
    private final String SECRET_STRING = "studyhub-secret-key-must-be-long-enough-32-chars";
    private final Key JWT_SECRET = Keys.hmacShaKeyFor(SECRET_STRING.getBytes());
    private final long JWT_EXPIRATION = 86400000L;

    public String generateToken(String email, String role) {
        // Đảm bảo role luôn có tiền tố ROLE_ ngay từ khi tạo
        String finalRole = (role != null && role.startsWith("ROLE_")) ? role : "ROLE_" + role;

        return Jwts.builder()
                .setSubject(email)
                .claim("role", finalRole)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION))
                .signWith(JWT_SECRET, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getEmailFromJWT(String token) {
        return Jwts.parserBuilder().setSigningKey(JWT_SECRET).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public String getRoleFromJWT(String token) {
        return Jwts.parserBuilder().setSigningKey(JWT_SECRET).build()
                .parseClaimsJws(token).getBody().get("role", String.class);
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(JWT_SECRET).build().parseClaimsJws(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }
}