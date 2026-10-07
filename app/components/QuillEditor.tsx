// "use client";

// import { useEffect, useRef } from "react";
// import Quill from "quill";
// import QuillBetterTable from "quill-better-table";

// import "quill/dist/quill.snow.css";
// import "quill-better-table/dist/quill-better-table.css";

// /* ✅ REGISTER TABLE MODULE */
// Quill.register(
//   {
//     "modules/better-table": QuillBetterTable,
//   },
//   true,
// );

// interface QuillEditorProps {
//   value: string;
//   onChange: (value: string) => void;
// }

// export default function QuillEditor({
//   value,
//   onChange,
// }: QuillEditorProps) {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const quillRef = useRef<Quill | null>(null);

//   useEffect(() => {
//     if (!editorRef.current || quillRef.current) return;

//     const quill = new Quill(editorRef.current, {
//       theme: "snow",

//       modules: {
//         toolbar: {
//           container: [
//             [{ header: [1, 2, 3, false] }],
//             ["bold", "italic", "underline"],
//             ["blockquote"],
//             [{ list: "ordered" }, { list: "bullet" }],
//             [
//               { align: "" },
//               { align: "center" },
//               { align: "right" },
//               { align: "justify" },
//             ],
//             ["link", "image", "video"],
//             ["clean"],
//             ["table"],
//           ],

//           handlers: {
//             blockquote: () => {
//               const range = quill.getSelection();

//               if (!range) return;

//               if (range.length > 0) {
//                 const text = quill.getText(
//                   range.index,
//                   range.length,
//                 );

//                 const cleanText = text
//                   .replace(/^"+|"+$/g, "")
//                   .trim();

//                 quill.deleteText(
//                   range.index,
//                   range.length,
//                   "user",
//                 );

//                 quill.insertText(
//                   range.index,
//                   `"${cleanText}"`,
//                   "user",
//                 );

//                 quill.setSelection(
//                   range.index,
//                   cleanText.length + 2,
//                   "silent",
//                 );
//               }
//             },

//             // your existing video handler
//             video: function () {
//               // keep your existing video code here
//             },
//           },
//         },

//         "better-table": {
//           // keep existing code
//         },

//         keyboard: {
//           bindings: QuillBetterTable.keyboardBindings,
//         },
//       },
//     });

//     quillRef.current = quill;

//     /* ===============================
//        🔥 ENABLE TABLE RESIZE
//     =============================== */
//     const enableTableResize = () => {
//       const editor = editorRef.current;
//       if (!editor) return;

//       let startX = 0;
//       let startWidth = 0;
//       let currentCol: HTMLTableColElement | null = null;

//       let frameId: number | null = null;
//       let pendingWidth = 0;

//       const applyWidth = () => {
//         if (currentCol) {
//           currentCol.style.width = `${pendingWidth}px`;
//         }

//         frameId = null;
//       };

//       const onMouseMove = (e: MouseEvent) => {
//         if (!currentCol) return;

//         pendingWidth = Math.max(
//           40,
//           startWidth + (e.clientX - startX),
//         );

//         if (frameId) return;

//         frameId = requestAnimationFrame(applyWidth);
//       };

//       const onMouseUp = () => {
//         currentCol = null;

//         if (frameId) {
//           cancelAnimationFrame(frameId);
//           frameId = null;
//         }

//         document.removeEventListener("mousemove", onMouseMove);
//         document.removeEventListener("mouseup", onMouseUp);
//       };

//       const onMouseDown = (e: MouseEvent) => {
//         const target = e.target as HTMLElement;

//         const cell = target.closest("td, th");
//         if (!cell) return;

//         const rect = cell.getBoundingClientRect();

//         if (rect.right - e.clientX > 8) return;

//         const table = cell.closest("table");
//         if (!table) return;

//         let colgroup = table.querySelector("colgroup");

//         if (!colgroup) {
//           colgroup = document.createElement("colgroup");

//           const cols =
//             cell.parentElement?.children.length ?? 0;

//           for (let i = 0; i < cols; i++) {
//             const col = document.createElement("col");

//             col.style.width = `${100 / cols}%`;

//             colgroup.appendChild(col);
//           }

//           table.prepend(colgroup);
//         }

//         const colIndex = Array.from(
//           cell.parentElement?.children || [],
//         ).indexOf(cell);

//         currentCol =
//           colgroup.children[
//           colIndex
//           ] as HTMLTableColElement;

//         startX = e.clientX;

//         /* Read width once */
//         startWidth =
//           currentCol.getBoundingClientRect().width;

//         e.preventDefault();
//         e.stopPropagation();

//         document.addEventListener(
//           "mousemove",
//           onMouseMove,
//         );

//         document.addEventListener(
//           "mouseup",
//           onMouseUp,
//         );
//       };

//       editor.addEventListener(
//         "mousedown",
//         onMouseDown,
//         true,
//       );

//       return () => {
//         editor.removeEventListener(
//           "mousedown",
//           onMouseDown,
//           true,
//         );
//       };
//     };

//     enableTableResize();

//     /* ===============================
//        🔥 CLEAN PASTE FORMATTING
//     =============================== */
//     quill.clipboard.addMatcher(
//       Node.ELEMENT_NODE,
//       (node: any, delta: any) => {
//         delta.ops = delta.ops.map((op: any) => {
//           if (op.attributes) {
//             delete op.attributes.size;
//             delete op.attributes.background;
//             delete op.attributes.color;
//           }

//           return op;
//         });

//         return delta;
//       },
//     );

//     /* ===============================
//        TABLE BUTTON HANDLER
//     =============================== */
//     const toolbar = quill.getModule("toolbar");

//     if (toolbar) {
//       (toolbar as any).addHandler("table", () => {
//         const tableModule =
//           quill.getModule("better-table") as any;

//         tableModule.insertTable(3, 3);
//       });
//     }

//     /* ===============================
//        EDITOR → PARENT
//     =============================== */
//     quill.on("text-change", () => {
//       const html = quill.root.innerHTML;

//       onChange(html);
//     });
//   }, [onChange]);

//   /* ===============================
//      PARENT → EDITOR
//   =============================== */
//   useEffect(() => {
//     if (!quillRef.current) return;

//     const quill = quillRef.current;

//     if (value !== quill.root.innerHTML) {
//       quill.root.innerHTML = value || "";
//     }
//   }, [value]);

//   return (
//     <div className="quill-wrapper overflow-x-auto">
//       <div ref={editorRef} />
//     </div>
//   );
// }


"use client";

import { useEffect, useRef } from "react";

type QuillEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function QuillEditor({
  value = "",
  onChange,
  placeholder = "Write something...",
  className = "",
}: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<any>(null);
  const onChangeRef = useRef(onChange);

  // Keep the latest onChange callback without recreating Quill
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    let mounted = true;

    const initQuill = async () => {
      if (!editorRef.current || quillRef.current) {
        return;
      }

      try {
        // Load Quill only in the browser
        const [{ default: Quill }, { default: QuillBetterTable }] =
          await Promise.all([
            import("quill"),
            import("quill-better-table"),
          ]);

        if (!mounted || !editorRef.current) {
          return;
        }

        // Register Better Table
        Quill.register(
          {
            "modules/better-table": QuillBetterTable,
          },
          true
        );

        const quill = new Quill(editorRef.current, {
          theme: "snow",

          placeholder,

          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],

              ["bold", "italic", "underline", "strike"],

              [{ color: [] }, { background: [] }],

              [{ list: "ordered" }, { list: "bullet" }],

              [{ align: [] }],

              ["blockquote", "code-block"],

              ["link", "image"],

              ["clean"],
            ],

            "better-table": {
              operationMenu: {
                items: {
                  unmergeCells: {
                    text: "Unmerge cells",
                  },
                },
              },
            },

            keyboard: {
              bindings: QuillBetterTable.keyboardBindings,
            },
          },
        });

        // Set initial value
        if (value) {
          quill.root.innerHTML = value;
        }

        // Listen for changes
        quill.on("text-change", () => {
          if (onChangeRef.current) {
            onChangeRef.current(quill.root.innerHTML);
          }
        });

        quillRef.current = quill;
      } catch (error) {
        console.error("Failed to initialize Quill editor:", error);
      }
    };

    initQuill();

    return () => {
      mounted = false;

      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  // Update editor when value changes externally
  useEffect(() => {
    const quill = quillRef.current;

    if (!quill) {
      return;
    }

    const currentValue = quill.root.innerHTML;

    if (value !== currentValue) {
      const selection = quill.getSelection();

      quill.root.innerHTML = value || "";

      if (selection) {
        quill.setSelection(selection);
      }
    }
  }, [value]);

  return (
    <div
      className={`quill-editor-wrapper ${className}`}
    >
      <div ref={editorRef} />
    </div>
  );
}
