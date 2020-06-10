
package com.WhoKnowsWhere.WhoKnowsWhere.dto.geocode;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "limit",
    "remaining",
    "reset"
})
public class Rate {

    @JsonProperty("limit")
    public Integer limit;
    @JsonProperty("remaining")
    public Integer remaining;
    @JsonProperty("reset")
    public Integer reset;

}
