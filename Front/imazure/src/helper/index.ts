import { useCallback, useEffect, useState } from "react";
import { getTags } from "../core";

const GetCategorys = () => {
    const [categorie, setCategorie] = useState<Array<{ tag: any, choix: boolean }>>([]);

    const getCate = useCallback(async () => {
        let isMounted = true;

        try {
            const tags: any = await getTags();
            if (isMounted) {
                const categoriesFormat = tags.tags.map((tag: any, index: number) => ({
                    tag: tag,
                    choix: false,
                }));
                setCategorie(categoriesFormat);
            }
        } catch (err) {
            console.error('Unable to call GetCategorys', err);
        }

        return () => isMounted = false; // Cleanup function

    }, []);

    const toggleCategoryChoice = (id: number) => {
        setCategorie(prevCategorie => prevCategorie.map((categorie) => {
            if (categorie.tag.id === id) {
                return { ...categorie, choix: !categorie.choix };
            }
            return categorie;
        }));
    };

    useEffect(() => {
        getCate();
    }, []);

    return { categorie, setCategorie, toggleCategoryChoice };
};

export { GetCategorys };
