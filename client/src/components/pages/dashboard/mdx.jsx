import {
  BoldItalicUnderlineToggles,
  ListsToggle,
  MDXEditor,
  UndoRedo,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

const MDX = ({ setValue, markdown }) => {
  return (
    <div>
      <MDXEditor
        onChange={(e) => setValue("description", e)}
        markdown={markdown || "...Test Description..."}
        contentEditableClassName="prose"
        className="border-input border-2 rounded-md"
        plugins={[
          quotePlugin(),
          listsPlugin(),
          headingsPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <ListsToggle />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
};

export default MDX;
