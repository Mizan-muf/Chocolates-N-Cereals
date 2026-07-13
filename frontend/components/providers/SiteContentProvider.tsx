"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialHomepageDisplayConfig } from "@/data/homepageDisplay";
import { initialProducts } from "@/data/products";
import { initialSiteVisualConfig } from "@/data/siteVisuals";
import { sanitizeHomepageConfig } from "@/lib/content";
import type {
  CustomRequest,
  HomepageDisplayConfig,
  Product,
  SiteVisualConfig,
} from "@/types/content";

type SiteContentContextValue = {
  products: Product[];
  homepageConfig: HomepageDisplayConfig;
  siteVisualConfig: SiteVisualConfig;
  homepageWarnings: string[];
  customRequests: CustomRequest[];
  setHomepageWarnings: (warnings: string[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  setProductStatus: (productId: string, status: Product["status"]) => void;
  setHomepageConfig: (config: HomepageDisplayConfig) => void;
  addCustomRequest: (request: CustomRequest) => void;
  setCustomRequestStatus: (
    requestId: string,
    status: CustomRequest["status"],
  ) => void;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [homepageConfig, setHomepageConfigState] = useState<HomepageDisplayConfig>(
    initialHomepageDisplayConfig,
  );
  const [homepageWarnings, setHomepageWarnings] = useState<string[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>([]);
  const [siteVisualConfig] = useState<SiteVisualConfig>(initialSiteVisualConfig);

  const addProduct = useCallback((product: Product) => {
    setProducts((prev) => [product, ...prev]);
  }, []);

  const updateProduct = useCallback((product: Product) => {
    setProducts((prev) => prev.map((item) => (item.id === product.id ? product : item)));
  }, []);

  const setHomepageConfig = useCallback(
    (config: HomepageDisplayConfig) => {
      const sanitized = sanitizeHomepageConfig(products, config);
      setHomepageConfigState(sanitized.config);
      setHomepageWarnings(sanitized.warnings);
    },
    [products],
  );

  const setProductStatus = useCallback((productId: string, status: Product["status"]) => {
    setProducts((prev) => {
      const nextProducts = prev.map((product) =>
        product.id === productId ? { ...product, status } : product,
      );
      setHomepageConfigState((prevConfig) => {
        const sanitized = sanitizeHomepageConfig(nextProducts, prevConfig);
        setHomepageWarnings(sanitized.warnings);
        return sanitized.config;
      });
      return nextProducts;
    });
  }, []);

  const addCustomRequest = useCallback((request: CustomRequest) => {
    setCustomRequests((prev) => [request, ...prev]);
  }, []);

  const setCustomRequestStatus = useCallback(
    (requestId: string, status: CustomRequest["status"]) => {
      setCustomRequests((prev) =>
        prev.map((request) =>
          request.id === requestId ? { ...request, status } : request,
        ),
      );
    },
    [],
  );

  const value = useMemo(
    () => ({
      products,
      homepageConfig,
      siteVisualConfig,
      homepageWarnings,
      customRequests,
      setHomepageWarnings,
      addProduct,
      updateProduct,
      setProductStatus,
      setHomepageConfig,
      addCustomRequest,
      setCustomRequestStatus,
    }),
    [
      products,
      homepageConfig,
      siteVisualConfig,
      homepageWarnings,
      customRequests,
      addProduct,
      updateProduct,
      setProductStatus,
      setHomepageConfig,
      addCustomRequest,
      setCustomRequestStatus,
    ],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }
  return context;
}
