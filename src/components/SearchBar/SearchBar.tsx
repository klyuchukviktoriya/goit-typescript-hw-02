import { ChangeEvent, FormEvent, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import s from "./SearchBar.module.css"

type SearchBarProps = {
    onSubmit: (query: string) => void,
 
}
export default function SearchBar({ onSubmit }:SearchBarProps) {

    const [query, setQuery] = useState("")

    const handleSubmit = (e: FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        if (!query.trim()) {
             toast.error("Try to find something")
        }
        onSubmit(query)
        setQuery("")
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setQuery(e.target.value);
    };
    return (
        <header className={s.header}>
            <div><Toaster /></div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query} onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>
        </header>
    )
}