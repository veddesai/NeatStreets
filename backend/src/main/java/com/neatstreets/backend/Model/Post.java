package com.neatstreets.backend.model;

import com.neatstreets.backend.enums.PostStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@EnableTransactionManagement
@Transactional
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String description;

    private String imageUrl;

    private String location;

    private Date reportedAt;

    @Enumerated(EnumType.STRING)
    private PostStatus status;

    @ManyToOne
    private User reportedBy;

    @ManyToOne
    private User assignedTo;

    private Date completionTime;
}
