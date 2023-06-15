import React from "react";
import Iphone from "../assets/images/iphone-14.jpg"
import HoldingIphone from "../assets/images/iphone-hand.png"
function Jumbotron() {

    //arrow function
    const handleLearnMore = () => {
        const element = document.querySelector(".sound-section")
        // takes the sound section to scroll down
        window.scrollTo({
            // takes element from document.querySelector and uses boudningclientrect to move to the top position. The ? will notify that if the element is not defined dont execute this line  
            top: element?.getBoundingClientRect().top,
            // set to 0 to prevent horizontal scrolling
            left: 0,
            // smooth scrolling
            behavior: "smooth"
        })
    }

    return (
        <div className='jumbotron-section wrapper' >
            <h2 className='title'>New</h2>
            <img className ='logo' src={Iphone} alt="iPhone 14 Pro" />
            <p className='text' >Big and bigger</p>
            <span className='description'>
                From $41.62/mo. for 24 mo. or $999 before trade-in
            </span>
            <ul className = 'links'>
                <li>
                    <button className='button'>Buy</button>
                </li>
                <li>
                    <a className='link' onClick={handleLearnMore}>Learn more</a>
                </li>
            </ul>
            <img className='iphone-img' src={HoldingIphone} alt="iPhone" />
        </div>
    )
}

export default Jumbotron;