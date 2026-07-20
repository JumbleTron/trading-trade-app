"use client";

import React, { useState } from "react";
import { LessonContent } from "@/lib/types";

interface Props {
  contentJson: string;
}

export default function LessonContentWidget({ contentJson }: Props) {
  let content: LessonContent;

  try {
    content = JSON.parse(contentJson);
  } catch (e) {
    return <div className="text-danger">Nie udało się załadować treści lekcji.</div>;
  }

  return (
    <div className="space-y-6">
      {content.blocks?.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index} className="text-foreground leading-relaxed text-base">
              {block.text}
            </p>
          );
        }
        if (block.type === "list" && block.items) {
          return (
            <ul key={index} className="list-disc pl-6 space-y-2 text-foreground">
              {block.items.map((item, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
              ))}
            </ul>
          );
        }
        if (block.type === "heading") {
          return (
            <h3 key={index} className="text-xl font-bold text-primary mt-6">
              {block.text}
            </h3>
          );
        }
        return null;
      })}
    </div>
  );
}
