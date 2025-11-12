import { AuthContext } from "../AuthContext";
import { useState, useContext } from "react";

export default function LoginForm () {
    const { login} = useContext(AuthContext)
    const [ email, setEmail] =useState("")
    const [ password, setPassword] =useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded px-2 py-1"/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded px-2 py-1"/>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
            </form>
        </div>
    )
}