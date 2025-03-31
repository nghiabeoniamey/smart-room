package edulive.web.server.entities.base;

import edulive.web.server.infrastructure.event.CreateRefreshTokenPrimaryEntityListener;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(CreateRefreshTokenPrimaryEntityListener.class)
public abstract class RefreshTokenPrimaryKey implements IsIdentified {

    @Id
    @Column(length = 36, updatable = false)
    private String id;

}
