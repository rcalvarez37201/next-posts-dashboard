import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatStrikethrough,
  Redo,
  Undo,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  styled,
  Toolbar,
} from "@mui/material";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { forwardRef, useEffect, useImperativeHandle } from "react";

export interface TiptapEditorRef {
  getContent: () => string;
  setContent: (content: string) => void;
  focus: () => void;
}

interface TiptapEditorProps {
  placeholder?: string;
  onChange?: (content: string) => void;
  initialContent?: string;
  error?: boolean;
  disabled?: boolean;
}

// Styled components for better integration with Material UI
const EditorWrapper = styled(Paper)<{ error?: boolean }>(
  ({ theme, error }) => ({
    border: `1px solid ${
      error ? theme.palette.error.main : theme.palette.divider
    }`,
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
    "&:focus-within": {
      borderColor: error
        ? theme.palette.error.main
        : theme.palette.primary.main,
      borderWidth: "2px",
    },
  })
);

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: "48px !important",
  backgroundColor: theme.palette.action.hover,
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(0, 1),
  gap: theme.spacing(0.5),
}));

const EditorContentWrapper = styled(Box)(({ theme }) => ({
  "& .ProseMirror": {
    padding: theme.spacing(2),
    minHeight: "120px",
    outline: "none",
    fontSize: "0.875rem",
    lineHeight: 1.5,
    fontFamily: theme.typography.body1.fontFamily,
    color: theme.palette.text.primary,

    "& p.is-editor-empty:first-of-type::before": {
      content: "attr(data-placeholder)",
      float: "left",
      color: theme.palette.text.secondary,
      pointerEvents: "none",
      height: 0,
    },

    "& h1, & h2, & h3, & h4, & h5, & h6": {
      fontWeight: 600,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },

    "& h1": { fontSize: "1.5rem" },
    "& h2": { fontSize: "1.25rem" },
    "& h3": { fontSize: "1.125rem" },

    "& ul, & ol": {
      paddingLeft: theme.spacing(3),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },

    "& li": {
      marginBottom: theme.spacing(0.5),
    },

    "& blockquote": {
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      paddingLeft: theme.spacing(2),
      marginLeft: 0,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontStyle: "italic",
    },

    "& code": {
      backgroundColor: theme.palette.action.hover,
      padding: theme.spacing(0.25, 0.5),
      borderRadius: theme.shape.borderRadius,
      fontSize: "0.875em",
      fontFamily: "monospace",
    },

    "& pre": {
      backgroundColor: theme.palette.action.hover,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      overflow: "auto",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),

      "& code": {
        backgroundColor: "transparent",
        padding: 0,
      },
    },

    "& strong": {
      fontWeight: 600,
    },
  },
}));

/**
 * TiptapEditor component that provides a rich WYSIWYG editor using Tiptap.
 * Integrates seamlessly with React Hook Form and Material UI design system.
 */
const TiptapEditor = forwardRef<TiptapEditorRef, TiptapEditorProps>(
  (
    {
      placeholder = "Write something amazing...",
      onChange,
      initialContent = "",
      error = false,
      disabled = false,
    },
    ref
  ) => {
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          bulletList: {
            keepMarks: true,
            keepAttributes: false,
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: false,
          },
        }),
      ],
      content: initialContent,
      editable: !disabled,
      immediatelyRender: false,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        onChange?.(html);
      },
      editorProps: {
        attributes: {
          "data-placeholder": placeholder,
        },
      },
    });

    // Expose methods through ref for React Hook Form integration
    useImperativeHandle(ref, () => ({
      getContent: () => editor?.getHTML() || "",
      setContent: (content: string) => {
        if (editor && content !== editor.getHTML()) {
          editor.commands.setContent(content);
        }
      },
      focus: () => editor?.commands.focus(),
    }));

    // Update content when initialContent changes
    useEffect(() => {
      if (editor && initialContent !== editor.getHTML()) {
        editor.commands.setContent(initialContent);
        // Trigger onChange to sync with form
        if (onChange) {
          onChange(initialContent);
        }
      }
    }, [editor, initialContent, onChange]);

    if (!editor) {
      return null;
    }

    const ToolbarButton = ({
      onClick,
      isActive = false,
      disabled = false,
      children,
    }: {
      onClick: () => void;
      isActive?: boolean;
      disabled?: boolean;
      children: React.ReactNode;
    }) => (
      <IconButton
        onClick={onClick}
        disabled={disabled}
        size="small"
        color={isActive ? "primary" : "default"}
        sx={{
          backgroundColor: isActive ? "primary.main" : "transparent",
          color: isActive ? "primary.contrastText" : "text.primary",
          "&:hover": {
            backgroundColor: isActive ? "primary.dark" : "action.hover",
          },
        }}
      >
        {children}
      </IconButton>
    );

    return (
      <EditorWrapper error={error}>
        <StyledToolbar variant="dense">
          {/* Text formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            disabled={disabled}
          >
            <FormatBold />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            disabled={disabled}
          >
            <FormatItalic />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
            disabled={disabled}
          >
            <FormatStrikethrough />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive("code")}
            disabled={disabled}
          >
            <Code />
          </ToolbarButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          {/* Lists */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            disabled={disabled}
          >
            <FormatListBulleted />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            disabled={disabled}
          >
            <FormatListNumbered />
          </ToolbarButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          {/* Block elements */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            disabled={disabled}
          >
            <FormatQuote />
          </ToolbarButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          {/* History */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={disabled || !editor.can().chain().focus().undo().run()}
          >
            <Undo />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={disabled || !editor.can().chain().focus().redo().run()}
          >
            <Redo />
          </ToolbarButton>
        </StyledToolbar>

        <EditorContentWrapper>
          <EditorContent editor={editor} />
        </EditorContentWrapper>
      </EditorWrapper>
    );
  }
);

TiptapEditor.displayName = "TiptapEditor";

export default TiptapEditor;
