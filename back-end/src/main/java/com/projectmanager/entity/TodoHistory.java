package com.projectmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Date;

@Table(name = "todo_history")
@Entity
@Data
public class TodoHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotNull
    @Column(name = "des")
    private String des;

    @NotNull
    @Column(name = "status")
    private String status;

    @NotNull
    @Column(name = "pre_status")
    private String preStatus;

    @Column(name = "update_date")
    private Date updateDate;

//    @JsonIgnore
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "update_user",referencedColumnName = "id")
//    @Nullable
//    private User updateUser;
//
//    @JsonIgnore
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "todo_id",referencedColumnName = "id")
//    @Nullable
//    private Todo todo;
    @NotNull
    @Column(name = "update_user")
    private Integer updateUser;

    @NotNull
    @Column(name = "todo_id")
    private Integer todoId;
}
