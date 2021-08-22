package com.projectmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Table(name = "project_employee")
@Data
public class ProjectEmployee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

//    @JsonIgnore
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "project_id",referencedColumnName = "id")
//    @Nullable
//    private Project project_employee;

    @Column(name = "project_id", nullable = false)
    private Integer projectId;

//    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id",referencedColumnName = "id")
//    @Nullable
    private User user;

//    @Column(name = "user_id", nullable = false)
//    private Integer userId;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "des")
    private String des;

    @Column(name = "is_deleted")
    private Boolean delete;

}
