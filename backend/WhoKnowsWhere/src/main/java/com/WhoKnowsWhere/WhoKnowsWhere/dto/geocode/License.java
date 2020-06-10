
package com.WhoKnowsWhere.WhoKnowsWhere.dto.geocode;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "name",
    "url"
})
public class License {

    @JsonProperty("name")
    public String name;
    @JsonProperty("url")
    public String url;

}
