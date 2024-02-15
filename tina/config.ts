import { defineConfig, Form, TinaCMS } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "blog",
        label: "Articles",
        path: "src/content/blog",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titre",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "boolean",
            name: "isDraft",
            label: "Brouillon",
          },
          {
            type: "datetime",
            name: "createdAt",
            label: "Crée le",
          },
          {
            type: "datetime",
            name: "updatedAt",
            label: "Modifié le",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          beforeSubmit: async ({
            form,
            cms,
            values,
          }: {
            form: Form;
            cms: TinaCMS;
            values: Record<string, any>;
          }) => {
            return {
              ...values,
              createdAt:
                form.crudType === "create"
                  ? new Date().toISOString()
                  : values.createdAt,
              updatedAt: new Date().toISOString(),
            };
          },
        },
      },
      {
        name: "project",
        label: "Projets",
        path: "src/content/project",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titre",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "string",
            list: true,
            name: "technos",
            label: "Technos",
            required: true,
          },
          {
            type: "boolean",
            name: "isClient",
            label: "Projet Client",
            required: true,
          },
          {
            type: "boolean",
            name: "isDraft",
            label: "Brouillon",
            required: true,
          },
          {
            type: "datetime",
            name: "createdAt",
            label: "Crée le",
          },
          {
            type: "datetime",
            name: "updatedAt",
            label: "Modifié le",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          beforeSubmit: async ({
            form,
            cms,
            values,
          }: {
            form: Form;
            cms: TinaCMS;
            values: Record<string, any>;
          }) => {
            return {
              ...values,
              createdAt:
                form.crudType === "create"
                  ? new Date().toISOString()
                  : values.createdAt,
              updatedAt: new Date().toISOString(),
            };
          },
        },
      },
    ],
  },
});
