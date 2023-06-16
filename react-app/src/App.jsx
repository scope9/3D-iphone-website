import Nav from "./components/Nav"
import Jumbotron from "./components/Jumbotron"
import SoundSection from "./components/SoundSection";
import DisplaySection from "./components/DisplaySection";
// import WebgiViewer from "./components/WebgiViewer";
import WebgiViewer from "./components/backuupWebgiViewer";
import Loader from "./components/Loader";
import { useRef } from "react";

function App() {
  const webgiViewerRef = useRef();
  const contentRef = useRef()

  // new function that is triggered in the DisplaySection
  const handlePreview = () => {
    webgiViewerRef.current.triggerPreview()
  }

  return (
    <div className="App">
      <Loader/>
      {/* this fades away all the sections when its in the preview mode from try me button. */}
      <div ref={contentRef} id="content">
      <Nav/>
      <Jumbotron/>
      <SoundSection/>
      <DisplaySection triggerPreview={handlePreview}/>
      </div>
      {/* Connect reference to component */}
      <WebgiViewer contentRef={contentRef} ref={webgiViewerRef}/>
    </div>
  );
}

export default App;