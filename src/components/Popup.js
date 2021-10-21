import React from "react";
import {
	TableContainer,
	Table,
	TBody,
	THead,
	Tr,
	Th,
	Td,
} from "../styles/table";
function Popup({ popup, setPopup, data }) {
	console.log(popup);
	return (
		<div
			style={{
				position: "fixed",
				background: "#00000050",
				width: "100%",
				height: "100vh",
			}}
		>
			<div
				style={{
					position: "relative",
					width: "70%",
					margin: "0 auto",
					height: "auto",
					maxHeight: "70vh",
					marginTop: "calc(100vh - 85vh - 20px)",
					background: "black",
					borderRadius: "4px",
					padding: "20px",
					border: "1px solid #999",
					overflow: "auto",
				}}
			>
				<span
					style={{
						content: "x",
						cursor: "pointer",
						position: "fixed",
						right: "calc(15% - 30px)",
						top: "calc(100vh - 85vh - 33px)",
						background: "#ededed",
						width: "25px",
						height: "25px",
						borderRadius: "50%",
						lineHeight: "20px",
						textAlign: "center",
						border: "1px solid #999",
						fontSize: "20px",
					}}
					onClick={() => setPopup(false)}
				>
					x
				</span>

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
								<Th style={{ color: "00f2ff" }}>Title</Th>
								<Th style={{ color: "pink" }}>Level</Th>
								<Th style={{ color: "00fff5" }}>Status</Th>
								<Th>Paid</Th>
							</Tr>
						</THead>
					</Table>
					<div></div>
					<Table>
						<colgroup>
							<col span="1" style={{ width: "9%" }} />
							<col span="1" style={{ width: "55%" }} />
							<col span="1" style={{ width: "12%" }} />
							<col span="1" style={{ width: "12%" }} />
							<col span="1" style={{ width: "12%" }} />
						</colgroup>
						<TBody>
							<Tr key={1}>
								<Td>{data["stat"]["frontend_question_id"]}</Td>
								<Td>
									<a
										href={`https://leetcode.com/problems/${data["stat"]["question__title_slug"]}`}
										target="_blank"
										rel="noreferrer"
									>
										{data["stat"]["question__title"]}
									</a>
								</Td>
								<Td>
									{data["difficulty"]["level"] == 1
										? "Easy"
										: data["difficulty"]["level"] == 2
										? "Medium"
										: "Hard"}
								</Td>
								<Td>
									{data["status"] === "ac"
										? "AC"
										: data["status"] === "notac"
										? "Not-AC"
										: "Not-Attempted"}
								</Td>
								<Td>
									{data["paid_only"] === true
										? "Premium"
										: "Free"}
								</Td>
							</Tr>
						</TBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
}

export default Popup;
