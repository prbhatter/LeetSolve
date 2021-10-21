import React from "react";
import propTypes from "prop-types";

import {
	TableContainer,
	Table,
	TBody,
	THead,
	Tr,
	Th,
	Td,
} from "../styles/table";
import { Scrollable } from "../styles/scrollbar";
import { ShuffleButton } from "../styles/shufflestyle";

const AcQuestionsTable = ({ data, onShuffle, difficultyList }) => {
	console.log("DATA:", data);
	return (
		<TableContainer>
			<Table>
				<colgroup>
					<col span="1" style={{ width: "9%" }} />
					<col span="1" style={{ width: "55%" }} />
					<col span="1" style={{ width: "12%" }} />
					<col span="1" style={{ width: "12%" }} />
					<col span="1" style={{ width: "12%" }} />
				</colgroup>
				<THead>
					<Tr>
						<Th>ID</Th>
						<Th style={{ color: "00f2ff" }}>
							<ShuffleButton>
								<img
									src="src/static/images/random.png"
									style={{
										float: "left",
										width: "2rem",
									}}
									onClick={onShuffle}
									// title="Pick one Random Problem"
								/>
								<span>Pick one Random Question</span>
							</ShuffleButton>
							Title
						</Th>
						<Th style={{ color: "pink" }}>Level</Th>
						<Th style={{ color: "00fff5" }}>Status</Th>
						<Th>Paid</Th>
					</Tr>
				</THead>
			</Table>
			<div></div>
			<Scrollable maxHeight="68vh">
				<Table>
					<colgroup>
						<col span="1" style={{ width: "9%" }} />
						<col span="1" style={{ width: "55%" }} />
						<col span="1" style={{ width: "12%" }} />
						<col span="1" style={{ width: "12%" }} />
						<col span="1" style={{ width: "12%" }} />
					</colgroup>
					<TBody>
						{data["stat_status_pairs"].map((que, index) => {
							if (!(que["status"] === "ac")) {
								//if not ac then return null
								return null;
							}

							//If difficulty is not included in difficultyList then return null
							if(que["difficulty"]["level"] == 1 && !difficultyList.includes("Easy")) {
								return null;
							}
							if(que["difficulty"]["level"] == 2 && !difficultyList.includes("Medium")) {
								return null;
							}
							if(que["difficulty"]["level"] == 3 && !difficultyList.includes("Hard")) {
								return null;
							}
							//if ac then return as a row for the table
							return (
								<Tr key={index}>
									<Td>
										{que["stat"]["frontend_question_id"]}
									</Td>
									<Td>
										<a
											href={`https://leetcode.com/problems/${que["stat"]["question__title_slug"]}`}
											target="_blank"
											rel="noreferrer"
										>
											{que["stat"]["question__title"]}
										</a>
									</Td>
									<Td>
										{que["difficulty"]["level"] == 1
											? "Easy"
											: que["difficulty"]["level"] == 2
											? "Medium"
											: "Hard"}
									</Td>
									<Td>
										{que["status"] === "ac"
											? "AC"
											: que["status"] === "notac"
											? "Not-AC"
											: "Not-Attempted"}
									</Td>
									<Td>
										{que["paid_only"] === true
											? "Premium"
											: "Free"}
									</Td>
								</Tr>
							);
						})}
					</TBody>
				</Table>
			</Scrollable>
		</TableContainer>
	);
};

AcQuestionsTable.propTypes = {
	data: propTypes.shape({
		stat_status_pairs: propTypes.arrayOf(
			propTypes.shape({
				difficulty: propTypes.shape({ level: propTypes.number }),
				stat: propTypes.shape({
					question__title: propTypes.string,
					question__title_slug: propTypes.string,
				}),
				level: propTypes.number,
				status: propTypes.string,
			})
		),
	}),
	difficultyList: propTypes.arrayOf(propTypes.string),
	onShuffle: propTypes.func,
};

export default AcQuestionsTable;
