package com.neatstreets.backend.repository;

import com.neatstreets.backend.model.Post;
import com.neatstreets.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {
    Optional<List<Post>> findByLatAndLngOrderByReportedAtDesc(double lat, double lng);
    Optional<List<Post>> findPostsByReportedByOrderByReportedAtDesc(User reportedBy);
}
