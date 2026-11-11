import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SAMPLE_PROJECTS } from '@/lib/data/sample-data';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient';

export function generateStaticParams() {
  return SAMPLE_PROJECTS.map(p => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = SAMPLE_PROJECTS.find(p => p.slug === slug);
  if (!project) {
    return { title: 'Project Not Found | Signature Aura™' };
  }

  return {
    title: `${project.title} · ${project.priceStartingFrom} | Signature Aura™`,
    description: project.tagline || project.overview.slice(0, 160),
    openGraph: {
      title: `${project.title} · Starting from ${project.priceStartingFrom}`,
      description: project.tagline || project.overview.slice(0, 160),
      images: project.heroImage ? [project.heroImage] : [],
    },
  };
}

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = SAMPLE_PROJECTS.find(p => p.slug === slug);
  if (!project) {
    notFound();
  }
  return <ProjectDetailClient slug={slug} initialProject={project} />;
}
