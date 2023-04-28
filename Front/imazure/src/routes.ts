import { ComponentType } from 'react';
import withPageTitle from './components/PageTitles';
import Accueil from './Pages/Accueil';
import Images from './Pages/Images';
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
    component: ComponentType;
}



export const routeNames = {
    Accueil :'/accueil',
    Images :'/images'
};
// 
const routes: Array<RouteType> = [
    {
        path: routeNames.Accueil,
        title: 'Accueil',
        component: Accueil
      },
      {
        path: routeNames.Images,
        title: 'Images',
        component: Images
      },

];


const mappedRoutes = routes.map((route) => {
    const title = route.title ? `${route.title}` : ` ${route.title}`;
  
    const wrappedComponent = withPageTitle(title, route.component);
  
    return {
      path: route.path,
      component: wrappedComponent
    };
});

export default mappedRoutes;