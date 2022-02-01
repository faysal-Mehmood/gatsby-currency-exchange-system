import React, { useEffect, useState } from "react"
import classNames from "classnames"
import { useStaticQuery, graphql } from "gatsby"
import { default as GatsbyImage } from "gatsby-image"
import { MoneyTransfer } from "src/sws-ui"

const Hero = ({
  heading,
  subHeading,
  image,
  button,
  imageAlign = "left",
  row,
}) => {
  // const classes = classNames(
  // 	'hero',
  // 	'col-center col-sm-center',
  // 	`hero--align-${imageAlign}`,
  // 	imageAlign === 'left' ? 'hero--slant-up' : 'hero--slant-down',
  // 	row,
  // );
  const [localValue, setLocalValue] = useState(false);
  const classes = classNames(
    "hero",
    "container",
    "col-full col-sm-full",
    imageAlign === "left" ? "hero--slant-up" : "hero--slant-down",
    row
  )

  useEffect(() => {
   if(typeof window !== 'undefined') {
    setLocalValue(!!localStorage.getItem('smartway_auth'))
   }
  },[typeof window !== 'undefined' && localStorage.getItem('smartway_auth')])

  const wrapperClasses = classNames(
    "hero__wrapper",
    `hero--align-${imageAlign}`
  )

  const images = useStaticQuery(graphql`
    query {
      allImages: allFile(filter: { relativePath: { regex: "/hero/.*/" } }) {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              fluid(maxWidth: 558, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  const heroImage = images.allImages.edges.find(n => {
    return n.node.relativePath.includes(image)
  })
  if (!heroImage) return null


	return (
		<>
		<section className={classes}>
			<div className={wrapperClasses}>
				<GatsbyImage 
					fluid={heroImage.node.childImageSharp.fluid}
					placeholderStyle={{
						filter: 'blur(15px)',
					}}
					imgStyle={{
						height: 'inherit',
						width: '100%',
					}}
				/>

				<article className="hero__content">
					<h1>{heading}</h1>
					<h2>{subHeading}</h2>
          {!localValue && button}
          
				</article>
			</div>
			
			<MoneyTransfer />
		</section>
		</>
	);

 
}

export default Hero
