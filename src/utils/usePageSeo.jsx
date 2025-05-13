import { useEffect } from "react";

const setOrUpdateMetaTag = (attr, value, content) => {
  let element = document.querySelector(`meta[${attr}="${value}"]`);

  if (element) {
    element.setAttribute("content", content);
  } else {
    element = document.createElement("meta");
    element.setAttribute(attr, value);
    element.setAttribute("content", content);
    document.head.appendChild(element);
  }
};

const usePageSeo = ({ title, description, image, type = "article" }) => {
  useEffect(() => {
    // Title
    if (title) document.title = title;

    // Meta description
    if (description) setOrUpdateMetaTag("name", "description", description);

    // Open Graph meta tags
    if (title) setOrUpdateMetaTag("property", "og:title", title);
    if (description)
      setOrUpdateMetaTag("property", "og:description", description);
    if (image) setOrUpdateMetaTag("property", "og:image", image);
    if (type) setOrUpdateMetaTag("property", "og:type", type);

    // Optional: site name
    setOrUpdateMetaTag("property", "og:site_name", "Tên Website");
  }, [title, description, image, type]);
};

export default usePageSeo;
