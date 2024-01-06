package com.jhuma.chat;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker //Message Broker in Websocket Module
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer
{
    //sockJS fallback option - primary transport : Websocket
    // & switches to other transport techniques (HTTP long poling, HTTP streaming) incase WebSocket fails
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry)
    {
        registry.addEndpoint("/ws").withSockJS(); //defines the websocket endpoint with SockJS as fallback option
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry)
    {
        registry.enableStompBrokerRelay("/topic").setRelayHost("localhost").setRelayPort(8080); //type of relay point-point or publish-subscribe
        registry.setApplicationDestinationPrefixes("/app"); //annotated methods will work for /app prefix

    }
}
