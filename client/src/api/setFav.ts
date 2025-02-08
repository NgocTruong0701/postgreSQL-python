export async function setFav(id: number, newFav: boolean): Promise<void> {
    await fetch(`/contact/fav/${id}/${newFav}`, {method: 'PUT'});
}
