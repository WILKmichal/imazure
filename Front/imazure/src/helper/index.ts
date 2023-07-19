import { useCallback, useEffect, useState } from "react";
import { getTags } from "../core";

const GetCategorys = () => {
    const [categorie, setCategorie] = useState<Array<{ nom: string, choix: boolean }>>([]);

    const getCate = useCallback(async () => {
        try {
            const tags: any = await getTags(); // Assuming getTags() is an async function.
            console.log(tags);
            const categoriesFormat = tags.tags.map((tag: any) => ({ nom: tag.name, choix: false }));
            setCategorie(categoriesFormat);
        } catch (err) {
            console.error('Unable to call GetCategorys', err);
        }
    }, []);

    useEffect(() => {
        getCate();
    }, [getCate]);

    return categorie;
};

export { GetCategorys };
