import Logo from "../../assets/Logo.svg?react";
import Reset from "../../assets/Reset.svg?react";
import ResetButton from "./buttons/ResetButton";

function Navbar() {
	return (
		<div className="rounded-[10px] bg-white-100 h-[64px] w-[759px] flex items-center relative mb-8 justify-between">
			<div className="flex items-center">
				<Logo className="h-[64px] w-[64px] " />
				<p className="text-black-75 font-bold text-display h-[48px] flex content-center items-center pl-4 pt-6 pb-6">
					<span>CanvasEditor</span>
				</p>
			</div>
			<ResetButton
				Icon={Reset}
				title="Reset"
			/>
		</div>
	);
}

export default Navbar;
