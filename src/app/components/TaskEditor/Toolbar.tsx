"use client";

import { useState, useEffect, useRef } from "react";
import type { Editor } from "@tiptap/react";
import { AttachmentIcon } from "../icons/AttachmentIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { MentionIcon } from "../icons/MentionIcon";
import { EmoteIcon } from "../icons/EmoteIcon";
import { OrderedListIcon } from "../icons/OrderedListIcon";
import { TaskListIcon } from "../icons/TaskListIcon";
import { UnorderedListIcon } from "../icons/UnorderedListIcon";
import {
  FontBoldIcon,
  FontItalicIcon,
  HeadingIcon,
  CodeIcon,
} from "@radix-ui/react-icons";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useCallback } from "react";

export default function EditorToolbar({
  editor,
  setNotInteractingWithModal,
}: {
  editor: Editor;
  setNotInteractingWithModal: (value: boolean) => void;
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
        setTimeout(() => {
          setNotInteractingWithModal(false);
        }, 100);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowEmojiPicker, setNotInteractingWithModal]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="relative max-w-[70%] md:max-w-full">
      {showEmojiPicker && (
        <div
          className="absolute top-10 left-0 lg:-top-20 lg:left-32 z-[9999]"
          ref={emojiPickerRef}
        >
          <Picker
            data={data}
            theme="light"
            onEmojiSelect={(emoji: any) => {
              editor
                .chain()
                .focus()
                .insertContent(emoji.native as string)
                .run();
            }}
            previewPosition="none"
          />
        </div>
      )}
      <div className="flex gap-4 text-sm overflow-x-auto overflow-y-hidden">
        <button className="text-zinc-500 hover:text-zinc-700">
          <AttachmentIcon className="w-6 h-6" />
        </button>
        <button className="text-zinc-500 hover:text-zinc-700">
          <MentionIcon className="w-6 h-6" />
        </button>
        <button
          className={`hover:text-zinc-700 rounded-md p-1 ${
            showEmojiPicker ? "bg-zinc-100 text-zinc-700" : "text-zinc-500"
          }`}
          onClick={() => {
            setShowEmojiPicker(!showEmojiPicker);
            setNotInteractingWithModal(!showEmojiPicker);
          }}
          ref={triggerRef}
        >
          <EmoteIcon className="w-6 h-6" />
        </button>
        <button
          className={`hover:text-zinc-700 rounded-md p-1 ${
            editor.isActive("heading", { level: 2 })
              ? "bg-zinc-100 text-zinc-700"
              : "text-zinc-500"
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <HeadingIcon className="w-6 h-6" />
        </button>
        <button
          className={`hover:text-zinc-700 rounded-md p-1 ${
            editor.isActive("bold")
              ? "bg-zinc-100 text-zinc-700"
              : "text-zinc-500"
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <FontBoldIcon className="w-6 h-6" />
        </button>
        <button
          className={`hover:text-zinc-700 rounded-md p-1 ${
            editor.isActive("italic")
              ? "bg-zinc-100 text-zinc-700"
              : "text-zinc-500"
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <FontItalicIcon className="w-6 h-6" />
        </button>
        <button
          className={`hover:text-zinc-700 rounded-md p-1 ${
            editor.isActive("codeBlock")
              ? "bg-zinc-100 text-zinc-700"
              : "text-zinc-500"
          }`}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
        >
          <CodeIcon className="w-6 h-6" />
        </button>
        <button
          className={`hover:text-zinc-700 rounded-md p-1 ${
            editor.isActive("link")
              ? "bg-zinc-100 text-zinc-700"
              : "text-zinc-500"
          }`}
          onClick={() => {
            setLink();
          }}
          disabled={editor.state.selection.empty}
        >
          <LinkIcon className="w-6 h-6" />
        </button>
        <button
          className={`hover:text-zinc-700 rounded-md p-1 ${
            editor.isActive("orderedList")
              ? "bg-zinc-100 text-zinc-700"
              : "text-zinc-500"
          }`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        >
          <OrderedListIcon className="w-6 h-6" />
        </button>
        <button
          className={`hover:text-zinc-700 rounded-md p-1 ${
            editor.isActive("bulletList")
              ? "bg-zinc-100 text-zinc-700"
              : "text-zinc-500"
          }`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={!editor.can().chain().focus().toggleBulletList().run()}
        >
          <UnorderedListIcon className="w-6 h-6" />
        </button>
        <button
          className={`hover:text-zinc-700 rounded-md p-1 ${
            editor.isActive("taskList")
              ? "bg-zinc-100 text-zinc-700"
              : "text-zinc-500"
          }`}
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          disabled={!editor.can().chain().focus().toggleTaskList().run()}
        >
          <TaskListIcon className="w-6 h-6" />
        </button>
      </div>
      {/* <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      ></button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={editor.isActive("taskList") ? "is-active" : ""}
      >
        task list
      </button> */}
    </div>
  );
}
