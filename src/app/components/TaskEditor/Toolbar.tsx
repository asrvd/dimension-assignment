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
  const [showLinkDialog, setShowLinkDialog] = useState(false);

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

  const SetLinkDialog = () => {
    const previousUrl = editor.getAttributes("link").href ?? "";

    const [url, setUrl] = useState(previousUrl);

    return (
      <div className="flex gap-2 border border-zinc-200 bg-white rounded-lg p-2 shadow-sm">
        <input
          type="text"
          className="w-full bg-transparent focus:outline-none border border-zinc-200 rounded-lg p-2"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <button
          className="text-zinc-900 bg-zinc-200 hover:bg-zinc-300 rounded-lg p-2"
          onClick={() => {
            // cancelled
            if (url === null) {
              setShowLinkDialog(false);
              return;
            }

            // empty
            if (url === "") {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
              setShowLinkDialog(false);
              return;
            }

            // update link
            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: url })
              .run();

            setShowLinkDialog(false);
          }}
        >
          Save
        </button>
      </div>
    );
  };

  return (
    <div className="relative max-w-[70%] md:max-w-full">
      {showEmojiPicker && (
        <div
          className="absolute top-10 left-0 lg:-top-20 z-[9999]"
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
      {showLinkDialog && (
        <div
          className="absolute top-16 left-0 lg:top-16 lg:right-0 z-[9999] "
          ref={emojiPickerRef}
        >
          <SetLinkDialog />
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
            setShowLinkDialog(!showLinkDialog);
            setNotInteractingWithModal(!showLinkDialog);
          }}
          disabled={editor.state.selection.empty}
          ref={triggerRef}
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
    </div>
  );
}
