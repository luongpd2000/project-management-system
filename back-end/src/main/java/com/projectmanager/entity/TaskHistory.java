package com.projectmanager.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Date;

@Entity
@Table(name = "task_history")
@Data
public class TaskHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "des")
    private String des;

    @NotNull()
    @Column(name = "pre_status")
    private String preStatus;

    @NotNull
    @Column(name = "status")
    private String status;

    @Column(name = "update_date")
    private Date updateDate;

    @NotNull
    @Column(name = "update_user")
    private Integer updateUser;

    @NotNull
    @Column(name = "task_id")
    private Integer taskId;

}
