import React, { useEffect, useRef, useState } from "react";

import Poster from "../../assets/poster.svg";

interface ICanvasAreaProps {
	backgroundUrl: string;
	canvasElements: { id: string; element: React.ReactNode }[];
	removeCanvasElement: (id: string) => void;
}

function CanvasArea({ backgroundUrl, canvasElements, removeCanvasElement }: ICanvasAreaProps) {
	const [isDrawingStarted, setIsDrawingStarted] = useState(false);
	const [backgroundURL, setBackgroundURL] = useState(backgroundUrl);

	useEffect(() => {
		if (canvasElements.length > 0) setIsDrawingStarted(true);
	}, [canvasElements]);
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

	const canvas = <div className="canvasArea w-[759px] h-[948px] bg-black-50 flex items-center justify-center">{allElements}</div>;

	return isDrawingStarted ? canvas : poster;
}

export default CanvasArea;
