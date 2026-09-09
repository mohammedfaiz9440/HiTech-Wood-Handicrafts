import { useEffect } from "react";

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

function updateMetaTag(attributeName: "name" | "property", attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function useMetaTags({ title, description, image, url }: MetaTagsProps) {
  useEffect(() => {
    const defaultTitle = "HiTech Wood Handicrafts | Premium Wooden Furniture & Doors";
    const defaultDesc =
      "Manufacturer of bespoke solid teak doors, luxury sofa sets, dining tables, and artisanal wooden handicrafts. Direct workshop pricing and all-India safe delivery.";
    const currentUrl = url || window.location.href;

    // Document Title
    const fullTitle = title ? `${title} | HiTech Wood Handicrafts` : defaultTitle;
    document.title = fullTitle;

    // Description
    const descContent = description || defaultDesc;
    updateMetaTag("name", "description", descContent);

    // Open Graph
    updateMetaTag("property", "og:title", fullTitle);
    updateMetaTag("property", "og:description", descContent);
    updateMetaTag("property", "og:url", currentUrl);
    updateMetaTag("property", "og:type", "website");
    updateMetaTag("property", "og:site_name", "HiTech Wood Handicrafts");

    if (image) {
      updateMetaTag("property", "og:image", image);
      updateMetaTag("name", "twitter:image", image);
    }

    // Twitter
    updateMetaTag("name", "twitter:card", "summary_large_image");
    updateMetaTag("name", "twitter:title", fullTitle);
    updateMetaTag("name", "twitter:description", descContent);

    return () => {
      document.title = defaultTitle;
    };
  }, [title, description, image, url]);
}

export default useMetaTags;
