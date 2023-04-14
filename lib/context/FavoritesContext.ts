import React from "react";
import {IFavorite} from "@/types/IFavorite";

export interface IFavoritesContext {
    favorites: IFavorite[] | null
    setFavorites: (favorites: IFavorite[]) => void
}

export const FavoritesContext = React.createContext<IFavoritesContext>({
    favorites: null,
    setFavorites: () => {
    }
})