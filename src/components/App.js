import React, { useEffect, useState } from "react";
import emitUserDataEvent from "../helpers/EmitUserDataEvent";
import Header from "./Header";
import PreLoader from "./PreLoader";
import { backgroundImageProperty } from "../styles/constants";
import AppContent from "./AppContent";
import { ipcRenderer } from "electron";
import GifComponent from "./GifComponent";
import { LOGOUT_EVENT } from "../Constants";

const App = () => {
	const [response, setResponse] = useState({
		message: {
			username: "",
			isCookieValid: false,
			isTimeOut: false,
			isLoading: true,
			doesCookieExist: false,
			wasCookieSent: false,
		},
		data: {},
		timer: 0,
		shouldRunTimer: false,
	});
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLoggingOut = () => {
		setIsLoggingOut(true);
	};

	const onVideoEnd = () => {
		ipcRenderer.invoke(LOGOUT_EVENT).then((result) => {
			console.log(result);
		});
	};

	const startTimer = () => {
		console.log("Starting the Timer.");
		const counter = setInterval(() => {
			setResponse((prev) => {
				if (prev.timer == 1) {
					clearInterval(counter);
					return {
						...prev,
						timer: prev.timer - 1,
					};
				}
				return {
					...prev,
					timer: prev.timer - 1,
					shouldRunTimer: false,
				};
			});
		}, 1000);
	};

	useEffect(() => {
		console.log("Hi from useEffect in App");
		emitUserDataEvent(setResponse);
	}, []);

	useEffect(() => {
		if (response.shouldRunTimer && response.timer !== 0) {
			startTimer();
		}
	}, [response.shouldRunTimer]);

	if (response.message.isLoading === false && !isLoggingOut) {
		return (
			<>
				<Header message={response.message} timer={response.timer} />
				<AppContent
					response={response}
					setResponse={setResponse}
					handleLoggingOut={handleLoggingOut}
				/>
				<div
					style={{
						color: "#39ff14",
						padding: "10px",
						backgroundImage: backgroundImageProperty,
						marginTop: "auto",
					}}
				>
					<span>
						Issue:- Footer: Made with Love(Animated Icon) for
						ContriHub&apos;21. EXISTS. {response.timer}
					</span>
				</div>
			</>
		);
	} else if (isLoggingOut) {
		return (
			<>
				<Header
					message={response.message}
					isLoggingOut={isLoggingOut}
				/>
				<PreLoader />
				<GifComponent
					src="src/static/gifs/iDontBelieveThat.mp4"
					video={true}
					onVideoEnd={onVideoEnd}
				/>
				<div
					style={{
						color: "#39ff14",
						padding: "10px",
						backgroundImage: backgroundImageProperty,
						marginTop: "auto",
					}}
				>
					<span>
						Issue:- Footer: Made with Love(Animated Icon) for
						ContriHub&apos;21. Loading {response.timer}
					</span>
				</div>
			</>
		);
	} else {
		return (
			<>
				<Header message={response.message} />
				<PreLoader />
				<div
					style={{
						color: "#39ff14",
						padding: "10px",
						backgroundImage: backgroundImageProperty,
						marginTop: "auto",
					}}
				>
					<span>
						Issue:- Footer: Made with Love(Animated Icon) for
						ContriHub&apos;21. Loading {response.timer}
					</span>
				</div>
			</>
		);
	}
};

export default App;
