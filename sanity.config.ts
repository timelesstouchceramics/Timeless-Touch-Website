import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "timeless-touch",
  title: "Timeless Touch Ceramics",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Products")
              .child(
                S.documentTypeList("product").title("Products")
              ),
            S.listItem()
              .title("Collections")
              .child(
                S.documentTypeList("collection").title("Collections")
              ),
            S.listItem()
              .title("Catalogues")
              .child(
                S.documentTypeList("catalogue").title("Catalogues")
              ),
            S.divider(),
            S.listItem()
              .title("Settings")
              .child(
                S.list()
                  .title("Settings")
                  .items([
                    S.listItem()
                      .title("Main Categories")
                      .child(
                        S.documentTypeList("mainCategory").title("Main Categories")
                      ),
                    S.listItem()
                      .title("Design Styles")
                      .child(
                        S.documentTypeList("designStyle").title("Design Styles")
                      ),
                    S.listItem()
                      .title("Finishes")
                      .child(
                        S.documentTypeList("finish").title("Finishes")
                      ),
                    S.listItem()
                      .title("Applications")
                      .child(
                        S.documentTypeList("application").title("Applications")
                      ),
                    S.listItem()
                      .title("Sizes")
                      .child(
                        S.documentTypeList("size").title("Sizes")
                      ),
                    S.listItem()
                      .title("Thicknesses")
                      .child(
                        S.documentTypeList("thickness").title("Thicknesses")
                      ),
                  ])
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: "2026-01-07" }),
  ],
  schema: {
    types: schemaTypes,
  },
});
