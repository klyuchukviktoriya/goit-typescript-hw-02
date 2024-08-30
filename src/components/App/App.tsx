import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import toast from "react-hot-toast";
import s from "./App.module.css";
import getImage from "../../api";

type Image = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  description: string;
};

type ApiResponse = {
  results: Image[];
  total_pages: number;
};

export default function App(): JSX.Element {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [modalUrl, setModalUrl] = useState<string>("");
  const [modalAlt, setModalAlt] = useState<string>("");
  const [showedModal, setShowedModal] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);

      try {
        const data: ApiResponse = await getImage({ query, page });
        const { results, total_pages } = data;
        // console.log(data);

        if (page === 1 && results.length === 0) {
          toast.error("No images found. Try again.");
        }

        setImages(prevImages => [...prevImages, ...results]);
        setIsVisible(page < total_pages);

      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page, query]);

  const onHandleSubmit = (value: string): void => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setIsVisible(false);
    setError(null);
  };

  const loadMore = (): void => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (urls: string): void => {
    setShowedModal(true);
    setModalUrl(urls);
    // setModalAlt(alt);
  };

  const closeModal = (): void => {
    setShowedModal(false);
    setModalUrl("");
    setModalAlt("");
  };

  return (
    <div className={s.container}>
      <SearchBar onSubmit={onHandleSubmit} />
      {error && <ErrorMessage message={error.message || "Oh, no!"} />}
      {images.length > 0 && <ImageGallery images={images} openModal={openModal} />}
      {isVisible && images.length > 0 && !loading && (
        <LoadMoreBtn onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : "Load more"}
        </LoadMoreBtn>
      )}
      {loading && <Loader />}
      <ImageModal modalIsOpen={showedModal} closeModal={closeModal} src={modalUrl} alt={modalAlt} />
    </div>
  );
}
