package com.projectmanager.dto;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Data
@Builder
public class UserDto {

    @NotNull
    private Integer id;

    @NotBlank
    private String username;

    @NotBlank
    private String fullName;

    private String password;

    private String newPassword;

    @NotBlank
    private String email;

    private String phone;

    private String address;

    private Boolean admin;

    private Boolean delete;

    private Date createDate;

    private Date updateDate;

    private Integer createUser;

    //private String encryptedPassword;

}
