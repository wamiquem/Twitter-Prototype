import React,{Component} from 'react';
import {Redirect} from 'react-router';
import {listsUrl} from '../../config';

//create the Create List Component
class CreateList extends Component {
     //call the constructor method
     constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            listName : "",
            listDescription : "",
            success: false
        }
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.submitCreateList = this.submitCreateList.bind(this);
    }

    //Call the Did Mount to set the auth Flag to false
    componentDidMount(){
        this.setState({
            success : false
        })
    }

    //Name and email change handlers to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitCreateList = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            listName: this.state.listName,
            listDescription: this.state.listDescription,
            listOwnerId: localStorage.getItem('id'),
            // listOwnerName: localStorage.getItem('Name'),
            listOwnerUserName: localStorage.getItem('username'),
            listOwnerName: "Saumilllllll"
        }

        fetch(`${listsUrl}/lists/createList`, {
            method: "POST",
            headers: {
                'Accept': 'application/json,  text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(res => {
            console.log(res);
            if(res.status === 200){
                res.text().then(data => { 
                    console.log(data);
                    localStorage.setItem('listId', JSON.parse(data).listId);
                    this.setState({
                        success : true
                    });

                });
            }else{
                res.text().then(data => {
                    console.log(data);
                    let responseMessage = JSON.parse(data);
                    this.setState({
                        success : false,
                        message: responseMessage.message
                    });
                });
                
            }
        })
        .catch(err => console.log(err));
    }
    render(){
        //if Cookie is set render Buyer Home Page
        let redirectVar = null;
        // if(localStorage.getItem('token')){
        //     redirectVar = <Redirect to= "/buyer/home"/>
        // }
        if(this.state.success){
            redirectVar = <Redirect to= "/lists/addMemberToList"/>
        }
        return(
            <div>
                {redirectVar}
                    <div className="modal signup-modal">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Create List</h5>
                                </div>
                            <div className="modal-body">
                                <form>
                                    <div className="md-form">
                                        <input type="text" id="listName" name="listName" className="form-control validate"
                                        onChange = {this.changeHandler}/>
                                        <label for="listName">List Name</label>
                                    </div>
                                    <div className="md-form">
                                        <input type="text" id="listDescription" name="listDescription" className="form-control validate"
                                        onChange = {this.changeHandler}/>
                                        <label for="listDescription">List Description</label>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.submitCreateList} className="custom-btn">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        
        )
    }
}

export default CreateList;