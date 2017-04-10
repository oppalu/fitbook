import React from 'react';
import AandD from './appbaranddrawer.jsx';
import MessageBar from './messagebar.jsx';
import Cover from './cover.jsx';

const Message = React.createClass({

    getInitialState(){
        return {
            username: this.props.username,
            msgobj: "",

            infoLen: 0,
        }
    },
    refresh(){
        // location.reload();
        //
        if (this.refs.keyword.getValue() == "") {
            return;
        } else {
            var url = "http://localhost:8080/#/search/";
            url += this.refs.keyword.getValue();
            url += "?refs=yes";
            window.location.href = url;

            location.reload();
        }

    },

    refreshBadge(){
        var url = "http://localhost:8080/#/about";
        window.location.href = url;
        location.reload();
        // this.setState({isSubDrawerOpen: true});
    },

    componentDidMount: function () {
        this.initData();
    },
    initData(){
        var xmlHttp = GetXmlHttpObject();
        if (xmlHttp == null) {
            alert("Browser does not support HTTP Request")
            return
        }

        var url = "http://127.0.0.1:8888/fitbook/msggetter.php?ssid=";
        url += getCookie("ssid");

        var that = this;
        xmlHttp.onreadystatechange = function () {
            // that.setState({btntext: xmlHttp.responseText});
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var jsonstr = xmlHttp.responseText;
                var json = new Function("return" + jsonstr)();

                // alert(that.state.infoLen);
                var rows = [];
                var notification = [];
                if (json.length == 0) {
                    rows.push(<div style={{marginTop:'30%',marginLeft:'30%',fontSize:46,color:'grey'}}>目前没有消息</div>);
                } else {
                    var num=0;

                    for (var i = 0; i < json.length; i++) {
                        if(json[i].state==-1){
                            num++;
                        }
                        var realtitle = "";

                        if (json[i].challangename == "-1") {
                            realtitle = "邀请你加入 ";
                            realtitle += json[i].title;
                        } else {
                            realtitle = "向你挑战 ";
                            realtitle += json[i].title;
                        }

                        rows.push(<MessageBar sendername={json[i].username} avatarlink={json[i].avatarlink}
                                              msgid={json[i].msgid} state={json[i].state} title={realtitle}/>);
                    }

                    // that.setState({infoLen: num});

                }

                that.setState({msgobj: rows});

            }
        };

        xmlHttp.open("GET", url, true);
        xmlHttp.send();


    },

  render() {

    return (

      <div>
          <div className="wholecover" >
              <Cover username={this.state.username} infoStatus="right4"/>
          </div>

          <AandD />
          <div style={{height:'61px'}}></div>
          <div style={{marginLeft:'23%',marginRight:'23%'}}>
          {/*<p style={{color:'#5A5A5A'}}>你的消息</p>*/}
              <div style={{marginTop:'10%'}}>
                  {this.state.msgobj}
          {/*<MessageBar sendername={'adam'} avatarlink={''}*/}
                      {/*msgid={1} state={0} title={'邀请你加入活动 骑速'}/>*/}
                  {/*<MessageBar sendername={'adam'} avatarlink={''}*/}
                              {/*msgid={1} state={2} title={'邀请你加入活动 骑速'}/>*/}
          {/*<MessageBar content={'邀请你加入活动 骑速'}/>*/}
              </div></div>

      </div>
    );
  }
});

export default Message;
