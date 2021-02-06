/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 * 
 * below, we are highjacking the build process and saying, hey gatsby, while you're at it
 * please create a slug for each of my MarkdownRemarks (derived from each of our markdown files)
 */
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`)
 
 exports.onCreateNode = ({ node, getNode, actions }) => {
     const { createNodeField } = actions
     if(node.internal.type === `MarkdownRemark`){
        const slug = createFilePath({ node,  getNode });

        createNodeField({
            node,
            name: `slug`,
            value: slug
        });
     }
 }

 exports.createPages = ({ graphql, actions }) => {
     const { createPage } = actions
     return graphql(`
     {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
     `).then(result => {
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            createPage({
                path: node.fields.slug,
                component: path.resolve(`./src/templates/blog-post.js`),
                context: {
                    slug: node.fields.slug
                }
            });
        });
     });
 }
