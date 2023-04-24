import { ComponentType } from 'react';
import withPageTitle from './components/PageTitles';
// import CategoriePage from './Page/Categorie';
// import FoodsPage from './Page/Foods';
// import LoginPage from './Page/Login';
// import Profil from './Page/profil';
// import RegisterPage from './Page/Register';
// import SearchCode from './Page/SearchCode';
// import SubstitutionPage from './Page/Substitution';
// import SubstitutionList from './Page/SubstitutionList';


export interface RouteType {
    path: string;
    title: string;
    authenticatedRoute?: boolean;
    component: ComponentType;
    connect: boolean
}



export const routeNames = {

};
// 
const routes: Array<RouteType> = [

];


const mappedRoutes = routes.map((route) => {
    const title = route.title
        ? `${route.title} • Euh`
        : `Euh`;

    // const requiresAuth = Boolean(route.authenticatedRoute);
    const wrappedComponent = withPageTitle(title, route.component);

    return {
        path: route.path,
        component: wrappedComponent,
        connect: route.connect,
        title: route.title,

    };
});

export default mappedRoutes;