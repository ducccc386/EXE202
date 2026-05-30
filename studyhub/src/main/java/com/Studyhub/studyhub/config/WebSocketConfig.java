package com.Studyhub.studyhub.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*") // Dùng cái này thay vì setAllowedOrigins
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Tin nhắn gửi từ Client đến Server phải bắt đầu bằng /app
        registry.setApplicationDestinationPrefixes("/app");
        // Tin nhắn gửi từ Server đến Client sẽ bắt đầu bằng /topic
        registry.enableSimpleBroker("/topic");
    }
}