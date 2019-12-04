import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class HyperText extends Component {

    render() {
      var contents;
  
      let tokens = this.props.content.split(/\s/);

      contents = tokens.map((token, index) => {
        let hasSpace = index!== (tokens.length - 1);
        let maybeSpace = hasSpace ? ' ' : '';

        if (token.match(/^http\:\//) || token.match(/^https\:\//)){
            return (
                <a href={`${token}`} key={index} target="_blank" rel="noopener noreferrer">
                    {token}{maybeSpace}
                </a>
            )
        // } else if (token.match(/^#\:\//)){
        } else if (token.startsWith("#")){
            return (
                <Link
                  key={index}
                  to={`/hashtag/${token}`}>
                  {token}{maybeSpace}
                </Link>
              );
        } 
        // else if (token.startsWith("@")){
        //     return (
        //         <Link
        //           key={index}
        //           to={`/user/${token}`}>
        //           {token}{maybeSpace}
        //         </Link>
        //       );
        // } 
        else {
            return token + maybeSpace;
          }
      });
  
      return (
        <p style={{verticalAlign: 'top'}}>
            {contents}
        </p>
      );
    }
  
  }