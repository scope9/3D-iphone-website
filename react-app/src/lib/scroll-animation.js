import gsap from 'gsap';

// onUpdate update the position of the camera. Every time we call the parameters of the camera we will use the onUpdate to update and rerender

export const scrollAnimation = (position, target, isMobile, onUpdate) => {
    // ti stands for timeline. scrollAnimation is imported in the webgiviewer
    const tl = gsap.timeline();

    // In the gsap timeline we want to execute to function. This function takes the parameter of what we want to animate but first we want to add the position of the camera and the second argument is the one that triggers the animation. This is scrollTrigger. 
    tl.to(position, {
        // set values of what we're going to change. We get these values in the webgiviewer website. Go to Animations tab > Add Current View > camera view > shows the x,y,z values in position
        x: !isMobile ? -3.38 : -7.0,
        // !isMobile ? value is after the colon: This ternary operator means when its not mobile the value for y is 10.74 but when it is mobile is -12.2
        y: !isMobile ? -10.74 : -12.2,
        z: !isMobile ? -5.93 : -6.0,

        scrollTrigger: {
            // First property in scrollTrigger object is the element "trigger" that triggers the animation. 
            trigger: '.sound-section',
            // The second property is when we want to start trigger so we name this second property "start" and put "top bottom" as its value bc we want to start at the top of the sound section when it hits bottom of the viewport sound section so basically as soon as you start scrolling down
            start: "top bottom",
            // When the top of the viewport meets the top of the sound section animation ends. This means as soon your top screen touches the sound section the animation is over.
            end: "top top",
            // if we update camera position and we leave it like that we  only have start and end position and there will be no in between transition so we use scrub to slow it down. 2 works the best with delay
            scrub: 2,
            // will not render this animation unless its finally trigger
            immediateRender: false

        },
        // Once this animation is done we call this onUpdate method. This method sets the flag to true and viewer to dirty. Which means the viewer needs to be updated and it triggers the addEventListener and that camera.position gets updated in the code camera.positionTargedUpdated(true) in WebgiViewer.jsx
        onUpdate
    })
    // same logic as position but with different x,y,z value
    .to(target, {
        // set values of what we're going to change. We get these values in the webgiviewer website. Go to Animations tab > Add Current View > camera view > shows the x,y,z values in target
        x: !isMobile ? 1.52: 0.7,
        y: !isMobile ? 0.77: 1.9,
        z: !isMobile ? -1.08: 0.7,

        scrollTrigger: {
            // First property in scrollTrigger object is the element "trigger" that triggers the animation. 
            trigger: '.sound-section',
            // The second property is when we want to start trigger so we name this second property "start" and put "top bottom" as its value bc we want to start at the top of the sound section when it hits bottom of the viewport sound section
            start: "top bottom",
            // When the top of the viewport meets the top of the sound section animation ends. This means as soon your top screen touches the sound section the animation is over.
            end: "top top",
            // if we update camera position and we leave it like that we  only have start and end position and there will be no in between transition so we use scrub to slow it down. 2 works the best with delay
            scrub: 2,
            // will not render this animation unless its finally trigger
            immediateRender: false

        },
        // Removed onUpdate bc its enough this is enough to call this function only once
    })
    .to('.jumbotron-section', {
        // opacity the iphone holding image to allow 3d model to not be covered by it
        opacity:0,
        scrollTrigger: {
            // First property in scrollTrigger object is the element "trigger" that triggers the animation. 
            trigger: '.sound-section',
            // The second property is when we want to start trigger so we name this second property "start" and put "top bottom" as its value bc we want to start at the top of the sound section when it hits bottom of the viewport sound section
            start: "top bottom",
            // When the top of the viewport meets the top of the sound section animation ends. This means as soon your top screen touches the sound section the animation is over.
            end: "top top",
            // if we update camera position and we leave it like that we  only have start and end position and there will be no in between transition so we use scrub to slow it down. 2 works the best with delay
            scrub: 2,
            // will not render this animation unless its finally trigger
            immediateRender: false

        },
        // Removed onUpdate bc its enough this is enough to call this function only once
    })

    // last animation section
    tl.to(position, {
        // set values of what we're going to change. We get these values in the webgiviewer website. Go to Animations tab > Add Current View > camera view > shows the x,y,z values in position
        x: !isMobile ? 1.56: 9.36,
        y: !isMobile ? 5.0: 10.95,
        z: !isMobile ? 0.01: 0.09,

        scrollTrigger: {
            // First property in scrollTrigger object is the element "trigger" that triggers the animation. 
            trigger: '.display-section',
            // The second property is when we want to start trigger so we name this second property "start" and put "top bottom" as its value bc we want to start at the top of the sound section when it hits bottom of the viewport sound section so basically as soon as you start scrolling down
            start: "top bottom",
            // When the top of the viewport meets the top of the sound section animation ends. This means as soon your top screen touches the sound section the animation is over.
            end: "top top",
            // if we update camera position and we leave it like that we  only have start and end position and there will be no in between transition so we use scrub to slow it down. 2 works the best with delay
            scrub: 2,
            // will not render this animation unless its finally trigger
            immediateRender: false

        },
        // Once this animation is done we call this onUpdate method. This method sets the flag to true and viewer to dirty. Which means the viewer needs to be updated and it triggers the addEventListener and that camera.position gets updated in the code camera.positionTargedUpdated(true) in WebgiViewer.jsx
        onUpdate
    })
    // same logic as position but with different x,y,z value
    .to(target, {
        // set values of what we're going to change. We get these values in the webgiviewer website. Go to Animations tab > Add Current View > camera view > shows the x,y,z values in target
        x: !isMobile ? -0.55: -1.62,
        y: !isMobile ? 0.32: 0.02,
        z: !isMobile ? 0.0: -0.06,

        scrollTrigger: {
            // First property in scrollTrigger object is the element "trigger" that triggers the animation. 
            trigger: '.display-section',
            // The second property is when we want to start trigger so we name this second property "start" and put "top bottom" as its value bc we want to start at the top of the sound section when it hits bottom of the viewport sound section
            start: "top bottom",
            // When the top of the viewport meets the top of the sound section animation ends. This means as soon your top screen touches the sound section the animation is over.
            end: "top top",
            // if we update camera position and we leave it like that we  only have start and end position and there will be no in between transition so we use scrub to slow it down. 2 works the best with delay
            scrub: 2,
            // will not render this animation unless its finally trigger
            immediateRender: false

        },
    })

}