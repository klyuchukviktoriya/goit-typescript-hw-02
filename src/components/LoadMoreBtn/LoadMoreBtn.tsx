import s from "./LoadMoreBtn.module.css"

type LoadMoreBtnProps = {
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
 };

export default function LoadMoreBtn({ children, onClick, disabled }:LoadMoreBtnProps) {
    return (
        <button className={s.loadMore} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}
