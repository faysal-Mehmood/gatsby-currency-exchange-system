import React from "react"
export const onRenderBody = (
  { setHeadComponents, setPostBodyComponents },
  pluginOptions
) => {
  setHeadComponents([
    <script
			key="tracking"
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDU08Q_Hw2Vg4oEiZOR9UBCRiV0Sc7NLIU&libraries=places"
      type="text/javascript"
      async
    />,
  ])
}