
package com.WhoKnowsWhere.WhoKnowsWhere.dto.geocode;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonPropertyOrder({
    "components",
    "confidence",
    "formatted",
    "geometry"
})
public class Result {

    @JsonProperty("components")
    public Components components;
    @JsonProperty("confidence")
    public Integer confidence;
    @JsonProperty("formatted")
    public String formatted;
    @JsonProperty("geometry")
    public Geometry geometry;

}
