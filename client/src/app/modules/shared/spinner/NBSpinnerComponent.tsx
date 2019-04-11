import * as React from "react";
import "./spinner.component.css"

const NBSpinnerComponent = props => {
  return (
    <>
      {
        props.params.show ? (
          <div className="medium-spinner active-spinner nb-spinner" >
            <span className="spin-circle"></span>
            <span className="message">{props.params.title}</span>
          </div>
        ) : null
      }
    </>
  );
}
export default NBSpinnerComponent;
// export default class NBSpinnerComponent {

//     render() {
//         return (
//             <>
//                 {
//                     this.props.show ? (
//                         <div className="medium-spinner active-spinner nb-spinner" >
//                             <span className="spin-circle"></span>
//                             <span className="message">{this.p.title}</span>
//                         </div>
//                     ) : null
//                 }
//             </>
//         );
//     }

//     constructor(props) {
//     }

// }