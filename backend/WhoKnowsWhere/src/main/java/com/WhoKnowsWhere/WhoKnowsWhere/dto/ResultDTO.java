package com.WhoKnowsWhere.WhoKnowsWhere.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResultDTO {
	private double distance;
	private ExpenseDTO expense;
}
