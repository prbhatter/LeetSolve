import React from "react";
import QuestionsTable from "./QuestionsTable";
import AttemptedQuestionsTable from "./AttemptedQuestionsTable";
import AcQuestionsTable from "./AcQuestionsTable";
import NotAcQuestionsTable from "./NotAcQuestionsTable";
import VirtualContest from "./VirtualContest";
import propTypes from "prop-types";

const TableContent = ({ data, category, onShuffle, difficultyList }) => {
	//  This component checks the category and returns the corresponding component accordingly

	switch (category) {
		case "All Questions":
			return <QuestionsTable data={data} onShuffle={onShuffle} difficultyList={difficultyList} />;

		case "Attempted":
			return (
				<AttemptedQuestionsTable data={data} onShuffle={onShuffle} difficultyList={difficultyList} />
			);

		case "Accepted":
			return <AcQuestionsTable data={data} onShuffle={onShuffle} difficultyList={difficultyList} />;

		case "Not Accepted":
			return <NotAcQuestionsTable data={data} onShuffle={onShuffle} difficultyList={difficultyList} />;
		
		case "Virtual Contest":
			return <VirtualContest data={data} difficultyList={difficultyList} />;
		
		default:
			return null;
	}
};

TableContent.propTypes = {
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
    category: propTypes.string,
    difficultyList: propTypes.arrayOf(propTypes.string),
	onShuffle: propTypes.func,
};

export default TableContent;
