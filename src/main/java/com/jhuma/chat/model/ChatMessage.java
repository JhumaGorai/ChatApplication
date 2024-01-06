package com.jhuma.chat.model;


import lombok.Data;

@Data
public class ChatMessage
{
    public MessageType type;
    private String content;
    private String sender;

    public enum MessageType
    {
        CHAT, LEAVE, JOIN
    }
}
