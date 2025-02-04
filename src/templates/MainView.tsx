import CanvasArea from "../components/molecules/CanvasArea";
import ControllArea from "../components/organisms/ControllArea";

function MainView() {
	return (
		<div className="overflow-hidden flex flex-row bg-white-100 gap-4 items-center justify-center">
			{/* Left Section */}
			<CanvasArea backgroundUrl="" />
			{/* Right Section */}
			<ControllArea />
		</div>
	);
}

export default MainView;
