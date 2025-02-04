import React, { useEffect, useRef, useState } from "react";

import Poster from "../../assets/poster.svg";

interface ICanvasAreaProps {
	backgroundUrl: string;
}

function CanvasArea(props: ICanvasAreaProps) {
	const [isDrawingStarted, setIsDrawingStarted] = useState(false);
	const [backgroundUrl, setBackgroundUrl] = useState(props.backgroundUrl);
	console.log(Poster);

	const poster = (
		<div className="w-[759px] h-[948px] bg-primary flex items-center justify-center ">
			<img
				src={Poster}
				alt="Poster"
				width="759px"
				height="948px"
				className="w-full h-full object-cover"
			/>
		</div>
	);
	const canvas = (
		<div className="w-[759px] h-[948px] bg-primary flex items-center justify-center fixed">
			<img
				src={backgroundUrl}
				alt="Canvas"
				width="759px"
				height="948px"
				className="w-full h-full object-cover"
			/>
		</div>
	);

	return isDrawingStarted ? canvas : poster;
}

export default CanvasArea;
