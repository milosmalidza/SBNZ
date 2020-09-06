package com.WhoKnowsWhere.WhoKnowsWhere.events;

import com.WhoKnowsWhere.WhoKnowsWhere.model.Destination;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.kie.api.definition.type.Expires;
import org.kie.api.definition.type.Role;
import org.kie.api.definition.type.Timestamp;

import java.util.Date;

@Role(Role.Type.EVENT)
@Timestamp("likeTime")
@Expires("5m")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DestinationLikeEvent {
    private Date likeTime;
    private Destination destination;
}
