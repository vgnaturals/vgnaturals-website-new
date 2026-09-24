import {getProduct} from "@/lib/site-data"; import ProductDetail from "@/components/ProductDetail"; import {notFound} from "next/navigation";
export async function generateMetadata(){const p=getProduct("lemongrass-hydrosol"); if(!p)return{}; return {title:p.seoTitle,description:p.seoDescription};}
export default function Page(){const p=getProduct("lemongrass-hydrosol"); if(!p)return notFound(); return <ProductDetail product={p}/>}
