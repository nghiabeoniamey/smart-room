package edulive.web.server.infrastructure.event;

import edulive.web.server.entities.base.AuditEntity;
import edulive.web.server.utils.AuditorProviderByAuthenticationUtil;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

public class AuditHistoryListener {

    @PrePersist
    private void onCreate(AuditEntity entity) {
        entity.setCreatedBy(AuditorProviderByAuthenticationUtil.getUserId());
        entity.setLastModifiedBy(AuditorProviderByAuthenticationUtil.getUserId());
    }

    @PreUpdate
    private void onUpdate(AuditEntity entity) {
        entity.setLastModifiedBy(AuditorProviderByAuthenticationUtil.getUserId());
    }

}
