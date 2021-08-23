package com.projectmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;

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

    @NotNull
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


//    @JsonIgnore
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "update_user",referencedColumnName = "id")
//    @Nullable
//    private User updateUser;
//
//    @JsonIgnore
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "task_id",referencedColumnName = "id")
//    @Nullable
//    private Task task;
}
