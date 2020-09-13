export default (context, inject) => {
  const format_image_watchlist = image => {
    return image.replace("original", "75x120");
  };

  const format_image_media = image => {
    return image.replace("original", "300x450");
  };

  inject("format_image_watchlist", format_image_watchlist);
  inject("format_image_media", format_image_media);
};
