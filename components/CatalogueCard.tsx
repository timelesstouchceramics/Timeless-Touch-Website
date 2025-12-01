"use client";

import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface CatalogueCardProps {
  title: string;
  thumbnail: string;
  fileUrl: string;
  fileSize?: string;
}

export default function CatalogueCard({
  title,
  thumbnail,
  fileUrl,
  fileSize,
}: CatalogueCardProps) {
  return (
    <div className="bg-white rounded-md shadow-xs hover:shadow-sm transition-shadow overflow-hidden group h-full">
      <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-200">
            <FileText className="h-16 w-16 text-neutral-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-neutral-950 mb-2 line-clamp-2 min-h-[2.5rem]">
          {title}
        </h3>
        {fileSize && (
          <p className="text-xs text-neutral-500 mb-3">{fileSize}</p>
        )}
        <Button variant="outlineDark" className="w-full" size="sm" asChild>
          <Link
            href={fileUrl}
            download={title}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Link>
        </Button>
      </div>
    </div>
  );
}
