
package com.WhoKnowsWhere.WhoKnowsWhere.dto.geocode;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "documentation",
    "licenses",
    "rate",
    "results",
    "status",
    "stay_informed",
    "thanks",
    "timestamp",
    "total_results"
})
public class GeocodeResult {

    @JsonProperty("documentation")
    public String documentation;
    @JsonProperty("licenses")
    public List<License> licenses = null;
    @JsonProperty("rate")
    public Rate rate;
    @JsonProperty("results")
    public List<Result> results = null;
    @JsonProperty("status")
    public Status status;
    @JsonProperty("stay_informed")
    public StayInformed stayInformed;
    @JsonProperty("thanks")
    public String thanks;
    @JsonProperty("timestamp")
    public Timestamp timestamp;
    @JsonProperty("total_results")
    public Integer totalResults;

}
