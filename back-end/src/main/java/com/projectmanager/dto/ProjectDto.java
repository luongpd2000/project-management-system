package com.projectmanager.dto;

import com.projectmanager.entity.ProjectEmployee;
import com.projectmanager.entity.Task;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.sql.Date;
import java.util.List;

@Data
@Builder
public class ProjectDto {

    private String name;

    private Date startDate;

    private Date endDate;

    private Date updateDate;

    private String status;

}
