import React, {
    useRef,
    useState,
    useEffect,
    useCallback,
    forwardRef,
    useImperativeHandle,
  } from "react";
  import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    mobileAndTabletCheck,
  } from "webgi";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { scrollAnimation } from "../lib/scroll-animation";
  
  // This is the animation for the scroll itself
  gsap.registerPlugin(ScrollTrigger);
  
  // changed WebgiViewer from a function to a const to forwardRef use hook with 2 arguments. Then wrap all the code component to the forwardRef hook.  
  const WebgiViewer = forwardRef((props, ref) => {
    {
      //useref gets reference to a html element to perform dom manipulation. Used in return tag
      const canvasRef = useRef(null);

      const [viewerRef, setViewerRef] = useState(null);
      const [targetRef, setTargetRef] = useState(null);
      const [cameraRef, setCameraRef] = useState(null);
      const [positionRef, setPositionRef] = useState(null);
      // setting up to be used as reference in the return tag
      const canvasContainerRef = useRef(null);
      // initially we want this setPreviewMode to be false until its in the triggerPreview mode where we set it to true
      const [previewMode, setPreviewMode] = useState(false);
      const [isMobile, setIsMobile] = useState(null);

      // inside of this hook defined is the function we are going to trigger in the arrow component 
      useImperativeHandle(ref, () => ({
        // name of function triggerPreview. Need to have reference to camera, target, and position
        triggerPreview() {
          // changed previewMode from false to true
          setPreviewMode(true);
          // will remove the pointer event rule
          canvasContainerRef.current.style.pointerEvents = "all"
          // clicking the try me button will make other content section disappear showing only the image of the 3d model
          props.contentRef.current.style.opacity = "0";
          // changing the positionRef
          gsap.to(positionRef, {
          x: 13.04,
          y: -2.01,
          z: 2.29,
          duration: 2,
          // call onUpdate to update the position after set the values.
          onUpdate: () => {
            // setDirty means its marking the viewer for rendering
            viewerRef.setDirty;
            // position of the target has been updated
            cameraRef.positionTargetUpdated(true);
          }
        });
      
      gsap.to(targetRef, {x: 0.11, y: 0.0, z: 0.0, duration: 2})

      // Enable the controls so the users are  able to rotate the 3D model once the try me button is clicked
      viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: true })
    }
  }))
    
      // to avoid rerender scrollAnimation we use a callback to memoize this function. Memoisation is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.
      const memoizedScrollAnimation = useCallback((position, target, isMobile, onUpdate) => {
        // check if these 3 exist if it does it calls scrollAnimation and passes all 3 arguments
        if (position && target && onUpdate) {
          scrollAnimation(position, target, isMobile, onUpdate);
        }
        // we only want to execute this once so we use empty array of dependency []
      }, []);
    
      // function from webgi starter
      const setupViewer = useCallback(async () => {
        // Initialize the viewer
        const viewer = new ViewerApp({
          canvas: canvasRef.current,
        });

        // initialize and store it inside of the variable
        setViewerRef(viewer)

        const isMobileorTablet = mobileAndTabletCheck();
        // To be able to access this variable outside this function we need to store it to a state variable
        setIsMobile(isMobileorTablet)
    
        // Add some plugins
        const manager = await viewer.addPlugin(AssetManagerPlugin);
    
        // using the camera can access the position and target
        const camera = viewer.scene.activeCamera;
        const position = camera.position;
        const target = camera.target;


        // initialize and store it inside of the variable
        setCameraRef(camera)
        setPositionRef(position)
        setTargetRef(target)
    
        // Add plugins individually.
        await viewer.addPlugin(GBufferPlugin);
        await viewer.addPlugin(new ProgressivePlugin(32));
        await viewer.addPlugin(new TonemapPlugin(true));
        await viewer.addPlugin(GammaCorrectionPlugin);
        await viewer.addPlugin(SSRPlugin);
        await viewer.addPlugin(SSAOPlugin);
        await viewer.addPlugin(BloomPlugin);
    
        // This must be called once after all plugins are added. To load all the plugins
        viewer.renderer.refreshPipeline();
    
        // Adding 3d model from the path
        await manager.addFromPath("scene-black.glb");
    
        // fixes background
        viewer.getPlugin(TonemapPlugin).config.clipBackground = true;
    
        // Load an environment map if not set in the glb file
        // await viewer.scene.setEnvironment(
        //     await manager.importer!.importSinglePath<ITexture>(
        //         "./assets/environment.hdr"
        //     )
        // );
    
        // Disable the controls so the users are not able to rotate the 3D model once the website is loaded
        viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });

        // fixes the first section position in the mobile form
        if(isMobileorTablet) {
          position.set(-16.7, 1.17, 11.7);
          // x, y, z 
          target.set(0, 1.37, 0)
          // add additional class to conentRef
          props.contentRef.current.className = "mobile-or-tablet"
        }
    
        // position of page to be on top when website is reloaded. Top and left
        window.scrollTo(0, 0);
    
        //Event listener will update the position of the camera if update is needed
        let needsUpdate = true;
        // this says the camera and the viewer need to be updated
        const onUpdate = () => {
          needsUpdate = true;
          viewer.setDirty();
        };
        viewer.addEventListener("preFrame", () => {
          // Make a check inside the listener if it needs update then we update camera position and set flag to false
          if (needsUpdate) {
            camera.positionTargetUpdated(true);
            needsUpdate = false;
          }
        });
    
        // call function and pass argument
        memoizedScrollAnimation(position, target, isMobileorTablet, onUpdate);
      }, []);
    
      useEffect(() => {
        setupViewer();
        // pass empty array of dependency list bc we only want to do this once
      }, []);

      // want to reset the state that we set in the trigger Preview (try me button) when we exit the try me button previewMode
      const handleExit = useCallback(() => {
        // set pointer events back to none
        canvasContainerRef.current.style.pointerEvents = "none"
          props.contentRef.current.style.opacity = "1";
          // disable 3d controls to false
          viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });
          // set to false to hide the exit button
          setPreviewMode(false)


        // From scroll animation section. OnUpdate uses the approach in this componenet
          gsap.to(positionRef, {
            // set values of what we're going to change. We get these values in the webgiviewer website. Go to Animations tab > Add Current View > camera view > shows the x,y,z values in position
            x: 1.56,
            y: 5.0,
            z: 0.01,
    
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
            
            onUpdate: () => {
              viewerRef.setDirty();
              cameraRef.positionTargetUpdated(true);
            }
        })
        // same logic as position but with different x,y,z value
        gsap.to(targetRef, {
            // set values of what we're going to change. We get these values in the webgiviewer website. Go to Animations tab > Add Current View > camera view > shows the x,y,z values in target
            x: -0.55,
            y: 0.32,
            z: 0.0,
    
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

// update this function only when certain dependencies are updated
      }, [canvasContainerRef, viewerRef, positionRef, cameraRef, targetRef])
    
      return (
        <div ref={canvasContainerRef} id="webgi-canvas-container">
          {/* render 3d model in this canvas and use ref as a reference to render 3d model */}
          <canvas id="webgi-canvas" ref={canvasRef} />
          {
            // adding exit button to the try me previewMode
            previewMode && (
              <button className="button" onClick={handleExit}>Exit</button>
            )
          }
        </div>
      );
    }

  }) 
  
  export default WebgiViewer;
  