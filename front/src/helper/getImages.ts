import { useCallback, useEffect, useState } from "react";
import { getImagesByTag } from "../core";
import { image } from "../core/model.db";
import { GetCategorys } from ".";


const ImageTaille = (image?: string) => {
    return new Promise<any>((resolve) => {
        if (!image) {
            resolve("Pas de taille");
        } else {
            let imageTailles = new Image();
            imageTailles.src = image;
            imageTailles.onload = () => {
                const { width, height } = imageTailles;
                resolve({ width, height });
            };
            imageTailles.onerror = () => {
                resolve("Erreur lors du chargement de l'image");
            };
        }
    });
};

const GetImages = (categories: any) => {

    // const { categorie } = GetCategorys();
    const [imagess, setImages] = useState<{ image: image, choix: boolean }[] | null | undefined>([]);
    const [imageSizes, setImageSizes] = useState<any[]>([]);

    const getImages = useCallback(async () => {
        let isMounted = true;
        const selectedTags = categories
            .filter((categorie: any) => categorie.choix)
            .map((categorie: any) => categorie.tag.id);

        // console.log(selectedTags);

        try {
            setImages(undefined)
            const imagesData: any = await getImagesByTag(selectedTags);
            if (imagesData === null) {
                setImages(imagesData);

            } else if (isMounted && imagesData) {
                const imagesFormat = imagesData.map((image: any) => ({
                    image: image,
                    choix: false,
                }));
                setImages(imagesFormat);

                const sizes = await Promise.all(
                    imagesFormat.map((image: any) =>
                        ImageTaille(image.image.url)
                    )
                );
                setImageSizes(sizes);
            }
        } catch (err) {
            console.error('Unable to call GetImages', err);
            if (isMounted) {
                setImages(null);
            }
        }

        return () => isMounted = false; // Cleanup function

    }, [categories]);

    const toggleImageChoice = (id: number) => {
        setImages(prevImages => prevImages && prevImages.map((image) => {
            if (image.image.id === id) {
                return { ...image, choix: !image.choix };
            }
            return image;
        }));
    };

    useEffect(() => {
        getImages();
    }, [categories]);

    console.log(imageSizes);
    
    return { imagess, setImages, toggleImageChoice, imageSizes };
};

export { GetImages };
