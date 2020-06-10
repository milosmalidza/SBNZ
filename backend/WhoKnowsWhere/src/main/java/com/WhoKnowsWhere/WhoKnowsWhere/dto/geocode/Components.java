
package com.WhoKnowsWhere.WhoKnowsWhere.dto.geocode;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "ISO_3166-1_alpha-2",
    "ISO_3166-1_alpha-3",
    "_category",
    "_type",
    "city",
    "city_district",
    "continent",
    "country",
    "country_code",
    "county",
    "neighbourhood",
    "political_union",
    "postcode",
    "state"
})

public class Components {

    @JsonProperty("ISO_3166-1_alpha-2")
    public String iSO31661Alpha2;
    @JsonProperty("ISO_3166-1_alpha-3")
    public String iSO31661Alpha3;
    @JsonProperty("_category")
    public String category;
    @JsonProperty("_type")
    public String type;
    @JsonProperty("city")
    public String city;
    @JsonProperty("city_district")
    public String cityDistrict;
    @JsonProperty("continent")
    public String continent;
    @JsonProperty("country")
    public String country;
    @JsonProperty("country_code")
    public String countryCode;
    @JsonProperty("county")
    public String county;
    @JsonProperty("neighbourhood")
    public String neighbourhood;
    @JsonProperty("political_union")
    public String politicalunion;
    @JsonProperty("postcode")
    public String postcode;
    @JsonProperty("state")
    public String state;

}
