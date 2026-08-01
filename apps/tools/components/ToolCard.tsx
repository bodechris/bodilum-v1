import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import type { ReactNode } from "react";

type ToolCardProps = {
  number: string;
  title: string;
  description: string;
  href?: string;
  external?: boolean;
  active?: boolean;
  comingSoon?: boolean;
  icon: ReactNode;
};

export function ToolCard({
  number,
  title,
  description,
  href,
  external,
  active,
  comingSoon,
  icon,
}: ToolCardProps) {
  const content = (
    <>
      <div className="tool-card-topline">
        <span className="tool-number">{number}</span>
        <span className={`tool-icon ${active ? "tool-icon-active" : ""}`}>{icon}</span>
      </div>
      <div className="tool-card-copy">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="tool-card-action">
        {comingSoon ? (
          <span className="coming-soon"><Clock3 size={16} /> Coming next</span>
        ) : (
          <span>{active ? "Open tool" : "Use tool"} <ArrowUpRight size={17} /></span>
        )}
      </div>
    </>
  );

  const className = `tool-card ${active ? "tool-card-featured" : ""} ${comingSoon ? "tool-card-disabled" : ""}`;

  if (!href || comingSoon) {
    return <article className={className}>{content}</article>;
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
