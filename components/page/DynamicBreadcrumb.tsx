import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import React from "react";

type SupportedLanguages = "tr" | "en";

interface DynamicBreadcrumbProps {
  pathSegments: string[];
}

interface LocalizedText {
  mainPage: {
    tr: string;
    en: string;
  };
  separator: string;
}

const LOCALIZED_TEXT: LocalizedText = {
  mainPage: {
    tr: "Ana Sayfa",
    en: "Main Page",
  },
  separator: ">",
} as const;

const getBreadcrumbText = (language: string): string => {
  const lang = language as SupportedLanguages;
  return LOCALIZED_TEXT.mainPage[lang] || LOCALIZED_TEXT.mainPage.en;
};

const constructBreadcrumbPath = (
  language: string,
  segments: string[],
  currentIndex: number
): string => {
  const relevantSegments = segments.slice(2, currentIndex + 2);
  return `/${language}/${relevantSegments.join("/")}`;
};

const BreadcrumbSeparator: React.FC = () => (
  <span aria-hidden="true">{LOCALIZED_TEXT.separator}</span>
);

const MainPageBreadcrumb: React.FC<{ language: string }> = ({ language }) => (
  <BreadcrumbItem>
    <BreadcrumbLink href="/" className="hover:underline pl-2">
      {getBreadcrumbText(language)}
    </BreadcrumbLink>
  </BreadcrumbItem>
);

const BreadcrumbSegment: React.FC<{
  segment: string;
  index: number;
  language: string;
  segments: string[];
}> = ({ segment, index, language, segments }) => (
  <React.Fragment>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink
        href={constructBreadcrumbPath(language, segments, index)}
        className="hover:underline"
      >
        {decodeURIComponent(segment)}
      </BreadcrumbLink>
    </BreadcrumbItem>
  </React.Fragment>
);

export default function DynamicBreadcrumb({
  pathSegments,
}: DynamicBreadcrumbProps) {
  const language = pathSegments[0];

  return (
    <Breadcrumb className="text-lg font-bold">
      <BreadcrumbList className="flex items-center space-x-1">
        <MainPageBreadcrumb language={language} />
        {pathSegments.slice(2).map((segment, index) => (
          <BreadcrumbSegment
            key={`${segment}-${index}`}
            segment={segment}
            index={index}
            language={language}
            segments={pathSegments}
          />
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
