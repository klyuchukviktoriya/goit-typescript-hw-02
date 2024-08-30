import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css"

type ImageGalleryProps = {
    images: Array<{
        id: string,
        urls: {
            regular: string,
            small: string,
        },
        description: string,
    }>
    openModal: (urls: string) => void,
};

export default function ImageGallery({ images, openModal }:ImageGalleryProps) {
    return (
        <ul className={s.list}>
            {images.map(image => (<li key={image.id}>
                <ImageCard urls={image.urls} description={image.description} openModal={openModal} />
            </li>))}
        </ul>
    )
}