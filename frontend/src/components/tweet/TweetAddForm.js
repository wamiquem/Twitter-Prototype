import React,{Component} from 'react';
import uploadIcon from '../../images/image-upload-icon.png'
import {connect} from 'react-redux';
import {createTweet} from '../../redux/actions/tweetsAction';

class TweetAddForm extends Component {
     constructor(props){
        super(props);
        this.state = {
            content: "",
            images: [],
            imagesUrl: [],
            message: "",
            usedCharacters: 0
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        // this.checkMimeType = this.checkMimeType.bind(this);
    }

    componentDidMount(){
    }

    maxSelectFile=(event)=>{
        let files = event.target.files // create file object
            if (files.length + this.state.images.length > 4) { 
               const msg = 'Only 4 images can be uploaded at a time'
               event.target.value = null // discard selected file
               console.log(msg)
              return false;
     
          }
        return true;
    }

    checkMimeType=(event)=>{
        //getting file object
        let files = event.target.files 
        //define message container
        let err = ''
        // list allow mime type
       const types = ['image/png', 'image/jpeg', 'image/gif']
        // loop access array
        for(var x = 0; x<files.length; x++) {
         // compare file type find doesn't matach
             if (types.every(type => files[x].type !== type)) {
             // create error message and assign to container   
             err += files[x].type+' is not a supported format\n';
           }
         };
      
       if (err !== '') { // if message not same old that mean has error 
            event.target.value = null // discard selected file
            console.log(err)
             return false; 
        }
       return true;
      }

    handleFileUpload = (e) => {
        if(!this.checkMimeType(e)){
            alert("Please upload png/jpeg file only");
        }

        if(!this.maxSelectFile(e)){
            alert("Total 4 images are allowed");        
        }
        
        if(this.maxSelectFile(e) && this.checkMimeType(e)){
            // if return true allow to setState
            var tempUrl =[];
            for(var x = 0; x<e.target.files.length; x++) {
                tempUrl.push(URL.createObjectURL(e.target.files[x]));
            }
            this.setState(
                { 
                    images: [...this.state.images, ...e.target.files],
                    imagesUrl: [...this.state.imagesUrl, ...tempUrl]
                }
            )
        }
    }

    //input change handler to update state variable with the text entered by the user
    changeHandler(e) {
        var input = e.target.value;
        this.setState({
            [e.target.name] : e.target.value,
            usedCharacters: input.length
        })
    }

    submitTweet = e => {
        e.preventDefault();
        const data = {
            content: this.state.content,
            images : this.state.images,
            id: localStorage.getItem('id'),
            username: localStorage.getItem('username'),
            image: localStorage.getItem('image'),
            token: localStorage.getItem('token')
        }
        this.props.createTweet(data);
        this.setState({
            content: "",
            images: [],
            imagesUrl: [],
            usedCharacters: 0
        })
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="add-tweet-form">
                        <div className="main-div">
                            <p className="font-weight-bold" >Home</p>
                            <hr/>
                            <h6 style= {{color:"red"}}>{this.props.responseMessage}</h6>
                            <div style={{display:'flex'}}>
                                <div class = "tweet-profile-image">
                                    <img className="float-left img-thumbnail" id="pic" 
                                        src = {localStorage.getItem('image')} alt="Responsive image"></img>
                                </div>
                                <div>
                                    <form onSubmit = {this.submitTweet} >
                                        <div style={{paddingBottom:'10px', paddingLeft:'10px'}}>
                                            <textarea required autoFocus class="form-control desc-textarea" style={{borderColor:'white'}}
                                            rows="3" name="content" onChange = {this.changeHandler} maxlength="280"
                                            value = {this.state.content} placeholder="What's happening?"/>
                                        </div>
                                        <b style={{float: 'right'}}>{this.state.usedCharacters}/280</b>
                                        <div style={{display:'flex'}}>
                                            <div class="image-upload">
                                                <label htmlFor="upload">
                                                    <img src={uploadIcon}/>
                                                </label>
                                                <input multiple type="file" id="upload" onChange= {this.handleFileUpload}/>
                                            </div>
                                            <button type="submit" className="custom-btn">Tweet</button>
                                        </div>
                                    </form>                            
                                    <div style = {{display:'flex', flexWrap:'wrap'}}>
                                        {
                                            this.state.imagesUrl ? 
                                            this.state.imagesUrl.map((imageUrl,index) => (
                                                <div class="tweet-add-image" key ={index}>
                                                    <img class="rounded float-left img-thumbnail" 
                                                    src= {imageUrl} alt="Responsive image"/>
                                                </div>
                                            )) 
                                            :
                                            null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createTweet: data => {dispatch(createTweet(data))}
    }
}

const mapStateToProps = state => {
    return {
        responseMessage: state.tweets.createResponseMessage
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetAddForm);