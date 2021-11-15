import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// api https://blog-basic-task.herokuapp.com/

//landing page and dashboar
import LandingPage from './components/landingPage/landingpage'


//import auth routes
import Login from './components/auth/login';
import Register from './components/auth/register';
import Forgot from './components/auth/forgot';
import Reset from './components/auth/reset';
import Activate from './components/auth/activation';

//import blog routes
import Dashboard from './components/blog/dashboard'
import CreateBlog from './components/blog/createblog'
import ViewAllBlogs from './components/blog/viewallblogs'
import CategoryBlog from './components/blog/categoryblogs'
import ViewBlog from './components/blog/viewblog'
import UpdateBlog from './components/blog/updateblog'
import DeleteBlog from './components/blog/deleteblog'

//context file import
import { TokenProvider } from './TokenContext';


function App() {

  return (
  <>
  <TokenProvider>
<Router> 
  <Switch>
    {/* auth routes */}
    <Route path='/' component={LandingPage} exact ></Route>
    <Route path='/register' component={Register} exact ></Route>
    <Route path='/login' component={Login} exact ></Route>
    <Route path ='/forgot' component={Forgot} exact ></Route>
    <Route path="/activation/:token" component={Activate} exact ></Route>
    <Route path ='/reset/:randomString' component={Reset} exact ></Route>


    {/* blog routes */}
    <Route path='/dashboard' component={Dashboard} exact ></Route>
    <Route path='/createblog' component={CreateBlog} exact ></Route>
    <Route path='/viewallblogs' component={ViewAllBlogs} exact ></Route>
    <Route path='/categoryblogs/:category' component={CategoryBlog} exact ></Route>
    <Route path='/viewblog/:id' component={ViewBlog} exact ></Route>
    <Route path='/updateblog/:id' component={UpdateBlog} exact ></Route>
    <Route path='/deleteblog/:id' component={DeleteBlog} exact ></Route>
  
  </Switch>
</Router>
</TokenProvider>
  </>
  )
}

export default App;