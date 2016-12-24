import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route,hashHistory} from 'react-router';
import Contents from './firstpage.jsx';
import Circle from './circle.jsx';

import MyInfo from './myinfo.jsx';

import Stats from './stat.jsx';

import Search from './searchres.jsx';


import Man from './manage.jsx';



import GroupInfo from './groupInfo.jsx';

import AtyInfo from './atyinfo.jsx';

import NotFound from './404.jsx';

import PostManage from './postmanage.jsx';




injectTapEventPlugin();
const AppT = () => (
  <MuiThemeProvider>
    <MyAwesomeReactComponent />
  </MuiThemeProvider>
);


const MainContent = () => (
  <MuiThemeProvider>
    <Contents  />
  </MuiThemeProvider>
);


const CircleContent= () => (
  <MuiThemeProvider>
    <Circle  />
  </MuiThemeProvider>
);



const MyInfoContent=React.createClass({
  render() {
    return (
      <MuiThemeProvider>
        <MyInfo  username={this.props.params.username}/>
      </MuiThemeProvider>
    );
  }
});



const StatsContent=React.createClass({
  render() {
    return (
      <MuiThemeProvider>
        <Stats  page={this.props.params.page}/>
      </MuiThemeProvider>
    );
  }
});


const SearchContent=React.createClass({
  render() {
    return (
      <MuiThemeProvider>
        <Search  keyword={this.props.params.keyword}/>
      </MuiThemeProvider>
    );
  }
});




const GroupContent= () => (
  <MuiThemeProvider>
    <GroupInfo  />
  </MuiThemeProvider>
);


const AtyContent=React.createClass({
  render() {
    return (
      <MuiThemeProvider>
        <AtyInfo  atyid={this.props.params.atyid}/>
      </MuiThemeProvider>
    );
  }
});


const FourZeroFourContent= () => (
  <MuiThemeProvider>
    <NotFound  />
  </MuiThemeProvider>
);
const PostManageContent= () => (
  <MuiThemeProvider>
    <PostManage  />
  </MuiThemeProvider>
);

const ManageContent= () => (
  <MuiThemeProvider>
    <Man  />
  </MuiThemeProvider>
);


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={AppT}/>
    <Route path="/about" component={MainContent}/>
    <Route path="/circle" component={CircleContent}/>
    <Route path="/myinfo(/:username)" component={MyInfoContent}/>
    <Route path="/stats(/:page)"  component={StatsContent}/>

    <Route path="/search(/:keyword)" component={SearchContent}/>
    <Route path="/groupinfo" component={GroupContent}/>
    <Route path="/atyinfo(/:atyid)" component={AtyContent}/>
    <Route path="/postmanage" component={PostManageContent}/>
    <Route path="/manage" component={ManageContent}/>
    <Route path="*" component={FourZeroFourContent}/>
  </Router>
), document.getElementById('app'))
