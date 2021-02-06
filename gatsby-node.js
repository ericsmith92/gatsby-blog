/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
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
