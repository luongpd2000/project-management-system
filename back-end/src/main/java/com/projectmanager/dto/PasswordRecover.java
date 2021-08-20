package com.projectmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PasswordRecover {
    private Integer id;
    private String email;
}
