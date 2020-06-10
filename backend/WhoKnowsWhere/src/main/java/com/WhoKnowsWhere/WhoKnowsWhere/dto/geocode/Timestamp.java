
package com.WhoKnowsWhere.WhoKnowsWhere.dto.geocode;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "created_http",
    "created_unix"
})
public class Timestamp {

    @JsonProperty("created_http")
    public String createdHttp;
    @JsonProperty("created_unix")
    public Integer createdUnix;

}
