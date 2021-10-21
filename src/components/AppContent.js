import React, { useEffect, useState } from "react";
import emitUserDataEvent from "../helpers/EmitUserDataEvent";
import propTypes from "prop-types";
import GifComponent from "./GifComponent";
import PreLoader from "./PreLoader";
import CookieForm from "./CookieForm";
import CategoryNavBar from "./CategoryNavBar";
import TableContent from "./TableContent";
import { CategoryButton } from '../styles/category';
import { DifficultySelect } from "../styles/difficulty-selector";
import Popup from "./Popup";

const AppContent = ({ response, setResponse, handleLoggingOut }) => {
	
	const [activeCategory, setActiveCategory] = useState("All Questions"); //name of the currently active category
	const [ difficultyList, setDifficultyList ] = useState(["Easy", "Medium", "Hard"]);		//List of current selected difficulties
	const [popup, setPopup] = useState(false);
	const [randomQues, setRandomQues] = useState({});

	const handleCategoryClick = (category) => {
		setActiveCategory(category); //change the currently active category
		if(category === 'LogOut') {
			handleLoggingOut();
		}
	};

	const handleDifficultySelect = (e) => {
		const difficulty = e.target.value;
		if(difficulty === "Easy" || difficulty === "Medium" || difficulty === "Hard") {
			setDifficultyList(prev => {
				let difficulties = [];
				let flag=0;
				prev.forEach(diffi => {
					if(difficulty === diffi) {
						flag=1;
					}
					difficulties.push(diffi);
				});
				if(flag == 0) {
					difficulties.push(difficulty);
				}
				return difficulties;
			});
		}
	}

	const difficultyRemoveHandle = (difficulty) => {
		setDifficultyList(prev => {
			let difficulties = [];
			prev.forEach(diffi => {
				if(diffi !== difficulty) {
					difficulties.push(diffi);
				}
			});
			return difficulties;
		})
	}

	useEffect(() => {
		setDifficultyList(["Easy", "Medium", "Hard"]);
	}, [activeCategory]);

	//console.log(response.data.stat_status_pairs);
	const SelectRandom = () => {
		const rdata =
			activeCategory != "All Questions"
				? response.data.stat_status_pairs.filter((que, index) => {
						switch (activeCategory) {
							case "Attempted":
								return (
									que["status"] === "ac" ||
									que["status"] === "notac"
								);

							case "Accepted":
								return que["status"] === "ac";

							case "Not Accepted":
								return que["status"] === "notac";
						}
				  })
				: response.data.stat_status_pairs;
		//console.log(rdata);
		var randvar = Math.random() * rdata.length;
		//console.log(randvar);
		//console.log(rdata[Math.floor(randvar)]);
		setRandomQues(rdata[Math.floor(randvar)]);
		console.log(randomQues);
		setPopup(true);
	};
	
	if (response.timer !== 0) {
		// Timer is Still Running
		if (response.message.isTimeOut) {
			return (
				<>
					<PreLoader />
					<GifComponent src="src/static/gifs/timeOut.gif" />;
				</>
			);
		} else {
			if (response.message.isCookieValid) {
				return (
					<>
						<PreLoader />
						<GifComponent
							src="src/static/gifs/atLast.mp4"
							video={true}
						/>
						;
					</>
				);
			} else {
				return (
					<>
						<PreLoader />
						<GifComponent src="src/static/gifs/badInput.gif" />;
					</>
				);
			}
		}
	} else {
		// Timer finished/Did not start
		if (response.message.isTimeOut) {
			if (response.message.doesCookieExist) {
				if (response.message.wasCookieSent) {
					return (
						<>
							<PreLoader />
							<CookieForm setResponse={setResponse} />
						</>
					);
				} else {
					return (
						<>
							<PreLoader />
							{emitUserDataEvent(setResponse)}
							<GifComponent src="src/static/gifs/wait.gif" />;
						</>
					);
				}
			} else {
				return (
					<>
						<PreLoader />
						<CookieForm setResponse={setResponse} />
					</>
				);
			}
		} else {
			if (response.message.doesCookieExist) {
				if (response.message.isCookieValid) {
					return (
						<>
							<div style={{ display: "inline-block" }}>
								<CategoryNavBar
									categories={[
										"All Questions",
										"Attempted",
										"Accepted",
										"Not Accepted",
									]} // list of categories to be displayed at the top like - All questions, Attempted and so on.
									data={response.data}
									handleCategoryClick={handleCategoryClick}
									onShuffle={SelectRandom}
									activeCategory={activeCategory}
								/>

								{/* <CategoryButton onClick={SelectRandom}>
									Select Random
								</CategoryButton> */}
							</div>

							{/* Dropdown to add difficulty */}
							<DifficultySelect id="difficultySelector" onChange={(e) => handleDifficultySelect(e)} value="" >
								<option value="" disabled selected hidden>Add difficulty</option>
								<option value="Easy" >Easy</option>
								<option value="Medium" >Medium</option>
								<option value="Hard" >Hard</option>
							</DifficultySelect>

							<div style={{color: "#39ff14", marginLeft: "20px" }}>
								{difficultyList.length > 0 
									? "Click on the difficulty to remove : "
									:null
								}
								
								{
									// Remove difficulty by clicking on it
									difficultyList.map(difficulty => {
									return (
										<CategoryButton
											key={difficulty}
											onClick={() => {
												difficultyRemoveHandle(difficulty);
											}}
										>
											{difficulty}
											<span style={{paddingLeft: "5px", color: "#ff0000"}}>X</span>
										</CategoryButton>
									)
								})
							}
							</div>

							<TableContent 
								data={response.data} 
								category={activeCategory} 
								difficultyList={difficultyList} 
								onShuffle={SelectRandom} 
							/>

							{popup && (
								<Popup
									setPopup={setPopup}
									popup={popup}
									data={randomQues}
								/>
							)}
						</>
					);
				} else {
					return (
						<>
							<PreLoader />
							<CookieForm setResponse={setResponse} />
						</>
					);
				}
			} else {
				return (
					<>
						<PreLoader />
						<CookieForm setResponse={setResponse} />
					</>
				);
			}
		}
	}
};

AppContent.propTypes = {
	response: propTypes.shape({
		message: propTypes.shape({
			username: propTypes.string.isRequired,
			isTimeOut: propTypes.bool.isRequired,
			isCookieValid: propTypes.bool.isRequired,
			doesCookieExist: propTypes.bool.isRequired,
			wasCookieSent: propTypes.bool.isRequired,
			isLoading: propTypes.bool.isRequired,
		}),
		timer: propTypes.number,
		data: propTypes.object,
	}),
	setResponse: propTypes.func,
	handleLoggingOut: propTypes.func,
};

export default AppContent;
