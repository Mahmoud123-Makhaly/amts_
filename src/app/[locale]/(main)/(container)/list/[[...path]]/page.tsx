'use server';

import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { z } from 'zod';

import { JsonLd, Loader, ProductsList } from '@components';
import { AppMetadata, Utils, env } from '@libs';
import { DTO } from '@tot/core/types';
import { Actions } from '@libs/actions';

const searchParamsSchema = z
  .object({
    page: z.optional(z.preprocess(a => parseInt(z.string().parse(a), 10), z.number().gt(0))).default('1'),
    pageSize: z
      .optional(
        z.preprocess(
          a => parseInt(z.string().parse(a), 10),
          z.union([z.literal(50), z.literal(100), z.literal(150), z.literal(12)]),
        ),
      )
      .default('12'),
    filter: z.optional(z.string()),
    sort: z.optional(z.string()).default('createdDate:desc;name:asc'),
    priceFrom: z.optional(z.string()),
    priceTo: z.optional(z.string()),
    keyword: z.optional(z.string()),
  })
  .catch({
    page: 1,
    pageSize: 12,
    filter: env.CATALOG_ID,
    sort: 'createdDate:desc;name:asc',
  });

type Props = {
  params: { locale: string; path?: string };
  searchParams: {
    page?: number;
    pageSize?: number;
    filter?: string;
    sort?: string;
    priceFrom?: number;
    priceTo?: string;
    keyword?: string;
  };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata | null> {
  if (params.path && params.path.at(-1)) {
    const _path = params.path.at(-1);
    const { data: _category } = await Actions.products.getProductCategoryBySlug({ slug: _path! });

    if (_category?.error) return notFound();
    else {
      const _seo = _category?.data.seoInfo;
      const rootMetadata = new AppMetadata(_seo?.pageTitle || 'Products', _seo?.metaDescription || 'Products');

      rootMetadata.bindOG({
        title: _seo?.pageTitle,
        description: _seo?.metaDescription,
        siteName: env.SITE_NAME,
        locale: params.locale,
        url: new URL(`${params.path}${Utils.generateQueryString(Utils.cleanEmpty(searchParams))}`, env.SITE_DOMAIN),
        images: _category?.data.images?.map(x => ({
          url: x.url ? new URL(x.url) : new URL('cover.jpg', env.SITE_DOMAIN),
        })),
      });

      return rootMetadata.build();
    }
  }

  const rootMetadata = new AppMetadata('Products', 'Products');
  rootMetadata.bindOG({
    title: 'Products',
    description: env[`SITE_DESCRIPTION_${params.locale === 'en' ? 'EN' : 'AR'}`],
    siteName: env.SITE_NAME,
    locale: params.locale,
    url: new URL(
      `${params.path || `${params.locale}/list`}${Utils.generateQueryString(Utils.cleanEmpty(searchParams))}`,
      env.SITE_DOMAIN,
    ),
    images: new URL('/cover.jpg', env.SITE_DOMAIN),
  });
  return rootMetadata.build();
}

const Page = async ({ params, searchParams }: Props) => {
  //Validate search query object vs searchParamsSchema, to set the default values and remove empty props
  let _safeSearchParams = searchParamsSchema.safeParse(Utils.cleanEmpty(searchParams));

  if (!_safeSearchParams.success) return notFound();

  //Set category subtree value is the catalog Id as default
  let _subTree = env.CATALOG_ID + '/0a9abccd-15b0-47eb-90ef-aa2ac3251c9d';
  let selectedCategory: DTO.IProductCategoryDTO | undefined = undefined;

  //Check if there a specific category to get products from
  //if yes, then will add the category id to the subtree
  if (params.path && params.path.at(-1)) {
    const _path = params.path.at(-1);
    const { data: _category } = await Actions.products.getProductCategoryBySlug({ slug: _path! });

    if (_category?.error) return notFound();

    selectedCategory = _category?.data;
    _subTree += `/${selectedCategory?.outline}`;
  }

  const createFacetFromSafeSearchParams = () => {
    if (!_safeSearchParams.success) return undefined;

    let { page, pageSize, filter, sort, priceFrom, priceTo, keyword } = _safeSearchParams.data;

    const _concreteFacet = () => [
      {
        facet: {
          name: '__outline_named',
          label: 'Categories',
          facetType: 'TERMS',
          terms: filter?.split(',').map(
            term =>
              ({
                term: term,
                isSelected: true,
                label: term.split('___').at(-1),
              }) as DTO.IFacetTermTypeDTO,
          ),
        } as DTO.ITermFacetDTO,
      },
    ];

    return { page, pageSize, filter: filter ? _concreteFacet() : undefined, sort, priceFrom, priceTo, keyword };
  };

  //Search products based on specific filters passed by search params
  const getProducts = async () => {
    const _facet = createFacetFromSafeSearchParams();

    if (_facet) {
      const { data, validationErrors, serverError } = await Actions.products.searchProducts({
        skip: (_facet.page - 1) * _facet.pageSize,
        take: _facet.pageSize,
        subTree: _subTree,
        facets: _facet.filter,
        sort: _facet.sort,
        priceRange: { from: _facet.priceFrom, to: _facet.priceTo },
        keyword: _facet.keyword,
        selectedCategory,
      });

      if (validationErrors || serverError || data?.error) return notFound();
      else return data?.data;
    }
    return notFound();
  };

  const products: DTO.IProductConnectionDTO | undefined = await getProducts();

  return (
    <div className="product-list">
      <Suspense key={JSON.stringify(searchParams)} fallback={<Loader />}>
        {products?.JsonLd && <JsonLd html={products.JsonLd} />}
        <ProductsList products={products} />
      </Suspense>
    </div>
  );
};

export default Page;
