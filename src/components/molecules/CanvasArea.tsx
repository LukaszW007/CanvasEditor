import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import html2canvas from "html2canvas";
import Poster from "../../assets/poster.svg";

interface ICanvasAreaProps {
	backgroundUrl: string;
	canvasElements: { id: string; element: React.ReactNode }[];
}
export interface CanvasAreaHandle {
	exportToPNG: () => void;
}

const CanvasArea = forwardRef<CanvasAreaHandle, ICanvasAreaProps>(({ backgroundUrl, canvasElements }, ref) => {
	const [isDrawingStarted, setIsDrawingStarted] = useState(false);
	const [backgroundURL, setBackgroundURL] = useState(backgroundUrl);

	const canvasRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (canvasElements.length > 0) setIsDrawingStarted(true);
	}, [canvasElements]);

	useEffect(() => {
		setBackgroundURL(backgroundUrl);
		if (backgroundUrl) setIsDrawingStarted(true);
	}, [backgroundUrl]);

	useImperativeHandle(ref, () => ({
		exportToPNG: async () => {
			if (canvasRef.current) {
				const canvas = await html2canvas(canvasRef.current);
				const dataUrl = canvas.toDataURL("image/png");
				const link = document.createElement("a");
				link.download = "canvas.png";
				link.href = dataUrl;
				link.click();
			}
		},
	}));

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
			ref={canvasRef}
			className="canvasArea w-[759px] h-[948px] flex items-center justify-center"
			style={{ backgroundImage: `url(${backgroundURL})`, backgroundSize: "cover" }}
		>
			{allElements}
		</div>
	);
	return isDrawingStarted ? canvas : poster;
});

export default CanvasArea;
