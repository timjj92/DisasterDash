import React, { useEffect, useState } from 'react';
import ContentContainer from './ContentContainer.jsx';
import LandingContainer from './LandingContainer.jsx';
import SignUp from '../components/SignUp.jsx';
import Login from '../components/Login.jsx';

//we utilized react-bootstrap to style our page with pre-made components
import Navbar from 'react-bootstrap/Navbar'

//we imported the next set to utilize react-router as we wanted to route in a landing page
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Link,
  } from "react-router-dom";

//We created a main container preferentially as to carry our other containers
//This allows us to also utilize another layer for styling as well

//react router has two parts, one part is integrated into your main code to direct your user
//the second portion sends the user to where they go based on where your routes are established


const MainContainer = () => {
  //instantiating hook in this component so that the fetch occurs earlier
  const [news, newsUpdate] = useState([[{title:'Loading...', link:'#'}],[{title:'Loading...', link:'#'}],[{title:'Loading...', link:'#'}]]);
  const [location, setLoc] = useState("");
  const [signupPage, setSignup] = useState(false);
  const [loginPage, setLogin] = useState(false);

  // upon rendering, the fetch will occur and the hook 'newsUpdate' should update the state
  useEffect(() => {
    fetch('/news')
    .then(resp => {
        return resp.json()})
    .then(data => {
        newsUpdate([...data])
    })
    .catch((err) => {
        console.log(err)
    })
  },[])

  // conditional rendering for sign up  
  const signupPopUp = () => {
    if (signupPage == false) {
      setSignup(true);
      setLogin(false);
    } else {
      setSignup(false);
      setLogin(false);
    }
  }

  const switchLogin = () => {
    setSignup(false);
    setLogin(true);
  }

  let SignUpDisplay = null;
  if (signupPage === true) {
    SignUpDisplay = <SignUp switchLogin={switchLogin}/>
  }

  // // conditional rendering for login
  const loginPopUp = () => {
    if (loginPage == false) {
      setLogin(true);
      setSignup(false);
    } else {
      setLogin(false);
      setSignup(false);
    }
  }

  let LoginDisplay = null;
  if (loginPage === true) {
    LoginDisplay = <Login/>
  }

  const updateLocation = (newLoc) =>{
    console.log("updated location", newLoc);
    setLoc(newLoc);
  };
    //easter egg for sandstorm- just need to click the fire icon
  const Easteregg = () => {
    const audio = new Audio(
      'https://iringtone.net/rington/file?id=8454&type=sound&name=mp3'
    );
    audio.play();
    const app = document.getElementById('root');
    app.classList.add('easter-egg');
    const colorGen = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    };
    setInterval(() => {
      const elements = document.querySelectorAll('*');
      for (let i = 0; i < elements.length; i += 1) {
        elements[i].style.backgroundColor = `${colorGen()}`;
        elements[i].style.color = `${colorGen()}`;
        elements[i].style.fill = `${colorGen()}`;
      }
    }, 100);
  };

  return ( 
    <article id ="mainContainer">
      {SignUpDisplay}
      {LoginDisplay}
        <Router>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
            <img
                alt=""
                src="http://www.clker.com/cliparts/P/r/s/n/g/W/maron-flame-logo-4.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                onClick={()=> Easteregg()}
            />
            <Link className="navLinks" to="/">Verifire</Link>
            </Navbar.Brand>
            <NavLink className="navLinks" to="/earthquake">Earthquake</NavLink>
            <NavLink className="navLinks" to="/fire">Wild Fire</NavLink>
            <NavLink className="navLinks" to="/hurricane">Hurricane</NavLink>
            <NavLink className="navLinks" to="/tornado">Tornado</NavLink>
            <button className="navLinks" onClick={loginPopUp}>Login</button>
            <button className="navLinks" onClick={signupPopUp}>Sign Up</button>
          </Navbar>
          <Switch>
        <Route path="/earthquake">
          <ContentContainer news={news}/>
        </Route>
        <Route path="/fire">
          <ContentContainer news={news}/>
        </Route>
        <Route path="/hurricane">
          <ContentContainer news={news}/>
        </Route>
        <Route path="/tornado">
          <ContentContainer news={news}/>
        </Route>
        <Route path="/">
          <LandingContainer updateLocation={updateLocation}/>
        </Route>
        </Switch>
      </Router>
    </article>
  );
}

//
 
export default MainContainer;