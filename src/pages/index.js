import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export default ({ data }) =>{
console.log(data);
  return (
      <Layout>
       <SEO title="Home" />
        <div>
          <h1>Eric's Thoughts</h1>
          <h4>{ data.allMarkdownRemark.totalCount}</h4>
        </div>
        {
          data.allMarkdownRemark.edges.map(({node}) => (
            <div key={node.id}>
              <span>{ node.frontmatter.title} - {node.frontmatter.date}</span>
              <p>{node.excerpt}</p>
            </div>  
          ))
        }
      </Layout>
    )
} 

export const query = graphql`
 query{
  allMarkdownRemark {
    edges {
      node {
        id
        frontmatter {
          date
          description
          title
        }
        html
        excerpt
      }
    }
    totalCount
  }
 }
`
