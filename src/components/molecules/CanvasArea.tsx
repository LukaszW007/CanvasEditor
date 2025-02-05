import React, { useEffect, useRef, useState } from "react";

import Poster from "../../assets/poster.svg";

interface ICanvasAreaProps {
	backgroundUrl: string;
	canvasElements: { id: string; element: React.ReactNode }[];
}

function CanvasArea({ backgroundUrl, canvasElements }: ICanvasAreaProps) {
	const [isDrawingStarted, setIsDrawingStarted] = useState(false);
	const [backgroundURL, setBackgroundURL] = useState(backgroundUrl);

	useEffect(() => {
		if (canvasElements.length > 0) setIsDrawingStarted(true);
	}, [canvasElements]);
	useEffect(() => {
		setBackgroundURL(backgroundUrl);
		if (backgroundUrl) setIsDrawingStarted(true);
	}, [backgroundUrl]);

	const poster = (
		<div className="w-[759px] h-[948px] flex items-center justify-center ">
			<img
				src={Poster}
				alt="Poster"
				width="759px"
				height="948px"
				className="w-full h-full object-cover"
			/>
		</div>
	);

	const allElements = canvasElements.map((textArea) => <React.Fragment key={textArea.id}>{textArea.element}</React.Fragment>);

	const canvas = (
		<div
			className="canvasArea w-[759px] h-[948px] flex items-center justify-center"
			style={{ backgroundImage: `url(${backgroundURL})`, backgroundSize: "cover" }}
		>
			{allElements}
		</div>
	);
	return isDrawingStarted ? canvas : poster;
}

export default CanvasArea;
