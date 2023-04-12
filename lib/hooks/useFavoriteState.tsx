import React, {useContext, useEffect, useState} from "react";
import {UserIdContext} from "@/lib/context/UserIdContext";
import {useFavorites} from "@/lib/hooks/useFavorites";

export const useFavoriteState = (imageId: string, defaultRemovingId?: number) => {
    const userId = useContext(UserIdContext)

    const {favorites} = useFavorites({order: 'DESC', sub_id: userId}, undefined, !!defaultRemovingId)

    const [isFavorite, setIsFavorite] = useState(!!defaultRemovingId)
    const [removingId, setRemovingId] = useState(defaultRemovingId ?? -1)

    useEffect(() => {
        if (!defaultRemovingId) return
        const favoriteImage = favorites && favorites.filter(favorite => favorite.image_id === imageId)[0]
        if (favoriteImage) {
            setIsFavorite(favoriteImage.image_id === imageId)
            setRemovingId(favoriteImage.id)
        }
    }, [favorites, imageId, defaultRemovingId])

    return {
        isFavorite,
        setIsFavorite,
        removingId,
        setRemovingId
    }
}