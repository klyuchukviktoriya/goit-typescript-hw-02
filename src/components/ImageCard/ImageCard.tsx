import s from "./ImageCard.module.css"
  
  type  ImageCardProps = {
    urls: {
      small: string;
      regular: string;
    };
    description: string;
    openModal: (urls:string, description: string) => void;
  };
  
export default function ImageCard({ urls, description, openModal }: ImageCardProps) {
    return (
        <div>
            <img className={s.img} src={urls.small} alt={description} onClick={() => openModal(urls.regular, description)} />
        </div>
    )
}