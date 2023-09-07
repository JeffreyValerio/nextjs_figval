export interface IProduct {
    name                : string;
    price               : number;
    slug                : string;
    createdAt           : Date;
    updatedAt           : Date;
    publishedAt         : Date;
    locale              : string;
    code                : string;
    stock               : number;
    model               : string;
    special_price       : number;
    rating              : number;
    features            : null;
    isNew               : boolean;
    technical_sheet     : null;
    isActive            : boolean;
    additional_features : AdditionalFeatures[];
    thumbnail           : Images;
    brand               : Brand;
    images              : Images;
    subcategory         : any;
    category            : any; // FIX THIS, NEEDS SUBCATEGORIES
    warranty            : any;
}

export interface Images {
    data: ImageAttributes;
}

export interface ImageAttributes {
    name: string;
    width: number;
    height: number;
    url: string;
    previewUrl: null;
}

export interface AdditionalFeatures {
    id: number;
    __component: string;
    color: null;
    presentacion: null;
    viscosidad: null;
    peso: null;
    dimensiones: null;
    tallas: Images;
    voltaje: null;
    potencia: null;
    duracion: null;
    presion: null;
    capacidad: null;
    produccion_aire: null;
}

export interface DataData {
    id: number;
    attributes: ImageAttributes;
}

export interface FluffyAttributes {
    name: string;
    price?: number;
    slug?: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    locale?: string;
    code?: string;
    stock?: number;
    model?: string;
    special_price?: null;
    rating?: number;
    features?: null;
    isNew?: boolean;
    technical_sheet?: null;
    isActive?: boolean;
    alternativeText?: null;
    caption?: null;
    width?: number;
    height?: number;
    formats?: Formats;
    hash?: string;
    ext?: string;
    mime?: string;
    size?: number;
    url?: string;
    previewUrl?: null;
    provider?: string;
    provider_metadata?: ProviderMetadata;
    related?: Images;
    __type?: string;
}

export interface DataDatum {
    size?: string;
    enabled?: boolean;
    id?: number;
    attributes?: FluffyAttributes;
}

export type DataUnion = DataDatum[] | DataData | null;


export interface Formats {
    thumbnail: Thumbnail;
}

export interface Thumbnail {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: null;
    size: number;
    width: number;
    height: number;
    provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
    public_id: string;
    resource_type: string;
}

export interface Brand {
    data: BrandData;
}

export interface BrandData {
    id: number;
    attributes: StickyAttributes;
}

export interface StickyAttributes {
    name: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    slug: string;
    image: Image;
    products: Products;
}

export interface Image {
    data: DataData;
}

export interface Products {
    data: ProductsDatum[];
}

export interface ProductsDatum {
    id: number;
    attributes: IndigoAttributes;
}

export interface IndigoAttributes {
    name: string;
    price: number;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    locale: string;
    code: string;
    stock: number;
    model: string;
    special_price: null;
    rating: number;
    features: null;
    isNew: boolean;
    technical_sheet: null;
    isActive: boolean;
    __type?: string;
}

export interface PurpleCategory {
    data: PurpleData;
}

export interface PurpleData {
    id: number;
    attributes: IndecentAttributes;
}

export interface IndecentAttributes {
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    locale: string;
    image: Images;
    products: Images;
    category: FluffyCategory;
    subcategories: Images;
    localizations: Images;
}

export interface FluffyCategory {
    data: FluffyData;
}

export interface FluffyData {
    id: number;
    attributes: HilariousAttributes;
}

export interface HilariousAttributes {
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    locale: string;
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}
