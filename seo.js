// ============================================================
// KICKSY NEPAL — SEO.JS
// Dynamic meta tag updates for product/shop pages
// ============================================================

const SEO = (() => {
  function setMeta(name, content) {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
    el.setAttribute("content", content);
  }
  function setOG(prop, content) {
    let el = document.querySelector(`meta[property="${prop}"]`);
    if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
    el.setAttribute("content", content);
  }
  function setCanonical(url) {
    let el = document.querySelector('link[rel="canonical"]');
    if (!el) { el = document.createElement("link"); el.setAttribute("rel", "canonical"); document.head.appendChild(el); }
    el.setAttribute("href", url);
  }
  function setLdJson(id, schema) {
    let el = document.getElementById(id);
    if (!el) { el = document.createElement("script"); el.id = id; el.type = "application/ld+json"; document.head.appendChild(el); }
    el.textContent = JSON.stringify(schema);
  }

  function updateForProduct(product) {
    if (!product) return;
    const title = `${product.name} — ${product.brand} | Kicksy Nepal`;
    const desc  = product.shortDescription || product.description || CONFIG.SEO.defaultDescription;
    const url   = `${CONFIG.SITE_URL}/product?id=${product.id}`;

    document.title = title;
    setMeta("description", desc);
    setMeta("twitter:title", title);
    setMeta("twitter:description", desc);

    setOG("og:title", title);
    setOG("og:description", desc);
    setOG("og:url", url);
    if (product.image1) {
      setOG("og:image", product.image1);
      setMeta("twitter:image", product.image1);
    }
    setOG("og:type", "product");
    setCanonical(url);

    // Breadcrumb schema: Home > Shop/Leather Goods > Category > Product
    const isLeather = product.productType === "leather";
    const categoryUrl = isLeather
      ? `${CONFIG.SITE_URL}/leather?category=${encodeURIComponent(product.category)}`
      : `${CONFIG.SITE_URL}/shop?brand=${encodeURIComponent(product.brand)}`;

    setLdJson("breadcrumbSchema", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home",  "item": `${CONFIG.SITE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": isLeather ? "Leather Goods" : "Shop", "item": isLeather ? `${CONFIG.SITE_URL}/leather` : `${CONFIG.SITE_URL}/shop` },
        { "@type": "ListItem", "position": 3, "name": isLeather ? product.category : product.brand, "item": categoryUrl },
        { "@type": "ListItem", "position": 4, "name": product.name, "item": url }
      ]
    });
  }

  function updateForShop(query) {
    const title = query ? `"${query}" Shoes | Kicksy Nepal` : "Shop All Shoes | Kicksy Nepal";
    document.title = title;
    setOG("og:title", title);
    setCanonical(`${CONFIG.SITE_URL}/shop`);
  }

  function updateForLeather(query) {
    const title = query ? `"${query}" Leather Goods | Kicksy Nepal` : "Leather Goods | Kicksy Nepal";
    document.title = title;
    setOG("og:title", title);
    setCanonical(`${CONFIG.SITE_URL}/leather`);
  }

  return { updateForProduct, updateForShop, updateForLeather, setLdJson };
})();
