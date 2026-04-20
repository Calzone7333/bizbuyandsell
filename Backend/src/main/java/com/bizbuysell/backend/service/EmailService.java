package com.bizbuysell.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @org.springframework.beans.factory.annotation.Value("${spring.mail.username}")
    private String fromEmail;

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    public void sendWelcomeEmail(String to) {
        String subject = "Welcome to BizBuySell!";
        String body = "Dear User,\n\nWelcome to BizBuySell! Your account has been successfully created.\n\nBest regards,\nThe BizBuySell Team";
        sendEmail(to, subject, body);
    }

    public void sendOtpEmail(String to, String otp) {
        String subject = "Verify Your Account - BizBuySell";
        String body = "Dear User,\n\nYour 6-digit verification code is: " + otp + "\n\nPlease enter this code to complete your registration.\n\nBest regards,\nThe BizBuySell Team";
        sendEmail(to, subject, body);
    }
}
