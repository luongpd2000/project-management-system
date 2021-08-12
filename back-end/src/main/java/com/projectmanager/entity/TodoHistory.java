package com.projectmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.io.Serializable;

@Table(name = "todo_history")
@Entity
@Data
public class TodoHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "des")
    private String des;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "pre_status", nullable = false)
    private String preStatus;

    @Column(name = "update_date", nullable = false)
    private String updateDate;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "update_user",referencedColumnName = "id")
    @Nullable
    private User updateUser;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "todo_id",referencedColumnName = "id")
    @Nullable
    private Todo todo;

}
