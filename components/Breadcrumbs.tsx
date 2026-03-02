"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type BreadcrumbsPropsType = {
  currentLabel?: string;
};

export default function Breadcrumbs({ currentLabel }: BreadcrumbsPropsType) {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="flex self-start">
      <ol className="flex items-center gap-2 text-sm text-gray-500">
        <li>
          <Link href="/" className="hover:underline text-gray-700">
            Home
          </Link>
        </li>

        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;

          let label = decodeURIComponent(segment);

          if (isLast && currentLabel) {
            label = currentLabel;
          }

          return (
            <li key={href} className="flex items-center gap-2">
              <span>/</span>

              {isLast ? (
                <span className="text-gray-900 font-medium capitalize">
                  {label}
                </span>
              ) : (
                <Link href={href} className="hover:underline capitalize">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
