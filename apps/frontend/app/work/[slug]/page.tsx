import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkDetailClient from "../WorkDetailClient";
import {
  getNextWorkProject,
  getWorkProject,
  workProjects,
} from "../workData";

type WorkProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    ...workProjects.map((project) => ({ slug: project.slug })),
    { slug: "unscripted-with-nompumelo" },
  ];
}

export async function generateMetadata({
  params,
}: WorkProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkProject(slug);

  if (!project) {
    return {
      title: "Work | Bodilum",
    };
  }

  return {
    title: `${project.title} | Bodilum Work`,
    description: project.summary,
    openGraph: project.cover
      ? {
          title: `${project.title} | Bodilum Work`,
          description: project.summary,
          images: [{ url: project.cover }],
        }
      : undefined,
  };
}

export default async function WorkProjectPage({ params }: WorkProjectPageProps) {
  const { slug } = await params;
  const project = getWorkProject(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextWorkProject(slug);

  return <WorkDetailClient project={project} nextProject={nextProject} />;
}
