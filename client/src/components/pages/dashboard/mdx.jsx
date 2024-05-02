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

const MDX = ({ setValue }) => {
  return (
    <div>
      <MDXEditor
        onChange={(e) => setValue("description", e)}
        markdown="...Test Description..."
        contentEditableClassName="prose"
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
