import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SAMPLE_PROPERTIES } from '@/lib/data/sample-data';
import PropertyDetailClient from '@/components/properties/PropertyDetailClient';

export function generateStaticParams() {
  return SAMPLE_PROPERTIES.map(p => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = SAMPLE_PROPERTIES.find(p => p.slug === slug);
  if (!property) {
    return { title: 'Property Not Found | Signature Aura™' };
  }

  return {
    title: `${property.title} · ${property.priceDisplay} | Signature Aura™`,
    description: property.tagline || property.description.slice(0, 160),
    openGraph: {
      title: `${property.title} · ${property.priceDisplay}`,
      description: property.tagline || property.description.slice(0, 160),
      images: property.images[0]?.url ? [property.images[0].url] : [],
    },
  };
}

export default async function PropertyDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = SAMPLE_PROPERTIES.find(p => p.slug === slug);
  if (!property) {
    notFound();
  }
  return <PropertyDetailClient slug={slug} initialProperty={property} />;
}
