package com.projectmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@Table(name = "project")
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "des")
    private String des;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "is_deleted", nullable = false)
    private Boolean deleted;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "create_date", nullable = false)
    private Timestamp createDate;

    @Column(name = "update_date")
    private Timestamp updateDate;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "create_user",referencedColumnName = "id")
    @Nullable
    private User createUser;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "update_user",referencedColumnName = "id")
    private User updateUser;

    @OneToMany(mappedBy = "project_employee", fetch = FetchType.LAZY)
    private List<ProjectEmployee> projectEmployeeList;

    @OneToMany(mappedBy = "project_task", fetch = FetchType.LAZY)
    private List<Task> taskList;
}
