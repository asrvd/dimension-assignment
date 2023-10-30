"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import "../../styles/tiptap.css"

export default function TaskEditor({ editor }: { editor: Editor | null }) {
  return (
    <div className="flex flex-col gap-2 w-full px-2">
      <EditorContent editor={editor} className="!focus:outline-none border-0" />
    </div>
  );
}
