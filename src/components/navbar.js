import { FaGithub } from "react-icons/fa";

export default function Navbar() {
    return (
        <nav className="w-screen h-fit fixed top-0 py-2 flex justify-center items-center gap-4">
            <h6 className="text-lg font-medium">
                Open Source Weather
            </h6>
            <a href="#" className="font-bold underline text-white text-xl">
                <FaGithub />
            </a>
        </nav>
    )
}