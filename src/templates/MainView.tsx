import React, { useState } from "react";
import CanvasArea from "../components/molecules/CanvasArea";
import ControllArea from "../components/organisms/ControllArea";

function MainView() {
	const [canvasElements, setCanvasElements] = useState<{ id: string; element: React.ReactNode }[]>([]);
	const [backgroundUrl, setBackgroundUrl] = useState("");

	const addCanvasElement = (element: React.ReactNode, id: string): void => {
		setCanvasElements([...canvasElements, { id, element }]);
	};

	const removeCanvasElement = (id: string): void => {
		setCanvasElements(canvasElements.filter((el) => el.id !== id));
	};

	return (
		<div className="overflow-hidden flex flex-row bg-white-100 gap-4 items-center justify-center">
			<CanvasArea
				backgroundUrl={backgroundUrl}
				canvasElements={canvasElements}
				removeCanvasElement={removeCanvasElement}
			/>
			<ControllArea addCanvasElement={addCanvasElement} />
		</div>
	);
}

export default MainView;
