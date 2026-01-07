"use client";

import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useTransition,
  useRef,
} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import QuickViewModal from "@/components/QuickViewModal";
import FilterControls from "@/components/products/FilterControls";
import ProductCard from "@/components/products/ProductCard";
import Pagination from "@/components/products/Pagination";
import { Product, SortOption, Catalogue } from "@/lib/types";
import Image from "next/image";
import { Download } from "lucide-react";

const ITEMS_PER_PAGE = 9;

interface ProductsClientProps {
  initialProducts: Product[];
  mainCategories: string[];
  designStyles: string[];
  finishes: string[];
  applications: string[];
  sizes: string[];
  thicknesses: string[];
  catalogues: string[];
  allCatalogues: Catalogue[];
}

export default function ProductsClient({
  initialProducts,
  mainCategories,
  designStyles,
  finishes,
  applications,
  sizes,
  thicknesses,
  catalogues,
  allCatalogues,
}: ProductsClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [selectedMainCategories, setSelectedMainCategories] = useState<
    string[]
  >(() => {
    const cats = searchParams.get("mainCategories");
    return cats ? cats.split(",") : [];
  });
  const [selectedDesignStyles, setSelectedDesignStyles] = useState<string[]>(
    () => {
      const styles = searchParams.get("designStyles");
      return styles ? styles.split(",") : [];
    }
  );
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>(() => {
    const fins = searchParams.get("finishes");
    return fins ? fins.split(",") : [];
  });
  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    () => {
      const apps = searchParams.get("applications");
      return apps ? apps.split(",") : [];
    }
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>(() => {
    const szs = searchParams.get("sizes");
    return szs ? szs.split(",") : [];
  });
  const [selectedThicknesses, setSelectedThicknesses] = useState<string[]>(
    () => {
      const thks = searchParams.get("thicknesses");
      return thks ? thks.split(",") : [];
    }
  );
  const [selectedSpecialFeatures, setSelectedSpecialFeatures] = useState<
    string[]
  >(() => {
    const feats = searchParams.get("specialFeatures");
    return feats ? feats.split(",") : [];
  });
  const [selectedCatalogues, setSelectedCatalogues] = useState<string[]>(() => {
    const cats = searchParams.get("catalogues");
    return cats ? cats.split(",") : [];
  });
  const [sortBy, setSortBy] = useState<SortOption>(() => {
    return (searchParams.get("sort") as SortOption) || "name";
  });
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page, 10) : 1;
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [catalogueOpen, setCatalogueOpen] = useState(true);
  const [mainCategoryOpen, setMainCategoryOpen] = useState(false);
  const [designStyleOpen, setDesignStyleOpen] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);
  const [applicationsOpen, setApplicationsOpen] = useState(false);
  const [sizesOpen, setSizesOpen] = useState(false);
  const [thicknessesOpen, setThicknessesOpen] = useState(false);
  const [specialFeaturesOpen, setSpecialFeaturesOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  // URL sync - only update URL when state changes, not on mount
  const updateURL = useCallback(
    (
      catalogues: string[],
      mainCats: string[],
      designStls: string[],
      fins: string[],
      apps: string[],
      szs: string[],
      thks: string[],
      feats: string[],
      sort: string,
      page: number
    ) => {
      const params = new URLSearchParams();
      if (catalogues.length > 0) params.set("catalogues", catalogues.join(","));
      if (mainCats.length > 0) params.set("mainCategories", mainCats.join(","));
      if (designStls.length > 0)
        params.set("designStyles", designStls.join(","));
      if (fins.length > 0) params.set("finishes", fins.join(","));
      if (apps.length > 0) params.set("applications", apps.join(","));
      if (szs.length > 0) params.set("sizes", szs.join(","));
      if (thks.length > 0) params.set("thicknesses", thks.join(","));
      if (feats.length > 0) params.set("specialFeatures", feats.join(","));
      if (sort !== "name") params.set("sort", sort);
      if (page > 1) params.set("page", page.toString());

      const newURL = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      // Only update if URL is different
      const currentURL = `${pathname}${window.location.search}`;
      if (newURL !== currentURL) {
        // Use window.history to update URL without triggering Next.js navigation
        // This prevents the page from remounting and closing collapsibles
        startTransition(() => {
          window.history.replaceState(null, "", newURL);
        });
      }
    },
    [pathname, router]
  );

  // Sync state changes to URL
  useEffect(() => {
    updateURL(
      selectedCatalogues,
      selectedMainCategories,
      selectedDesignStyles,
      selectedFinishes,
      selectedApplications,
      selectedSizes,
      selectedThicknesses,
      selectedSpecialFeatures,
      sortBy,
      currentPage
    );
  }, [
    selectedCatalogues,
    selectedMainCategories,
    selectedDesignStyles,
    selectedFinishes,
    selectedApplications,
    selectedSizes,
    selectedThicknesses,
    selectedSpecialFeatures,
    sortBy,
    currentPage,
    updateURL,
  ]);

  // Reset to page 1 when filters or sort change (but not on initial mount)
  useEffect(() => {
    const catalogues = searchParams.get("catalogues");
    const mainCats = searchParams.get("mainCategories");
    const designStls = searchParams.get("designStyles");
    const fins = searchParams.get("finishes");
    const apps = searchParams.get("applications");
    const szs = searchParams.get("sizes");
    const thks = searchParams.get("thicknesses");
    const feats = searchParams.get("specialFeatures");
    const sort = searchParams.get("sort") || "name";

    // Only reset page if this is not the initial mount (check if current state matches URL)
    const cataloguesArray = catalogues ? catalogues.split(",") : [];
    const mainCatsArray = mainCats ? mainCats.split(",") : [];
    const designStlsArray = designStls ? designStls.split(",") : [];
    const finsArray = fins ? fins.split(",") : [];
    const appsArray = apps ? apps.split(",") : [];
    const szsArray = szs ? szs.split(",") : [];
    const thksArray = thks ? thks.split(",") : [];
    const featsArray = feats ? feats.split(",") : [];

    const isInitialMount =
      JSON.stringify(cataloguesArray) === JSON.stringify(selectedCatalogues) &&
      JSON.stringify(mainCatsArray) ===
        JSON.stringify(selectedMainCategories) &&
      JSON.stringify(designStlsArray) ===
        JSON.stringify(selectedDesignStyles) &&
      JSON.stringify(finsArray) === JSON.stringify(selectedFinishes) &&
      JSON.stringify(appsArray) === JSON.stringify(selectedApplications) &&
      JSON.stringify(szsArray) === JSON.stringify(selectedSizes) &&
      JSON.stringify(thksArray) === JSON.stringify(selectedThicknesses) &&
      JSON.stringify(featsArray) === JSON.stringify(selectedSpecialFeatures) &&
      sort === sortBy;

    if (!isInitialMount && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [
    selectedCatalogues,
    selectedMainCategories,
    selectedDesignStyles,
    selectedFinishes,
    selectedApplications,
    selectedSizes,
    selectedThicknesses,
    selectedSpecialFeatures,
    sortBy,
  ]);

  // Helper function to check if product matches selected catalogues
  const matchesSelectedCatalogues = useCallback(
    (productCatalogues: string[] | undefined): boolean => {
      if (selectedCatalogues.length === 0) return true;
      if (!productCatalogues || productCatalogues.length === 0) return false;
      return productCatalogues.some((cat) => selectedCatalogues.includes(cat));
    },
    [selectedCatalogues]
  );

  // Filter counts
  const getCatalogueCount = useCallback(
    (catalogue: string) => {
      // Catalogue count is standalone - it shows total products in each catalogue
      // regardless of other filters
      return initialProducts.filter((p) => {
        return p.catalogue && p.catalogue.includes(catalogue);
      }).length;
    },
    [initialProducts]
  );

  const getMainCategoryCount = useCallback(
    (mainCategory: string) => {
      return initialProducts.filter((p) => {
        const matchesMainCategory = p.mainCategory === mainCategory;
        const matchesCatalogue = matchesSelectedCatalogues(p.catalogue);
        const matchesDesignStyle =
          selectedDesignStyles.length === 0 ||
          selectedDesignStyles.includes(p.designStyle);
        const matchesFinish =
          selectedFinishes.length === 0 || selectedFinishes.includes(p.finish);
        const matchesApplications =
          selectedApplications.length === 0 ||
          (p.applications &&
            p.applications.some((app) => selectedApplications.includes(app)));
        const matchesSize =
          selectedSizes.length === 0 ||
          (p.sizes &&
            p.sizes.length > 0 &&
            p.sizes.some((size) => selectedSizes.includes(size)));
        const matchesThickness =
          selectedThicknesses.length === 0 ||
          (p.thickness && selectedThicknesses.includes(p.thickness));
        const matchesSpecialFeatures =
          selectedSpecialFeatures.length === 0 ||
          selectedSpecialFeatures.every(
            (feat) => p[feat as keyof Product] === true
          );
        return (
          matchesMainCategory &&
          matchesCatalogue &&
          matchesDesignStyle &&
          matchesFinish &&
          matchesApplications &&
          matchesSize &&
          matchesThickness &&
          matchesSpecialFeatures
        );
      }).length;
    },
    [
      initialProducts,
      selectedCatalogues,
      selectedDesignStyles,
      selectedFinishes,
      selectedApplications,
      selectedSizes,
      selectedThicknesses,
      selectedSpecialFeatures,
    ]
  );

  const getDesignStyleCount = useCallback(
    (designStyle: string) => {
      return initialProducts.filter((p) => {
        const matchesDesignStyle = p.designStyle === designStyle;
        const matchesCatalogue = matchesSelectedCatalogues(p.catalogue);
        const matchesMainCategory =
          selectedMainCategories.length === 0 ||
          selectedMainCategories.includes(p.mainCategory);
        const matchesFinish =
          selectedFinishes.length === 0 || selectedFinishes.includes(p.finish);
        const matchesApplications =
          selectedApplications.length === 0 ||
          (p.applications &&
            p.applications.some((app) => selectedApplications.includes(app)));
        const matchesSize =
          selectedSizes.length === 0 ||
          (p.sizes &&
            p.sizes.length > 0 &&
            p.sizes.some((size) => selectedSizes.includes(size)));
        const matchesThickness =
          selectedThicknesses.length === 0 ||
          (p.thickness && selectedThicknesses.includes(p.thickness));
        const matchesSpecialFeatures =
          selectedSpecialFeatures.length === 0 ||
          selectedSpecialFeatures.every(
            (feat) => p[feat as keyof Product] === true
          );
        return (
          matchesDesignStyle &&
          matchesCatalogue &&
          matchesMainCategory &&
          matchesFinish &&
          matchesApplications &&
          matchesSize &&
          matchesThickness &&
          matchesSpecialFeatures
        );
      }).length;
    },
    [
      initialProducts,
      selectedCatalogues,
      selectedMainCategories,
      selectedFinishes,
      selectedApplications,
      selectedSizes,
      selectedThicknesses,
      selectedSpecialFeatures,
    ]
  );

  const getFinishCount = useCallback(
    (finish: string) => {
      return initialProducts.filter((p) => {
        const matchesFinish = p.finish === finish;
        const matchesCatalogue = matchesSelectedCatalogues(p.catalogue);
        const matchesMainCategory =
          selectedMainCategories.length === 0 ||
          selectedMainCategories.includes(p.mainCategory);
        const matchesDesignStyle =
          selectedDesignStyles.length === 0 ||
          selectedDesignStyles.includes(p.designStyle);
        const matchesApplications =
          selectedApplications.length === 0 ||
          (p.applications &&
            p.applications.some((app) => selectedApplications.includes(app)));
        const matchesSize =
          selectedSizes.length === 0 ||
          (p.sizes &&
            p.sizes.length > 0 &&
            p.sizes.some((size) => selectedSizes.includes(size)));
        const matchesThickness =
          selectedThicknesses.length === 0 ||
          (p.thickness && selectedThicknesses.includes(p.thickness));
        const matchesSpecialFeatures =
          selectedSpecialFeatures.length === 0 ||
          selectedSpecialFeatures.every(
            (feat) => p[feat as keyof Product] === true
          );
        return (
          matchesFinish &&
          matchesCatalogue &&
          matchesMainCategory &&
          matchesDesignStyle &&
          matchesApplications &&
          matchesSize &&
          matchesThickness &&
          matchesSpecialFeatures
        );
      }).length;
    },
    [
      initialProducts,
      selectedCatalogues,
      selectedMainCategories,
      selectedDesignStyles,
      selectedApplications,
      selectedSizes,
      selectedThicknesses,
      selectedSpecialFeatures,
    ]
  );

  const getApplicationCount = useCallback(
    (application: string) => {
      return initialProducts.filter((p) => {
        const matchesApplication =
          p.applications && p.applications.includes(application);
        const matchesCatalogue = matchesSelectedCatalogues(p.catalogue);
        const matchesMainCategory =
          selectedMainCategories.length === 0 ||
          selectedMainCategories.includes(p.mainCategory);
        const matchesDesignStyle =
          selectedDesignStyles.length === 0 ||
          selectedDesignStyles.includes(p.designStyle);
        const matchesFinish =
          selectedFinishes.length === 0 || selectedFinishes.includes(p.finish);
        const matchesSize =
          selectedSizes.length === 0 ||
          (p.sizes &&
            p.sizes.length > 0 &&
            p.sizes.some((size) => selectedSizes.includes(size)));
        const matchesThickness =
          selectedThicknesses.length === 0 ||
          (p.thickness && selectedThicknesses.includes(p.thickness));
        const matchesSpecialFeatures =
          selectedSpecialFeatures.length === 0 ||
          selectedSpecialFeatures.every(
            (feat) => p[feat as keyof Product] === true
          );
        return (
          matchesApplication &&
          matchesCatalogue &&
          matchesMainCategory &&
          matchesDesignStyle &&
          matchesFinish &&
          matchesSize &&
          matchesThickness &&
          matchesSpecialFeatures
        );
      }).length;
    },
    [
      initialProducts,
      selectedCatalogues,
      selectedMainCategories,
      selectedDesignStyles,
      selectedFinishes,
      selectedSizes,
      selectedThicknesses,
      selectedSpecialFeatures,
    ]
  );

  const getSizeCount = useCallback(
    (size: string) => {
      return initialProducts.filter((p) => {
        const matchesSize = p.sizes && p.sizes.includes(size);
        const matchesCatalogue = matchesSelectedCatalogues(p.catalogue);
        const matchesMainCategory =
          selectedMainCategories.length === 0 ||
          selectedMainCategories.includes(p.mainCategory);
        const matchesDesignStyle =
          selectedDesignStyles.length === 0 ||
          selectedDesignStyles.includes(p.designStyle);
        const matchesFinish =
          selectedFinishes.length === 0 || selectedFinishes.includes(p.finish);
        const matchesApplications =
          selectedApplications.length === 0 ||
          (p.applications &&
            p.applications.some((app) => selectedApplications.includes(app)));
        const matchesThickness =
          selectedThicknesses.length === 0 ||
          (p.thickness && selectedThicknesses.includes(p.thickness));
        const matchesSpecialFeatures =
          selectedSpecialFeatures.length === 0 ||
          selectedSpecialFeatures.every(
            (feat) => p[feat as keyof Product] === true
          );
        return (
          matchesSize &&
          matchesCatalogue &&
          matchesMainCategory &&
          matchesDesignStyle &&
          matchesFinish &&
          matchesApplications &&
          matchesThickness &&
          matchesSpecialFeatures
        );
      }).length;
    },
    [
      initialProducts,
      selectedCatalogues,
      selectedMainCategories,
      selectedDesignStyles,
      selectedFinishes,
      selectedApplications,
      selectedThicknesses,
      selectedSpecialFeatures,
    ]
  );

  const getThicknessCount = useCallback(
    (thickness: string) => {
      return initialProducts.filter((p) => {
        const matchesThickness = p.thickness === thickness;
        const matchesCatalogue = matchesSelectedCatalogues(p.catalogue);
        const matchesMainCategory =
          selectedMainCategories.length === 0 ||
          selectedMainCategories.includes(p.mainCategory);
        const matchesDesignStyle =
          selectedDesignStyles.length === 0 ||
          selectedDesignStyles.includes(p.designStyle);
        const matchesFinish =
          selectedFinishes.length === 0 || selectedFinishes.includes(p.finish);
        const matchesApplications =
          selectedApplications.length === 0 ||
          (p.applications &&
            p.applications.some((app) => selectedApplications.includes(app)));
        const matchesSize =
          selectedSizes.length === 0 ||
          (p.sizes &&
            p.sizes.length > 0 &&
            p.sizes.some((size) => selectedSizes.includes(size)));
        const matchesSpecialFeatures =
          selectedSpecialFeatures.length === 0 ||
          selectedSpecialFeatures.every(
            (feat) => p[feat as keyof Product] === true
          );
        return (
          matchesThickness &&
          matchesCatalogue &&
          matchesMainCategory &&
          matchesDesignStyle &&
          matchesFinish &&
          matchesApplications &&
          matchesSize &&
          matchesSpecialFeatures
        );
      }).length;
    },
    [
      initialProducts,
      selectedCatalogues,
      selectedMainCategories,
      selectedDesignStyles,
      selectedFinishes,
      selectedApplications,
      selectedSizes,
      selectedSpecialFeatures,
    ]
  );

  const getSpecialFeatureCount = useCallback(
    (feature: string) => {
      return initialProducts.filter((p) => {
        const matchesFeature = p[feature as keyof Product] === true;
        const matchesCatalogue = matchesSelectedCatalogues(p.catalogue);
        const matchesMainCategory =
          selectedMainCategories.length === 0 ||
          selectedMainCategories.includes(p.mainCategory);
        const matchesDesignStyle =
          selectedDesignStyles.length === 0 ||
          selectedDesignStyles.includes(p.designStyle);
        const matchesFinish =
          selectedFinishes.length === 0 || selectedFinishes.includes(p.finish);
        const matchesApplications =
          selectedApplications.length === 0 ||
          (p.applications &&
            p.applications.some((app) => selectedApplications.includes(app)));
        const matchesSize =
          selectedSizes.length === 0 ||
          (p.sizes &&
            p.sizes.length > 0 &&
            p.sizes.some((size) => selectedSizes.includes(size)));
        const matchesThickness =
          selectedThicknesses.length === 0 ||
          (p.thickness && selectedThicknesses.includes(p.thickness));
        return (
          matchesFeature &&
          matchesCatalogue &&
          matchesMainCategory &&
          matchesDesignStyle &&
          matchesFinish &&
          matchesApplications &&
          matchesSize &&
          matchesThickness
        );
      }).length;
    },
    [
      initialProducts,
      selectedCatalogues,
      selectedMainCategories,
      selectedDesignStyles,
      selectedFinishes,
      selectedApplications,
      selectedSizes,
      selectedThicknesses,
    ]
  );

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = initialProducts;

    if (selectedCatalogues.length > 0) {
      filtered = filtered.filter((p) => matchesSelectedCatalogues(p.catalogue));
    }

    if (selectedMainCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedMainCategories.includes(p.mainCategory)
      );
    }

    if (selectedDesignStyles.length > 0) {
      filtered = filtered.filter((p) =>
        selectedDesignStyles.includes(p.designStyle)
      );
    }

    if (selectedFinishes.length > 0) {
      filtered = filtered.filter((p) => selectedFinishes.includes(p.finish));
    }

    if (selectedApplications.length > 0) {
      filtered = filtered.filter(
        (p) =>
          p.applications &&
          p.applications.some((app) => selectedApplications.includes(app))
      );
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter(
        (p) =>
          p.sizes &&
          p.sizes.length > 0 &&
          p.sizes.some((size) => selectedSizes.includes(size))
      );
    }

    if (selectedThicknesses.length > 0) {
      filtered = filtered.filter(
        (p) => p.thickness && selectedThicknesses.includes(p.thickness)
      );
    }

    if (selectedSpecialFeatures.length > 0) {
      filtered = filtered.filter((p) =>
        selectedSpecialFeatures.every(
          (feat) => p[feat as keyof Product] === true
        )
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "newest") return b.id - a.id;
      return 0;
    });

    return sorted;
  }, [
    initialProducts,
    selectedCatalogues,
    selectedMainCategories,
    selectedDesignStyles,
    selectedFinishes,
    selectedApplications,
    selectedSizes,
    selectedThicknesses,
    selectedSpecialFeatures,
    sortBy,
  ]);

  // Compute available sizes dynamically based on selected catalogue
  const availableSizes = useMemo(() => {
    // Start with all hardcoded sizes
    const allSizes = sizes;

    // If catalogue is selected, filter sizes to only those in products from that catalogue
    if (selectedCatalogues.length > 0) {
      const productsInCatalogues = initialProducts.filter((p) =>
        matchesSelectedCatalogues(p.catalogue)
      );

      const sizesInCatalogues = new Set<string>();
      productsInCatalogues.forEach((p) => {
        if (p.sizes && p.sizes.length > 0) {
          p.sizes.forEach((size) => {
            if (allSizes.includes(size)) {
              sizesInCatalogues.add(size);
            }
          });
        }
      });

      // Return sizes in the same order as allSizes, but only those found in the catalogue
      return allSizes.filter((size) => sizesInCatalogues.has(size));
    }

    // If no catalogue selected, show all sizes
    return allSizes;
  }, [sizes, selectedCatalogues, initialProducts]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Actions
  const toggleCatalogue = (catalogue: string) => {
    const isCurrentlySelected = selectedCatalogues.includes(catalogue);

    if (!isCurrentlySelected) {
      // When selecting a catalogue, clear all other filters
      setSelectedMainCategories([]);
      setSelectedDesignStyles([]);
      setSelectedFinishes([]);
      setSelectedApplications([]);
      setSelectedSizes([]);
      setSelectedThicknesses([]);
      setSelectedSpecialFeatures([]);
    }

    setSelectedCatalogues(
      (prev) => (prev.includes(catalogue) ? [] : [catalogue]) // Only allow one catalogue at a time
    );
    // Scroll to top when catalogue filter changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMainCategory = (mainCategory: string) => {
    setSelectedMainCategories((prev) =>
      prev.includes(mainCategory)
        ? prev.filter((c) => c !== mainCategory)
        : [...prev, mainCategory]
    );
  };

  const toggleDesignStyle = (designStyle: string) => {
    setSelectedDesignStyles((prev) =>
      prev.includes(designStyle)
        ? prev.filter((s) => s !== designStyle)
        : [...prev, designStyle]
    );
  };

  const toggleFinish = (finish: string) => {
    setSelectedFinishes((prev) =>
      prev.includes(finish)
        ? prev.filter((f) => f !== finish)
        : [...prev, finish]
    );
  };

  const toggleApplication = (application: string) => {
    setSelectedApplications((prev) =>
      prev.includes(application)
        ? prev.filter((a) => a !== application)
        : [...prev, application]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleThickness = (thickness: string) => {
    setSelectedThicknesses((prev) =>
      prev.includes(thickness)
        ? prev.filter((t) => t !== thickness)
        : [...prev, thickness]
    );
  };

  const toggleSpecialFeature = (feature: string) => {
    setSelectedSpecialFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const clearAllFilters = () => {
    setSelectedCatalogues([]);
    setSelectedMainCategories([]);
    setSelectedDesignStyles([]);
    setSelectedFinishes([]);
    setSelectedApplications([]);
    setSelectedSizes([]);
    setSelectedThicknesses([]);
    setSelectedSpecialFeatures([]);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to the scroll target with smooth behavior
    // Using requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      scrollTargetRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleQuickView = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const totalActiveFilters =
    selectedCatalogues.length +
    selectedMainCategories.length +
    selectedDesignStyles.length +
    selectedFinishes.length +
    selectedApplications.length +
    selectedSizes.length +
    selectedThicknesses.length +
    selectedSpecialFeatures.length;

  // Find the selected catalogue if exactly one is selected
  const selectedCatalogue =
    selectedCatalogues.length === 1
      ? allCatalogues.find((c) => c.slug === selectedCatalogues[0])
      : null;

  return (
    <div ref={scrollTargetRef} className="bg-neutral-50">
      <section className="section pt-12">
        <div className="container">
          <Breadcrumb items={[{ label: "Products" }]} />

          {selectedCatalogue ? (
            // Show catalogue header when a single catalogue is selected
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                {selectedCatalogue.thumbnail && (
                  <div className="relative w-full md:w-48 h-64 md:h-48 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                    <Image
                      src={selectedCatalogue.thumbnail}
                      alt={selectedCatalogue.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h1 className="title-section mb-2">
                    {selectedCatalogue.title}
                  </h1>
                  {selectedCatalogue.description && (
                    <p className="text-body mb-4">
                      {selectedCatalogue.description}
                    </p>
                  )}
                  {selectedCatalogue.fileUrl && (
                    <a
                      href={selectedCatalogue.fileUrl}
                      download={selectedCatalogue.title}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-950 text-white rounded-md hover:bg-neutral-800 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Download Catalogue
                      {selectedCatalogue.fileSize && (
                        <span className="text-sm text-neutral-400 ml-1">
                          ({selectedCatalogue.fileSize})
                        </span>
                      )}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Show default header when no catalogue or multiple catalogues selected
            <div className="mb-8">
              <h1 className="title-section">Our Products</h1>
              <p className="text-body">
                Select a catalogue to explore curated collections of premium
                tiles and natural stones
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block">
              <Card className="border-0">
                <CardContent className="p-0 pr-6">
                  <CardTitle className="mb-4">Filters</CardTitle>
                  <FilterControls
                    selectedCatalogues={selectedCatalogues}
                    selectedMainCategories={selectedMainCategories}
                    selectedDesignStyles={selectedDesignStyles}
                    selectedFinishes={selectedFinishes}
                    selectedApplications={selectedApplications}
                    selectedSizes={selectedSizes}
                    selectedThicknesses={selectedThicknesses}
                    selectedSpecialFeatures={selectedSpecialFeatures}
                    catalogueOpen={catalogueOpen}
                    mainCategoryOpen={mainCategoryOpen}
                    designStyleOpen={designStyleOpen}
                    finishOpen={finishOpen}
                    applicationsOpen={applicationsOpen}
                    sizesOpen={sizesOpen}
                    thicknessesOpen={thicknessesOpen}
                    specialFeaturesOpen={specialFeaturesOpen}
                    onCatalogueOpenChange={setCatalogueOpen}
                    onMainCategoryOpenChange={setMainCategoryOpen}
                    onDesignStyleOpenChange={setDesignStyleOpen}
                    onFinishOpenChange={setFinishOpen}
                    onApplicationsOpenChange={setApplicationsOpen}
                    onSizesOpenChange={setSizesOpen}
                    onThicknessesOpenChange={setThicknessesOpen}
                    onSpecialFeaturesOpenChange={setSpecialFeaturesOpen}
                    onToggleCatalogue={toggleCatalogue}
                    onToggleMainCategory={toggleMainCategory}
                    onToggleDesignStyle={toggleDesignStyle}
                    onToggleFinish={toggleFinish}
                    onToggleApplication={toggleApplication}
                    onToggleSize={toggleSize}
                    onToggleThickness={toggleThickness}
                    onToggleSpecialFeature={toggleSpecialFeature}
                    onClearAll={clearAllFilters}
                    getCatalogueCount={getCatalogueCount}
                    getMainCategoryCount={getMainCategoryCount}
                    getDesignStyleCount={getDesignStyleCount}
                    getFinishCount={getFinishCount}
                    getApplicationCount={getApplicationCount}
                    getSizeCount={getSizeCount}
                    getThicknessCount={getThicknessCount}
                    getSpecialFeatureCount={getSpecialFeatureCount}
                    catalogues={catalogues}
                    mainCategories={mainCategories}
                    designStyles={designStyles}
                    finishes={finishes}
                    applications={applications}
                    sizes={availableSizes}
                    thicknesses={thicknesses}
                    specialFeatures={["bookmatch", "sixFace", "fullBody"]}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              {/* Controls Bar */}
              <div className="flex items-center justify-between mb-4 gap-4">
                <Sheet
                  open={mobileFiltersOpen}
                  onOpenChange={setMobileFiltersOpen}
                >
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden relative">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                      {totalActiveFilters > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                          {totalActiveFilters}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterControls
                        selectedCatalogues={selectedCatalogues}
                        selectedMainCategories={selectedMainCategories}
                        selectedDesignStyles={selectedDesignStyles}
                        selectedFinishes={selectedFinishes}
                        selectedApplications={selectedApplications}
                        selectedSizes={selectedSizes}
                        selectedThicknesses={selectedThicknesses}
                        selectedSpecialFeatures={selectedSpecialFeatures}
                        catalogueOpen={catalogueOpen}
                        mainCategoryOpen={mainCategoryOpen}
                        designStyleOpen={designStyleOpen}
                        finishOpen={finishOpen}
                        applicationsOpen={applicationsOpen}
                        sizesOpen={sizesOpen}
                        thicknessesOpen={thicknessesOpen}
                        specialFeaturesOpen={specialFeaturesOpen}
                        onCatalogueOpenChange={setCatalogueOpen}
                        onMainCategoryOpenChange={setMainCategoryOpen}
                        onDesignStyleOpenChange={setDesignStyleOpen}
                        onFinishOpenChange={setFinishOpen}
                        onApplicationsOpenChange={setApplicationsOpen}
                        onSizesOpenChange={setSizesOpen}
                        onThicknessesOpenChange={setThicknessesOpen}
                        onSpecialFeaturesOpenChange={setSpecialFeaturesOpen}
                        onToggleCatalogue={toggleCatalogue}
                        onToggleMainCategory={toggleMainCategory}
                        onToggleDesignStyle={toggleDesignStyle}
                        onToggleFinish={toggleFinish}
                        onToggleApplication={toggleApplication}
                        onToggleSize={toggleSize}
                        onToggleThickness={toggleThickness}
                        onToggleSpecialFeature={toggleSpecialFeature}
                        onClearAll={clearAllFilters}
                        getCatalogueCount={getCatalogueCount}
                        getMainCategoryCount={getMainCategoryCount}
                        getDesignStyleCount={getDesignStyleCount}
                        getFinishCount={getFinishCount}
                        getApplicationCount={getApplicationCount}
                        getSizeCount={getSizeCount}
                        getThicknessCount={getThicknessCount}
                        getSpecialFeatureCount={getSpecialFeatureCount}
                        catalogues={catalogues}
                        mainCategories={mainCategories}
                        designStyles={designStyles}
                        finishes={finishes}
                        applications={applications}
                        sizes={availableSizes}
                        thicknesses={thicknesses}
                        specialFeatures={["bookmatch", "sixFace", "fullBody"]}
                        isMobile
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                <p className="text-body hidden sm:block">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "product" : "products"}
                </p>

                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-neutral-600 hidden sm:block">
                    Sort by:
                  </span>
                  <Select
                    value={sortBy}
                    onValueChange={(v) => setSortBy(v as SortOption)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <p className="text-body sm:hidden mb-4">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={handleQuickView}
                      />
                    ))}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                  />

                  <p className="text-center text-sm text-neutral-600 mt-4">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                    {Math.min(
                      currentPage * ITEMS_PER_PAGE,
                      filteredProducts.length
                    )}{" "}
                    of {filteredProducts.length} products
                  </p>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="text-neutral-400 mb-4">
                    <SlidersHorizontal className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="title-subsection mb-2">No products found</h3>
                  <p className="text-body text-neutral-600 mb-4">
                    Try adjusting your filters to find what you&apos;re looking
                    for.
                  </p>
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <QuickViewModal
        product={quickViewProduct}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </div>
  );
}
