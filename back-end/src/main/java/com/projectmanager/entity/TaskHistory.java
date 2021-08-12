package com.projectmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "task_history")
@Data
public class TaskHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "des")
    private String des;

    @Column(name = "pre_starus", nullable = false)
    private String preStarus;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "update_date", nullable = false)
    private Timestamp updateDate;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "update_user",referencedColumnName = "id")
    @Nullable
    private User updateUser;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "task_id",referencedColumnName = "id")
    @Nullable
    private Task task;

}
