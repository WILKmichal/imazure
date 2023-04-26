import { useCallback, useEffect, useState } from "react";

const GetCategorys = (): Array<{ nom: string, choix: boolean }> => {
    const categories = [
        "Alimentation",
        "Mode",
        "Beauté",
        "Électronique",
        "Maison",
        "Santé",
        "Sport",
        "Jouets",
        "Animaux de compagnie",
        "Voyage",
        "Musique",
        "Livres",
        "Films et TV",
        "Art et Design",
        "Jeux vidéos1",
        "Jeux vidéos2",
        "Art et Design",
        "Livres",
        "Beauté",
        "Électronique",
        "Maison",
        "Santé",
        "Sport",
        "Jouets",
        "Animaux de compagnie",
        "Voyage",
    ];

    const [categorie, setCategorie] = useState<Array<{ nom: string, choix: boolean }>>([]);

   const getCate = useCallback(async () => {
        try {
            const categoriesFormat: Array<{ nom: string, choix: boolean }> = [];
            categories.map((item) =>
                categoriesFormat.push({
                    nom: item,
                    choix: false,
                }))
            setCategorie(categoriesFormat);
        } catch (err) {
            console.error('Unable to call GetCategorys', err);
        }
    }, []); // Incluez 'categories' dans les dépendances

    useEffect(() => { getCate() }, [getCate]); // Ajoutez getCate comme dépendance

    return categorie;
};

export { GetCategorys };






