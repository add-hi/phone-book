import { createContext } from "react"

interface AppContextInterace {
    id: number;
}

let storedData: any = sessionStorage.getItem('ContactFavorite');
const DataFavorite: AppContextInterace[] = JSON.parse(storedData);
const AppContext = createContext<AppContextInterace[] | null>(DataFavorite)

export default AppContext