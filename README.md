## Cats App

Cats app is a desktop web application containing information about cats. You can view cat
photos, add photos to favorites, vote for your favorite photo, and upload your own cat photos.

This is a [Next.js](https://nextjs.org/) project written in [Typescript](https://www.typescriptlang.org/).
The user interface was created using the [Chakra UI](https://chakra-ui.com/) library. A public service
API [The Cat API](https://thecatapi.com/) is used in this project.

The application uses such NextJS features like static generation and server-side rendering for better performance.
[SWR](https://swr.vercel.app/) is used for client-side data fetching.

### Let's consider some features of the application.

Since the main element of the application interface is an image, almost every image is equipped with a wrapper component
that allows you to conveniently interact with the image. Thus, you can add/remove images to your favorites by simply
clicking on the image you like. Such functionality is available on the Vote, Favorites, Image pages. At the same time,
the wrapper component will allow you to conveniently remove your uploaded images from the Upload page.

![Image_interaction](./public/image_interaction.png)

The **Vote** page allows you to rate a random cat photo by voting for or against the image.

![Vote page](./public/vote_page.png)

The **Breeds** page allows you to select a breed from the list and get available
information about it, such as a cat weight, country of origin of the breed, cat temperament.
Breed photos are displayed in a carousel created with [react-slick](https://www.npmjs.com/package/react-slick)

![Breds page](./public/breeds_page.png)

The **Images** page presents a grid of cat images and a filter to change the display results. You can choose a photo of
a given breed, or funny photos from a given category, such as cats in boxes or cats in clothes. The page is built as an
infinite loading page. 20 images are displayed to start with, and you can upload more images using the "Load more"
button.

![Images page](./public/images_page.png)

The **Favorites** page displays a list of images added to favorites. When adding/removing images from favorites, the
cached data about favorite images is updated and current favorite images are not revalidated. When adding/removing
images from favorites, the cached data about favorite images is manually updated, and current favorite images are not
revalidated. This improves the user experience of interacting with the page: when an image is removed from favorites,
the preloader does not flash, since there is no request for data.

![Favorites page](./public/favorites_page.png)

You can upload your own cat photos on the **Upload** page using the dedicated drag and drop field.
[rc-upload](https://www.npmjs.com/package/rc-upload) helped create the image upload interface and functionality.

![Upload page](./public/upload_page_1.png)

For convenient viewing of images, pagination is used, the pagination component is created based
on [react-paginate](https://www.npmjs.com/package/react-paginate).
The logic for interacting with the cache when loading / deleting an image is similar to the logic of the Favorites page.
Only the data of those pages that are not currently displayed are revalidated. For the currently displayed page, the cache is refreshed
manually to avoid content flickering.

![Upload page](./public/upload_page_2.png)







