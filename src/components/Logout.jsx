import { AuthContext } from "../AuthContext";
import { useContext } from "react";

export default function Logout() {
    const { logout } = useContext(AuthContext)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await logout();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Logout</button>
            </form>
        </div>
    )
}