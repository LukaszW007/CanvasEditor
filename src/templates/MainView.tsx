import React, { useRef, useState } from "react";
import CanvasArea, { CanvasAreaHandle } from "../components/molecules/CanvasArea";
import ControllArea from "../components/organisms/ControllArea";

function MainView() {
	const [canvasElements, setCanvasElements] = useState<{ id: string; element: React.ReactNode }[]>([]);
	const [backgroundUrl, setBackgroundUrl] = useState("");

	const canvasAreaRef = useRef<CanvasAreaHandle>(null);

	const addCanvasElement = (element: React.ReactNode, id: string): void => {
		setCanvasElements((prevElements) => [...prevElements, { id, element }]);
	};

	const removeCanvasElement = (id: string): void => {
		setCanvasElements((prevElements) => prevElements.filter((el) => el.id !== id));
	};

	const exportToPNG = (): void => {
		if (canvasAreaRef.current) {
			canvasAreaRef.current.exportToPNG();
		}
	};

	const resetCanvas = (): void => {
		setCanvasElements([]);
		setBackgroundUrl("");
	};

	return (
		<div className="overflow-hidden flex flex-row bg-white-100 gap-4 items-center justify-center">
			<CanvasArea
				ref={canvasAreaRef}
				backgroundUrl={backgroundUrl}
				canvasElements={canvasElements}
			/>
			<ControllArea
				addCanvasElement={addCanvasElement}
				removeCanvasElement={removeCanvasElement}
				setBackgroundUrl={setBackgroundUrl}
				exportToPNG={exportToPNG}
				resetCanvas={resetCanvas}
			/>
		</div>
	);
}

export default MainView;
